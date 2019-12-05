const pool = require('../db/db')
module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM housing_complex ORDER BY id ASC"; // query database to get all the players
        console.log(query)
        pool.query(query).then((result)=>{
          console.log('result',result)
          res.render('home.ejs', {
              housing_complexes: result
          });
        });
    }
};
