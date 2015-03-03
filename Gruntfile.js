module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


  });



  // Load the plugins
  //Using load-grunt-tasks instead of having a loadNpmTasks line for each plugin
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);


  //Tasks





};
