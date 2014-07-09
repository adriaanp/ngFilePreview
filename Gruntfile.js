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
        }
    });


    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:server'
        ]);
    });

};
