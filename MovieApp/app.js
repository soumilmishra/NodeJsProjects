var express = require('express')
var path = require('path')
var request = require('request')

var app = express()

app.set('views', path.join(__dirname,'views'))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/search', (req,res)=>{
    res.render('search')
})
app.get('/results', (req,res)=>{
    let query = req.query.search
    request('https://api.themoviedb.org/3/search/movie?api_key=ceb6629ee5c124a154f5e03cdf3157d8&query='+query,(error,response,body) =>{
        if (error){
            console.log(error)
        }
        let data = JSON.parse(body)
        res.render('movies',{data:data, searchQuery:query}) 
    } )   
       

})

app.listen('3000',()=>{
    console.log('server started at port 3000')
})