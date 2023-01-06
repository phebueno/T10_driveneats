function selecionar(item){
    //Uma função geral para seleção de qualquer item. A seção é definida pela variável recebida
    const secao_item = item.substring(0,item.length-1); /**Usa o valor enviado para identificar a qual seção o item pertence. Exclui número referente ao id */
    const itens_marcados = document.querySelectorAll(`.${secao_item} > .selecionado`)
    if(itens_marcados.length !== 0){ /**Vai remover marcações na mesma seção sempre que houverem marcações */
        itens_marcados[0].classList.remove('selecionado');
    }   
    document.getElementById(item).classList.toggle('selecionado');

    //Vai verificar se há todos os itens marcados
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
    const nome = prompt("Digite o seu nome:");
    const endereco = prompt("Informe o seu endereço para entrega:");
    const comida = document.querySelectorAll('.selecionado p.comida-nome');/**apenas selecionados e parte de seus conteúdos */
    const preco = document.querySelectorAll('.selecionado p.comida-prec');
    var preco_total = calcularPreco(preco); 
    //cria o texto para zap, com quebras de linhas na url
    pedido_url_text=`Olá, gostaria de fazer o pedido: %0a- Prato: ${comida[0].innerHTML}%0a- Bebida: ${comida[1].innerHTML}%0a- Sobremesa: ${comida[2].innerHTML}%0aTotal: R$ ${preco_total.toFixed(2)}%0a%0aNome: ${nome}%0aEndereço: ${endereco}`;
    window.open(`https://wa.me/5513996686260?text=${pedido_url_text}`, '_blank').focus();
    cancelar(); //no fim, fecha a tela de revisão e volta ao menu
}

function construirRevisao(){
    /**Grande parte deste código está acima na função pedir(), que havia sido feita anteriormente.
     * Mais especialmente na parte de seleção. Há duplicidade de código, que poderia ser remediada
     * com uma maior divisão de funções. Mas como todos os comandos dão origens em arrays, tive
     * a impressão de que seria mais fácil a duplicação do que ter que lidar com return com diferentes
     * valores, cada um com seu array.
     */
    const botao = document.querySelector(".fundo");
    botao.classList.remove('escondido');
    const comida = document.querySelectorAll('.selecionado p.comida-nome');/**apenas selecionados e parte de seus conteúdos */
    const preco = document.querySelectorAll('.selecionado p.comida-prec');
    var preco_total = calcularPreco(preco);    
    const elemento_tags = document.querySelectorAll('.revisao-conteudo div');    

    /**Tentei criar tags HTML sem precisar editar, ficou com mais linhas do que a própria edição levaria, mas pelo menos suporta qualquer qtd de itens!*/
    for ( i=0; i<elemento_tags.length-1; i++){
        elemento_tags[i].innerHTML = ""; //limpa o conteúdo teste/anterior
        console.log(elemento_tags[i].innerHTML);
        const revisao_comidas = document.createElement('p'); //cria tags para comidas e depois precos
        const revisao_precos = document.createElement('p');
        revisao_comidas.textContent = comida[i].innerHTML; //coloca os valores
        revisao_precos.textContent = preco[i].innerHTML.substring(3, preco[i].length); //retira R$
        revisao_comidas.classList.add("revisao-comidas");        
        revisao_precos.classList.add("revisao-precos");
        elemento_tags[i].appendChild(revisao_comidas);
        elemento_tags[i].appendChild(revisao_precos);
    }
    const preco_total_revisao = document.querySelector(".vtotal-preco");
    preco_total_revisao.innerHTML = "R$: "+String(preco_total.toFixed(2)).replace(".",","); //converte para string novamente, para colocar vírgula
}

function cancelar(){
    const botao = document.querySelector(".fundo");
    botao.classList.add('escondido');
    const itens_marcados = document.querySelectorAll(".selecionado")
    for (let i = 0; i < itens_marcados.length; i++) {  
        itens_marcados[i].classList.remove('selecionado');
    }    
}

function calcularPreco(preco){
    var preco_total = 0;
    let valor = "";
    for ( i=0; i<preco.length; i++){
        valor = preco[i].innerHTML.replace(",",".");        /**substitui , por . para não perder valores na conversão para float */
        valor = parseFloat(valor.substring(3, valor.length)); /**corta fora R$: , ou seja, a partir do terceiro digito (quarto caractere)*/
        preco_total = valor + preco_total;
    }
    return preco_total;
}