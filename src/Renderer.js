export default Renderer;
import World from "./World.js";
import Util from "./common/Util.js";

const _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame || window.msRequestAnimationFrame
	|| function (callback) { window.setTimeout(function () { callback(Util.now()); }, 1000 / 60); };

const _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
	|| window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;


/**
 * A function that creates the renderer with it's options.
 * It uses the HTML5 Canvas to draw stuff.
 * @param {Object} options 
 * @returns {Object} renderer
 */
function Renderer(options) {
	let defaults = {
		canvas: null,
		element: null,
		frame: null,
		options: {
			width: 800,
			height: 600,
			// pixelRatio: 1,
			background: "#FFFFFF"
		}
	};

	const renderer = Object.assign(defaults, options);

	if (renderer.canvas) {
		renderer.canvas.width = renderer.options.width || renderer.canvas.width;
		renderer.canvas.height = renderer.options.height || renderer.canvas.height;
	}

	renderer.canvas = renderer.canvas || createCanvas({ element: renderer.element, width: renderer.options.width, height: renderer.options.height });
	renderer.context = renderer.canvas.getContext("2d");

	return renderer;
}

/**
 * 
 * @param {Object} renderer 
 */
Renderer.render = function (renderer) {
	(function loop() {
		renderer.frame = _requestAnimationFrame(loop);
		World.update();
	})();
};

/**
 * 
 * @param {Object} renderer 
 */
Renderer.stop = function (renderer) {
	(function loop() {
		_cancelAnimationFrame(renderer.frame);
	})();
};

/**
 * 
 * @param {Object} options 
 */
function createCanvas(options) {
	let canvas = options.element;
	if (!canvas) {
		canvas = document.createElement("canvas");
	}
	canvas.width = options.width;
	canvas.height = options.height;
	return canvas;
}