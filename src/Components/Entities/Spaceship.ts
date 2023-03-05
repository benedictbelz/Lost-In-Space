import * as THREE from 'three';
import Config from '../../@presets/Config';
import Controls from '../Controls/Controls';
import Entity from './Entity';

export default class Spaceship extends Entity {

    /************************/
    /******** FIELDS ********/
    /************************/

    public velocity = { x: 0, y: 0 }

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/
    
    constructor(
        scene: THREE.Scene,
    ) {
        super(scene);
        this.initialize();
    }

    /************************/
    /******* METHODS ********/
    /************************/
    
    private initialize() {
        // CREATE OBJECT
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const object = new THREE.Object3D();
        // CREATE MESH
        const mesh_01 = new THREE.Mesh(geometry, material);
        const mesh_02 = new THREE.Mesh(geometry, material);
        mesh_02.position.x = 0.75;
        mesh_02.scale.set(0.5, 0.5, 0.5);
        object.add(mesh_01);
        object.add(mesh_02);
        // ADD OBJECT
        this.object = object;
        this.scene.add(object);
    }

    public getSpeed() {
        return Math.pow(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2), 1/2);
    }

    public animate(controls: Controls) {
        // KEY RIGHT
        if (controls.right) {
            this.object.rotation.z -= Config.rotation;
        }
        // KEY LEFT
        if (controls.left) {
            this.object.rotation.z += Config.rotation;
        }
        // KEY UP
        if (controls.up) {
            // ADD VELOCITY X
            this.velocity.x += Math.cos(this.object.rotation.z) * Config.position;
            // ADD VELOCITY Y
            this.velocity.y += Math.sin(this.object.rotation.z) * Config.position;
            // LIMIT VELOCITY X
            if (this.velocity.x >= Config.limit) {
                this.velocity.x = Config.limit;
            } else if (this.velocity.x <= -Config.limit) {
                this.velocity.x = -Config.limit;
            }
            // LIMIT VELOCITY Y
            if (this.velocity.y >= Config.limit) {
                this.velocity.y = Config.limit;
            } else if (this.velocity.y <= -Config.limit) {
                this.velocity.y = -Config.limit;
            }
        } else {
            // ADD FRICTION X
            this.velocity.x -= this.velocity.x * Config.friction;
            // ADD FRICTION Y
            this.velocity.y -= this.velocity.y * Config.friction;
            // LIMIT FRICTION X
            if (this.velocity.x <= Config.friction && this.velocity.x >= -Config.friction) {
                this.velocity.x = 0;
            }
            // LIMIT FRICTION Y
            if (this.velocity.y <= Config.friction && this.velocity.y >= -Config.friction) {
                this.velocity.y = 0;
            }
        }
        // TRANSFORM OBJECT
        this.object.position.x += this.velocity.x;
        this.object.position.y += this.velocity.y;
    }
}