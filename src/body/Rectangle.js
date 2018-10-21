import Body from "./Body.js";
import Vec2 from "../common/Vec2.js";

export default Rectangle;

class Rectangle extends Body {
	constructor(center, width, height) {
		super(center);
		this.type = "Rectangle";
		this.width = width;
		this.height = height;
		this.vertices = [];
		this.faceNormal = [];
		this.vertices.push(
			new Vec2(this.center - this.width / 2, this.center - this.height / 2),
			new Vec2(this.center + this.width / 2, this.center - this.height / 2),
			new Vec2(this.center + this.width / 2, this.center + this.height / 2),
			new Vec2(this.center - this.width / 2, this.center + this.height / 2)
		);
		this.faceNormal[0] = this.vertices[1].subtract(this.vertices[2]).normalize();
		this.faceNormal[1] = this.vertices[2].subtract(this.vertices[3]).normalize();
		this.faceNormal[2] = this.vertices[3].subtract(this.vertices[0]).normalize();
		this.faceNormal[3] = this.vertices[0].subtract(this.vertices[1]).normalize();
	}

	draw(context){
		context.save();
		context.translate(this.vertices[0].x, this.vertices[0].y);
		context.rotate(this.angle);
		context.strokeRect(0, 0, this.width, this.height);
		context.restore();
	}
}