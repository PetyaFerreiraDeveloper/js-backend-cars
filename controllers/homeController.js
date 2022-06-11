module.exports = {
  async home(req, res) {
    const cars = await req.storage.getAll();
    console.log(cars);
    res.render('index', { cars });
  }
};
