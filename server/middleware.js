module.exports = {
    checkUser: async (req, res, next) => {
      if (req.session.user) {
      next();
    } else {
      res.status(403).send("No user logged in");
    }
  },

    checkAdmin: async (req, res, next) => {
      const {user} = req.session
      if (user && user.admin) {
      next();
    } else if (user && !user.admin){
      res.status(401).send("Not an Admin");
    } else {
      res.status(403).send("Not Logged in")
    }
  },
}