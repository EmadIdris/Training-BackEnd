'use strict';

const axios = require('axios');

function seriesDataHandle(req,res){
    let search = req.query.search;
    let seriesUrl =`https://api.themoviedb.org/3/search/tv?api_key=f6676c2a25fbc428a5a3363f204c65a0&language=en-US&page=1&include_adult=false&query=${search}`;
    axios.get(seriesUrl).then(newData =>{
        let newDataa = newData.data.results.map(item =>{
            return new Series (item)
        })
        res.send(newDataa)
    })
}
class Series{
    constructor(item){
        this.seriesName=item.original_name;
        this.popularity = item.popularity;
        this.poster= 'https://image.tmdb.org/t/p/w500'+ item.poster_path;
    }
}
module.exports=seriesDataHandle;