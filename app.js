const express   = require("express"),
	request   = require("request"),
	// bodyParser= require("body-parser"),
    app       = express(),
    exphbs    = require("express-handlebars"),
    path      = require("path"),
    port     = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

function callAPI(finishAPI, ticker){
		request("https://cloud.iexapis.com/stable/stock/" + ticker +"/quote?token=pk_9cbd2a5bf8ec460e959c6bddd9449d4f", {json:true}, (err,res,body)=>{
		if(err){
			return console.log(err);
		}
		if(res.statusCode === 200){
			finishAPI(body);
		}
	});
}

//set handebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res){
	callAPI(function(finishAPI){
		res.render('home', {
			stock: finishAPI
		});
	}, "goog");		
});

app.post('/', function (req, res){
	callAPI(function(finishAPI){
		res.render('home', {
			stock: finishAPI,
		});
	}, req.body.stock_ticker);
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname,"public")));

//=========================================
app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});