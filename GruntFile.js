module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
          root: "",
          css: "css/",
          scss: "scss/",
          js: "js/",
          html: "views/",
          haml: "views/haml/",
          deployCss: "css/",
          deployJs: "js/",
          host: "alignmenthealthcare.gscadmin.com"
        },
        sass:{
            app: {
                options: {
                    style: 'expanded'
                },
                files: [
                    {
                        "<%= path.css %>app.css" : "<%= path.scss %>app.scss",
                        "<%= path.css %>app-ie.css" : "<%= path.scss %>app-ie.scss"
                    }
                ]
            },
            foundation: {
              options: {
                style: 'expanded'
              },
              files: [
                {   "<%= path.css %>foundation.css" : '<%= path.scss %>foundation.scss' }
              ]
            }
        },
        watch: {
            app: {
              options: {
                livereload: true
              },
              files: [
                '**/app.scss',
                '**/app.css',
                '**/app-ie.css',
                '**/app-ie.scss',
                '**/js/app.js'
              ],
              tasks:[
                'app'
              ]
            },
            foundation: {
              options: {
                livereload: true
              },
              files: [
                '**/foundation.scss',
                '**/foundation/*.scss'
              ],
              tasks:[
                'foundation'
              ]
            }
        },
        'ftp-deploy': {
            app: {
              auth: {
                host: '<%= path.host %>',
                port: 21,
                authKey: 'key1'
              },
              src: '<%= path.css %>',
              dest: '<%= path.deployCss %>',
              exclusions: ['<%= path.css %>foundation.css.map', '<%= path.css %>foundation.css']
            },
            foundation: {
              auth: {
                host: '<%= path.host %>',
                port: 21,
                authKey: 'key1'
              },
              src: '<%= path.css %>',
              dest: '<%= path.deployCss %>',
              exclusions: ['<%= path.css %>app-ie.css','<%= path.css %>app.css', '<%= path.css %>app.css.map', '<%= path.css %>app-ie.css.map']
            },
            all: {
              auth: {
                host: '<%= path.host %>',
                port: 21,
                authKey: 'key1'
              },
              src: '<%= path.root %>',
              dest: '<%= path.root %>'
            }

        },
        sprite:{
            all: {
                src: '<%= path.root %>sprites/*.png',
                destImg: '<%= path.root %>images/sprites/sprites.png',
                destCSS: '<%= path.root %>images/sprites/sprites.css'
            }
        },
        haml: {
          compile: {
            files: [ {
              expand: true,
              cwd : '<%= path.haml%>',
              src : ['**/*.haml'],
              dest : '<%= path.html%>',
              ext : '.html'
            } ]
          }
        },
        prettify: {
          options: {
            config: '.prettifyrc'
          },
          html: {
            expand: true,
            cwd: '<%=path.html%>',
            ext: '.html',
            src: ['*.html'],
            dest: '<%=path.html%>'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-haml');
    grunt.loadNpmTasks('grunt-prettify');

    grunt.registerTask('foundation', 'Compiles and Deploys foundation', ['sass:foundation','ftp-deploy:foundation']);
    grunt.registerTask('app', 'Compiles and Deploys app', ['sass:app','ftp-deploy:app']);
    grunt.registerTask('html', 'Compiles and Prettifies HAML', ['haml','prettify']);

    grunt.registerTask('default', ['watch:app']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTas
}