import * as THREE from 'three';
import Space from './Space/Space';
import Controls from './Controls/Controls';
import Camera from './Camera/Camera';
import '../General/General.scss';

export default class Scene {

    /************************/
    /******** FIELDS ********/
    /************************/

    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private clock: THREE.Clock;
    private camera: Camera;
    private controls: Controls;
    private space: Space;
    private width: number;
    private height: number;

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/

    constructor() {
        this.width = window.innerWidth,
        this.height = window.innerHeight,
        this.initialize();
        window.addEventListener('resize', () => this.resize());
    }

    /************************/
    /******* METHODS ********/
    /************************/

    initialize() {
        // INIT SCENE
        this.scene = new THREE.Scene();
        // INIT CLOCK
        this.clock = new THREE.Clock(true);
        // INIT CAMERA
        this.camera = new Camera(this.height, this.width, this.scene);
        // INIT CONTROLS
        this.controls = new Controls();
        // INIT SPACE
        this.space = new Space(this.clock, this.scene);
        // INIT RENDERER
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: document.getElementById('canvas'),
        });
        this.renderer.setSize(this.width, this.height);
        (this.renderer as any).setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // START ANIMATION
        this.animate();
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera.object);
        this.space.animate(this.controls);
    }

    resize() {
        // GET HEIGHT & WIDTH
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        // RESIZE CAMERA
        this.camera.resize(this.height, this.width);
        // RESIZE RENDERER
        this.renderer.setSize(this.width, this.height)
    }
}

window.addEventListener('load', () => new Scene());