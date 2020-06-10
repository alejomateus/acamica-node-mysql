
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root@localhost:3306/songs'); // ("type of db://username:password@host:port/name of database")

/*sequelize.query('SELECT * FROM songs', {type: sequelize.QueryTypes.SELECT})
    .then(res => console.log(res)); */

sequelize.query('SELECT * FROM songs WHERE band = :band', { // ':band' is like a parameter.
    type: sequelize.QueryTypes.SELECT,
    replacements: { // "replacements" helps the user to ask for whatever they want + prevents SQLinjection from hard coded data
        band: 1
    }
})
    .then(res => console.log(res));

sequelize.query('INSERT INTO songs VALUES(NULL, :name, :duration, :album, :band, :publication_date)', {
    type: sequelize.QueryTypes.INSERT,
    replacements: {
        name: 'Kings of Leon',
        duration: 3,
        album: 'hey_album',
        band: 1,
        publication_date: '19-05-11'
    }
}).then(res => console.log(res));

// Alternative to add data without describing the keys
sequelize.query('INSERT INTO songs VALUES (NULL, ?, ?, ?, ?, ?))', {
    type: sequelize.QueryTypes.INSERT,
    replacements: ['band one',3, 'first album',1,'22-02-1989']
}).then(res => console.log(res));