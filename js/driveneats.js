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