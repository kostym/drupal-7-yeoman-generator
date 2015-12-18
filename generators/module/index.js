'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var moduleGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      when: function (response) {
        return (this.options && this.options.ComponentName) ? false : true;
      }.bind(this),
      type: 'input',
      name: 'ComponentName',
      message: 'What is the name of the component?',
    }];

    this.prompt(prompts, function (props) {
      if (props.ComponentName){
        this.ComponentName = props.ComponentName;
        this.componentPath = './';
      } else {
        this.ComponentName = this.options.ComponentName;
        this.componentPath = this.options.ComponentName + '/';
      }

      this.HOOK_ctools_plugin_directory = '';
      if (this.options && this.options.generateCtools_ContentType) {
        var body = this.read('HOOK_ctools_plugin_directory', 'utf8');
        body = this.engine(body, this);
        this.HOOK_ctools_plugin_directory = body;
      }

      this.HOOK_views_api = '';
      if (this.options && this.options.generateViewsStylePlugin) {
        var body = this.read('HOOK_views_api', 'utf8');
        body = this.engine(body, this);
        this.HOOK_views_api = body;
      }

      done();
    }.bind(this));
  },

  writing: function () {
    this.template('ComponentName.info', this.componentPath + this.ComponentName + '.info', this);
    this.template('ComponentName.module', this.componentPath + this.ComponentName + '.module', this);
  },

});

module.exports = moduleGenerator;
