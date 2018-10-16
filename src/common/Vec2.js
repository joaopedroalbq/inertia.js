
/**
 * Represents a 2D vector
 * @constructor
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function Vec2(x, y) {

	if (typeof x === "undefined") {
		this.x = 0;
		this.y = 0;
	}

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
 */
Vec2.prototype.add = function (vec) {
	return new Vec2(this.x + vec.x, this.y + vec.y);
};

/**
 * Subtract vectors
 * @param {Object} vec 
 */
Vec2.prototype.subtract = function (vec) {
	return new Vec2(this.x - vec.x, this.y - vec.y);
};

/**
 * Scale the vector with multiplication
 * @param {number} n 
 */
Vec2.prototype.scale = function (n) {
	return new Vec2(this.x * n, this.y * n);
};

/**
 * Scale the vector with division
 * @param {number} n 
 */
Vec2.prototype.divide = function (n) {
	return new Vec2(this.x / n, this.y / n);
};

/**
 * The dot product of two vectors
 * @param {Object} vec 
 */
Vec2.prototype.dot = function (vec) {
	return (this.x * vec.x + this.y * vec.y);
};

/**
 * The cross product of two vectors
 * @param {Object} vec 
 */
Vec2.prototype.cross = function (vec) {
	return (this.x * vec.x - this.y * vec.y);
};

/**
 * Euclidean distance between two vectors
 * @param {Object} vec 
 */
Vec2.prototype.distance = function (vec) {
	const x = this.x - vec.x;
	const y = this.y - vec.y;
	return Math.sqrt(x * x + y * y);
};