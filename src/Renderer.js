

const Renderer = Renderer || {};

const _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame || window.msRequestAnimationFrame
	|| function (callback) { window.setTimeout(function () { callback(Common.now()); }, 1000 / 60); };

const _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
	|| window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

Renderer.create = function (options) {
	let defaults = {
		canvas: null,
		element: null,
		frame: null,
		options: {
			width: 800,
			height: 600,
			pixelRatio: 1,
			background: "#FFFFFF"
		}
	};

	let renderer = Object.assign(options, defaults);

	if (renderer.canvas) {
		renderer.canvas.width = renderer.options.width || renderer.canvas.width;
		renderer.canvas.height = renderer.options.height || renderer.canvas.height;
	}

	renderer.canvas = renderer.canvas || createCanvas({ element: renderer.element, width: renderer.options.width, height: renderer.options.height });
	renderer.context = renderer.canvas.getContext("2d");

	return renderer;
};

Renderer.render = function (renderer) {
	(function loop(){
		renderer.frame = _requestAnimationFrame(loop);
		//World.update();
	})();
};

Renderer.stop = function (renderer) {
	(function loop(){
		_cancelAnimationFrame(renderer.frame);
	})();
};

function createCanvas(options) {
	let canvas = options.element;
	if (!canvas) {
		canvas = document.createElement("canvas");
	}
	canvas.width = options.width;
	canvas.height = options.height;
	return canvas;
}