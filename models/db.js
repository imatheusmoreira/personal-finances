var mongoose = require('mongoose');

//Conecta ao BD
mongoose.connect('mongodb+srv://root:root1234@cluster0-hublf.azure.mongodb.net/financas?retryWrites=true', { useNewUrlParser: true }, (err) =>{
    if(!err) {console.log('MongoDB conectado!')}
    else{ console.log('Erro na conexão com DB: '+err) }
});

require('./conta.model');
