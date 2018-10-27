module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            all: ["src/**/*.js", "!/node_modules/**/*.js"]
		},
		browserify: {
			build: {
				src: "./src/*/*.js",
				dest: "./dist/inertia.js"
			}
		}
    });
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-browserify");
}