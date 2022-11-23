// eslint-disable-next-line @typescript-eslint/no-var-requires
const {file} = require('grunt');

/* eslint-disable no-labels */
//Gruntfile.js

module.exports = function (grunt) {
    var filename =
        String(grunt.option('name'))[0].toLowerCase() +
        grunt.option('name').substring(1);

    var destination = 'src/api/' + filename + '/' + filename;
    var routeDestination = 'src/api/api_routes/' + filename;
    pkg: grunt.file.readJSON('package.json'),
        grunt.initConfig({
            template: {
                options: {
                    data: function () {
                        return {
                            CLASS_NAME:
                                String(filename)[0].toUpperCase() +
                                filename.substring(1),
                            class_name:
                                String(filename)[0].toLowerCase() +
                                filename.substring(1)
                        };
                    }
                },
                api: {
                    files: {
                        [`${destination}.api.ts`]: ['templates/api.txt']
                    }
                },
                controller: {
                    files: {
                        [`${destination}.controller.ts`]: [
                            'templates/controller.txt'
                        ]
                    }
                },
                model: {
                    files: {
                        [`${destination}.model.ts`]: ['templates/model.txt']
                    }
                },
                service: {
                    files: {
                        [`${destination}.service.ts`]: ['templates/service.txt']
                    }
                },
                routes: {
                    files: {
                        [`${routeDestination}.routes.ts`]: [
                            'templates/routes.txt'
                        ]
                    }
                }
            }
        });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');
};
