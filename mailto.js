
// Global variables

currentVersion = 2

// Triggers

window.setTimeout(function(){
    checkmailto();
    $("body").click(function(){
        checkmailto();
    });
}, 250);

// Activate addon

function checkmailto(){
    ligacoes=$("a[href^='mailto:']");
    for(i=0; i<ligacoes.length; i++){
        if (!/^(emailShare.*)$/.test(ligacoes[i].id)) {
            ligacoes[i].title="Enviar email para "+ligacoes[i].href.split("mailto:")[1];
        }
    }
    trigger();
}

function trigger(){
    $("a[href^='mailto:']:not(#emailShareDefault)").click(function(e){
        if (!/^(emailShare.*)$/.test(e.target.id)) {
            // Prevent default link openning
            e.preventDefault();
            // Get email address
            clicked=e.target;
            while(clicked.href==undefined && clicked.tagName!="BODY"){
                clicked=clicked.parentElement;
            }
            endereco = clicked.href.split("mailto:")[1].split('?')[0];
            enderecoAppend = "";
            if (clicked.href.split("mailto:")[1].split('?').length>1)
                enderecoAppend = "&" + clicked.href.split("mailto:")[1].split('?')[1];
            // Update view
            $("#emailShareSapo").attr("href", 'https://mail.sapo.pt/mail/imp/dynamic.php?page=compose&to='+endereco+enderecoAppend,'','width=820,height=600,status=1,scrollbars=yes,resizable=yes');
            $("#emailShareGmail").attr("href", 'https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to='+endereco+enderecoAppend.replace("subject", "su"));
            $("#emailShareOutlook").attr("href", 'https://outlook.office.com/?path=/mail/action/compose&to='+endereco+enderecoAppend);
            $("#emailShareDefault").attr("href", clicked.href);
            $("#emailShareEmail").text(endereco);
            // Show view
            open();
        }
    });
}

// View

$("body").append(`
    <div id="emailShareBackground" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color: #000; opacity: .5; z-index: 9999999; overflow-y: none; display: none;"></div>
    <div id="emailShare" style="position:fixed; left: 35%; right: 35%; top: 30%; background-color: #fff; opacity: 1; border-radius: .3rem; color: #808080; z-index: 99999999; padding: 3rem; display:none; ">
        <p style="position: absolute; right: 3rem; top: 3rem;"><span id="emailShareClose" style="cursor: pointer;" title="Fechar">X</span></p>
        <h3 style="margin-bottom:0;">Enviar email</h3>
        <p style="font-size: small;">para <span id="emailShareEmail"></span></p>
        <hr style="margin-top:1rem; margin-bottom:1rem;">
        <p style="font-size: small;">Escolha o serviço que pretende utilizar...</p>
        <br>
        <div style="display:flex;">
            <a id="emailShareSapo" href="#" target="popup"><img style="max-height:6rem;" src="`+browser.runtime.getURL("images/sapomail.png")+`"></a>
            <a id="emailShareGmail" href="#" target="popup"><img style="max-height:6rem;" src="`+browser.runtime.getURL("images/gmail.png")+`"></a>
            <a id="emailShareOutlook" href="#" target="popup"><img style="max-height:6rem;" src="`+browser.runtime.getURL("images/outlook.png")+`"></a>
            <a id="emailShareDefault" href="#" target="popup"><img style="max-height:6rem;" src="`+browser.runtime.getURL("images/outro.png")+`"></a>
        
        </div>
        <br>
        <a style="color:inherit;" target="_blank" href="`+browser.runtime.getURL("pages/about.html")+`"><p style="font-size: small;margin-bottom:0; text-align:right;">Sobre</p></a>
    </div>
`);

$("#emailShareClose").click(function(){
    close();
})

$("#emailShareBackground").click(function(){
    close();
});

function close() {
    $("#emailShare").fadeOut();
    $("#emailShareBackground").fadeOut();
    setTimeout(function() {
        $("#emailShare").css("display", "none");
        $("#emailShareBackground").css("display", "none");9
    }, 250);
}

function open() {
    $("#emailShare").css("display", "block");
    $("#emailShareBackground").css("display", "block");
    $("#emailShare").hide();
    $("#emailShareBackground").hide();
    $("#emailShare").fadeIn();
    $("#emailShareBackground").fadeIn();
}

// Updates management
function updateVersion() {
    browser.storage.local.remove("version");
    let version = {
        n: currentVersion
    }
    browser.storage.local.set({version});
}

function validateVersion(version) {

    if (version.version!=undefined)
        version = version.version;

    // If updated
    if (version.n==undefined || version.n != currentVersion) {
        // Show updates page
        url = browser.runtime.getURL("pages/v"+currentVersion+".html")
        browser.tabs.create({
            url: url,
            active: true
        });
        // Update version
        updateVersion();
    }  
}

function onError(error) {}

browser.storage.local.get("version").then(validateVersion, onError);