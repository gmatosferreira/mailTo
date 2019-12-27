
window.setTimeout(function(){
    checkmailto();
    $("body").click(function(){
        checkmailto();
    });
}, 1000);


function checkmailto(){
    ligacoes=$("a[href^='mailto:']");
    for(i=0; i<ligacoes.length; i++){
        ligacoes[i].title="Enviar email para "+ligacoes[i].href.split("mailto:")[1];
        ligacoes[i].href="sapomailto:"+ligacoes[i].href.split("mailto:")[1];
    }
    trigger();
}

function trigger(){
    $("a[href^='sapomailto:']").click(function(e){
        e.preventDefault();
        clicked=e.target;
        while(clicked.href==undefined && clicked.tagName!="BODY"){
            clicked=clicked.parentElement;
        }
        window.open('https://mail.sapo.pt/mail/imp/dynamic.php?page=compose&to='+clicked.href.split("sapomailto:")[1],'','width=820,height=600,status=1,scrollbars=yes,resizable=yes');
    });
}