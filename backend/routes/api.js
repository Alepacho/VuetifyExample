var express = require('express');
var router = express.Router();

const database = require('better-sqlite3');
const db = new database('./db/data.db', { verbose: console.log });

const getByID = db.prepare("SELECT * FROM Meal WHERE id = ?");
const getAll = db.prepare("SELECT * FROM Meal");
const insert = db.prepare("INSERT INTO Meal \
(name, description, price, rating, country, course) \
VALUES (@name, @description, @price, @rating, @country, @course) ");
const deleteByID = db.prepare("DELETE FROM Meal WHERE id = ?");

router.get('/', function(req, res, next) {
    //res.send("api");
    var data = getAll.all();

    if (data == undefined) {
        res.status(404).send();
    } else res.send(data);

    next();
});

router.post('/new', function (req, res, next) {
    console.log(req.body);
    //var data = JSON.parse(req.body);
    //console.log(req.body.name);

    insert.run(req.body);

    var data = getAll.all();

    if (data == undefined) {
        res.status(404).send();
    } else res.send(data);
    next();
});

router.get("/:id", function(req, res, next) {
    const id = req.params.id;
    var data = getByID.get(id);

    if (data == undefined) {
        res.status(404).send();
    } else res.send(data);
    next();
});

router.delete("/:id", function(req, res, next) {
    const id = req.params.id;
    deleteByID.run(id);
    var data = getAll.all();

    if (data == undefined) {
        res.status(404).send();
    } else res.send(data);

    next();
});

module.exports = router;
