module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: {
          except: ['$scope']
        }
      },
      build: {
        files: {
          'js/build/app.min.js': ['js/app.js'],
          'js/build/MasterController.min.js': ['js/controllers/MasterController.js'],
          'js/build/AutoSearchBox.min.js': ['js/directives/AutoSearchBox.js'],
          'js/build/Cart.min.js': ['js/directives/Cart.js'],
          'js/build/ItemList.min.js': ['js/directives/ItemList.js'],
          'js/build/AWSEcommerce.min.js': ['js/repositories/AWSEcommerceViaProxy.js'],
          'js/build/app.min.js': ['js/app.js'],
        }
        // src: [
        //   'js/app.js', 
        //   'js/repositories/AWSEcommerce.js',
        //   'js/controllers/MasterController.js',
        //   'js/directives/AutoSearchBox.js',
        //   'js/directives/Cart.js',
        //   'js/directives/ItemList.js'
        // ],
        // dest: 'js/build/storeApp.min.js'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'js/app.js', 
          'js/build/AWSEcommerce.min.js',
          'js/build/MasterController.min.js',
          'js/build/AutoSearchBox.min.js',
          'js/build/Cart.min.js',
          'js/build/ItemList.min.js'
        ],
        dest: 'js/build/storeApp.min.js',
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};