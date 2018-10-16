


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

Vec2.prototype.length = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vec2.prototype.add = function (vec) {
	return new Vec2(this.x + vec.x, this.y + vec.y);
};

Vec2.prototype.subtract = function (vec) {
	return new Vec2(this.x - vec.x, this.y - vec.y);
};

Vec2.prototype.scale = function (n) {
	return new Vec2(this.x * n, this.y * n);
};

Vec2.prototype.divide = function (n) {
	return new Vec2(this.x / n, this.y / n);
};

Vec2.prototype.dot = function (vec) {
	return (this.x * vec.x + this.y * vec.y);
};

Vec2.prototype.cross = function (vec) {
	return (this.x * vec.x - this.y * vec.y);
};

Vec2.prototype.distance = function (vec) {
	const x = this.x - vec.x;
	const y = this.y - vec.y;
	return Math.sqrt(x * x + y * y);
};