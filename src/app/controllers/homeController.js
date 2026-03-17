function index(req, res) {
  res.render("home/index", { title: "GreenAge" });
}

module.exports = { index };

