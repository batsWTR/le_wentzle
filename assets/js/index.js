

document.addEventListener('DOMContentLoaded', ()=>{
    let plateau = document.getElementById('content');
    let startButton = document.getElementById('startButton');
    let selectEssai = document.getElementById('nbChances');

    let tentatives = selectEssai.value;
    console.log('tentatives:', tentatives);
    
    
    
    let jeu = new Wentzle();
    
    jeu.nouvellePartie('marche',plateau, tentatives);
    
    
    
    //--------------------------- listeners
    
    startButton.addEventListener('click', ()=>{
        let tentatives = selectEssai.value;
        jeu.nouvellePartie('evader',plateau,tentatives);
    });
    
    document.addEventListener('keypress', (ev)=>{
        
        if(ev.key.length == 1 && ev.key.search('[a-zA-Z]{1}') == 0){
            jeu.setNouvLettre(ev.key);
        }
    });
})

