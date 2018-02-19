var keystone = require('keystone');
var Translate = keystone.list('Translate');

module.exports = function (req, res, next) {
    Translate.model
        .find()
        .exec()
        .then(function(translates) {
            var translateObject = {};

            for (var i = 0; i < translates.length; i++) {
                var t = translates[i];
                translateObject[t.code] = t.value;
            }

            res.locals.tr = function(code) {
                var translated = code;

                for (var key in translateObject) {
                    if (translateObject.hasOwnProperty(key)) {
                        if (key === code) {
                            translated = translateObject[key];
                        }
                    }
                }

                return translated;
            };

            next();
        });
};
