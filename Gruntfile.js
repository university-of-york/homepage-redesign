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
      template_test: {
        cwd:'build',
        src:'index.shtml',
        dest:'upload/',
        expand:true,
        rename: function(dest, src) {
          return dest + src.replace('index','index_template_test');
        }
      },
      template_live: {
        cwd:'build',
        src:'index.shtml',
        dest:'upload/',
        expand:true,
        rename: function(dest, src) {
          return dest + src.replace('index','index_template_live');
        }
      }
    },

    //TODO download york_stles.css from git (leave as local for now)

    replace: {
      snippets_path: {
        src: ['build/index.shtml'],
        overwrite: false,
        dest: 'build/index_example.shtml',
        replacements: [{
          from: 'path-to-snippets',
          to: 'example-snippets'
        }]
      },
      media_paths: {
        src: ['build/*.shtml'],
        overwrite: true,
        replacements: [{
          from: '="/media',
          to: '="//www.york.ac.uk/media'
        }]
      },
      np_paths: {
        src: ['upload/index_template_live.shtml'],
        overwrite: true,
        replacements: [{
          from: '="/np',
          to: '="//www.york.ac.uk/np'
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
			},
      live: {
        auth: {
          host: 'ftp.york.ac.uk',
          port: 21,
          authKey: 'key1'
        },
        src: 'upload',
        dest: '.',
        simple: 'true'
      }
		},
  });



  // Load the plugins
  //Using load-grunt-tasks instead of having a loadNpmTasks line for each plugin
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);


  //Tasks
  grunt.registerTask('build', [
    'clean',
    'copy:src',
    'replace:media_paths',
    'cssmin',
    'hashres',
    'replace:snippets_path',
    'bake',
    'copy:template_test',
    'copy:css'
  ]);
  grunt.registerTask('test', [
    'build',
    'ftpush:test'
  ]);
  grunt.registerTask('live', [
    'build',
    'copy:template_live',
    'replace:np_paths',
    'ftpush:live'
  ]);



};
