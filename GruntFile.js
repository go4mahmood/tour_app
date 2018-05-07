/*global module:false*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        less: {
            app: {
                files: {
                    'src/css/app.css': [
                        'src/css/less/app.less'
                    ]
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            less: {
                files: ['src/css/less/*.less'],
                tasks: ['less']
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    base: './',
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task.
    grunt.registerTask('default', ['less']);

    grunt.registerTask('init', ['default', 'connect:server', 'watch']);
};