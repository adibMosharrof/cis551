
const pool = require('../db/db')
module.exports = {
    getWorkOrdersAddPage: (req, res) => {
        console.log(req.url)
        let housing_complex_id = req.params.housing_complex_id;
        let query = `select * from housing_complex where id = ${housing_complex_id}`;
        var data, housing_complex;

        pool.query(query).then(result=>{
          housing_complex = result
        }).then(()=>{
            res.render('work_orders_add.ejs', {
              housing_complex:housing_complex[0],
              menu_id:"menu-4"
            });
          })
        },
     workOrdersAdd:(req,res) =>{
        let housing_complex_id = req.body.housing_complex_id;
        let description = req.body.description;
        let cost = req.body.cost;
        let date = req.body.date;
        let student_unit_id = req.body.student_unit_id;

        let query = "INSERT INTO `work_order` (description, cost, date, student_unit_id) VALUES ('" +
          description + "', '" + cost + "', '" + date + "', '" + student_unit_id + "')";

          console.log(req.body);
        pool.query(query, (err, result) => {
          if (err) {
              return res.status(500).send(err);
          }
          res.redirect('/housing_complex/'+housing_complex_id+"/work_orders_summary");
        });

     }
};
