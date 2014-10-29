module.exports = function(grunt) {
  
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bower_concat: {
		  dev: {
		    dest: 'app/tmp/lib/libs.js',
		    mainFiles: {
			  'mixpanel': 'mixpanel-dev.js'
			}
		  },
		  prod: {
		    dest: 'app/tmp/lib/libs.js',
		    mainFiles: {
			  'mixpanel': 'mixpanel-prod.js'
			}
		  }
		},

		jshint: {
		  	all: [ 'Gruntfile.js', 'app/js/*.js', 'app/config/*.js' ]
		},

		html2js: {
		  dist: {
		    src: [ 'app/views/*.html', 'app/views/**/*.html'],
		    dest: 'app/tmp/app/templates.js'
		  }
		},

		concat: {
			options: {
				separator: ';'
			},
			dev: {
			    src: [ 'app/tmp/app/*.js', 'app/js/*.js', 'app/config/dev.js' ],
			    dest: 'app/tmp/app.js'
			},
			prod: {
			    src: [ 'app/tmp/*.js', 'app/js/*.js', 'app/config/prod.js' ],
			    dest: 'app/tmp/app.js'
			},
			final: {
			    src: [ 'app/tmp/lib/*.js', 'app/tmp/*.js' ],
			    dest: 'app/dist/app.js'
			}
		},

		uglify: {
		  temp: {
		    files: {
		      'app/tmp/app.js': [ 'app/tmp/app.js' ]
		    },
		    options: {
		      mangle: false
		    }
		  }
		},

		clean: {
		  temp: {
		    src: [ 'app/tmp' ]
		  }
		}

		// watch: {
		//   dev: {
		//     files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
		//     tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp' ],
		//     options: {
		//       atBegin: true
		//     }
		//   },
		//   min: {
		//     files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
		//     tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
		//     options: {
		//       atBegin: true
		//     }
		//   }
		// }
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('dev', [ 'bower_concat:dev', 'jshint', 'html2js:dist', 'concat:dev', 'concat:final', 'clean:temp' ]);
	grunt.registerTask('prod', [ 'bower_concat:prod', 'jshint', 'html2js:dist', 'concat:prod', 'uglify:temp', 'concat:final', 'clean:temp' ]);
	//grunt.loadNpmTasks('grunt-contrib-watch');
};