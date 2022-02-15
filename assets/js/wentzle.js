
// jeu style motus
// settings: nb de caracteres
//          nb d'essais
//          mots a trouver
console.log('Le Wentzle');

let win = wentzle('baptiste',6);

win ? console.log('GAGNE') : console.log('PERDU');





function wentzle(mot, nbEssais){
    console.log('Nouvelle partie');
    console.log(`Le mot a trouver est ${mot}`);
    console.log(`Vous avez droit a ${nbEssais} essais`);

    //entrer un mot, appuie sur entrer
    let userInput = 'wantzler';
    // tester le mot si ok retourne true
    // sinon si nb essai atteint retourne false
    // sinon regarde si des letrres correspondent
    // afficher les lettres a la bonne place ds le mot suivant
    let strArray = testMot(userInput, 'wentzler'.split(''));
    console.log(strArray);


    return true;
}


function testMot(userMot, refArray){
    let ret = [refArray.length];

    if(userMot.length != refArray.length){return ret.fill(' ')};

    
    refArray.map((val,index)=>{
        val === userMot[index] ? ret.push(val) : ret.push(' ');
    });

    return ret
}