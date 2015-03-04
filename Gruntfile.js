module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    clean: ['download','build','upload'],
    copy: {
      src: {
        cwd: 'src',
        src: ['index.shtml','example-snippets/*/*'],
        dest: 'build',
        expand: true
      },
      css: {
        cwd :'build/css',
        src: '*.css',
        dest: 'upload/css',
        expand:true
      },
      template: {
        cwd:'build',
        src:'index.shtml',
        dest:'upload/',
        expand:true,
        rename: function(dest, src) {
          return dest + src.replace('index','index_template');
        }
      }
    },

    //download york_stles.css from git (leave as local for now)

    replace: {
      snippets_path: {
        src: ['build/index.shtml'],
        overwrite: false,
        dest: 'build/index_example.shtml',
        replacements: [{
          from: 'path-to-snippets',
          to: 'example-snippets'
        }]
      }
    },

    bake: {
      example: {
        files: {
          "upload/index_example.shtml": "build/index_example.shtml"
        }
      }
    },

    cssmin: {
      main: {
        expand: true,
        cwd: 'src/css',
        src: ['homepage_only.css','york_styles.css'],
        dest: 'build/css'
      }
    },

    hashres: {
  	  options: {
  		    encoding: 'utf8',
  		    fileNameFormat: '${name}.${hash}.${ext}',
          renameFiles: true
  	  },
  	  main: {
  		    src: ['build/css/homepage_only.css','build/css/york_styles.css'],
  		    dest: 'build/index.shtml'
  	  }
  	},
    ftpush: {
			test: {
				auth: {
					host: 'ftp.york.ac.uk',
					port: 21,
					authKey: 'key1'
				},
				src: 'upload',
				dest: '/usr/yorkwebtest/wwwtest.york.ac.uk/np/',
				simple: 'true'
			}
		},

    //upload the css to www
    //upload the page template to www


  });



  // Load the plugins
  //Using load-grunt-tasks instead of having a loadNpmTasks line for each plugin
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);


  //Tasks
  grunt.registerTask('default', [
    'clean',
    'copy:src',
    'cssmin',
    'hashres',
    'replace',
    'bake',
    'copy:css',
    'copy:template',
    'ftpush:test'
  ]);


};
