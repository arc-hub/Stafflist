require ('./models/db')
const express = require ('express');
var path = require ('path');
const handlebars = require ('handlebars');
const { engine }  = require ('express-handlebars')
const {allowInsecurePrototypeAccess} = require ('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const staffController = require('./controllers/staffController')

let app = express();
const port = 5000;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (req, res) =>{
    res.send(`
        <h2>Welcome to Staff Data</h2>
        <h3>Click here to view <b> <a href = "/layouts/list">Database</a></b></h3>` );
});

app.set('views', path.join(__dirname, '/views/'));

app.engine(
    'hbs', 
    engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    deafaultLayout: 'MainLayouts',
    LayoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');


app.listen(port, () =>{
console.log(`Server running on port ${port}`);
});

app.use('/layouts', staffController)
