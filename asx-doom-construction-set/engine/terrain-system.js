/**
 * ASX DOOM Constructor - Terrain System
 * Based on three.js webgl_geometry_terrain_raycast example
 * 
 * Features:
 * - Heightmap terrain generation
 * - Sculpting brushes (raise, lower, flatten, smooth, noise)
 * - Raycasting for brush placement
 * - Texture painting
 * - Procedural generation (Perlin, Voronoi, Erosion)
 * 
 * Author: Michael - ASX Interactive Systems
 */

import * as THREE from 'three';

class TerrainSystem {
  constructor(constructor) {
    this.constructor = constructor;
    this.terrain = null;
    this.heightData = null;
    this.resolution = 128;
    this.size = 200;
    
    // Brush settings
    this.brush = {
      type: 'raise',
      strength: 1.0,
      radius: 10,
      falloff: 'smooth'
    };
    
    // Raycasting
    this.raycaster = new THREE.Raycaster();
    this.brushHelper = null;
  }
  
  /**
   * Create new terrain
   */
  create(config) {
    const size = config.size || this.size;
    const resolution = config.resolution || this.resolution;
    
    this.size = size;
    this.resolution = resolution;
    
    // Initialize height data
    this.heightData = new Float32Array(resolution * resolution);
    
    // Create geometry
    const geometry = new THREE.PlaneGeometry(
      size, size,
      resolution - 1, resolution - 1
    );
    geometry.rotateX(-Math.PI / 2);
    
    // Apply height data
    this.updateGeometryHeights(geometry);
    
    // Create material
    const material = new THREE.MeshStandardMaterial({
      color: 0x553333,
      roughness: 0.8,
      metalness: 0.2
    });
    
    // Create mesh
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.receiveShadow = true;
    this.terrain.castShadow = true;
    this.terrain.userData = {
      type: 'terrain',
      selectable: true,
      removable: true
    };
    
    this.constructor.scene.add(this.terrain);
    
    // Create brush helper
    this.createBrushHelper();
    
    console.log('[Terrain] Created', size, 'x', size, 'with resolution', resolution);
    
    return this.terrain;
  }
  
  /**
   * Build terrain from template data
   */
  async build(data) {
    if (data.type === 'circular_platform') {
      return this.buildCircularPlatform(data);
    } else if (data.type === 'interior_floor') {
      return this.buildInteriorFloor(data);
    } else {
      return this.create({
        size: data.geometry?.width || 200,
        resolution: data.geometry?.segments || 128
      });
    }
  }
  
  /**
   * Build circular platform (arena style)
   */
  buildCircularPlatform(data) {
    const outerRadius = data.geometry.outerRadius;
    const innerRadius = data.geometry.innerRadius;
    const height = data.geometry.height;
    
    // Create platform geometry
    const geometry = new THREE.CylinderGeometry(
      outerRadius, outerRadius, height,
      data.geometry.segments || 64
    );
    
    // Material
    const material = new THREE.MeshStandardMaterial({
      color: 0x553333,
      roughness: 0.8,
      metalness: 0.2
    });
    
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.receiveShadow = true;
    this.terrain.castShadow = true;
    this.terrain.userData = {
      type: 'terrain',
      terrainType: 'circular_platform',
      selectable: true
    };
    
    // Add ramps if specified
    if (data.ramps) {
      data.ramps.forEach(ramp => {
        this.addRamp(ramp);
      });
    }
    
    this.constructor.scene.add(this.terrain);
    
    console.log('[Terrain] Built circular platform, radius:', outerRadius);
    
    return this.terrain;
  }
  
