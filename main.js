'use strict';

const nome = document.getElementById('nome');
const oggetto = document.getElementById('oggetto');
const prezzo = document.getElementById('prezzo');
const submit = document.getElementById('submit');
const listDiv = document.getElementById('list')

let list = [];

function displayList(){
    if (list.length>0){
        listDiv.innerHTML=''
        for (let i = 0; i < list.length; i++) {
            listDiv.innerHTML+=
            `<div>
                <div>${list[i].name}</div>
                <div>${list[i].object}</div>
                <div>${list[i].price}</div>
            </div>`
        }
    }
}

submit.addEventListener('click', function(){
    list.push(
        {
            name: nome.value,
            object: oggetto.value,
            price: prezzo.value
        }
    )
    nome.value=null;
    oggetto.value=null;
    prezzo.value=null;
    displayList();
    console.log(list)
})