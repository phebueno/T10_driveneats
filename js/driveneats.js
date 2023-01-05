function selecionar(item){
    const secao_item = item.substring(0,item.length-1);
    const itens_marcados = document.querySelectorAll(`.${secao_item} > .selecionado`)
    if(itens_marcados.length !== 0){
        itens_marcados[0].classList.remove('selecionado');
    }   
    document.getElementById(item).classList.toggle('selecionado');

    console.log(itens_marcados.length);
}