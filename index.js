
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { sequelize } = require('./mysql');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/songs', (req, res) => {
    sequelize.query('SELECT * FROM songs', {
        type: sequelize.QueryTypes.SELECT
    })
        .then((songs) => {
            res.json({ songs });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err });
        });
});

app.get('/songs/:name', (req, res) => {
    const name = req.params.name;
    sequelize.query('SELECT * FROM songs WHERE name = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [name]
    })
        .then((song) => {
            if (song != "") {
                res.json({ song });
            } else {
                res.json({ error: 'name invalid' });
            }
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err });
        });
});

app.post('/songs', (req, res) => {
    const { name, duration, album, band, publication_date } = req.body;
    sequelize.query('INSERT INTO songs VALUES (NULL,?,?,?,?,?)', {
        replacements: [name, duration, album, band, publication_date]
    })
        .then((song) => {
            res.status(201).json({ msg: "song create" });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err });
        });
});

app.put('/songs/:id', (req, res) => {
    const id = req.params.id;
    const { name, duration, album, band, publication_date } = req.body;
    sequelize.query('UPDATE songs SET  name = ?, duration= ?, album= ?,band= ?,publication_date= ? WHERE id = ?',
        {
            replacements: [name, duration, album, band, publication_date, id]
        })
        .then((song) => {
            res.status(201).json({ msg: "song update" });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err });
        });
});

app.delete('/songs/:id', (req, res) => {
    const id = req.params.id;
    sequelize.query('DELETE FROM songs WHERE id = ?',
        {
            replacements: [id]
        })
        .then((song) => {
            res.status(201).json({ msg: "song deleted" });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err });
        });
});

app.listen(5000, () => {
    console.log("Server on port 5000");
})