const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Conta = mongoose.model('Conta');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.post('/novo', ensureAuthenticated, (req, res) => {
    res.json(insereConta(req, res));
});

router.get(['/', '/pagar'], ensureAuthenticated, (req, res) => {
    Conta
        .find({ 'id_usuario': req.user._id, 'status': 'Pagar' })
        .sort({ data_vencimento: 'asc' }) //Criteria can be asc, desc, ascending, descending, 1, or -1
        .exec(function (err, data) {
            if (!err) {
                res.render('contas/contasListagem', {
                    viewTitle: "Pagar",
                    list: data
                });
            }
            else {
                console.log('Error in retrieving contas list :' + err);
            }
        });
});

router.get('/pagar/:id', ensureAuthenticated, (req, res) => {
    pagaConta(req, res);
});

router.get('/excluir/:id', ensureAuthenticated, (req, res) => {
    Conta.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contas/historico');
        }
        else { console.log('Error in conta delete :' + err); }
    });
});

router.get('/vencidas', ensureAuthenticated, (req, res) => {
    Conta
        .find({ 'id_usuario': req.user._id, 'status': 'Pagar', data_vencimento: { $lte: new Date() } })
        .sort({ data_vencimento: 'asc' }) //Criteria can be asc, desc, ascending, descending, 1, or -1
        .exec(function (err, data) {
            if (!err) {
                res.render('contas/contasListagem', {
                    viewTitle: "Vencidas",
                    list: data
                });
            }
            else {
                console.log('Error in retrieving contas list :' + err);
            }
        });
});

router.get('/historico', ensureAuthenticated, (req, res) => {
    Conta.find({ 'id_usuario': req.user._id }, (err, data) => {
        if (!err) {
            res.render('contas/contasHistorico', {
                viewTitle: "Todas as Contas",
                list: data
            });
        }
        else {
            console.log('Error in retrieving contas list :' + err);
        }
    }).sort({ data_vencimento: 'desc' });
});

//Funções
function insereConta(req, res) {
    var conta = new Conta();
    conta.id_usuario = req.user._id;
    conta.descricao = req.body.descricao;
    conta.data_vencimento = req.body.data_vencimento;
    conta.valor = req.body.valor;
    conta.status = req.body.status;

    conta.save((err, data) => {
        if (!err)
            return data;
        else {
            return err;
        }
    });
}

function pagaConta(req, res) {
    Conta.findByIdAndUpdate({ _id: req.params.id }, { status: 'Pago' }, (err, doc) => {
        if (!err) { res.redirect('/'); }
        else { console.log('Error during record update : ' + err); }
    });
}

module.exports = router;
