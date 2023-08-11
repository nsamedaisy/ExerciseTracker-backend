const router = require("express").Router()
let User = require("../models/user")

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json("Error:" + err))
});

router.post("/add", function (req, res, next) {
  const username = req.body.username

  const newUser = new User({username})

  newUser.save()
  .then(() => res.json("User Added!"))
  .catch(err => res.status(400).json("Error:" + err))
})

module.exports = router;
