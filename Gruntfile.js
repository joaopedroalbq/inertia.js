module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            all: ["src/**/*.js", "!/node_modules/**/*.js"]
        }
    });
    grunt.loadNpmTasks("grunt-eslint");
}