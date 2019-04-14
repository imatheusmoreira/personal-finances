const mongoose = require('mongoose');

var contaSchema = new mongoose.Schema({
    id_usuario: {
        type: String,
        required: true
    },
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
        type: Date,
        default: Date.now
    },
});

mongoose.model('Conta', contaSchema);