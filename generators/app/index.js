'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the phenomenal ' + chalk.red('generator-jsberry') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What\'s your project name? (whitepaces will be removed)',
            default: '',
            store: true
        }, {
            type: 'input',
            name: 'description',
            message: 'What\'s the project description?',
            default: '',
            store: true
        }, {
            type: 'input',
            name: 'version',
            message: 'What\'s the project version?',
            default: '0.1.0',
            store: true
        }, {
            type: 'input',
            name: 'authorName',
            message: 'What\'s the author name?',
            default: '',
            store: true
        }, {
            type: 'input',
            name: 'authorEmail',
            message: 'What\'s the author email?',
            default: '',
            store: true
        }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            for (var prop in props) {
                props[prop] = props[prop].trim();
            }
            props.name = props.name.replace(/\s+/g, '');
            props.author = '';
            if (props.authorName) {
                props.author += props.authorName;
            }
            if (props.authorName && props.authorEmail) {
                props.author += ' ';
            }
            if (props.authorEmail) {
                props.author += '<' + props.authorEmail + '>';
            }
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('**/.*'),
            this.destinationPath('.'),
            {
                globOptions: { dot: true }
            }
        );
        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath('.'),
            this.defaults().properties
        );
    },

    installingYarn: function() {
        this.npmInstall(['yarn'], { 'save-dev': true });
    },

    install: function () {
        // copy templates
        this.config.save();
        this.config.defaults(this.defaults());
        // install dependencies
        this.installDependencies({
            npm: false,
            bower: false,
            yarn: true
        });
    },

    defaults: function() {
        return {
            properties: this.props,
            version: "0.1.0"
        }
    }
});
