const router = require("express").Router();
let User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/users/add", function (req, res) {
  const username = req.body.username;

  const newUser = new User({ username });
  console.log(newUser)

  newUser
    .save()
    .then(() => res.send(newUser))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
