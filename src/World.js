class World {

	constructor(options) {
		const props = {
			bodies: [],
			gravity: {
				x: 0,
				y: 7
			},
			bounds: {
				x: Infinity,
				y: Infinity
			}
		};

		Object.assign(props, options);
		Object.assign(this, props);		
	}

	add(body) {
		if(typeof body === "undefined") return "Argument must be type of Body or an Array(Body)";
		Array.isArray(body) ? body.forEach(body => this.bodies.push(body)): this.body.push(body);
	}

	removeBody() {
		//TODO
	}

	update(context) {
		this.bodies.forEach(body => {
			body.update(this);
			body.draw(context);
		});
	}
	
}

module.exports = World;