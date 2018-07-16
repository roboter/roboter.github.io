module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'build',
        branch: 'master',
      },
      src: '**'
    }
  });

  grunt.registerTask('default', 'gh-pages');
};