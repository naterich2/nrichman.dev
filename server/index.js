const express = require("express")
const path = require("path")

let app = express()
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
	const dir = path.resolve(path.join(__dirname, '../public'));
	res.sendFile('index.html', {root: dir}, (err) => {
		res.end();
		if(err) throw(err);
	});
});


app.listen(3000, () => console.log("Running on port 3000"));
