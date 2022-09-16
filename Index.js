const express = require("express");

const app = express();

const mongoose = require("mongoose");
const { findOne } = require("./models/Youtube");

const Youtube = require("./models/Youtube");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/youtube", async (req, res) => {
  const { title, time, user, followers } = req.body;
  const youtube = {
    title,
    time,
    user,
    followers,
  };
  try {
    await Youtube.create(youtube);
    res.status(201).json({ message: "Added youtube" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/youtube", async (req, res) => {
  try {
    const youtube = await Youtube.find();
    res.status(200).json(youtube);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/youtube/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const youtube = await Youtube.findOne({ _id: id });

    if (!youtube) {
      res.status(422).json({ message: "youtube not found" });
      return;
    }

    res.status(200).json(youtube);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.patch("/youtube/:id", async (req, res) => {
  const id = req.params.id;
  const { title, time, user, followers } = req.body;

  const youtube = {
    title,
    time,
    user,
    followers,
  };

  try {
    const updateYoutube = await Youtube.updateOne({ _id: id }, youtube);

    if (updateYoutube.matchedCount === 0) {
      res.status(422).json({ message: "youtube not found" });
      return;
    }

    res.status(200).json(youtube);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/youtube/:id", async (req, res) => {
  const id = req.params.id;
  const youtube = Youtube.findOne({ _id: id });

  if (!youtube) {
    res.status(422).json({ message: "youtube not found" });
    return;
  }

  try {
    await Youtube.deleteOne({ _id: id });
    res.status(204).json({ message: "deleted youtube" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

mongoose
  .connect(
    "mongodb+srv://kauan:kau231299@google.prfxfnf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conectou");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
