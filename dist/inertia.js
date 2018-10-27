(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Inertia = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Util = require("./common/Util.js");

const _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame || window.msRequestAnimationFrame
	|| function (callback) { window.setTimeout(function () { callback(Util.now()); }, 1000 / 60); };

const _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
	|| window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;


/**
 * @param {Object} options 
 * @returns {Object} renderer
 */
class Renderer {

	constructor(world, options) {
		const props = {
			canvas: null,
			element: null,
			frame: null,
			canvasWidth: 800,
			canvasHeight: 600,
			// pixelRatio: 1,
			background: "#FFFFFF"

		};
		Object.assign(props, options);
		Object.assign(this, props);
		this.world = world;
		this.world.bounds.x = this.canvasWidth;
		this.world.bounds.y = this.canvasHeight;
		if (this.canvas) {
			this.canvas.width = this.canvasWidth || this.canvas.width;
			this.canvas.height = this.canvasHeight || this.canvas.height;
		}
		this.canvas = this.canvas || createCanvas({ element: this.element, width: this.canvasWidth, height: this.canvasHeight });
		this.context = this.canvas.getContext("2d");
	}

	render() {
		const loop = () => {
			this.frame = _requestAnimationFrame(loop);
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.world.update(this.context);
		};
		loop();
	}

	stop() {
		_cancelAnimationFrame(this.frame);
	}

}





/**
 * 
 * @param {Object} options 
 */
function createCanvas(options) {

	let canvas = options.element;
	if (!canvas) {
		canvas = document.createElement("canvas");
	}
	document.body.appendChild(canvas);
	canvas.width = options.width;
	canvas.height = options.height;
	return canvas;

}

module.exports = Renderer;
},{"./common/Util.js":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"../common/Vec2.js":7}],4:[function(require,module,exports){
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
},{"../common/Vec2.js":7,"./Body.js":3}],5:[function(require,module,exports){
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
},{"../common/Vec2.js":7,"./Body.js":3}],6:[function(require,module,exports){
const Util = {};

Util.startTime = new Date();
Util.seed = 0;

Util.now = function () {
	if (window.performance) {
		if (window.performance.now) {
			return window.performance.now();
		} else if (window.performance.webkitNow) {
			return window.performance.webkitNow();
		}
	}

	return (new Date()) - Util.startTime;
};

Util.random = function (min, max) {
	min = (typeof min !== "undefined") ? min : 0;
	max = (typeof max !== "undefined") ? max : 1;
	return min + Util.nextSeed() * (max - min);
};

Util.nextSeed = function () {
	Util.seed = (Util.seed * 8639 + 69492) % 90917;
	return Util.seed / 90917;
};

Util.shuffle = function (array) {
	let aux, randIndex;
	for (let i = 0; i < array.length; i++) {
		randIndex = Math.floor(Math.random * array.length);
		aux = array[i];
		array[i] = array[randIndex]
		array[randIndex] = aux;
	}
	return array;
};

Util.indexOf = function (array, obj) {
	//TODO
};

module.exports = Util;
},{}],7:[function(require,module,exports){
/**
 * Represents a 2D vector
 * @constructor
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function Vec2(x = 0, y = 0) {

	if (typeof x === "object") {
		this.x = x.x;
		this.y = x.y;
	}

	else {
		this.x = x;
		this.y = y;
	}

}

/**
 * Calculates the vector's magnitude
 * @returns {number}
 */
Vec2.prototype.length = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Add vectors
 * @param {Object} vec 
 * @returns {Object} Vec2
 */
Vec2.prototype.add = function (vec) {
	return new Vec2(this.x + vec.x, this.y + vec.y);
};

/**
 * Subtract vectors
 * @param {Object} vec 
 * @returns {Object} Vec2
 */
Vec2.prototype.subtract = function (vec) {
	return new Vec2(this.x - vec.x, this.y - vec.y);
};

/**
 * Scale the vector with multiplication
 * @param {number} n 
 * @returns {Object} Vec2
 */
Vec2.prototype.scale = function (n) {
	return new Vec2(this.x * n, this.y * n);
};

/**
 * Scale the vector with division
 * @param {number} n 
 * @returns {Object} Vec2
 */
Vec2.prototype.divide = function (n) {
	return new Vec2(this.x / n, this.y / n);
};

/**
 * The dot product of two vectors (Angle between two vectors)
 * @param {Object} vec 
 * @returns {number}
 */
Vec2.prototype.dot = function (vec) {
	return (this.x * vec.x + this.y * vec.y);
};

/**
 * The cross product of two vectors (Find)
 * @param {Object} vec 
 * @returns {number}
 */
Vec2.prototype.cross = function (vec) {
	return (this.x * vec.x - this.y * vec.y);
};

/**
 * Euclidean distance between two vectors
 * @param {Object} vec 
 * @returns {number}
 */
Vec2.prototype.distance = function (vec) {
	const x = this.x - vec.x;
	const y = this.y - vec.y;
	return Math.sqrt(x * x + y * y);
};

/**
 * Generates a random 2D coordinate over a given range
 * @param {number} range 
 * @returns {Object} Vec2
 */
Vec2.prototype.random = function (range) {
	const x = Math.floor(Math.random() * range);
	const y = Math.floor(Math.random() * range);
	return new Vec2(x, y);
};

/**
 * Normalizes the vector to a unit of 1
 * @returns {Object} Vec2
 */
Vec2.prototype.normalize = function () {
	let len = this.length();
	if (len > 0) {
		len = 1 / len;
	}
	return new Vec2(this.x * len, this.y * len);
};

/**
 * Distance between two vectors
 * @param {Object} vec 
 * @returns {number}
 */
Vec2.prototype.distance = function (vec) {
	const x = this.x - vec.x;
	const y = this.y - vec.y;
	return Math.sqrt(x * x + y * y);
};

/**
 * Rotates the vector by an angle (counterclockwise)
 * @param {number} center 
 * @param {number} angle 
 * @returns {Object} Vec2
 */
Vec2.prototype.rotate = function (center, angle) {
	const x = this.x - center.x;
	const y = this.y - center.y;
	const rx = (x * Math.cos(angle) - y * Math.sin(angle)) + center.x;
	const ry = (x * Math.sin(angle) + y * Math.cos(angle)) + center.y;
	return new Vec2(rx, ry);
};

module.exports = Vec2;
},{}],8:[function(require,module,exports){
exports.World = require("./World.js");
exports.Renderer = require("./Renderer.js");
exports.Vec2 = require("./common/Vec2.js");
exports.Util = require("./common/Util.js");
exports.Body = require("./body/Body.js");
exports.Rectangle = require("./body/Rectangle.js");
exports.Circle = require("./body/Circle.js");
},{"./Renderer.js":1,"./World.js":2,"./body/Body.js":3,"./body/Circle.js":4,"./body/Rectangle.js":5,"./common/Util.js":6,"./common/Vec2.js":7}]},{},[8])(8)
});
