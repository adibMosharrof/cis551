const pool = require('../db/db')
module.exports = {
    getWorkOrdersMonthlyPage: (req, res) => {
        console.log(req.url)
        let housing_complex_id = req.params.housing_complex_id;
        let query = `select * from housing_complex where id = ${housing_complex_id}`;
        var data, housing_complex;

        pool.query(query).then(result=>{
          housing_complex = result
        }).then(()=>{
            query = `select monthname(w.date) month, sum(cost) monthly_cost
              from work_order w
              join student_unit su on su.id = w.student_unit_id
              join unit u on u.id = su.unit_id
              where housing_complex_id = ${housing_complex_id}
              group by month(w.date)`
            return pool.query(query).then( result =>{
              data = result
            })
        }).then(()=>{
            res.render('work_orders_monthly.ejs', {
              data:data,
              housing_complex:housing_complex[0],

              menu_id:"menu-2"
            });
          })
        }
};
