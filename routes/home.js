module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `housing_complex` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('home.ejs', {
                title: "Welcome to Socka | View Players"
                ,housing_complexes: result
            });
        });
    },
};
