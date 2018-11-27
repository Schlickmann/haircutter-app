module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // adding user's info into a local variable
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
