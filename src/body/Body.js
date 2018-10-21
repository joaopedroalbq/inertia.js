import World from "../World.js";

export default Body;

class Body {
	constructor(center) {
		this.center = center;
		this.angle = 0;
		World.addBody(this);
	}
}