'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        manifest: grunt.file.readJSON('app/manifest.json'),
        tasks: grunt.cli.tasks
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        browserify: {
            dev: {
                // A single entry point for our app
                src: 'app/js/app.js',
                // Compile to a single file to add a script tag for in your HTML
                dest: 'app/js/app.browserify.js',
            },
            dist: {
                src: 'app/js/app.js',
                dest: 'dist/js/app.browserify.js',
            },
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            browserify: {
                files: ['<%= config.app %>/js/{,*/}*.js', '!<%= config.app %>/js/app.browserify.js'],
                tasks: ['browserify:dev']
            },
            app: {
                files: ['<%= config.app %>/css/{,*/}*.css'],
                tasks: ['copy:dist']
            },
        },

        // Grunt server and debug server settings
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                open: true,
            },
            chrome: {
                options: {
                    open: false,
                    base: [
                        '<%= config.app %>'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.app %>/js/app.browserify.js',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Mocha testing framework configuration options
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/spec/**/*.js']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.*',
                        '{,*/}*.html',
                        'css/fonts/{,*/}*.*',
                        'css/{,*/}*.css',
                        '_locales/{,*/}*.json',
                    ]
                }]
            },
            browserify: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: ['js/app.browserify.js']
                }]
            }
        },

        // Merge event page, update build number, exclude the debug script
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    background: {
                        target: 'js/background/background.js'
                    }
                },
                src: '<%= config.app %>',
                dest: '<%= config.dist %>'
            }
        },

        // Compress files in dist to make Chromea Apps package
        compress: {
            dist: {
                options: {
                    archive: 'package/chromeapp-mimesis-<%= config.manifest.version %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        }
    });


    grunt.registerTask('run', function (platform) {
        platform = platform || 'chrome';
        
        grunt.task.run([
            'browserify',
            'connect:' + platform,
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'mochaTest'
    ]);

    grunt.registerTask('package', [
        'clean:dist',
        'chromeManifest:dist',
        'browserify',
        'copy',
        'compress'
    ]);

    grunt.registerTask('default', [
        'test',
        'package'
    ]);
};
