'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_LINK}`)
const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;

server.get('/',homeHandle);

const movieDataHandle = require('./module/RenderMovie')
const seriesDataHandle = require('./module/RenderSeries');
//for all movie 

server.get('/movies',movieDataHandle);
server.get('/series', seriesDataHandle)

//for data
server.get('/movies',readMovieHandle);
server.post('/movies',addMovieHandle)
server.put('/movies',updateMovieHandle)
server.delete('/movies',deleteMovieHandle)

function homeHandle(req,res){
    res.send("Hello in Main Page")
}


server.listen(PORT,()=>{console.log('WORKING.......');})
