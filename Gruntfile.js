module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'primal.min.js': ['primal.js']
				}
			}
		},
		/* '<%= concat.dist.src %>' */
		/*
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: [
					'src/primal.js'
				],
				// the location of the resulting JS file
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		*/
		jshint: {
			files: ['Gruntfile.js', 'primal.js', 'tests/spec/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					console: true,
					document: true
				}
			}
		},
		watch: {
			scripts: {
				files: ['primal.js', 'tests/spec/*.js'],
				tasks: ['jshint'],
				options: {
						interrupt: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);

};
