module.exports = function (grunt) {

    //All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //concat config is here
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: ['libs/*.js', 'js/*.js'],
                dest: 'build/prod-script.js'
            }
        },

        //uglify config is here
        uglify: {
            js: {
                src: 'build/prod-script.js',
                dest: 'build/prod-script-min.js'
            }
        }
    });

    //concat plugin
    grunt.loadNpmTasks('grunt-contrib-concat');
    //uglify plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify']);

};
