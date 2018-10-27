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