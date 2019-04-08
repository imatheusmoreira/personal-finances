$(document).ready(function () {

    carregaPaginaLoad('/inicio');

    $('.ui.dropdown').dropdown();

    $('.ui.sidebar').sidebar({
        context: $('.ui.pushable.segment'),
        transition: 'overlay'
    }).sidebar('attach events', '#mobile_item');


    $('#inicio, #inicioM').on('click', function () {
        carregaPaginaLoad('/inicio');
    });
    $('#vencidas, #vencidasM').on('click', function () {
        carregaPaginaLoad('/contas/vencidas');
    });
    $('#pagar, #pagarM').on('click', function () {
        carregaPaginaLoad('/contas/pagar');
    });
    $('#historico, #historicoM').on('click', function () {
        carregaPaginaLoad('/contas/historico');
    });

    $('#nova, #novaM').on('click', function () {
        $('#modalConta').modal('setting', 'transition', 'vertical flip').modal('show');
    });

});

function salvaConta() {
    $.ajax({
        type: 'POST',
        url: '/contas/novo',
        dataType: 'json',
        timeout: 2000,
        data: $('#formConta').serialize(),
        success: function (data,status,xhr) {
            //do something with the data via front-end framework
            location.reload();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log('Algo deu errado!: ' + textStatus + ' - ' + errorMessage);
            location.reload();
        }

    });
}

function carregaPaginaLoad(caminho){
    jQuery(".pusher").load( caminho + ' #content');
}
