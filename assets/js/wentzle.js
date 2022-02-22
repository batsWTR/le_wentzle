
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
        this.help = true;
    }

    nouvellePartie(mot,content, nbEssai=6, definition=''){
        this.partieStart = false;
        this.gagne = false;
        this.perdu = false;
        this.help = true;
        this.definition = definition;


        this.motAtrouver = mot.toUpperCase();
        this.content = content;
        this.nbEssais = nbEssai;

        this.nbEssaisRestant = this.nbEssais;
        this.nbCaract = mot.length;
        this.nbCaractRestant = this.nbCaract;

        this.motEnCour = '';
        this.motAcompleter = new Array(this.motAtrouver.length).fill('');


        console.log('---Nouvelle partie---');
        console.log(`Creation de la grille de  ${this.nbCaract}x${this.nbEssais}`);
        console.log(`Il vous reste ${this.nbEssaisRestant} essais`);
        console.log(`Le mot a trouver est: ${this.motAtrouver}`);
        console.log(`DEFINITION : ${this.definition}`);
        this.annonce('Debut de la partie');


        this.#creationPlateau();

        let allChars = this.#getCurrentLineChild();
        allChars[this.nbCaract - this.nbCaractRestant].classList.add('repere');
      
        this.partieStart = true;
    }
    
    
    #testMot(){
        this.partieStart = false;
        console.log('---test du mot-----');

        let motAtrouver = [...this.motAtrouver];

        let allchars = this.#getCurrentLineChild();

        this.motAtrouver.split('').map((el,id,arr)=>{
            if(el == this.motEnCour[id]){
                allchars[id].classList.add('green');
                motAtrouver[id] = "";
                this.motAcompleter[id] = el;
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

        // affiche les lettres deja trouve sur la ligne suivante
        this.#afficheDejaTrouve();

        this.#setHelpButton();

        
  
        this.partieStart = true;
    }

    setNouvLettre(lettre){
        if(this.partieStart == false){return;};
        if(this.nbEssaisRestant == 0){return};

        this.#setHelpButton(false);

        this.motEnCour += lettre.toUpperCase();
        let allChars = this.#getCurrentLineChild();
        allChars[this.nbCaract - this.nbCaractRestant].textContent = lettre.toUpperCase();
        allChars[this.nbCaract - this.nbCaractRestant].classList.remove('repere');
        if(allChars[this.nbCaract - this.nbCaractRestant + 1]){
            allChars[this.nbCaract - this.nbCaractRestant + 1].classList.add('repere');

        }


        this.nbCaractRestant--;

        if(this.nbCaractRestant == 0){

            this.#testMot();

            this.motEnCour = '';
            this.nbEssaisRestant--; 
            this.nbCaractRestant = this.nbCaract;
            
        };

        if(this.gagne){this.#gagnePerdu(true);};
        if(this.perdu){this.#gagnePerdu(false);};

    }

    #creationPlateau(){
        // RAZ elemnts du DOM
        while(this.content.firstChild){
            this.content.removeChild(this.content.lastChild);
        }

        // creation case du plateau
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

        //smartphones a tester
        let keyboard = document.createElement('input');
        keyboard.setAttribute('type','text');
        keyboard.setAttribute('hidden','');
        keyboard.focus();
        keyboard.click();
        document.body.appendChild(keyboard);
    }

    // fn interne retourne les span de ttes les lettres de la ligne en cours
    #getCurrentLineChild(){
        let allLignes = this.content.children;
        return allLignes[this.nbEssais - this.nbEssaisRestant].children;
    }

    //  affichage modal gagne ou perdu
    #gagnePerdu(result){

        this.partieStart =false;
        if(result){
            console.log('GAGNE');
            this.annonce('GAGNE');
        }else{
            console.log('PERDU');
            console.log(`Le mot etait: ${this.motAtrouver}`);
            this.annonce(`PERDU, le mot etait: ${this.motAtrouver}`, 'red');
        }
    }
    annonce(msg, color='green'){
        let div = document.createElement('div');
        div.textContent = msg;
        div.classList.add('annonce');
        div.classList.add(color);
        document.body.append(div);


        setTimeout(()=>{
            document.body.removeChild(div);
        },3000);
    }
    // affiche les lettres deja trouve sur la ligne suivante
    #afficheDejaTrouve(ligne = 1){

        if(this.gagne || this.perdu){
            console.log('');
            return;
        };

        console.log(this.motAcompleter);
        let lignes = this.content.children;
        if(lignes[this.nbEssais - this.nbEssaisRestant + ligne] != undefined){
            let child = lignes[this.nbEssais - this.nbEssaisRestant + ligne].children;
            this.motAcompleter.map((el,id)=>{
                child[id].textContent = el;
            });
        }
        
    }
    aide(){
        this.help = false;

        console.log('A l\'aide');

        // 1 seul fois par partie

        // tableau des cases vides
        let vides = [];
        this.motAcompleter.map((el,id)=>{
            if(el == ''){
                vides.push(id);
            }
        });

        // tire au sort un indice du tableau qui contient indice de lettre
        let randomLetter = Math.floor(Math.random() * vides.length);
        let indiceLetter = vides[randomLetter];
        console.log('lettre: '+ this.motAtrouver[indiceLetter]);

        // ajoute la lettre dans mot a completer
        this.motAcompleter[indiceLetter] = this.motAtrouver[indiceLetter];
        this.#afficheDejaTrouve(0);

        this.#setHelpButton(false);
    }

    #setHelpButton(visible = true){
        let button = document.getElementById('aide');

        if(this.help){
            visible ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
        }else{
            button.setAttribute('disabled', '');
        }
        
    }
}




