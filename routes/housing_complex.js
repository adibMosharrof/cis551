const pool = require('../db/db')
module.exports = {
    getHousingComplexPage: (req, res) => {
        console.log(req.url)
        let housing_complex_id = req.params.housing_complex_id;
        let query = `select count(*) available_units from unit where housing_complex_id = ${housing_complex_id} and name not in (select unit_id from student_unit)`;
        pool.query(query).then((result)=>{
          console.log(result)
          res.render('housing_complex.ejs', {
              available_units: result[0].available_units
          });
        }, (err)=>{
          throw(err)
        });
    },
};
