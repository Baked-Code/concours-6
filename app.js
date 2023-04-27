
//Gestion des sections
const navBtns = document.querySelectorAll('.nav__btn');
navBtns.forEach(navBtn => {
            navBtn.addEventListener("click", ()=>{
            document.querySelectorAll('.active').forEach(activeElem => {
                activeElem.classList.remove('active');
            });
            navBtn.classList.add('active');
            const activeSection = navBtn.getAttribute("data-id");
            document.querySelector(`.${activeSection}`).classList.add('active');
        })
});

const previousBtn = document.querySelector('.btn__previous');

function showPreviousBtn(){
    previousBtn.style.display = 'none';
    if(!document.querySelector('.product').classList.contains('active')){
        previousBtn.style.display = 'flex';
    }
}
previousBtn.addEventListener("click", ()=>{
    const activeSection = document.querySelector('section.active');
    activeSection.classList.remove('active');
    activeSection.previousElementSibling.classList.add('active');
    showPreviousBtn();
})
showPreviousBtn();

//gestion du panier

const moreBtns = [...document.querySelectorAll('.product__number--more')];
const lessBtns = [...document.querySelectorAll('.product__number--less')];
const quantityShowers = [...document.querySelectorAll('.product__number--value')];
const productsWanted = document.querySelector('.product__wanted');
const mobileSection = document.querySelector('.mobile');
let teas = [{'id' : 1, 'nom' : 'Praline Dream', 'quantité' : 0, 'prix': 8, 'time': 2}, {'id' : 2, 'nom' : 'Dragon\'s Breath', 'quantité' : 0, 'prix': 7, 'time': 1}, {'id' : 3, 'nom' : 'Golden Yuzu', 'quantité' : 0, 'prix': 10, 'time': 3}, {'id' : 4, 'nom' : 'Lyon\'s Pride', 'quantité' : 0, 'prix': 9, 'time': 2}, {'id' : 5, 'nom' : 'Cherry Blossom Bliss', 'quantité' : 0, 'prix': 8, 'time': 1}, {'id' : 6, 'nom' : 'OLympic Bubble', 'quantité' : 0, 'prix': 8, 'time': 2}, {'id' : 7, 'nom' : '“EELV”', 'quantité' : 0, 'prix': 8, 'time': 1}];
let orderedTeas = [];
let price = 0;
let prepartionTime = 0;
const basketBtn = document.querySelector('.btn__basket');

function updateOrderedTeas() {
    orderedTeas = teas.filter(tea => tea.quantité > 0);
    if (orderedTeas.length === 0){
        basketBtn.querySelector('.toast').style.display = 'none';
    }
}
function updateOrderedTotal(){
    if (orderedTeas.length !== 0){
        let totalAmount = 0;
        console.log(orderedTeas);
        orderedTeas.forEach(element => {
            totalAmount += element.quantité;
        });
        basketBtn.querySelector('.toast').innerText = totalAmount;
    }
}
function updateTime(){
    prepartionTime = 0;
    for (let i = 0; i < orderedTeas.length; i++) {
        const orderedTea = orderedTeas[i];
        prepartionTime += orderedTea.time * orderedTea.quantité;
    }
}
function showTime(){
    updateTime();
    document.querySelector('.product__display--temp').querySelector('span').innerText = `${prepartionTime} min.`;
    mobileSection.querySelector('.product__display--temp').querySelector('span').innerText = `${prepartionTime} min.`;

}
function updatePrice(){
    price = 0;
    for (let i = 0; i < orderedTeas.length; i++) {
        const orderedTea = orderedTeas[i];
        price += orderedTea.prix * orderedTea.quantité;
    }
}
function showPrice(){
    updatePrice();
    document.querySelector('.product__display--price').querySelector('span').innerText = `${price} €`;
    mobileSection.querySelector('.product__display--price').querySelector('span').innerText = `${price} €`;

}
function changeUI(){
    for (let teaNumber = 0; teaNumber < teas.length; teaNumber++) {
        const tea = teas[teaNumber];
        if(tea.quantité > 0){
            lessBtns[teaNumber].style.background = "#C5594B";
        }
        if(tea.quantité == 0){
            lessBtns[teaNumber].style.background = "#323641";
        }
    }
    if(orderedTeas.length){
        for (let i = 0; i < orderedTeas.length; i++) {
            const element = orderedTeas[i];
            const li = document.querySelector(`li[data-id="${element.id}"]`);
            const limobile = mobileSection.querySelector(`li[data-id="${element.id}"]`);
            li.innerHTML = `${element.nom} X ${element.quantité} <span>${element.prix*element.quantité}€</span>`;
            limobile.innerHTML = `${element.nom} X ${element.quantité} <span>${element.prix*element.quantité}€</span>`;
        }
        updateOrderedTotal();
        showPrice();
        showTime();
    }
}

