/**
 * ASX DOOM Constructor - Core Three.js Engine
 * Integrates three.js editor capabilities with ASX architecture
 * 
 * Based on three.js examples:
 * - games_fps.html (FPS controller)
 * - webgl_geometry_terrain_raycast (terrain system)
 * - webgl_animation_multiple (entity animation)
 * - editor/index.html (editor interface)
 * 
 * Author: Michael - ASX Interactive Systems
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

class ASXConstructor {
  constructor(containerElement) {
    this.container = containerElement;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.transformControls = null;
    
    // State
    this.selected = null;
    this.currentMode = 'editor'; // editor, playtest
    this.currentTool = null;
    
    // Loaders
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.textureLoader = new THREE.TextureLoader();
    
    // Configure Draco
    this.dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    
    // Systems
    this.terrain = null;
    this.npc = null;
    this.lighting = null;
    this.particles = null;
    this.architecture = null;
    this.optimize = null;
    
    this.init();
  }
  
  /**
   * Initialize three.js scene
   */
  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x330000);
    this.scene.fog = new THREE.Fog(0x330000, 50, 200);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(50, 30, 50);
    this.camera.lookAt(0, 0, 0);
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.container.appendChild(this.renderer.domElement);
    
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 500;
    this.controls.minDistance = 5;
    
    // Transform controls for moving objects
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    this.transformControls.addEventListener('change', () => this.render());
    this.transformControls.addEventListener('dragging-changed', (event) => {
      this.controls.enabled = !event.value;
    });
    this.scene.add(this.transformControls);
    
    // Grid
    const gridHelper = new THREE.GridHelper(200, 40, 0x660000, 0x330000);
    gridHelper.name = 'grid';
    this.scene.add(gridHelper);
    
    // Axes
    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.name = 'axes';
    this.scene.add(axesHelper);
    
    // Default lighting
    const ambientLight = new THREE.AmbientLight(0x330000, 0.3);
    ambientLight.name = 'ambient_default';
    this.scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xff0000, 0.7);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 300;
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.right = 100;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.name = 'directional_default';
    this.scene.add(dirLight);
    
    // Raycaster for object picking
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Initialize subsystems
    this.terrain = new TerrainSystem(this);
    this.npc = new NPCSystem(this);
    this.lighting = new LightingSystem(this);
    this.particles = new ParticleSystem(this);
    this.architecture = new ArchitectureSystem(this);
    this.optimize = new OptimizationSystem(this);
    
    // Event listeners
    window.addEventListener('resize', () => this.onWindowResize());
    this.renderer.domElement.addEventListener('click', (e) => this.onClick(e));
    this.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    
    // Start animation loop
    this.animate();
    
    console.log('[ASX Constructor] Initialized');
  }
  
  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.controls.update();
    
    // Update subsystems
    if (this.particles) this.particles.update();
    if (this.npc) this.npc.update();
    
    this.render();
  }
  
  /**
   * Render scene
   */
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Window resize handler
   */
  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
  
  /**
   * Mouse click handler - object selection
   */
  onClick(event) {
    this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
    if (intersects.length > 0) {
      let selected = intersects[0].object;
      
      // Find the top-level object (not helper meshes)
      while (selected.parent && !selected.userData.selectable) {
        selected = selected.parent;
      }
      
      if (selected.userData.selectable) {
        this.select(selected);
      }
    } else {
      this.deselect();
    }
  }
  
  /**
   * Mouse move handler
   */
  onMouseMove(event) {
    // Update mouse position for tools
    this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
  }
  
  /**
   * Keyboard handler
   */
  onKeyDown(event) {
    switch (event.key) {
      case 'Delete':
      case 'Backspace':
        if (this.selected) {
          this.deleteSelected();
        }
        break;
      case 'w':
        this.transformControls.setMode('translate');
        break;
      case 'e':
        this.transformControls.setMode('rotate');
        break;
      case 'r':
        this.transformControls.setMode('scale');
        break;
      case 'Escape':
        this.deselect();
        break;
      case 'f':
        if (this.selected) {
          this.focusOnSelected();
        }
        break;
      case 'g':
        this.toggleGrid();
        break;
    }
  }
  
  /**
   * Select object
   */
  select(object) {
    this.deselect();
    this.selected = object;
    this.transformControls.attach(object);
    
    // Highlight selected
    if (object.material) {
      object.userData.originalEmissive = object.material.emissive?.getHex() || 0x000000;
      if (object.material.emissive) {
        object.material.emissive.setHex(0x0066ff);
      }
    }
    
    // Notify UI
    this.onSelectionChanged(object);
  }
  
  /**
   * Deselect object
   */
  deselect() {
    if (this.selected) {
      this.transformControls.detach();
      
      // Restore original emissive
      if (this.selected.material?.emissive) {
        this.selected.material.emissive.setHex(
          this.selected.userData.originalEmissive || 0x000000
        );
      }
      
      this.selected = null;
      this.onSelectionChanged(null);
    }
  }
  
  /**
   * Delete selected object
   */
  deleteSelected() {
    if (!this.selected) return;
    
    this.scene.remove(this.selected);
    this.deselect();
    
    console.log('[ASX Constructor] Deleted object');
  }
  
  /**
   * Focus camera on selected
   */
  focusOnSelected() {
    if (!this.selected) return;
    
    const box = new THREE.Box3().setFromObject(this.selected);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * 1.5;
    
    this.camera.position.set(center.x, center.y + maxDim, center.z + cameraZ);
    this.controls.target.copy(center);
    this.controls.update();
  }
  
  /**
   * Toggle grid visibility
   */
  toggleGrid() {
    const grid = this.scene.getObjectByName('grid');
    if (grid) {
      grid.visible = !grid.visible;
    }
  }
  
  /**
   * Load template
   */
  async loadTemplate(templatePath) {
    try {
      const response = await fetch(templatePath);
      const data = await response.json();
      
      console.log('[ASX Constructor] Loading template:', data.template.name);
      
      // Clear existing scene (keep helpers)
      this.clearScene();
      
      // Build terrain
      if (data.terrain) {
        await this.terrain.build(data.terrain);
      }
      
      // Build architecture
      if (data.architecture) {
        await this.architecture.build(data.architecture);
      }
      
      // Spawn items
      if (data.items) {
        await this.spawnItems(data.items);
      }
      
      // Spawn enemies
      if (data.enemies) {
        await this.npc.spawnWaves(data.enemies.waves);
      }
      
      // Setup lighting
      if (data.lighting) {
        this.lighting.setup(data.lighting);
      }
      
      // Add particles
      if (data.particles) {
        this.particles.setup(data.particles);
      }
      
      // Setup atmosphere
      if (data.atmosphere) {
        this.setupAtmosphere(data.atmosphere);
      }
      
      // Add player spawns
      if (data.spawns) {
        this.addSpawns(data.spawns);
      }
      
      console.log('[ASX Constructor] Template loaded successfully');
      
      return { success: true };
      
    } catch (error) {
      console.error('[ASX Constructor] Error loading template:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Clear scene (keep helpers)
   */
  clearScene() {
    const objectsToRemove = [];
    
    this.scene.traverse((object) => {
      if (object.userData.removable !== false && 
          !['grid', 'axes', 'ambient_default', 'directional_default'].includes(object.name)) {
        objectsToRemove.push(object);
      }
    });
    
    objectsToRemove.forEach(obj => {
      this.scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(mat => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }
  
  /**
   * Spawn items from template
   */
  async spawnItems(items) {
    // Weapons
    if (items.weapons) {
      for (const weapon of items.weapons) {
        await this.spawnItem('weapon', weapon.type, weapon.position);
      }
    }
    
    // Health
    if (items.health) {
      for (const health of items.health) {
        if (health.positions) {
          for (const pos of health.positions) {
            await this.spawnItem('health', health.type, pos);
          }
        } else {
          await this.spawnItem('health', health.type, health.position);
        }
      }
    }
    
    // Armor
    if (items.armor) {
      for (const armor of items.armor) {
        if (armor.positions) {
          for (const pos of armor.positions) {
            await this.spawnItem('armor', armor.type, pos);
          }
        } else {
          await this.spawnItem('armor', armor.type, armor.position);
        }
      }
    }
  }
  
  /**
   * Spawn single item
   */
  async spawnItem(category, type, position) {
    // Placeholder - would load actual models
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    mesh.userData = {
      type: 'item',
      category: category,
      itemType: type,
      selectable: true,
      removable: true
    };
    
    this.scene.add(mesh);
  }
  
  /**
   * Add player spawn points
   */
  addSpawns(spawns) {
    if (!spawns.player) return;
    
    spawns.player.forEach(spawn => {
      const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(spawn.position.x, spawn.position.y, spawn.position.z);
      mesh.rotation.set(
        spawn.rotation.x * Math.PI / 180,
        spawn.rotation.y * Math.PI / 180,
        spawn.rotation.z * Math.PI / 180
      );
      
      mesh.userData = {
        type: 'spawn',
        spawnId: spawn.id,
        selectable: true,
        removable: true
      };
      
      this.scene.add(mesh);
    });
  }
  
  /**
   * Setup atmosphere
   */
  setupAtmosphere(atmosphere) {
    if (atmosphere.fog) {
      this.scene.fog = new THREE.Fog(
        atmosphere.fog.color,
        atmosphere.fog.near,
        atmosphere.fog.far
      );
    }
    
    if (atmosphere.skybox) {
      // Load skybox textures
      // Implementation would use CubeTextureLoader
    }
  }
  
  /**
   * Export scene to ASX JSON
   */
  exportToJSON() {
    const data = {
      template: {
        id: "custom_level",
        name: "Custom Level",
        author: "ASX Constructor",
        version: "1.0"
      },
      terrain: this.terrain.export(),
      architecture: this.architecture.export(),
      enemies: this.npc.export(),
      items: this.exportItems(),
      spawns: this.exportSpawns(),
      lighting: this.lighting.export(),
      particles: this.particles.export()
    };
    
    return data;
  }
  
  /**
   * Export items
   */
  exportItems() {
    const items = { weapons: [], health: [], armor: [] };
    
    this.scene.traverse(obj => {
      if (obj.userData.type === 'item') {
        const item = {
          type: obj.userData.itemType,
          position: {
            x: obj.position.x,
            y: obj.position.y,
            z: obj.position.z
          }
        };
        
        items[obj.userData.category].push(item);
      }
    });
    
    return items;
  }
  
  /**
   * Export spawns
   */
  exportSpawns() {
    const spawns = { player: [] };
    
    this.scene.traverse(obj => {
      if (obj.userData.type === 'spawn') {
        spawns.player.push({
          id: obj.userData.spawnId,
          position: {
            x: obj.position.x,
            y: obj.position.y,
            z: obj.position.z
          },
          rotation: {
            x: obj.rotation.x * 180 / Math.PI,
            y: obj.rotation.y * 180 / Math.PI,
            z: obj.rotation.z * 180 / Math.PI
          }
        });
      }
    });
    
    return spawns;
  }
  
  /**
   * Selection changed callback - override in UI
   */
  onSelectionChanged(object) {
    // UI will implement this
    console.log('[ASX Constructor] Selection changed:', object?.userData.type);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ASXConstructor;
}

// Also make available globally for ASX runtime
window.ASXConstructor = ASXConstructor;
