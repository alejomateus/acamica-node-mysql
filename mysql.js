const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root@localhost:3306/songs'); // ("type of db://username:password@host:port/name of database")

sequelize.query('SELECT * FROM songs', {type: sequelize.QueryTypes.SELECT})
    .then(res => console.log(res));