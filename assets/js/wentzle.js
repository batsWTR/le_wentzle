
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
        this.gagne = false;
        this.perdu = false;
    }


    nouvellePartie(mot,content, nbEssai=6){
        this.partieStart = false;
        this.gagne = false;
        this.perdu = false;
        
        this.motAtrouver = mot.toUpperCase();
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

        //--------------- test fin de partie ------------
        if(this.motAtrouver != this.motEnCour && this.nbEssaisRestant == 1){this.perdu = true;};
        if(this.motAtrouver == this.motEnCour){this.gagne = true;};
  
        this.partieStart = true;
    }

    setNouvLettre(lettre){
        if(this.partieStart == false){return;};

        
        if(this.nbEssaisRestant == 0){return};

        this.motEnCour += lettre.toUpperCase();
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

        if(this.gagne){this.gagnePerdu(true);};
        if(this.perdu){this.gagnePerdu(false);};

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

    gagnePerdu(result){

        this.partieStart =false;
        if(result){
            console.log('GAGNE');
        }else{
            console.log('PERDU');
        }
    }
    
    //entrer un mot, appuie sur entrer
    // tester le mot si ok retourne true
    // sinon si nb essai atteint retourne false
    // sinon regarde si des letrres correspondent
    // afficher les lettres a la bonne place ds le mot suivant
}




