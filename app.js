const express = require("express");
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

const jellybeanBag = {
  mystery: { number: 4 },
  lemon: { number: 5 },
  rootBeer: { number: 25 },
  cherry: { number: 3 },
  licorice: { number: 1 },
};

// Logging function to avoid repetition (DRY principle)
const logRequest = (verb) => {
  console.log(`${verb} Request Received`);
};

// GET request to get all beans
app.get("/beans/", (req, res) => {
  logRequest("GET");
  res.send(jellybeanBag);
  console.log("Response Sent");
});

// POST request to add a new type of bean
app.post("/beans/", (req, res) => {
  logRequest("POST");
  let queryData = "";
  req.on("data", (data) => {
    queryData += data;
  });

  req.on("end", () => {
    const body = JSON.parse(queryData);
    const beanName = body.name;
    if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
      return res.status(400).send("Bag with that name already exists!");
    }
    const numberOfBeans = Number(body.number) || 0;
    jellybeanBag[beanName] = { number: numberOfBeans };
    res.send(jellybeanBag[beanName]);
    console.log("Response Sent");
  });
});

// Other routes (add beans, remove beans, etc.) ...

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
