const path = require('path');
const express = require('express');
const hbs = require('hbs');
const rp = require('request-promise');

console.log(__dirname)
console.log(path.join(__dirname, './public'));

const app = express();


//Define Path for Express
const publicDirPath  = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath);

//Setup handlebars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//setup static directory to serve 
app.use(express.static(publicDirPath));


app.get('/', (req, res) => {
    res.render('index', {
        title : 'MARSPHOTO APP'
    });
});

app.get('/api/v1/get-mars', (req, res) => {
    const camera = req.query.cam;
    const sol = req.query.sol;
    const url = `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}`;
    const option = {
        url,
        json: true
    };
   rp(option).then((images) => {
       if (images !=null){
           const datas = images.photos;
           console.log(datas);
           res.status(200).send ({message : 'successful', datas:datas});
       }
   }).catch((err) => {
       console.log(err);
   });
});
const port = process.env.PORT || 5255;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});