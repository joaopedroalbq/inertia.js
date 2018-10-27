const Body = require("./Body.js");
const Vec2 = require("../common/Vec2.js");


class Rectangle extends Body {

	constructor(coords, width, height) {
		super(coords);
		this.type = "Rectangle";
		this.width = width;
		this.height = height;
		this.vertices = [];
		this.faceNormals = [];
		this.vertices.push(
			new Vec2(this.coords - this.width / 2, this.coords - this.height / 2),
			new Vec2(this.coords + this.width / 2, this.coords - this.height / 2),
			new Vec2(this.coords + this.width / 2, this.coords + this.height / 2),
			new Vec2(this.coords - this.width / 2, this.coords + this.height / 2)
		);
		this.normalizeFaces();
	}

	normalizeFaces() {
		this.faceNormals[0] = this.vertices[1].subtract(this.vertices[2]).normalize();
		this.faceNormals[1] = this.vertices[2].subtract(this.vertices[3]).normalize();
		this.faceNormals[2] = this.vertices[3].subtract(this.vertices[0]).normalize();
		this.faceNormals[3] = this.vertices[0].subtract(this.vertices[1]).normalize();
	}

	move(v) {
		this.coords = this.coords.add(v);
		this.vertices.forEach(vertice => vertice = vertice.add(v));
		this.normalizeFaces();
	}

	rotate(angle){
		this.angle += angle;
		this.vertices.forEach(vertice => vertice = vertice.rotate(angle));
		this.normalizeFaces();
	}

	draw(context) {
		context.save();
		context.translate(this.coords.x, this.coords.y);
		context.rotate(this.angle);
		context.strokeRect(0, 0, this.width, this.height);
		context.restore();
	}

}

module.exports = Rectangle;