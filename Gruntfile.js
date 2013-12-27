module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        separator: ';'
      },
      build: {
        src: [
          'js/app.js', 
          'js/controllers/*.js', 
          'js/directives/*.js',
          'js/repositories/*.js'
        ],
        dest: 'js/build/storeApp.min.js'
      }
    },
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};