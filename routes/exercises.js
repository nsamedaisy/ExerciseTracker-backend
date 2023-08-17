const router = require("express").Router();
let Exercise = require("../models/exercise");
const User = require("../models/user");

router.get("/", function (req, res) {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add/:id", async (req, res) => {
  const userId = req.body["userId"];
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  const userFound = await User.findById(userId);

  console.log("this is user;", userFound);

  if (!userFound) {
    res.send("User not found");
  }

  const newExercise = new Exercise({
    userId,
    description,
    duration,
    date,
  });

  // userExercise = {};

  newExercise
    .save()
    .then(() =>
      res.json({
        _id: userId,
        username: userFound.username,
        date: date,
        duration,
        description,
      })
    )
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", function (req, res) {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err = res.status(400).json("Error:" + err)));
});

router.delete("/:id", function (req, res) {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/update/:id", function (req, res) {
  Exercise.findById(req.params.id).then((exercise) => {
    exercise.userId = req.body.userId;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise
      .save()
      .then(() => res.json("Exercise updated!"))
      .catch((err) => res.status(400).json("Error:" + err));
  });
});

module.exports = router;
