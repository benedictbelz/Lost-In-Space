import Spaceship from '../Entities/Spaceship';
import Controls from '../Controls/Controls';
import Planet from '../Entities/Planet';
import Config from '../../@presets/Config';
import Physic from '../../@tools/Physic';
import Tools from '../../@tools/Tools';


export default class Space {

    /************************/
    /******** FIELDS ********/
    /************************/

    private clock: THREE.Clock;
    private scene: THREE.Scene;
    private spaceship: Spaceship;
    private meteor: Planet;
    private planet: Planet;
    

    /************************/
    /****** CONSTRUCTOR *****/
    /************************/

    constructor(clock: THREE.Clock, scene: THREE.Scene) {
        this.clock = clock;
        this.scene = scene;
        this.initialize();
    }

    /************************/
    /******* METHODS ********/
    /************************/

    private initialize() {
        // INIT OBJECTS
        this.clock.start();
        
        // this.spaceship = new Spaceship(this.scene);
        
        this.planet = new Planet(this.scene, 0xffff00, 2, 1);
        this.meteor = new Planet(this.scene, 0x0000ff, 0.5, 1);
        //this.meteor.createRandomPosition(5, 20);
        this.meteor.object.position.x = 10;
        this.meteor.object.position.y = 0;
        this.meteor.velocity = { x: 0, y: 0.2 };
        
        const orbitStart = Physic.getOrbitStart(this.planet, this.meteor)
        //const x = Math.cos(orbitStart);
        //const y = Math.sin(orbitStart);
        //console.log('X', x, 'Y', y);

        //console.log('DISTANCE', Physic.getDistance(this.meteor, this.planet));
        //console.log('FORCE', Physic.getForce(this.meteor, this.planet));
        //console.log('ORBIT START', Physic.getOrbitStart(this.planet));
        //console.log('ORBIT END', Physic.getOrbitEnd(this.planet));
    }

    public animate(controls: Controls) {
        this.meteor.setGravitation(this.planet);
    }
}