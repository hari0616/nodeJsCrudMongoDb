const mongoose      = require('mongoose');
const express       = require('express');
const bodyParser    = require('body-parser')
const app           = express();
const PORT          = process.env.PORT || 3500;
const movieList     = require('./models/model')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodburl',{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.get('/', (req, res) =>{
	// movieList.findById(req.params.id, (err, user) =>{
	// 	res.send(user)
	// })

    res.send("hello")
})
// Adding a User to movieName
app.post('/', (req, res) => {
	MovieName   = req.body.MovieName,
	Rating      = req.body.Rating,
	Cast        = req.body.Cast,
	Genre       = req.body.Genre

	let newMovieList = new movieList({
		MovieName: MovieName,
		Rating: Rating,
		Cast: Cast,
		Genre: Genre
	})

	newMovieList.save().then((movieList) => {
		res.send(movieList)
	}).catch((err) => {
		console.log(err)
	})
})


// Updating the User

app.post('/update/:id', (req, res) => {
	
    let newMovieList = {};

	if (req.body.MovieName) newMovieList.MovieName   = req.body.MovieName
	if (req.body.Rating) newMovieList.Rating         = req.body.Rating
	if (req.body.Cast) newMovieList.Cast             = req.body.Cast
	if (req.body.Genre) newMovieList.Genre           = req.body.Genre

	newMovieList = { $set: newMovieList }

	movieList.updateOne({_id: req.params.id}, newMovieList).then(() => {
		res.send(newMovieList)
	}).catch((err) => {
		console.log(error)
	})
})


// Deleting the User from movieList

app.delete('/delete/:id', (req, res) => {
	newMovieList.deleteOne({_id: req.params.id}).then(() => {
		res.send('user deleted')
	}).catch((err) => {
		console.log(error)
	})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handler
app.use(function(err, req, res, next) {
	
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = err || {};
	
	
	// render the error page
	res.status(err.status || 500);

	
	var response = {};
	response.ResponseStatus			= 'Error';
	response.ErrorMessages			= {};
	
	response.ErrorMessages.message	= 'Internal Server Error';
	response.ErrorMessages.type		= 'Server Error';
	
	res.send(JSON.stringify(response));
});


app.listen(PORT, console.log(`Server running on  ${PORT}`));

