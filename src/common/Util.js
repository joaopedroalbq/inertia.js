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