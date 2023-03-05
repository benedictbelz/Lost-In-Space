import * as THREE from 'three';

export default class Camera {
    
    /************************/
    /******** FIELDS ********/
    /************************/

    public object: THREE.Camera;
    private scene: THREE.Scene;
    private size: number = 20;

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/

    constructor(
        height: number,
        width: number,
        scene: THREE.Scene
    ) {
        this.scene = scene;
        this.initialize(height, width);
    }

    /************************/
    /******* METHODS ********/
    /************************/

    private initialize(height: number, width: number) {
        // GET ASPECT
        const aspect = width / height;
        // INIT CAMERA
        this.object = new THREE.OrthographicCamera(
            -aspect * this.size,
            aspect * this.size,
            this.size,
            -this.size,
            1,
            1000
        );
        // POSITION CAMERA
        this.object.position.z = 10;
        // ADD CAMERA
        this.scene.add(this.object);
    }

    public resize(height: number, width: number) {
        // GET ASPECT
        const aspect = width / height;
        // RESIZE CAMERA
        (this.object as any).left = -aspect * this.size;
        (this.object as any).right = aspect * this.size;
        (this.object as any).top = this.size;
        (this.object as any).bottom = -this.size;
        // UPDATE PROJECTION MATRIX
        (this.object as any).updateProjectionMatrix()
    }
}