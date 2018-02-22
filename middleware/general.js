var keystone = require('keystone');
var General = keystone.list('General');

module.exports = function (req, res, next) {
    var generalId = keystone.get('general');

    if (generalId) {
        General.model
            .findOne({ _id: keystone.get('general') })
            .exec()
            .then(function(general) {
                if (general) {
                    res.locals.general = general;
                    next();
                } else {
                    getFirstGeneral(function(err, general) {
                        if (err) {
                            console.error(err);
                        } else {
                            res.locals.general = general;
                        }
                    });
                }
            });
    } else {
        getFirstGeneral(function(err, general) {
            if (err) {
                console.error(err);
            } else {
                res.locals.general = general;
            }
        });
    }
};

function getFirstGeneral(callback) {
    General.model
        .find()
        .exec()
        .then(function(generals) {
            if (generals.length) {
                callback(null, generals[0]);
            } else {
                callback('Generals not found');
            }
        });
}
