

document.addEventListener('DOMContentLoaded', ()=>{
    let plateau = document.getElementById('content');
    let startButton = document.getElementById('startButton');
    let helpButton = document.getElementById('aide');
    let selectEssai = document.getElementById('nbChances');
    let select = document.getElementById('nbLettres');

    let tentatives = selectEssai.value;
    
    // ajout des option longueur de mots
    setOptionSelect(motsArgot);
    let jeu = new Wentzle();
    
    // selection du mot au hasard selon la longueur du mot
    let longueur = parseInt(select.value);
    let id = Math.floor(Math.random() * motsArgot[longueur].length);
    jeu.nouvellePartie(motsArgot[longueur][id][0].normalize("NFD").replace(/\p{Diacritic}/gu, ""),plateau, tentatives, motsArgot[longueur][id][1]);
    
    
    //--------------------------- listeners ----------------------
    
    startButton.addEventListener('click', ()=>{
        let tentatives = selectEssai.value;
        let longueur = parseInt(select.value);
        let id = Math.floor(Math.random() * motsArgot[longueur].length);
        jeu.nouvellePartie(motsArgot[longueur][id][0].normalize("NFD").replace(/\p{Diacritic}/gu, ""),plateau, tentatives, motsArgot[longueur][id][1]);
    
    });
    

    document.addEventListener('keypress', (ev)=>{
        
        if(ev.key.length == 1 && ev.key.search('[a-zA-Z]{1}') == 0){
            jeu.setNouvLettre(ev.key);
        }
    });


    helpButton.addEventListener('click', ()=>{
        jeu.aide();
    });
})

//--------------------------------------------------------------

// ajout option au select nb de lettres
function setOptionSelect(motObj){
    let select = document.getElementById('nbLettres');

    for(let cle in motObj){
        console.info(cle + `(${motObj[cle].length} mots)`);
        let opt = document.createElement('option');
        opt.setAttribute('value', cle);
        if(cle == 6){
            opt.setAttribute('selected', '');
        }
        opt.textContent = cle + ` (${motObj[cle].length} mots)`;
        select.appendChild(opt);
    }

}