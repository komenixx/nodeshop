var keystone = require('keystone');
var General = keystone.list('General');

module.exports = function (req, res, next) {
    var generalId = keystone.get('general');

    if (generalId) {
        General.model
            .findOne({ _id: keystone.get('general') })
            .exec()
            .then(function(general) {
                res.locals.general = general;
                next();
            });
    } else {
        General.model
            .find()
            .exec()
            .then(function(generals) {
                if (generals.length) {
                    res.locals.general = generals[0];
                    next();
                } else {
                    next('General not found');
                }
            });
    }
};
