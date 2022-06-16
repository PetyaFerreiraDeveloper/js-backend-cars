module.exports = {
    get(req, res) {
        res.render('createAccessory', { title: 'Create Accessory'});
    },
    post(req, res) {
        console.log(req.body);
        res.redirect('/')
    }
}