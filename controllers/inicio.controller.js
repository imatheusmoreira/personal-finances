const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Conta = mongoose.model('Conta');

router.get([''], (req, res) => {

    Conta.where({ 'status': 'Pagar', data_vencimento: { $lte: new Date() } }).countDocuments(function (err, count) {
        if (!err) {
            res.render('inicio', {
                viewTitle: "Página Inicial",
                informacoes: count
            });
        } else {
            res.render('inicio', {
                viewTitle: "Página Inicial",
                informacoes: err
            });
        }
    });

});

function contaVencidas() {

}

module.exports = router;