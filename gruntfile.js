module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

      /* Compila o Sass para seu destino no CSS */
      compass: {
          dist: {
            options: {
              sassDir: './src/assets/sass',
          cssDir: './src/assets/css',
          outputStyle: 'compressed'
            }
          }
      },

      /* Observa alterações no SASS e chama a task compass compile */
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass']
      }
    }

  });

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('install', function(){
      console.log('\n\nTudo pronto, divirta-se!!!')
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
};