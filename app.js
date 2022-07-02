const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');





// Database
const db = require('./config/database');

//authenticate
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))


const app = express();


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main',
runtimeOptions:{
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault:true,
},
})
);
app.set('view engine', 'handlebars');


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

//landing
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// book routes
app.use('/books', require('./routes/books'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));