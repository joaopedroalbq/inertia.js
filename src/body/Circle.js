const Body = require("./Body.js");
const Vec2 = require("../common/Vec2.js");

class Circle extends Body {

	constructor(coords, radius) {
		super(coords);
		this.type = "Circle";
		this.radius = radius;
		this.referenceLine = new Vec2(this.coords.x, this.coords.y - radius);
	}

	move(v){
		this.referenceLine = this.referenceLine.add(v);
		this.coords = this.coords.add(v);
	}

	rotate(angle){
		this.angle += angle;
		this.referenceLine = this.referenceLine.rotate(this.angle);	
	}

	draw(context) {
		context.beginPath();
		context.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI * 2, true);
		context.moveTo(this.referenceLine.x, this.referenceLine.y);
		context.lineTo(this.coords.x, this.coords.y);
		context.closePath();
		context.stroke();
	}

}

module.exports = Circle;