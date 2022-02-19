
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
        this.motAcompleter = new Array(this.motAtrouver.length);


        console.log('---Nouvelle partie---');
        console.log(`Creation de la grille de  ${this.nbCaract}x${this.nbEssais}`);
        console.log(`Il vous reste ${this.nbEssaisRestant} essais`);

        this.annonce('Debut de la partie');


        this.#creationPlateau();
      
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

        // affiche les lettres deja trouve sur la ligne suivante
        this.#afficheDejaTrouve();

        //--------------- test fin de partie ------------
        if(this.motAtrouver != this.motEnCour && this.nbEssaisRestant == 1){this.perdu = true;};
        if(this.motAtrouver == this.motEnCour){this.gagne = true;};
  
        this.partieStart = true;
    }

    setNouvLettre(lettre){
        if(this.partieStart == false){return;};

        
        if(this.nbEssaisRestant == 0){return};

        this.motEnCour += lettre.toUpperCase();
        let allChars = this.#getCurrentLineChild();
        allChars[this.nbCaract - this.nbCaractRestant].textContent = lettre.toUpperCase();


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
            this.annonce(`PERDU, le mot etait: ${this.motAtrouver}`);
        }
    }
    annonce(msg){
        let div = document.createElement('div');
        div.textContent = msg;
        div.style.position = 'absolute';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translateX(-50%) translateY(-50%)';
        div.style.width = '60%';
        div.style.height = '80px';
        div.style.borderRadius = '15px';
        div.style.boxShadow = '4px 6px 12px black';
        div.style.textAlign = 'center';
        div.style.zIndex = 1;
        div.style.backgroundColor = 'green';
        document.body.append(div);


        setTimeout(()=>{
            document.body.removeChild(div);
        },3000);
    }
    #afficheDejaTrouve(){
        console.log(this.motAcompleter);
        let lignes = this.content.children;
        if(lignes[this.nbEssais - this.nbEssaisRestant + 1] != undefined){
            let child = lignes[this.nbEssais - this.nbEssaisRestant + 1].children;
            this.motAcompleter.map((el,id)=>{
                child[id].textContent = el;
            });
        }
        
    }
}




