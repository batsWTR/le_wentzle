
// jeu style motus
// settings: mot a trouver
//          nb d'essais
//          content node


class Wentzle{

    constructor(){
        this.motAtrouver = '';
        this.nbEssais = 0;
        this.nbEssaisRestant = 0;
        this.nbCaract = 0;
        this.partieStart = false;
    }


    nouvellePartie(mot,content, nbEssai=6){
        this.motAtrouver = mot;
        this.content = content;
        this.nbEssais = nbEssai;

        this.nbEssaisRestant = this.nbEssais;
        this.nbCaract = mot.length;
        this.nbCaractRestant = this.nbCaract;

        this.motEnCour = '';


        console.log('---Nouvelle partie---');
        console.log(`Creation de la grille de  ${this.nbCaract}x${this.nbEssais}`);
        console.log(`Il vous reste ${this.nbEssaisRestant} essais`);

        this.creationPlateau();

        this.partieStart = true;
    }
    
    testMot(){
        this.partieStart = false;
        console.log('---test du mot-----');

        let motAtrouver = [...this.motAtrouver];

        let allchars = this.getCurrentLineChild();

        this.motAtrouver.split('').map((el,id,arr)=>{
            if(el == this.motEnCour[id]){
                allchars[id].classList.add('green');
                motAtrouver[id] = "";
            }else{
                if(motAtrouver.join('').search(this.motEnCour[id]) != -1){
                    allchars[id].classList.add('orange');
                    //motAtrouver[id] = "";
                }else{
                    allchars[id].classList.add('red');
                }
            }
        });
  
        this.partieStart = true;
    }

    setNouvLettre(lettre){
        if(this.partieStart == false){return;};

        
        if(this.nbEssaisRestant == 0){return};

        this.motEnCour += lettre;
        let allChars = this.getCurrentLineChild();
        allChars[this.nbCaract - this.nbCaractRestant].textContent = lettre.toUpperCase();

        console.log(this.motEnCour);
        this.nbCaractRestant--;

        if(this.nbCaractRestant == 0){

            this.testMot();

            this.motEnCour = '';
            this.nbEssaisRestant--; 
            this.nbCaractRestant = this.nbCaract;
            
        };
    }

    creationPlateau(){
        // RAZ elemnts du DOM
        while(this.content.firstChild){
            this.content.removeChild(this.content.lastChild);
            console.log('delete');
        }

        for(let i = 0; i<this.nbEssais; i++){
            let ligne = document.createElement('div');
            ligne.classList.add('ligne');
            for(let j=0; j<this.nbCaract; j++){
                let char = document.createElement('span');
                char.classList.add('char');
                ligne.appendChild(char);
            }

            this.content.appendChild(ligne);
        }
    }

    getCurrentLineChild(){
        let allLignes = this.content.children;
        return allLignes[this.nbEssais - this.nbEssaisRestant].children;
    }
    
    //entrer un mot, appuie sur entrer
    // tester le mot si ok retourne true
    // sinon si nb essai atteint retourne false
    // sinon regarde si des letrres correspondent
    // afficher les lettres a la bonne place ds le mot suivant
}




