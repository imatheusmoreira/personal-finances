$(document).ready(function () {

    //carregaPagina('/inicio');

    $('.ui.dropdown').dropdown();
    $('select.dropdown').dropdown();

    // fix menu when passed
    $('.masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function () {
            $('.fixed.menu').transition('fade out');
        }
    });

    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');



    $('#inicio, #inicioM').on('click', function () {
        carregaPagina('/');
    });
    $('#vencidas, #vencidasM').on('click', function () {
        carregaPagina('/contas/vencidas');
    });
    $('#pagar, #pagarM').on('click', function () {
        carregaPagina('/contas/pagar');
    });
    $('#historico, #historicoM').on('click', function () {
        carregaPagina('/contas/historico');
    });

    $('#conta, #contaM').on('click', function () {
        carregaPagina('/users/me');
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
        success: function (data, status, xhr) {
            //do something with the data via front-end framework
            carregaPagina('/contas/historico');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log('Algo deu errado!: ' + textStatus + ' - ' + errorMessage);
            carregaPagina('/contas/historico');
        }

    });
}

function carregaPagina(caminho) {
    //jQuery(".pusher").load(caminho + ' #content');
    location.href = caminho;
}
