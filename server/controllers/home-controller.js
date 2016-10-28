module.exports = {
  index: (req, res) => {
    res.render('home/index')
  },
  about: (req, res) => {
    res.user
    res.render('home/about')
  }
}
