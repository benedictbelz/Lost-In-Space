import * as THREE from 'three';

export default class Entity {

    /************************/
    /******** FIELDS ********/
    /************************/

    public object: THREE.Object3D;
    public scene: THREE.Scene;

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    /************************/
    /******* METHODS ********/
    /************************/

}
