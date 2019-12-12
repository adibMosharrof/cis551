const pool = require('../db/db')
module.exports = {
    getPackagesPage: (req, res) => {
        console.log(req.url)
        let housing_complex_id = req.params.housing_complex_id;
        let query = `select * from housing_complex where id = ${housing_complex_id}`;
        var data, housing_complex;

        pool.query(query).then(result=>{
          housing_complex = result
        }).then(()=>{
            res.render('packages.ejs', {
              housing_complex:housing_complex[0],

              menu_id:"menu-3"
            });
          })
      },
      getPackageTableData: (req, res) =>{
        var housing_complex_id = req.params.housing_complex_id;
        var dates = req.params.dates.split(',');
        let query = `select details, s.name, date, unit_id as unit_number
          from package p
          join student_unit su on su.id = p.student_unit_id
          join student s on su.student_id  = s.id
          join unit u on su.unit_id = u.id
          join housing_complex h on h.id = u.housing_complex_id
          where housing_complex_id =  ${housing_complex_id}
          and date between '${dates[0]}' and '${dates[1]}' `

        pool.query(query).then( result =>{
          return res.json({tableData:result})
        });
      },

    getPackagesAddPage: (req, res) => {
        console.log(req.url)
        let housing_complex_id = req.params.housing_complex_id;
        let query = `select * from housing_complex where id = ${housing_complex_id}`;
        var data, housing_complex;

        pool.query(query).then(result=>{
          housing_complex = result
        }).then(()=>{
            res.render('packages_add.ejs', {
              housing_complex:housing_complex[0],
              menu_id:"menu-5"
            });
          })
        },
     packagesAdd:(req,res) =>{
        let housing_complex_id = req.body.housing_complex_id;
        let details = req.body.details;
        let date = req.body.date;
        let student_unit_id = req.body.student_unit_id;

        let query = "INSERT INTO `package` (details, date, student_unit_id) VALUES ('" +
          details + "', '" + date + "', '" + student_unit_id + "')";

          console.log(req.body);
        pool.query(query, (err, result) => {
          if (err) {
              return res.status(500).send(err);
          }
          res.redirect('/housing_complex/'+housing_complex_id+"/packages");
        });

     }
};
