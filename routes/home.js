const pool = require('../db/db')
module.exports = {
    getHomePage: (req, res) => {
        let query = `select h.id, h.name, count(*) available_units, min(rent) as min_rent
        from unit u
        join housing_complex h on u.housing_complex_id = h.id
        where u.id not in (select unit_id from student_unit)
        group by h.name`;
        pool.query(query).then((result)=>{
          res.render('home.ejs', {
              housing_complexes: result
          });
        });
    }
};
