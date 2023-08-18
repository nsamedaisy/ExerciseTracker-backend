const router = require("express").Router();
let Exercise = require("../models/exercise");
const User = require("../models/user");

router.get("/", function (req, res) {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err));
});

//Post using Id to get username with exercise
router.post("/add", async (req, res) => {
  const userId = req.body["userId"];
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  try {
    const userFound = await User.findById(userId);

    if (!userFound) {
      return res.status(404).send("User not found");
    }

    await Exercise.create({
      userId: userId,
      username: userFound.username,
      description,
      duration,
      date: date,
    });

    return res.json({
      _id: userId,
      username: userFound.username,
      date: date,
      duration,
      description,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log("this is id: ", id);
  try {
    const exercise = await Exercise.findOne({ userId: id });
    res.json({
      userId: exercise.userId,
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    });
  } catch (err) {
    res.json("Error trying to get exercise: ", err);
  }
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
