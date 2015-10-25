'use strict';

module.exports = function (grunt) {
  // Loads in any grunt tasks in the package.json file
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  var taskConfig = {
    // Clear files and folders
    // https://github.com/gruntjs/grunt-contrib-clean
    clean: {
      demo: ['demo/styles'],
      test: ['test/output']
    },

    // Run tasks whenever watched files change
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
      }
    },

    // Compile Sass to CSS using node-sass
    // https://github.com/sindresorhus/grunt-sass
    sass: {
      demo: {
        files: {
          'demo/styles/app.css': 'sass/app.scss'
        }
      }
    },

    // Run Mocha tests
    // https://github.com/jamescarr/grunt-mocha-cli
    mochacli: {
      all: ['test/test_shim.js']
    },

    // Create documentation with SassDoc
    // https://github.com/SassDoc/grunt-sassdoc
    sassdoc: {
      src: 'sass/'
    }
  };
  
  grunt.initConfig(taskConfig);

  grunt.registerTask('test', ['clean:test', 'mochacli']);
  grunt.registerTask('default', ['clean:demo', 'sass:demo']);

};