var nodemailer = require('nodemailer');
var pug = require('pug');
var keystone = require('keystone');

function createTransporter() {
    var err = 'Set right mail config in keystone.js';
    var config = keystone.get('mail');

    if (config) {
        if (config.host && config.port && config.auth) {
            var transporter = nodemailer.createTransport(config);
            return transporter;
        } else {
            throw err;
        }
    } else {
        throw err;
    }
}

function isOptionsValid(options) {
    if (!options.from) { return false; }
    if (!options.to) { return false; }
    if (!options.subject) { return false; }
    if (!options.template) { return false; }
    if (!options.templateVars) { return false; }
    return true;
}

function compileTemplate(templatePath, templateVars) {
    var compiledFunction = pug.compileFile(templatePath + '.pug');
    return compiledFunction(templateVars);
}

module.exports = function (options, callback) {
    if (isOptionsValid(options)) {
        try {
            options.html = compileTemplate(options.template, options.templateVars);
            var transporter = createTransporter();

            transporter.sendMail(options, function (error, info) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, info);
                }
            });
        } catch (e) {
            callback(e);
        }
    } else {
        console.error(options);
        callback('Options is not valid');
    }
};
