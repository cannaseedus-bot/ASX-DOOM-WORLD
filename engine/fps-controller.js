// engine/fps-controller.js
export class ASXFPSController {
  constructor(camera, domElement, scene) {
    this.camera = camera;
    this.domElement = domElement;
    this.scene = scene;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.isJumping = false;

    this.speed = 0.15;
    this.jumpForce = 0.3;
    this.gravity = -0.015;
    this.groundLevel = 4;

    this.pitch = 0;
    this.yaw = 0;

    this.raycaster = new THREE.Raycaster();
    this.collisionObjects = [];

    this._setupPointerLock();
    this._setupKeys();
    this._collectCollisionObjects();
  }

  _collectCollisionObjects() {
    this.scene.traverse((obj) => {
      if (obj.isMesh && obj.userData.collision !== false) {
        this.collisionObjects.push(obj);
      }
    });
  }

  _setupPointerLock() {
    this.domElement.addEventListener('click', () => {
      this.domElement.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === this.domElement) {
        document.addEventListener('mousemove', this._onMouseMove);
      } else {
        document.removeEventListener('mousemove', this._onMouseMove);
      }
    });

    this._onMouseMove = this._onMouseMove.bind(this);
  }

  _onMouseMove(e) {
    const dx = e.movementX || 0;
    const dy = e.movementY || 0;

    this.yaw -= dx * 0.002;
    this.pitch -= dy * 0.002;
    this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));

    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(this.pitch, this.yaw, 0);
  }

  _setupKeys() {
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyW': this.moveForward = true; break;
        case 'KeyS': this.moveBackward = true; break;
        case 'KeyA': this.moveLeft = true; break;
        case 'KeyD': this.moveRight = true; break;
        case 'Space': 
          if (!this.isJumping && this.onGround()) {
            this.velocity.y = this.jumpForce;
            this.isJumping = true;
          }
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW': this.moveForward = false; break;
        case 'KeyS': this.moveBackward = false; break;
        case 'KeyA': this.moveLeft = false; break;
        case 'KeyD': this.moveRight = false; break;
      }
    });
  }

  onGround() {
    return Math.abs(this.camera.position.y - this.groundLevel) < 0.1;
  }

  checkCollision(direction) {
    this.raycaster.set(this.camera.position, direction);
    const intersects = this.raycaster.intersectObjects(this.collisionObjects);
    return intersects.length > 0 && intersects[0].distance < 1.5;
  }

  update(delta) {
    // Movement input
    this.direction.set(0, 0, 0);
    if (this.moveForward) this.direction.z -= 1;
    if (this.moveBackward) this.direction.z += 1;
    if (this.moveLeft) this.direction.x -= 1;
    if (this.moveRight) this.direction.x += 1;

    this.direction.normalize();

    // Transform to world space
    const sinY = Math.sin(this.yaw);
    const cosY = Math.cos(this.yaw);

    const worldX = (this.direction.x * cosY) - (this.direction.z * sinY);
    const worldZ = (this.direction.x * sinY) + (this.direction.z * cosY);

    // Check collision before moving
    const forwardDir = new THREE.Vector3(worldX, 0, worldZ).normalize();
    if (!this.checkCollision(forwardDir)) {
      this.camera.position.x += worldX * this.speed;
      this.camera.position.z += worldZ * this.speed;
    }

    // Gravity and jumping
    this.velocity.y += this.gravity;
    this.camera.position.y += this.velocity.y;

    // Ground collision
    if (this.camera.position.y <= this.groundLevel) {
      this.camera.position.y = this.groundLevel;
      this.velocity.y = 0;
      this.isJumping = false;
    }

    // Map bounds
    this.camera.position.x = Math.max(-90, Math.min(90, this.camera.position.x));
    this.camera.position.z = Math.max(-90, Math.min(90, this.camera.position.z));
  }
}
