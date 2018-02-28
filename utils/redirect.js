
module.exports = {
    redirect: function(app, from, to) {
        app.get(from, function(req, res) { res.redirect(to); });
    },
    redirect301: function(app, from, to) {
        app.get(from, function(req, res) { res.redirect(301, to); });
    }
};