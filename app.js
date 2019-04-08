// Declaração dos require
var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyparser = require('body-parser'),
    Handlebars = require('handlebars'),
    HandlebarsIntl = require('handlebars-intl'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    app = express();

// Configuração do Passport
require('./config/passport')(passport);

// Configuração do Banco de Dados
require('./config/db');

// Configuracao do motor de templates HBS
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'layoutPrincipal',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
Handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
HandlebarsIntl.__addLocaleData({ locale: "pt-BR" });
HandlebarsIntl.registerWith(Handlebars);

// Configuracao do bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Rotas
app.use(express.static('./public'));
app.use('/', require('./controllers/inicio.controller'));
app.use('/contas', require('./controllers/conta.controller'));
app.use('/users', require('./controllers/users.js'));

const porta = process.env.PORT || 3000;

app.listen(porta, function () {
    console.log("Express server ouvindo na porta %d em modo de %s", porta, app.settings.env);
});


