/******************************/
/*         PROPERTIES         */
/******************************/

const props = {
	canvas: {
		width: window.innerWidth,
		height: window.innerHeight,
		aspect: window.innerWidth / window.innerHeight,
		size: 20,
	},
	calibrate: {
		position: 0.01,
		rotation: 0.05,
		limit: 0.25,
		friction: 0.0025,
	},
	keys: {
		up: false,
		down: false,
		right: false,
		left: false,
	},
};

const astronaut = {
	object: undefined,
	thrust: {
		x: 0,
		y: 0,
		rotation: 0, //Math.PI/2,
		friction: 0,
	},
};

const planet = {
	distance: 6,
};

/******************************/
/*           SCENE            */
/******************************/

const scene = new THREE.Scene();

/******************************/
/*          CAMERA            */
/******************************/

//const camera = new THREE.PerspectiveCamera(75, props.canvas.aspect);
const camera = new THREE.OrthographicCamera(
	-props.canvas.aspect * props.canvas.size,
	props.canvas.aspect * props.canvas.size,
	props.canvas.size,
	-props.canvas.size,
	1,
	1000
);
camera.position.z = 10;
scene.add(camera);

/******************************/
/*          RENDER            */
/******************************/

const render = new THREE.WebGLRenderer({
	antialias: true,
	canvas: document.querySelector('#canvas'),
});
render.setSize(props.canvas.width, props.canvas.height);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/******************************/
/*          OBJECTS           */
/******************************/

// ASTRONAUT
const geoAstronaut = new THREE.BoxGeometry(1, 1, 1);
const matAstronaut = new THREE.MeshBasicMaterial({color: 0xffffff});
const object = new THREE.Object3D();
const object1 = new THREE.Mesh(geoAstronaut, matAstronaut);
const object2 = new THREE.Mesh(geoAstronaut, matAstronaut);
object.add(object1);
object.add(object2);
object2.position.x = 0.75;
object2.scale.set(0.5, 0.5, 0.5);
scene.add(object);
astronaut.object = object;

// PLANET
const geoPlanet = new THREE.SphereGeometry(2, 32, 32);
const matPlanet = new THREE.MeshBasicMaterial({color: 0xff0000});
const sphere = new THREE.Mesh(geoPlanet, matPlanet);
sphere.position.x = 15;
scene.add(sphere);

const geoCircle = new THREE.CircleGeometry(6, 32);
const matCircle = new THREE.LineBasicMaterial({color: 0xff0000});
geoCircle.vertices.shift();
const circle = new THREE.LineLoop(geoCircle, matCircle);
circle.position.x = 15;
scene.add(circle);

/******************************/
/*       EVENT LISTENER       */
/******************************/

document.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowUp':
		case 'w':
			props.keys.up = true;
			break;
		case 'ArrowDown':
		case 's':
			props.keys.down = true;
			break;
		case 'ArrowLeft':
		case 'a':
			props.keys.left = true;
			break;
		case 'ArrowRight':
		case 'd':
			props.keys.right = true;
			break;
	}
});

document.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'ArrowUp':
		case 'w':
			props.keys.up = false;
			break;
		case 'ArrowDown':
		case 's':
			props.keys.down = false;
			break;
		case 'ArrowLeft':
		case 'a':
			props.keys.left = false;
			break;
		case 'ArrowRight':
		case 'd':
			props.keys.right = false;
			break;
	}
});

window.addEventListener('resize', () => {
	// UPDATE PROPS
	props.canvas.width = window.innerWidth;
	props.canvas.height = window.innerHeight;
	props.canvas.aspect = window.innerWidth / window.innerHeight;
	// UPDATE CAMERA
	camera.left = -props.canvas.aspect * props.canvas.size;
	camera.right = props.canvas.aspect * props.canvas.size;
	camera.top = props.canvas.size;
	camera.bottom = -props.canvas.size;
	camera.updateProjectionMatrix();
	// UPDATE RENDER
	render.setSize(props.canvas.width, props.canvas.height);
	render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/******************************/
/*          FUNCTION          */
/******************************/

function degreeToRadian(degree) {
	return (degree * Math.PI) / 180;
}

function radianToDegree(radian) {
	return (radian * 180) / Math.PI;
}

function normalizeRotation(rotation) {
	if (rotation > Math.PI * 2) return (rotation %= Math.PI * 2);
	else if (rotation < 0) return -(rotation %= Math.PI * 2);
	else return rotation;
}

const clock = new THREE.Clock();

/******************************/
/*            LOOP            */
/******************************/

(function loop() {
	// KEY RIGHT
	if (props.keys.right) astronaut.thrust.rotation -= props.calibrate.rotation;
	// KEY LEFT
	if (props.keys.left) astronaut.thrust.rotation += props.calibrate.rotation;
	// KEY UP
	/* if (props.keys.up) {
        // ADD THRUST
        astronaut.thrust.x += props.calibrate.position * Math.cos(astronaut.thrust.rotation);
        astronaut.thrust.y += props.calibrate.position * Math.sin(astronaut.thrust.rotation);
        // LIMIT THRUST
        astronaut.thrust.x = Math.min(Math.max(astronaut.thrust.x, -props.calibrate.limit),props.calibrate.limit);
        astronaut.thrust.y = Math.min(Math.max(astronaut.thrust.y, -props.calibrate.limit),props.calibrate.limit);
    } else {
        // ADD FRICTION
        astronaut.thrust.x -= props.calibrate.friction * astronaut.thrust.x;
        astronaut.thrust.y -= props.calibrate.friction * astronaut.thrust.y;
    }
    // TRANSFORM OBJECT
    object.rotation.z = astronaut.thrust.rotation;
    object.position.x += astronaut.thrust.x;
    object.position.y += astronaut.thrust.y; */

	if (props.keys.up) {
		const rotation = radianToDegree(
			normalizeRotation(astronaut.thrust.rotation)
		);
		let differencePositive, differenceNegative;

		// CALCULATE AWAY FROM PLANET
		if (rotation <= 90)
            differencePositive = 1 - rotation / 90;
		else if (rotation >= 270)
            differencePositive = rotation / 90 - 3;
		else
            differencePositive = 0;

		// CALCULATE MOVEMENT TOWARDS PLANET
		if (rotation >= 90 && rotation < 180)
			differenceNegative = rotation / 90 - 1;
		else if (rotation > 180 && rotation <= 270)
			differenceNegative = 1 - (rotation / 90 - 2);
		else 
            differenceNegative = 0;

		// THRUST
		if (rotation <= 90 || rotation >= 270)
			planet.distance += 0.1 * differencePositive;
		else
            planet.distance -= 0.1 * differenceNegative;

		console.log('Value', differencePositive, 'Value2', differenceNegative);
		// console.log('Normalized', rotation);
		// console.log('Distance', planet.distance);
	}

	const elapsedTime = clock.getElapsedTime();
	astronaut.object.rotation.z =
		astronaut.object.position.y >= 0
			? Math.acos(astronaut.object.position.x / planet.distance) +
			  astronaut.thrust.rotation
			: Math.PI * 2 -
			  Math.acos(astronaut.object.position.x / planet.distance) +
			  astronaut.thrust.rotation;
	astronaut.object.position.x = Math.cos(elapsedTime) * planet.distance;
	astronaut.object.position.y = Math.sin(elapsedTime) * planet.distance;

	// RENDER
	render.render(scene, camera);
	window.requestAnimationFrame(loop);
})();
