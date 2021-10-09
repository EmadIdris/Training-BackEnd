'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_LINK}`)\

// server.get('/movies',movieDataHandle);

function movieDataHandle(req, res) {
    //https://api.themoviedb.org/3/discover/movie?api_key=f6676c2a25fbc428a5a3363f204c65a0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
    

    let movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=f6676c2a25fbc428a5a3363f204c65a0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;   
    axios.get(movieUrl).then(MovieData =>{
        
        let movieList = MovieData.data.results.map(item =>{
            return new Movies(item)
        })
        res.send(movieList)
    })
}
class Movies {
    constructor(item) {
        this.movieName = item.title;
        this.popularity = item.popularity;
        this.poster= 'https://image.tmdb.org/t/p/w500'+ item.poster_path;
    }
}

const movieSchema = new mongoose.Schema({
    name:String,
    email:String,
    movieName:String,
    moneyAcheive:String,
    poster:String
})

const movieModel = mongoose.model('moviesWishList', movieSchema);

// add 
function addMovieToWishList (req,res){
    let {movieName,moneyAcheive,poster,name} = req.body;
    movieModel.create({movieName,moneyAcheive,poster,name}).then(()=>{
        movieModel.find({email},function (error , movieData) {
            if(error){console.log('Thir error here',error);}
            else{res.send(movieData)}
        })
    })
}


//delete
function deleteMovieFromWishList (req,res){
    let {movieID,email} = req.query;
    movieModel.deleteOne({_id:movieID}).then(()=>{
        movieModel.find({email},function (error , movieData) {
            if(error){console.log('Thir error here',error);}
            else{res.send(movieData)}
        })
    })
}
//Update

function updateMovie(req,res){
    let {movieName,moneyAcheive,poster,name}=req.body;
    movieModel.findByIdAndUpdate(movieID,{
        movieName,moneyAcheive,poster,name
    }).then(()=>{
        movieModel.find({email},function(error,movieData){
            if(error){console.log(error)}
            else{res.send(movieData)}
        })
    })
}
// add create 
// delete deleteOne
//update findByIdAndUpdate

module.exports = movieDataHandle; 