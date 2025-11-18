// engine/three-integration.js
export async function initThreeScene(canvas, sceneDef) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x1a0000, 0.015);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 4, 12);

  // Load map JSON
  const mapRes = await fetch(sceneDef.map);
  const mapData = await mapRes.json();

  // Ground
  const groundGeo = new THREE.PlaneGeometry(200, 200, 20, 20);
  const groundMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a0000,
    roughness: 0.95,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Walls
  if (Array.isArray(mapData.walls)) {
    mapData.walls.forEach(w => {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(w.w || 10, w.h || 10, w.d || 1),
        new THREE.MeshStandardMaterial({ 
          color: 0x330000,
          roughness: 0.8
        })
      );
      box.position.set(w.x || 0, (w.h || 10) / 2, w.z || 0);
      box.castShadow = true;
      box.receiveShadow = true;
      box.userData.collision = true;
      scene.add(box);
    });
  }

  // Enemy spawns (red cubes for now)
  if (mapData.spawns?.enemies) {
    mapData.spawns.enemies.forEach((spawn, i) => {
      const enemy = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 1),
        new THREE.MeshStandardMaterial({ 
          color: 0xff0000,
          emissive: 0x660000,
          emissiveIntensity: 0.5
        })
      );
      enemy.position.set(spawn.x, spawn.y, spawn.z);
      enemy.userData.type = 'enemy';
      enemy.userData.hp = 100;
      enemy.castShadow = true;
      scene.add(enemy);
    });
  }

  // Lighting
  const ambient = new THREE.AmbientLight(0x330000, 0.3);
  scene.add(ambient);

  const mainLight = new THREE.DirectionalLight(0xff0000, 0.8);
  mainLight.position.set(10, 20, 10);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  scene.add(mainLight);

  // Point lights (torches)
  if (mapData.lighting?.torches) {
    mapData.lighting.torches.forEach(torch => {
      const light = new THREE.PointLight(0xff4400, 2, 15);
      light.position.set(torch.x, torch.y, torch.z);
      light.castShadow = true;
      scene.add(light);

      // Torch mesh
      const torchMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 1.5, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0x220000,
          emissive: 0xff4400,
          emissiveIntensity: 0.3
        })
      );
      torchMesh.position.set(torch.x, torch.y - 0.5, torch.z);
      scene.add(torchMesh);
    });
  }

  // Resize handler
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  return { renderer, scene, camera, mapData };
}
