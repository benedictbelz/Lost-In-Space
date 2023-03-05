import * as THREE from 'three';
import Physic from '../../@tools/Physic';
import Tools from '../../@tools/Tools';
import Entity from './Entity';

export default class Planet extends Entity {
    
    /************************/
    /******** FIELDS ********/
    /************************/

    public mass: number;
    public size: number;
    public radius: number;
    public velocity = { x: 0, y: 0 };

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/

    constructor(
        scene: THREE.Scene,
        color: THREE.ColorRepresentation,
        size: number,
        mass: number
    ) {
        super(scene);
        this.mass = mass;
        this.size = size;
        this.radius = size/2;
        this.initialize(color, size);
    }

    /************************/
    /******* METHODS ********/
    /************************/

    private initialize(color: THREE.ColorRepresentation, size: number) {
        // CREATE OBJECT
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color });
        const object = new THREE.Object3D();
        // CREATE MESH
        const mesh = new THREE.Mesh(geometry, material);
        object.add(mesh);
        // ADD OBJECT
        this.object = object;
        this.scene.add(object);
    }

    public createRandomPosition(min: number, max: number) {
        const radius = Math.floor(Math.random() * (max - min + 1) + min);
        const angle = Math.floor(Math.random() * ((Math.PI * 2) + 1));
        this.object.position.x = radius * Math.cos(angle);
        this.object.position.y = radius * Math.sin(angle);
    }

    public setGravitation(planet: Planet) {
        const force = Physic.getForce(planet, this);
        const angle = Physic.getAngle(planet, this);

        //console.log('DISTANCE', Physic.getDistance(planet, this));
        //console.log('FORCE', force);
        //console.log('ANGLE', angle);

        this.velocity.x += (Math.cos(angle) * force) / planet.mass;
        this.velocity.y += (Math.sin(angle) * force) / planet.mass;

        this.object.position.x += this.velocity.x;
        this.object.position.y += this.velocity.y;
    }

    public animate() {
        
    }
}