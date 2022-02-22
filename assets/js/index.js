

document.addEventListener('DOMContentLoaded', ()=>{
    let plateau = document.getElementById('content');
    let startButton = document.getElementById('startButton');
    let helpButton = document.getElementById('aide');
    let selectEssai = document.getElementById('nbChances');

    let tentatives = selectEssai.value;
    
    
    let jeu = new Wentzle();
    
    let id = Math.floor(Math.random() * motsArgot[6].length);

    jeu.nouvellePartie(motsArgot[6][id][0].normalize("NFD").replace(/\p{Diacritic}/gu, ""),plateau, tentatives, motsArgot[6][id][1]);
    
    
    //--------------------------- listeners ----------------------
    
    startButton.addEventListener('click', ()=>{
        let tentatives = selectEssai.value;
        let id = Math.floor(Math.random() * motsArgot[6].length);

        jeu.nouvellePartie(motsArgot[6][id][0].normalize("NFD").replace(/\p{Diacritic}/gu, ""),plateau, tentatives, motsArgot[6][id][1]);
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

