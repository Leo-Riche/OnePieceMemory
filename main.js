const cardCover = "./images/cardCover.png"; //création d'une contante contenant l'image du dos de nos cartes

const card = [              //création d'une constante contenant une liste d'images de nos cartes 
    "./images/luffy.png",   //source image
    "./images/zoro.png",    //source image 
    "./images/nami.png",    //source image 
    "./images/usopp.png",   //source image 
    "./images/sanji.png",   //source image 
    "./images/chopper.png", //source image 
    "./images/robin.png",   //source image 
    "./images/franky.png",  //source image 
    "./images/brook.png",   //source image 
    "./images/jinbe.png"    //source image 
];

const container = document.querySelector(".container"); //création d'une constante permettant de sélectionner la class container

let cardElements = [];  //création d'une variable modifiable, il s'agit d'une liste vide

for (                           //boucle for
    let index = 0;              //indice défini à 0
    index < card.length * 2;    //condition, tant que l'indice est inférieur au double de la longueur de notre liste card
    index++                     //ajoute 1 à l'indice à chaque fois qu'on reprend la boucle
) {
    const image = document.createElement("img");    //création d'une constante image
    image.src = cardCover;                          //ajoute la source de l'image de la constante cardCover dans la cosntante image
    container.appendChild(image);                   //ajoute  l'élément présent dans la constante image dans la constante container 
    cardElements.push(image);                       
}

let pairs = []; //création d'une variable modifiable, il s'agit d'une liste vide

for (                   //boucle for
    let index = 0;      //création d'une variable modifiable, il s'agit de l'indice défini à 0
    index < 10;         //condition, tant que l'indice est inférieure à 0
    index++             //ajoute +1 à la variable indice
) {
    pairs.push(card[index]);    //ajoute à la liste pairs l'élément de la liste card à l'indice index
    pairs.push(card[index]);    //ajoute à la liste pairs l'élément de la liste card à l'indice index
}

const shuffle = (orderedList) => {                                  //création d'une fonction shuffle permettant de mélanger les paires (la liste pairs)
    let unorderedList = [];                                         //création d'une variable modifiable, il s'agit d'une liste vide

    while (orderedList.length > 0) {                                //boucle while, tant que la longueur de la liste orderedList est supérieure à 0
        let index = Math.floor(Math.random()*orderedList.length);   //création d'une variable modifiable, il s'agit de l'indice prenant un nombre entier aléatoire compris dans la longueur de la liste orderedList
        unorderedList.push(orderedList.splice(index,1)[0]);         //transfère l'élément d'indice index de la liste orderedList dans la liste unorderedList
    }
    return unorderedList;
}

pairs = shuffle(pairs);     //applique la fonction shuffle à la liste pairs

let cardReturn = null;      //création d'une variable modifiable vide

let clickable = true;       //création d'une variable modifiable

const title = document.querySelector("h1"); //création d'une constante sélectionnant les balises h1

const initialTitleText = title.innerHTML;   //création d'une constante correspondant au html de la constante title

for (                                                                   //boucle for
    let index = 0;                                                      //création d'une variable modifiable, il s'agit de l'indice défini à 0
    index < cardElements.length;                                        //condition, tant que l'index est inférieur à la longueur de la liste cardElements
    index++                                                             //ajoute +1 à la variable indice
) {
    const cardElement = cardElements[index];                            //création d'une constante contenant l'élément de la liste cardElements à l'indice index
    cardElement.addEventListener("click", () => {                       //ajout d'un évènement lorsqu'on clique sur cardElement
        if (!cardElement.src.includes("cardCover") || !clickable) {     //condition, si la source de cardElement est différente de cardCover ou alors si clickable est faux alors la boucle s'arrête
            return;
        }
        clickable = false;                                              //définit la variable clickable fausse
        cardElement.src = pairs[index];                                 //remplace la source de cardElement par celle de la liste pairs d'indice index
        cardElement.classList.add("flipInY")                            //ajoute l'évènement flipInY à cardElement
        cardElement.addEventListener('animationend', () => {
            cardElement.classList.remove("flipInY");                    //retire l'évènement flipInY à cardElement
        })
        if (cardReturn != null) {                                       //condition, si cardReturn n'est pas null
            if (cardReturn.src == cardElement.src) {                    //condition, si la source de cardReturn est la même que la source de cardElement
                title.innerHTML = "Bravo !";                            //transforme la chaîne de caractère de la fonction title en "Bravo !"
                title.style.color = "green";                            //transforme la couleur de la fonction title en vert
                setTimeout(() => {                                      //ajoute un Timeout de 2 secondes
                    title.innerHTML = initialTitleText;                 //remplace  la chaîne de caractère de title par celle d'initalTitleText
                    title.style.color = "";                             //remplace la couleur de title par la couleur initiale
                }, 2000);
                clickable = true;                                       //définit la variable clickable vraie
                cardReturn = null;                                      //définit cardReturn en null
            }
            else {
                setTimeout(() => {                                      //ajoute un Timeout de 2 secondes
                    cardElement.classList.add("flipInY")                //ajoute l'évènement flipInY à cardElement
                cardElement.addEventListener('animationend', () => {    
                    cardElement.classList.remove("flipInY");            //retire l'évènement flipInY à cardElement
                })
                cardReturn.classList.add("flipInY")                     //ajoute l'évènement flipInY à cardElement
                cardReturn.addEventListener('animationend', () => {     
                    cardReturn.classList.remove("flipInY");             //retire l'évènement flipInY à cardElement
                })
                    cardReturn.src = cardCover;
                    cardElement.src = cardCover;
                    clickable = true;
                    cardReturn = null;
                }, 2000);
            }
        }
        else {
            cardElement.src = pairs[index];
            cardElement.classList.add("flipInY")                        //ajoute l'évènement flipInY à cardElement
            cardElement.addEventListener('animationend', () => {        
                cardElement.classList.remove("flipInY");                //retire l'évènement flipInY à cardElement
            })
            cardReturn = cardElement;                                   //définit cardReturn par cardElement
            clickable = true;                                           //définit la variable clickable vraie
        }
    })
}