function resetUI() {
    orderedTeas = [];
    document.querySelector('.product__wanted').innerHTML = '';
    mobileSection.querySelector('.product__wanted').innerHTML = '';
    price = 0;
    prepartionTime = 0;
    document.querySelector('.product__display--price').querySelector('span').innerText = `${price} €`;
    document.querySelector('.product__display--temp').querySelector('span').innerText = `${prepartionTime} min.`;
    mobileSection.querySelector('.product__display--price').querySelector('span').innerText = `${price} €`;
    mobileSection.querySelector('.product__display--temp').querySelector('span').innerText = `${prepartionTime} min.`;
    for (let i = 0; i < teas.length; i++) {
        const tea = teas[i];
        tea.quantité = 0;
    }
    lessBtns.forEach(lessBtn => {
        lessBtn.style.background = "#323641";
    });
    quantityShowers.forEach(quantityShower => {
        quantityShower.innerText = 0;
    });
    updateOrderedTeas();
}

for (let i = 0; i < moreBtns.length; i++) {
    const moreBtn = moreBtns[i];
    moreBtn.addEventListener("click", () => {
        teas[i].quantité += 1;
        quantityShowers[i].innerText = teas[i].quantité;
        if(teas[i].quantité === 1){
            const li = document.createElement('li');
            const limobile = document.createElement('li');
            li.setAttribute("data-id", teas[i].id);
            limobile.setAttribute("data-id", teas[i].id);
            document.querySelector('.product__wanted').appendChild(li);
            mobileSection.querySelector('.product__wanted').appendChild(limobile);
            basketBtn.querySelector('.toast').style.display = 'flex';
        }
        updateOrderedTeas();
        changeUI();
    });
}

for (let index = 0; index < lessBtns.length; index++) {
    const lessBtn = lessBtns[index];
    lessBtn.addEventListener("click", () => {
        if(teas[index].quantité > 0){
            teas[index].quantité -= 1;
            quantityShowers[index].innerText = teas[index].quantité;
            updateOrderedTeas();
            changeUI();
            if(teas[index].quantité === 0){
                document.querySelector(`li[data-id="${teas[index].id}"]`).remove();
                mobileSection.querySelector(`li[data-id="${teas[index].id}"]`).remove();
            }
        }
    });
}

document.getElementById('suppr').addEventListener("click", resetUI);
document.getElementById('suppr-m').addEventListener("click", resetUI);

const orderBtn = document.getElementById('order');
const orderBtnMobile = document.getElementById('order-m');
orderBtn.addEventListener("click", goToOrder);
orderBtnMobile.addEventListener("click", goToOrder);
basketBtn.addEventListener("click", goToBasket)

function goToBasket(){
    const activeSection = document.querySelector('section.active');
        activeSection.classList.remove('active');
        document.querySelector('.mobile').classList.add('active');
        showPreviousBtn();
}

function goToOrder(){
    if(price == 0){
        document.querySelector('.error-msg').innerText = 'Veuillez d\’abord selectionner au moins un produit';
        mobileSection.querySelector('.error-msg').innerText = 'Veuillez d\’abord selectionner au moins un produit';
        setTimeout(()=>{
            document.querySelector('.error-msg').innerText = "";
            mobileSection.querySelector('.error-msg').innerText = "";
        },1000);
        return;
    }else{
        const activeSection = document.querySelector('section.active');
        activeSection.classList.remove('active');
        document.querySelector('.payement').classList.add('active');
        showPreviousBtn();
        populateUI();
    }
}

//Gestion du formulaire de payement
const payBtn = document.getElementById('pay');
function populateUI(){
    payBtn.querySelector('span').innerHTML= `${price} €`
}

const regexNumCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
const regexNomTitulaireCarte = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
const regexCVV = /^[0-9]{3,4}$/;
const regexArray = [regexNomTitulaireCarte, regexNumCard, regexCVV];

const inputs = [...document.querySelector('.payement__form').querySelectorAll('input')];
const selects = [...document.querySelector('.payement__form').querySelectorAll('select')];
const cardDisplayHolders = [document.querySelector('.payement__name'), document.querySelector('.payement__num'), document.querySelector('.payement__back--sign')];
const dateDisplayHolders = [...document.querySelector('.payement__date').querySelectorAll('span')]

payBtn.addEventListener("click", (e) => {
    e.preventDefault();
    populateFormUI();
});

function populateFormUI(){
    let reponse = true;
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (regexArray[i].test(input.value)) {
            input.classList.add('valid');
        }else{
            input.classList.add('not-valid');
            document.querySelectorAll('.error-msg')[1].innerHTML = 'Veuillez remplir tout les champs';
            reponse = false;
        }
    }
    selects.forEach(select => {
        if (select.value === "") {
            reponse = false;
            document.querySelectorAll('.error-msg')[1].innerHTML = 'Veuillez remplir tout les champs';
            select.classList.add('not-valid');
        }else{
            select.classList.add('valid');
        }
    });
    goToMaking(reponse);
}

function goToMaking(response) {
    if (response) {
        const activeSection = document.querySelector('section.active');
        activeSection.classList.remove('active');
        document.querySelector('.making').classList.add('active');
        showPreviousBtn();
        startTimer(prepartionTime);
        resetUI();
        if (document.querySelector('.making').classList.contains('finish')) {
            document.querySelector('.making').classList.remove('finish')
        }
        document.querySelector('.making__display--state').innerText = "Votre commande est en cours de préparation";
    } else {
        return;
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", () =>{
        if (input.classList.contains('not-valid')) {
            input.classList.remove('not-valid');
        }
        document.querySelectorAll('.error-msg')[1].innerHTML = '';
    })
});
selects.forEach(select => {
    select.addEventListener("focus", () => {
        if (select.classList.contains('not-valid')) {
            select.classList.remove('not-valid');
        }
        document.querySelectorAll('.error-msg')[1].innerHTML = '';
    })
});

for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener("input", () => {
        if(i === 1){
            if (input.value.length > 16) {
                const numero = input.value.substr(0, 16)
                cardDisplayHolders[i].innerText = numero.replace(/(.{4})/g, "$1 ");
            }else{
                cardDisplayHolders[i].innerText = input.value.replace(/(.{4})/g, "$1 ");
            }
        }else{
            cardDisplayHolders[i].innerText = input.value;
        }
    });
}
for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    select.addEventListener("input", () => {
        dateDisplayHolders[i].innerText = select.value;
    })
}
inputs[2].addEventListener("focus", toggleCvv);
inputs[2].addEventListener("blur", toggleCvv);

function toggleCvv() {
    document.querySelector('.payement__flip').classList.toggle('flipped');
}

// Gestion de la préparation de commande

let moment = window.moment;
let goalTime;
let minutesLeft;
let secondsLeft;
let intervalId;

function startTimer(minutes){
    let now = moment();
    goalTime = moment().add(minutes, "minutes") // ajouter le temps de décalage
    let elapsed = moment.duration(goalTime.diff(now)) // ajouter le temps de décalage
    minutesLeft = elapsed.minutes().toString().padStart(2, '0');
    secondsLeft = elapsed.seconds().toString().padStart(2, '0');
    document.querySelector(`.making__display--time`).innerText = minutesLeft + ':' + secondsLeft;
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let now = moment();
    let elapsed = moment.duration(goalTime.diff(now)) // ajouter le temps de décalage
    minutesLeft = elapsed.minutes().toString().padStart(2, '0');
    secondsLeft = elapsed.seconds().toString().padStart(2, '0');
    document.querySelector(`.making__display--time`).innerText = minutesLeft + ':' + secondsLeft;
    if(now.format() == goalTime.format()){
        stopTimer();
    }
}

function stopTimer(){
    clearInterval(intervalId);
    document.querySelector('.making').classList.add('finish');
    document.querySelector('.making__display--state').innerText = 'Merci pour votre achat, nos samouraï gardent vos boissons au frais en vous attendant, à très bientot !';
}
