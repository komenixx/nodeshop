
module.exports = function (req, res, next) {
    res.locals.currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();
};
