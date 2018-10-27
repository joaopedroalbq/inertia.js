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