  /**
   * Build interior floor
   */
  buildInteriorFloor(data) {
    const width = data.geometry.width;
    const depth = data.geometry.depth;
    
    const geometry = new THREE.PlaneGeometry(width, depth);
    geometry.rotateX(-Math.PI / 2);
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.7
    });
    
    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.receiveShadow = true;
    this.terrain.userData = {
      type: 'terrain',
      terrainType: 'interior_floor',
      selectable: true
    };
    
    this.constructor.scene.add(this.terrain);
    
    console.log('[Terrain] Built interior floor:', width, 'x', depth);
    
    return this.terrain;
  }
  
  /**
   * Add ramp between levels
   */
  addRamp(ramp) {
    // Ramp implementation
    const geometry = new THREE.BoxGeometry(5, 1, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x664444 });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position based on angle
    const angle = ramp.angle * Math.PI / 180;
    const radius = ramp.from?.radius || 30;
    mesh.position.set(
      Math.cos(angle) * radius,
      0.5,
      Math.sin(angle) * radius
    );
    mesh.rotation.y = angle;
    
    mesh.userData = {
      type: 'architecture',
      architectureType: 'ramp'
    };
    
    this.constructor.scene.add(mesh);
  }
  
  /**
   * Update geometry heights from height data
   */
  updateGeometryHeights(geometry) {
    const vertices = geometry.attributes.position.array;
    
    for (let i = 0, j = 0; i < vertices.length; i += 3, j++) {
      vertices[i + 1] = this.heightData[j];
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }
  
  /**
   * Sculpt terrain
   */
  sculpt(config) {
    if (!this.terrain || !this.heightData) return;
    
    const center = config.position || this.getMouseTerrainPosition();
    if (!center) return;
    
    const strength = config.strength || this.brush.strength;
    const radius = config.radius || this.brush.radius;
    const type = config.type || this.brush.type;
    
    // Convert world position to heightmap coordinates
    const hmX = Math.floor((center.x / this.size + 0.5) * this.resolution);
    const hmZ = Math.floor((center.z / this.size + 0.5) * this.resolution);
    const hmRadius = Math.floor((radius / this.size) * this.resolution);
    
    // Apply brush
    for (let x = -hmRadius; x <= hmRadius; x++) {
      for (let z = -hmRadius; z <= hmRadius; z++) {
        const hx = hmX + x;
        const hz = hmZ + z;
        
        if (hx < 0 || hx >= this.resolution || hz < 0 || hz >= this.resolution) continue;
        
        const index = hz * this.resolution + hx;
        const distance = Math.sqrt(x * x + z * z);
        
        if (distance <= hmRadius) {
          // Calculate falloff
          let falloff = 1.0;
          if (this.brush.falloff === 'smooth') {
            falloff = 1.0 - (distance / hmRadius);
            falloff = falloff * falloff; // Squared falloff
          }
          
          const adjustedStrength = strength * falloff;
          
          // Apply brush type
          switch (type) {
            case 'raise':
              this.heightData[index] += adjustedStrength;
              break;
            case 'lower':
              this.heightData[index] -= adjustedStrength;
              break;
            case 'flatten':
              const targetHeight = config.targetHeight || 0;
              this.heightData[index] += (targetHeight - this.heightData[index]) * adjustedStrength;
              break;
            case 'smooth':
              this.heightData[index] = this.smoothHeight(hx, hz, adjustedStrength);
              break;
            case 'noise':
              this.heightData[index] += (Math.random() - 0.5) * adjustedStrength;
              break;
          }
        }
      }
    }
    
    // Update geometry
    this.updateGeometryHeights(this.terrain.geometry);
    
    console.log('[Terrain] Sculpted:', type, 'at', center);
  }
  
  /**
   * Smooth height at position
   */
  smoothHeight(x, z, strength) {
    let sum = 0;
    let count = 0;
    
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const nx = x + dx;
        const nz = z + dz;
        
        if (nx >= 0 && nx < this.resolution && nz >= 0 && nz < this.resolution) {
          sum += this.heightData[nz * this.resolution + nx];
          count++;
        }
      }
    }
    
    const average = sum / count;
    const current = this.heightData[z * this.resolution + x];
    
    return current + (average - current) * strength;
  }
  
  /**
   * Paint terrain texture
   */
  paint(config) {
    // Texture painting implementation
    console.log('[Terrain] Paint:', config);
  }
  
  /**
   * Generate procedural terrain
   */
  generateProcedural(algorithm, params) {
    if (!this.heightData) {
      this.create({ size: this.size, resolution: this.resolution });
    }
    
    switch (algorithm) {
      case 'perlin':
        this.generatePerlin(params);
        break;
      case 'voronoi':
        this.generateVoronoi(params);
        break;
      case 'erosion':
        this.applyErosion(params);
        break;
    }
    
    this.updateGeometryHeights(this.terrain.geometry);
  }
  
  /**
   * Generate Perlin noise terrain
   */
  generatePerlin(params) {
    const octaves = params.octaves || 4;
    const scale = params.scale || 50;
    const height = params.height || 20;
    const seed = params.seed || Math.random();
    
    for (let z = 0; z < this.resolution; z++) {
      for (let x = 0; x < this.resolution; x++) {
        const index = z * this.resolution + x;
        
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;
        
        for (let o = 0; o < octaves; o++) {
          const sampleX = (x / this.resolution) * scale * frequency;
          const sampleZ = (z / this.resolution) * scale * frequency;
          
          const noise = this.noise2D(sampleX + seed, sampleZ + seed);
          value += noise * amplitude;
          
          maxValue += amplitude;
          amplitude *= 0.5;
          frequency *= 2;
        }
        
        value /= maxValue;
        this.heightData[index] = value * height;
      }
    }
    
    console.log('[Terrain] Generated Perlin noise');
  }
  
  /**
   * Simple 2D noise function (placeholder for actual Perlin/Simplex)
   */
  noise2D(x, z) {
    // Simplified noise - in production, use simplex-noise library
    return Math.sin(x * 0.1) * Math.cos(z * 0.1) +
           Math.sin(x * 0.3) * Math.cos(z * 0.2) * 0.5 +
           Math.sin(x * 0.7) * Math.cos(z * 0.5) * 0.25;
  }
  
  /**
   * Generate Voronoi terrain
   */
  generateVoronoi(params) {
    const cells = params.cells || 20;
    const height = params.height || 15;
    
    // Generate random cell centers
    const centers = [];
    for (let i = 0; i < cells; i++) {
      centers.push({
        x: Math.random() * this.resolution,
        z: Math.random() * this.resolution,
        height: Math.random() * height
      });
    }
    
    // Calculate distances to nearest center
    for (let z = 0; z < this.resolution; z++) {
      for (let x = 0; x < this.resolution; x++) {
        const index = z * this.resolution + x;
        
        let minDist = Infinity;
        let nearestHeight = 0;
        
        for (const center of centers) {
          const dx = x - center.x;
          const dz = z - center.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          
          if (dist < minDist) {
            minDist = dist;
            nearestHeight = center.height;
          }
        }
        
        this.heightData[index] = nearestHeight;
      }
    }
    
    console.log('[Terrain] Generated Voronoi terrain');
  }
  
  /**
   * Apply erosion simulation
   */
  applyErosion(params) {
    const iterations = params.iterations || 100;
    const strength = params.strength || 0.3;
    
    for (let i = 0; i < iterations; i++) {
      // Simple hydraulic erosion simulation
      for (let z = 1; z < this.resolution - 1; z++) {
        for (let x = 1; x < this.resolution - 1; x++) {
          const index = z * this.resolution + x;
          const current = this.heightData[index];
          
          // Find lowest neighbor
          let lowestHeight = current;
          let lowestX = x;
          let lowestZ = z;
          
          for (let dz = -1; dz <= 1; dz++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dz === 0) continue;
              
              const nx = x + dx;
              const nz = z + dz;
              const nIndex = nz * this.resolution + nx;
              const nHeight = this.heightData[nIndex];
              
              if (nHeight < lowestHeight) {
                lowestHeight = nHeight;
                lowestX = nx;
                lowestZ = nz;
              }
            }
          }
          
          // Erode toward lowest point
          if (lowestHeight < current) {
            const diff = (current - lowestHeight) * strength;
            this.heightData[index] -= diff * 0.5;
            this.heightData[lowestZ * this.resolution + lowestX] += diff * 0.5;
          }
        }
      }
    }
    
    console.log('[Terrain] Applied erosion');
  }
  
  /**
   * Get mouse position on terrain
   */
  getMouseTerrainPosition() {
    if (!this.terrain) return null;
    
    this.raycaster.setFromCamera(this.constructor.mouse, this.constructor.camera);
    
    const intersects = this.raycaster.intersectObject(this.terrain);
    
    if (intersects.length > 0) {
      return intersects[0].point;
    }
    
    return null;
  }
  
  /**
   * Create brush helper visualization
   */
  createBrushHelper() {
    const geometry = new THREE.CircleGeometry(this.brush.radius, 32);
    geometry.rotateX(-Math.PI / 2);
    
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    
    this.brushHelper = new THREE.Mesh(geometry, material);
    this.brushHelper.visible = false;
    this.constructor.scene.add(this.brushHelper);
  }
  
  /**
   * Update brush helper position
   */
  updateBrushHelper() {
    if (!this.brushHelper) return;
    
    const pos = this.getMouseTerrainPosition();
    if (pos) {
      this.brushHelper.position.copy(pos);
      this.brushHelper.position.y += 0.1;
      this.brushHelper.visible = true;
    } else {
      this.brushHelper.visible = false;
    }
  }
  
  /**
   * Set brush parameters
   */
  setBrush(type, strength, radius, falloff) {
    this.brush.type = type || this.brush.type;
    this.brush.strength = strength !== undefined ? strength : this.brush.strength;
    this.brush.radius = radius || this.brush.radius;
    this.brush.falloff = falloff || this.brush.falloff;
    
    if (this.brushHelper) {
      this.brushHelper.scale.set(this.brush.radius, 1, this.brush.radius);
    }
  }
  
  /**
   * Export terrain data
   */
  export() {
    if (!this.terrain) return null;
    
    return {
      type: this.terrain.userData.terrainType || 'heightmap',
      size: this.size,
      resolution: this.resolution,
      heightData: Array.from(this.heightData)
    };
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TerrainSystem;
}

window.TerrainSystem = TerrainSystem;
