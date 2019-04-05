require('./models/db');

var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyparser = require('body-parser'),
    Handlebars = require('handlebars'),
    HandlebarsIntl = require('handlebars-intl'),
    app = express();

const inicioController = require('./controllers/inicio.controller');
const contaController = require('./controllers/conta.controller');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

//Configuracao do motor de templates
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'layoutPrincipal',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

Handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

HandlebarsIntl.__addLocaleData({ locale: "pt-BR" });
HandlebarsIntl.registerWith(Handlebars);

app.set('view engine', 'hbs');

const porta = 3000;

app.listen(process.env.PORT || porta, function () {
    console.log("Express server ouvindo na porta %d em modo de %s", this.address().port, app.settings.env);
});

app.use(express.static('./public'));
app.use('/', inicioController);
app.use('/contas', contaController);