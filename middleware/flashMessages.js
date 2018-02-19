var _ = require('lodash');

module.exports = function (req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };
    res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length }) ? flashMessages : false;
    next();
};
