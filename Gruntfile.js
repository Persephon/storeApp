module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/app.js',
        dest: 'js/app.min.js'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
      src: ['js/directives/AutoSearchBox.js', 'js/directives/Cart.js', 'js/directives/ItemList.js'],
        dest: 'js/directives/directives.js',
      },
    }, 
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat'); 

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};