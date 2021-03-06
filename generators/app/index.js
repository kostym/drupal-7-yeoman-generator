'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var DrupalComponentGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Kostym Component generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'ComponentName',
        message: 'What is the name of the component?',
      },
      {
        type: 'confirm',
        name: 'generateJs',
        message: 'JS file?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateScss',
        message: 'SCSS file?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateTwig',
        message: 'Twig file?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateCtools_ContentTypeGenerator',
        message: 'Ctools content type?',
        default: false
      },
      {
        type: 'confirm',
        name: 'generateViewsStylePlugin',
        message: 'Views style plugin?',
        default: false
      },
      {
        type: 'confirm',
        name: 'generateModule',
        message: 'Drupal module?',
        default: false
      },
    ];

    this.prompt(prompts, function (props) {
      if (props.generateJs) {
        this.composeWith("kostym-component-drupal-7:js", {options: {'ComponentName': props.ComponentName}});
      }
      if (props.generateScss) {
        this.composeWith("kostym-component-drupal-7:scss", {options: {'ComponentName': props.ComponentName}});
      }
      if (props.generateTwig) {
        this.composeWith("kostym-component-drupal-7:twig", {options: {'ComponentName': props.ComponentName}});
      }
      if (props.generateModule) {
        this.composeWith("kostym-component-drupal-7:module", {options: {
          'ComponentName': props.ComponentName,
          'generateCtools_ContentType': props.generateCtools_ContentTypeGenerator,
          'generateViewsStylePlugin': props.generateViewsStylePlugin
        }});
      }
      if (props.generateCtools_ContentTypeGenerator) {
        this.composeWith("kostym-component-drupal-7:ctools-content_type", {options: {'ComponentName': props.ComponentName}});
      }
      if (props.generateViewsStylePlugin) {
        this.composeWith("kostym-component-drupal-7:views_style_plugin", {options: {'ComponentName': props.ComponentName}});
      }
      done();
    }.bind(this));
  },



});

module.exports = DrupalComponentGenerator;
