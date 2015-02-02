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
          sprite: "images/sprites/",
          deployCss: "css/",
          deployJs: "js/",
          host: " "
        },
        compass:{
            app: {
                options: {
                    cssDir: '<%= path.css %>',
                    sassDir: '<%= path.scss %>',
                    outputStyle: 'expanded',
                    require: 'sass-globbing',
                    sourcemap: true
                }
            }
        },
        watch: {
            scss: {
                options: {
                  livereload: true
                },
                files: [
                  '<%= path.scss =%>**/*.scss'
                ],
                tasks:[
                  'app'
                ]
            },
            livereload: {
                options: {
                  livereload: true
                },
                files: [
                  '<%= path.html =%>**/*.html',
                  '<%= path.js =%>**/*.js',
                  '<%= path.css =%>**/*.css'
                ],
                tasks:[]
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
                src: '<%= path.sprite =%>*.png',
                destImg: '<%= path.sprite =%>sprites.png',
                destCSS: '<%= path.scss =%>partials/_sprites.scss'
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
        },
        'http-server': {

          'dev': {

            // the server root directory
            root: '<%=path.root%>',

            port: 8282,

            host: "127.0.0.1",
            ext: "html",
            runInBackground: true
          }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('scss', 'Compiles scss', ['compass:app']);
    grunt.registerTask('app', 'Compiles and Deploys css', ['sass:app','ftp-deploy:css']);
    grunt.registerTask('html', 'Compiles HAML into HTML, the prettifies', ['haml','prettify']);
    grunt.registerTask('js', 'Deploys js', 'ftp-deploy:js');
    grunt.registerTask('css', 'Deploys css', 'ftp-deploy:css');

    grunt.registerTask('default', ['http-server:dev', 'watch']);
}