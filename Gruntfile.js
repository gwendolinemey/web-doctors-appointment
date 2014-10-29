module.exports = function(grunt) {
  
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bower_concat: {
		  all: {
		    dest: 'app/dist/bower.js',
		    mainFiles: {
			  'angular.js': 'angular.min.js',
			  'angular-route.js': 'angular-route.min.js',
			  'ui-bootstrap.js': 'ui-bootstrap.min.js',
			  'dist/jquery.js': 'dist/jquery.min.js',
			  'mixpanel': 'mixpanel-dev.js'
			}
		  }
		},

		jshint: {
		  	all: [ 'Gruntfile.js', 'app/js/*.js', 'app/config/*.js' ]
		},

		html2js: {
		  dist: {
		    src: [ 'app/views/*.html', 'app/views/**/*.html'],
		    dest: 'app/tmp/templates.js'
		  }
		},

		concat: {
		  options: {
		    separator: ';'
		  },

	  	dev: {
		    src: [ 'app/js/*.js', 'app/config/dev.js', 'app/tmp/*.js' ],
		    dest: 'app/dist/app.js'
		},
		prod: {
		    src: [ 'app/js/*.js', 'app/config/prod.js', 'app/tmp/*.js' ],
		    dest: 'app/dist/app.js'
		}
		  
		},

		uglify: {
		  dist: {
		    files: {
		      'app/dist/app.js': [ 'app/dist/app.js' ]
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

	grunt.registerTask('dev', [ 'bower_concat', 'jshint', 'html2js:dist', 'concat:dev', 'clean:temp' ]);
	grunt.registerTask('prod', [ 'jshint', 'html2js:dist', 'concat:prod', 'uglify:dist', 'clean:temp' ]);
	//grunt.loadNpmTasks('grunt-contrib-watch');
};