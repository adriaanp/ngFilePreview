'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    keepalive: true
                }
            }
        },

        //karma test stuff
        karma: {
            options: {
                basePath: '',
                frameworks: ['jasmine'],
                files: [
                  'bower_components/jquery/dist/jquery.js',
                  'bower_components/angular/angular.js',
                  'bower_components/angular-mocks/angular-mocks.js',
                  'bower_components/angular-bootstrap/ui-bootstrap.js',
                  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                  'preview.js',
                  'tests/**/*.js'
                ],
                exclude: [
                ],
                preprocessors: {
                },
                reporters: ['progress'],
                port: 9876,
                colors: true,
                logLevel: 'DEBUG', //INFO, ERROR, WARN, DEBUG
                autoWatch: true,
                browsers: ['Chrome'],
                singleRun: false
            },
            unit: {
                options: {
                    singleRun: true
                }
            },
            tdd: {
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:server'
        ]);
    });

    grunt.registerTask('test', function (target) {
        grunt.task.run(['karma:unit'])
    });

};
