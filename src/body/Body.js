const Vec2 = require("../common/Vec2.js");

class Body {

	constructor(coords) {
		this.coords = new Vec2(coords.x, coords.y);
		this.angle = 0;
	}
	
	update(world){
		if(this.coords.y < world.bounds.y)
			this.move(world.gravity);
	}

}

module.exports = Body;