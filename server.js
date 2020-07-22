/*Importera*/
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

//Skapa en instans av express
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// skapa statisk sökväg
//app.use(express.static(path.join(__dirname, "public")));

// Hämta in anslutningssträng för databasen.
const db = require('./config/keys').mongoURI;

// anslut till databasen
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err));

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

//läs in scheman
const Meals = require("./models/meals.js");
const Buylist = require("./models/buylist.js");

/*Middleware
Gör webbtjänsterna tillgängliga från alla domäner
*/
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  next();
});

/*===CRUD för måltider===*/

//Skicka alla måltider
app.get("/api/meals", function (req, res) {
  Meals.find(function (err, Meals) {
    if (err) {
      res.send(err);
    } else {
      res.json(Meals);
    }
  });
});

//Skicka en måltid
app.get("/api/meals/:id", function (req, res) {
  var mealId = req.params.id;

  Meals.findById(mealId, function (err, Meals) {
    if (err) {
      res.send(err);
    } else {
      res.json(Meals);
    }
  });
});

//Lägga till måltid
app.post("/api/meals", function (req, res) {
  var meal = new Meals();

  //Skapar nytt objekt
  meal.weekday = req.body.weekday;
  meal.meal = req.body.meal;

  //Spara kurs och skriva ut ev felmeddelanden
  meal.save(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Måltid inlagd" });
    }
  });
});

//Uppdatera måltid
app.put("/api/meals/:id", function (req, res) {
  var updateId = req.params.id;

  Meals.findByIdAndUpdate(
    { _id: updateId },
    { meal: req.body.meal },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Maträtt uppdaterad" });
      }
    });
});

//ta bort måltid
app.delete("/api/meals/:id", function (req, res) {
  var deleteId = req.params.id;

  Meals.deleteOne(
    {
      _id: deleteId,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Maträtt raderad" });
      }
    }
  );
});

/*===CRUD FÖR INKÖPSLISTA===*/

//Skickar alla items i listan
app.get("/api/buylist", function (req, res) {
  Buylist.find(function (err, Buylist) {
    if (err) {
      res.send(err);
    } else {
      res.json(Buylist);
    }
  });
});

//Skicka ett item
app.get("/api/buylist/:id", function (req, res) {
  var itemId = req.params.id;

  Buylist.findById(itemId, function (err, Buylist) {
    if (err) {
      res.send(err);
    } else {
      res.json(Buylist);
    }
  });
});

//Lägga till item
app.post("/api/buylist", function (req, res) {
  var item = new Buylist();

  //Skapar nytt objekt
  item.item = req.body.item;
  item.checked = req.body.checked;

  //Spara kurs och skriva ut ev felmeddelanden
  item.save(function (err, result) {
    if (err) {
      res.send(err);
    } if (result) {
      res.send(result);
    }
  });
});

//Uppdatera item
app.put("/api/buylist/:id", function (req, res) {
  var updateId = req.params.id;

  Buylist.findByIdAndUpdate(
    { _id: updateId },
    { item: req.body.item, checked: req.body.checked },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Item uppdaterad" });
      }
    }
  );
});

//ta bort item
app.delete("/api/buylist/:id", function (req, res) {
  var deleteId = req.params.id;

  Buylist.deleteOne(
    {
      _id: deleteId,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Item raderad" });
      }
    }
  );
});

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// port för anslutning
const port = process.env.PORT || 5000;

//starta servern
app.listen(port, function () {
  console.log("server startad på port " + port);
});
