const isAuth = (req, res, next) => {
  console.log('is auth running')
  next()
}

export default isAuth;