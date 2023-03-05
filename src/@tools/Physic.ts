import Entity from '../Components/Entities/Entity';
import Planet from '../Components/Entities/Planet';

class Physic {

    /************************/
    /******** FIELDS ********/
    /************************/

    static readonly GRAVITATION = 1;

    /************************/
    /******* METHODS ********/
    /************************/

    getDistance(planet1: Entity, planet2: Entity) {
        const distanceX = planet1.object.position.x - planet2.object.position.x;
        const distanceY = planet1.object.position.y - planet2.object.position.y;
        return Math.pow(Math.pow(distanceX, 2) + Math.pow(distanceY, 2), 1/2);
    }

    getAngle(planet1: Planet, planet2: Entity) {
        return Math.atan2(planet1.object.position.y - planet2.object.position.y, planet1.object.position.x - planet2.object.position.x);
    }
    
    getForce(planet1: Planet, planet2: Planet) {
        const mass1 = planet1.mass;
        const mass2 = planet2.mass;
        const distance = this.getDistance(planet1, planet2);
        return Physic.GRAVITATION * ((mass1 * mass2) / (distance * distance));
    }

    getOrbitStart(planet1: Planet, planet2: Planet) {
        return Math.pow(Physic.GRAVITATION * (planet1.mass / this.getDistance(planet1, planet2)), 1/2);
    }

    getOrbitEnd(planet: Planet) {
        return Math.pow((Physic.GRAVITATION * 2) * (planet.mass / planet.size), 1/2);
    }
}

export default new Physic();
