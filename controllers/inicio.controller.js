const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Conta = mongoose.model('Conta');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {

    Conta.where({ 'id_usuario': req.user._id, 'status': 'Pagar', data_vencimento: { $lte: new Date() } }).countDocuments(function (err, count) {
        if (!err) {
            res.render('painel', {
                viewTitle: "Página Inicial",
                user: req.user,
                informacoes: count
            });
        } else {
            res.render('painel', {
                viewTitle: "Página Inicial",
                informacoes: err
            });
        }
    });

});

module.exports = router;