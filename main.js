'use strict';

// utility
const nome = document.getElementById('nome');
const oggetto = document.getElementById('oggetto');
const prezzo = document.getElementById('prezzo');
const submit = document.getElementById('submit');
const listDiv = document.getElementById('list');
let deleteListElements;
const priceDiv = document.getElementById('prezzo-totale')
const controlList = localStorage.getItem('list')
let totalPrice = 0;

let list = [];

// funzioni

// funzione per visualizzazione lista
function displayList() {
    if (list.length > 0) {
        totalPrice = 0
        listDiv.innerHTML = '';
        for (let i = 0; i < list.length; i++) {
            totalPrice = Number(totalPrice) + Number(list[i].price)
            listDiv.innerHTML +=
                `<div class="card">
                <div class="card-body">
                    <div class='row'>
                        <div class='col-12 d-flex'>
                            <div class=''>per: ${list[i].name}</div>
                            <div class='ms-auto'>prezzo: ${list[i].price}$</div>
                        </div>
                        <div class='col-12'>
                            <div class='mb-2'>regalo: ${list[i].object}</div>                   
                            <button data-position='${i}' class="delete w-100">❌</button>
                        </div>
                    </div>
                </div>
            </div>`
        };
        priceDiv.innerHTML = `${totalPrice}$`
        deleteListElements = document.querySelectorAll('.delete');
    } else {
        priceDiv.innerHTML = ''
        listDiv.innerHTML = `<div>nessun elemento in lista</div>`;
    }
};

// funzione per aggiungere evento delete a elemento lista
function deleteEvent() {
    for (let i = 0; i < deleteListElements.length; i++) {
        const deleteListElement = deleteListElements[i];
        deleteListElement.addEventListener('click', function () {
            list.splice(deleteListElement.dataset.position, 1);
            displayList();
            deleteEvent();
            console.log(list)
            if (list.length > 0) {
                localStorage.setItem('list', JSON.stringify(list))
            } else {
                localStorage.setItem('list', [])
            }

        })
    };
};

// controllo se presente una lista in local storage
if (controlList) {
    list = JSON.parse(controlList)
    displayList();
    deleteEvent();
} else {
    priceDiv.innerHTML = ''
    listDiv.innerHTML = `<div>nessun elemento in lista</div>`;
}

// evento aggiunta nuovo elemento in lista
submit.addEventListener('click', function () {
    list.push(
        {
            name: nome.value,
            object: oggetto.value,
            price: prezzo.value
        }
    )
    nome.value = null;
    oggetto.value = null;
    prezzo.value = null;
    displayList();
    deleteEvent();
    console.log(list)
    localStorage.setItem('list', JSON.stringify(list))
});