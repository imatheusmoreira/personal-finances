const mongoose = require('mongoose');

var contaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: 'Insira uma descrição.'
    },
    valor: {
        type: String,
        required: 'Insira um valor.'
    },
    data_vencimento: {
        type: Date,
        required: 'Insira uma data de vencimento.'
    },
    status: {
        type: String,
        required: 'Insira um status (Pagar ou Pago).'
    },
    data_de_insercao: {
        type: Date
    },
});

mongoose.model('Conta', contaSchema);