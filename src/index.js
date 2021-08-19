const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');//Para plantillas->Reemplaso de html
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');


const {database} = require('./keys');
const app = express();
require('./lib/passport');
//Settings
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'))//Para marcar donde este views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),//Para unir directorios
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs',//La extension que voy a usar
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//Middlewares
app.use(session({
    secret: 'santisessions',
    resave:false,
    saveUninitialized:false,
    store:  new mysqlStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//Para aceptar los datos por formularios y el extended false para que solo hacepte formatos simples y no fotos, etc
app.use(express.json()); //Para poder recibir json
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//Global variables
app.use((req,res,next) =>{
    app.locals.success  = req.flash('success');
    app.locals.message  = req.flash('message');
    app.locals.user = req.user;
    next()
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname,'public')))


//Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});