$(document).ready(function(){

    $(".fancybox").fancybox();

    if ($('#banner .container .item').size() > 1) {

        var cont = 0;
        var total = $('#banner .container .item').size();
        // Acresento os botoes de navegacao
        $('#banner .container .item').each(function(){
            cont++;
            $('#bt-banner').append('<a class="bt-banner" onclick="clearTimeout(bannerTempo);rotacionarBanner(this.id,' + total + ')" id="bt-' + cont + '">0' + cont + '</a>');
        });

        rotacionarBanner("bt-1", total);
    }
    else {
        $('#banner-1').fadeIn();
    }

    $('#banner .avancar').on('click', function(event){
        clearInterval(bannerTempo);
        var total = $('#banner .container .item').size();
        var atual = $('#banner .container .ativo').attr('id').replace('bt-', '');
        atual++;
        if(atual <= total){
            rotacionarBanner('bt-'+atual, total);
        }else{
            rotacionarBanner("bt-1", total);
        }
        event.preventDefault(event);
        return false;
    });

    $('#banner .voltar').on('click', function(event){
        clearInterval(bannerTempo);
        var total = $('#banner .container .item').size();
        var atual = $('#banner .container .ativo').attr('id').replace('bt-', '');
        atual--;
        if(atual >= 1){
            rotacionarBanner('bt-'+atual, total);
        }else{
            rotacionarBanner("bt-"+total, total);
        }
        event.preventDefault(event);
        return false;
    });

    $('#banner').on('click', function(event){
        var link = $('#banner .container .atual').attr('data-href');
        if(link != ''){
            window.location = link;
        }
    });

    $('#banner .bt-banner').on('click', function(event){
        event.preventDefault(event);
        return false;
    });

    $('.links-localizacao a').on('click', function(event){
        var id = $(this).attr('href');
        $('#img-localizacao-mapa .ativo').removeClass('ativo');
        $('.links-localizacao a.ativo').removeClass('ativo');

        $(id).addClass('ativo');
        $(this).addClass('ativo');
        event.preventDefault(event);
        return false;
    });

});

function rotacionarBanner(idBanner, total){

    atualElemento = jQuery('#' + idBanner);
    atualNumero = atualElemento.attr('id');
    atualNumero = parseInt(atualNumero.replace('bt-', ''));
    atualElemento = jQuery('#banner-' + atualNumero);

    jQuery('.bt-banner').removeClass('ativo');

    if (atualNumero == total) {
        mostraElemento = jQuery('#banner-' + total);
        jQuery('#bt-' + total).addClass('ativo');
        atualNumero = 1;
    }
    else {
        mostraElemento = atualElemento;
        jQuery('#bt-' + ( atualNumero )).addClass('ativo');
        atualNumero++;
    }

    jQuery('#banner').css('background', mostraElemento.attr('data-bg')).fadeIn('slow');
    jQuery('#banner .container .item').css('display', 'none').fadeOut('slow').removeClass('atual');
    mostraElemento.fadeIn('slow').addClass('atual');

    bannerTempo = setTimeout('rotacionarBanner("bt-' + atualNumero + '", ' + total + ');', 9000)
    return true;
}