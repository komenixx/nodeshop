var nodemailer = require('nodemailer');
var pug = require('pug');
var keystone = require('keystone');

function createTransporter() {
    const transporterConfig = keystone.get('mail');
    var transporter = nodemailer.createTransport(transporterConfig);
    return transporter;
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
        options.html = compileTemplate(options.template, options.templateVars);
        var transporter = createTransporter();

        transporter.sendMail(options, function (error, info) {
            if (error) {
                callback(error);
            } else {
                console.log('Message sent: %s', info.messageId);
                callback(null);
            }
        });
    } else {
        console.error(options);
        callback('Options is not valid');
    }
};
