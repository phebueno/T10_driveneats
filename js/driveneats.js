function selecionar(item){
    const secao_item = item.substring(0,item.length-1); /**Usa o valor enviado para identificar a qual seção o item pertence */
    const itens_marcados = document.querySelectorAll(`.${secao_item} > .selecionado`)
    if(itens_marcados.length !== 0){ /**Vai remover marcações na mesma seção sempre que houverem marcações */
        itens_marcados[0].classList.remove('selecionado');
    }   
    document.getElementById(item).classList.toggle('selecionado');

    /**Vai verificar se há todos os itens marcados */
    const tres_items = document.querySelectorAll('.selecionado')
    if(tres_items.length == 3){ /**Se houveram três itens marcados, libera o botão */
        habilitarBotao();
    }
}

function habilitarBotao()
{
    const botao = document.querySelector('button');
    botao.classList.add('botao-selecionado');
    botao.innerHTML="Fechar pedido";
    botao.removeAttribute('disabled');
}

function pedir(){
    const comida = document.querySelectorAll('.selecionado p.comida-nome');
    const preco = document.querySelectorAll('.selecionado p.comida-prec');
    var preco_total = 0;
    let valor = "";
    for ( i=0; i<preco.length; i++){
        valor = preco[i].innerHTML.replace(",",".");        
        valor = parseFloat(valor.substring(3, valor.length));
        preco_total = valor + preco_total;
    }
    pedido_url_text=`Olá, gostaria de fazer o pedido: %0a- Prato: ${comida[0].innerHTML}%0a- Bebida: ${comida[1].innerHTML}%0a- Sobremesa: ${comida[2].innerHTML}%0aTotal: R$ ${preco_total.toFixed(2)}`;

    console.log(pedido_url_text);
    console.log(encodeURIComponent(pedido_url_text));
   
    window.open(`https://wa.me/5513996686260?text=${pedido_url_text}`, '_blank').focus();
    
}