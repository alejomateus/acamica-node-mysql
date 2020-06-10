const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root@localhost:3306/songs'); // ("type of db://username:password@host:port/name of database")

sequelize.query('SELECT * FROM songs', {type: sequelize.QueryTypes.SELECT})
    .then(res => console.log(res));

// sequelize.query('SELECT * FROM songs WHERE band = :band' , {type: sequelize.QueryTypes.SELECT,
//     replacements: {band: 1}})
//     .then((res)=>{
//         console.log(res);
//     });


// sequelize.query('INSERT INTO songs VALUES (NULL, :name, :duration, :album, :band, :publication_date )', {replacements: {
//     name: "band one",
//     duration: 3,
//     album: "fist almum",
//     band: 1,
//     publication_date: "22/02/89"
// }}).then((res)=>{
//     console.log(res);
// })


