const pool = require('../db/db')
module.exports = {
    getWorkOrdersSummaryPage: (req, res) => {
        let housing_complex_id = req.params.housing_complex_id;
        let query = `select * from housing_complex where id = ${housing_complex_id}`;
        var housing_complex, common_work_orders, expensive_work_orders, graph;

        pool.query(query).then(result=>{
          housing_complex = result
        }).then(()=>{
            query = `select description , count(*) count
              from work_order w
              join student_unit su on su.id = w.student_unit_id
              join unit u on u.id = su.unit_id
              where u.housing_complex_id =  ${housing_complex_id}
              group by description
              order by count desc
              limit 3`
            return pool.query(query).then( result =>{
              common_work_orders = result
            })
        }).then(()=>{
          query = `select b.id, count(*) count, sum(cost) total_cost
            from work_order w
            join student_unit su on su.id = w.student_unit_id
            join unit u on u.id = su.unit_id
            join building b on b.id = u.building_id
            where u.housing_complex_id = ${housing_complex_id}
            group by b.id
            order by total_cost desc
            limit 3`
          return pool.query(query).then( result =>{
            expensive_work_orders = result
          })
        }).then(()=>{
          query = `select monthname(w.date) month, sum(cost) monthly_cost
            from work_order w
            join student_unit su on su.id = w.student_unit_id
            join unit u on u.id = su.unit_id
            where housing_complex_id = ${housing_complex_id}
            group by month(w.date)`;
          return pool.query(query).then(result => {
            graph = result
          })
        }).then(()=>{
            res.render('work_orders_summary.ejs', {
              common_work_orders: common_work_orders,
              expensive_work_orders: expensive_work_orders,
              graph:graph,
              housing_complex: housing_complex[0],
              menu_id:"menu-1"
                //available_units: result[0].available_units
            });
          })
        }
};
