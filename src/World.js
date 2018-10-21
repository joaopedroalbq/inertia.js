export default World;

class World {
	constructor(options) {
		const defaults = {
			bodies: [],
			bounds: {
				x: Infinity,
				y: Infinity
			}
		};

		const world = Object.assign(defaults, options);
	}

	addBody(body) {
		this.bodies.push(body);
	}

	removeBody() {
		//TODO
	}

	update() {
		this.bodies.forEach(body => {
			body.update();
		});
	}
}