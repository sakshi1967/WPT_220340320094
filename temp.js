
const express = require('express');
const app = express();



let dbparams = {
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'wpt',
	port: 3306
};


const mysql = require('mysql2');
const con = mysql.createConnection(dbparams);


app.use(express.static('abc'));







app.get('/add', (req, res) => {

	let input = {

		bookid: req.query.x,
		bookname: req.query.y,
		price: req.query.z,
	};
	console.log("talking to database");

	let output = true;
	con.query('insert into book( bookid , bookname ,price)  values (? , ? , ?)', [input.bookid, input.bookname, input.price], (err, whathappendtoinsert) => {
		if (err) {
			console.log(err);
		}
		else
			if (whathappendtoinsert.affectedRows > 0) {

				output = true;
				console.log("book added to list");

			}

		res.send(output);

	})



});

app.get('/getbook', (req, res) => {


	con.query('select * from book', [], (err, rows) => {

		res.send(rows);
	})


});



app.listen(8081, function () {
	console.log("server listening at port 8081...");
});