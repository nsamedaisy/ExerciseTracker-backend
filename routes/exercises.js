const router = require("express").Router();
let Exercise = require("../models/exercise");

router.get("/", function (req, res, next) {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", function (req, res, next) {
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date(req.body.date);

  const newExercise = new Exercise({
    userId,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
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
