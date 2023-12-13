import express from "express";
import bodyParser from "body-parser";
import jokes from "./JOKE.js";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundJoke = jokes.find((joke) => joke.id === id);
  res.json(foundJoke);
});

app.get("/filter", (req, res) => {
  const type = req.query.type;
  const foundJokes = jokes.filter((joke) => joke.jokeType === type);
  res.json(foundJokes);
});

app.post("/jokes", (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.jokeText,
    jokeType: req.body.jokeType,
  };
  jokes.push(newJoke);
  console.log(jokes.slice(-1));
  res.json(newJoke);
});

app.put("/jokes/:id", (req, res) => {
  console.log(req.body.jokeText);
  console.log(req.body.jokeType);
  const id = parseInt(req.params.id);

  const updated = {
    id: id,
    jokeText: req.body.jokeText,
    jokeType: req.body.jokeType,
  };
  const foundJoke = jokes.find((joke) => joke.id === id);

  foundJoke.jokeText = req.body.jokeText;
  foundJoke.jokeType = req.body.jokeType;
  res.json(foundJoke);
});

app.patch("/jokes/:id", (req, res) => {
  console.log(req.body.jokeText);
  console.log(req.body.jokeType);
  const id = parseInt(req.params.id);

  const updated = {
    id: id,
    jokeText: req.body.jokeText,
    jokeType: req.body.jokeType,
  };
  const foundJoke = jokes.find((joke) => joke.id === id);

  foundJoke.jokeText = req.body.jokeText || foundJoke.jokeText;
  foundJoke.jokeType = req.body.jokeType || foundJoke.jokeType;
  res.json(foundJoke);
});

app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundJokeIndex = jokes.findIndex((joke) => joke.id === id);
  if (foundJokeIndex > -1) {
    jokes.splice(foundJokeIndex, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
  }
});

//8. DELETE All jokes
app.delete("/all", (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    jokes = [];
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `You are not authorised to perform this action.` });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
