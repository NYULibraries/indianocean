/* jshint laxcomma: true */
const _ = require('underscore');
const hogan = require('hogan.js');

module.exports = function(grunt) {

  async function transformHTML(buildPath, task) {
    try {
      var conf = grunt.file.readJSON(__dirname + '/source/json/conf.json');
      var pages = grunt.file.readJSON(__dirname + '/source/json/pages.json');
      var widgets = grunt.file.readJSON(__dirname + '/source/json/widgets.json');
      var uncompileTemplate = grunt.file.read(__dirname + '/source/views/' + task + '.mustache' );
      var source = pages[task];
      var matchWidgetsRegEx = "data-script='(.*)'";
      var matchWidgets = uncompileTemplate.match(matchWidgetsRegEx);
      var javascriptTagOpen = '<script>';
      var javascriptTagClose = '</script>';
      var template = hogan.compile(uncompileTemplate);
      var environment = process.env.APP_ENV;
      var partials = {};
      var menus = [];
      var toJSON = '';
      var javascriptString = '';
      var handlebarsTemplate = '';
      var closure = '';
 
      if (matchWidgets && matchWidgets[0]) {
        toJSON = matchWidgets[0];                
        toJSON = toJSON.replace(/'/g, '').replace(/data-script=/g, '');
        toJSON = JSON.parse(toJSON);
        _.each( toJSON.js, function ( js ) {
          if (grunt.file.isFile( 'build/js/' + js )) {
            javascriptString += javascriptTagOpen + grunt.file.read( 'build/js/' + js ) + javascriptTagClose;
          }
        });
        _.each(toJSON.hbs, (hbs) => {
          var handlebarsTagOpen = '<script id="'+ hbs.id +'" type="text/x-handlebars-template">';
          var handlebarsTagClose = '</script>';
          if (grunt.file.isFile ('source/views/' + hbs.template)) {
            handlebarsTemplate += handlebarsTagOpen + grunt.file.read( 'source/views/' + hbs.template ) + handlebarsTagClose;
          }
        });
      }
            
      closure += handlebarsTemplate + javascriptString;
            
      source.closure = closure;
            
      // Build the menu object.
      _.each(pages, (_page, index) => {
        if (_.isArray(pages[index].menu)) {
          _.each( pages[index].menu, menu => {
            menus[menu.weight] = {
              label : menu.label,
              status : 'active',
              route : pages[index].route.replace('/index.html', ''),  
              page : index,  
              weight : menu.weight
            };                       
          });
        }
      });
        
      // Map the widgets to the taks and load data Object if type is not local.
      if (source.content) {              
        _.each(source.content, (_content, a) => {
          _.each(source.content[a], (_pane, b) => {                  
            if (_.isArray(source.content[a][b].widgets)) {
              _.each( source.content[a][b].widgets, (widget, c) => {
                var spaghetti = {};
                spaghetti[widget] = widgets[source.content[a][b].widgets[c]][source.content[a][b].language_code];
                if (spaghetti[widget].sourceType) {
                  if (spaghetti[widget].sourceType == 'json') {
                    spaghetti[widget].data = grunt.file.readJSON(__dirname + '/' + spaghetti[widget].source);   
                  }
                }
                source.content[a][b].widgets[c] = spaghetti;
              });
            }
          });
        });
      }

      source.menus = menus;
      source.appRoot = conf[environment].appRoot;
      source.viewer = conf[environment].viewer;
      source.discoUrl = conf[environment].discoUrl;
      source.discovery = conf.discovery;
      source.appName = conf.appName;            
      source.appOGDescription = conf.appOGDescription; 
      source.appOGUrl = conf.appOGUrl;
      source.appOGImage = conf.appOGImage;             
      source.appUrl = conf[environment].appUrl;            
      source.partners = widgets.partners;
            
      if (conf[environment].sass.build === 'external') {
        source.css = "<link href='"+ source.appUrl + "/css/style.css' rel='stylesheet' type='text/css'>";	
      } else {
        source.css = "<style>" + grunt.file.read(__dirname + '/build/css/style.css') + "</style>";
      }

      grunt.file.recurse(__dirname + '/source/views/' , function callback(abspath, _rootdir, _subdir, filename) {
        if (filename.match(".mustache") && task + '.mustache' !== filename) {
          var name = filename.replace('.mustache', '');
          var partial = grunt.file.read(abspath);
          var matchWidgetsRegEx = "data-script='(.*)'";
          var matchWidgets = partial.match(matchWidgetsRegEx);
          var toJSON = '';
          var javascriptString = '';
          var javascriptTagOpen = '<script>';
          var javascriptTagClose = '</script>';             
          if (!_.find(_.keys(pages), name)) {
            if (matchWidgets && matchWidgets[0]) {                
              toJSON = matchWidgets[0];                
              toJSON = toJSON.replace(/'/g, '').replace(/data-script=/g, '');
              toJSON = JSON.parse(toJSON);
              _.each( toJSON.js, function(js) {
                if (grunt.file.isFile(`build/js/${js}`)) {
                  javascriptString += javascriptTagOpen + grunt.file.read(`build/js/${js}`) + javascriptTagClose;
                }
              });                
          }
          partials[name] = partial + javascriptString;                  
        }
      }
    });

      grunt.file.recurse(__dirname + '/source/views/', function callback(abspath, rootdir, subdir, filename) {
        if (filename.match('.hbs') ) {
          grunt.file.write('build/js/' + filename, grunt.file.read(abspath));
        }
      });
      
      grunt.file.write(buildPath, template.render(source, partials));
      
      grunt.log.write(`Transforming ${task} template into HTML`).ok();

    } catch (err) {
      grunt.log.write(`Transforming template into HTML. See  ${err.description}`).error();
      console.log(err);
    }
  }
  
  function sassConfiguration() {
    var conf = grunt.file.readJSON(`${__dirname}/source/json/conf.json`);
    return {
      dist: {
        options : conf[conf.environment].sass.options, 
        files: {
          'build/css/style.css': `${__dirname}/source/sass/style.scss`
        }
      }
    };
  }
  
  function copyConfiguration() {
	  return {
	    main : {
	      expand : true ,
	      cwd : 'source/images',
	      src : '**/*',
	      dest : 'build/images',
	    }
    };
  }
  
  function cleanConfiguration () {
    return [ `${__dirname}/build/images`, `${__dirname}/build/css` ];
  }
 
  function uglifyConfiguration () {	  
	  function targetsCallback() {
		  var targets = {};		     
		  grunt.file.recurse(__dirname + '/source/js/', function callback(abspath, _rootdir, _subdir, filename) {
		    var name;
		    if (filename.match('.js')) {
		      name = filename.replace('.js', '');
		      targets['build/js/' + name + '.min.js'] = abspath;
		    }
		  });
		  return targets;
    }	  
	  return {
	    options: {
	      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
	      compress: {},
	      preserveComments: false
	    },
	    my_target: {
	      files: targetsCallback()
	    }
    };
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: cleanConfiguration(),
    copy: copyConfiguration(), 
    uglify: uglifyConfiguration(), 
    sass: sassConfiguration()
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-clean');
    
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-contrib-compass');
    
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('massageDataSource', 'massageDataSource', () => {
    var subjects_source = grunt.file.readJSON(__dirname + '/source/json/datasources/subject.json');
    var drupal_subjects_source = grunt.file.readJSON(__dirname + '/source/json/datasources/subjectsList.json');
    var terms = subjects_source.facet_counts.facet_fields.im_field_subject;
    var subjects = [];
    var subjects_source_map = [];
    _.each(drupal_subjects_source, (subject, _index) => {
     	subjects.push({ 
        term: subject.value,
        tid: subject.raw_value
      });
    });
    _.each(_.filter(terms, (term) => { return _.isString(term) }), (subject, _index) => {
      var z = _.findWhere(subjects, { tid :  subject });
      if (z) {
        subjects_source_map.push(z);
      }
    });
  });
    
  grunt.registerTask('writeHTML', 'writeHTML', async () => {
    const pages = grunt.file.readJSON(`${__dirname}/source/json/pages.json`);
    try {
      _.each(pages, async (_element, index) => {
        await transformHTML(__dirname + '/build' + pages[index].route, index);
      });
    } catch (err) {
      grunt.log.write(`Unknown error: ${err.description}`).error();
    }
  });

  grunt.registerTask('default', [ 'clean', 'copy', 'massageDataSource', 'uglify', 'sass', 'writeHTML' ]);

};
