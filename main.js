//loader
const loader = document.querySelector(".loader");
const title = loader.querySelector("h1");
const subTitle = loader.querySelector("h3");

const titleWrd = 'ペントのお茶';
const subTitleWrd = 'Bienvenue';

function typing() {
  for (let index = 0; index < titleWrd.length; index++) {
    const letter = titleWrd[index];
    setTimeout(() => {
      title.innerText += letter;
      if (index === titleWrd.length - 1) {
        for (let subIndex = 0; subIndex < subTitleWrd.length; subIndex++) {
          const subLetter = subTitleWrd[subIndex];
          setTimeout(() => {
            subTitle.innerText += subLetter;
            if (subIndex === subTitleWrd.length - 1) {
                setTimeout(()=> {loader.style.opacity = 0; loader.style.display = 'none'}, 500);
            }
          }, subIndex * 300);
        }
      }
    }, index * 500);
  }
}
const urlParams = new URLSearchParams(window.location.search);
const fromPage = urlParams.get('from');
if (fromPage === 'order') {
    loader.style.opacity = 0;
    loader.style.display = 'none';
  }else{
    setTimeout(typing, 800);
}


//gestion section

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

const previousBtn = document.querySelector('.nav__previous');



//gestion section mobile
const navMobile = document.querySelector('.nav__mobile__menu').querySelectorAll('img');
const navMobileBtn = document.querySelector('.nav__mobile__btn');
navMobileBtn.addEventListener("click", ()=>{
    document.querySelector('.nav__mobile').classList.toggle('open');
})
navMobile.forEach(element => {
    element.addEventListener("click", ()=>{
        document.querySelectorAll('.active').forEach(activeElem => {
            activeElem.classList.remove('active');
        });
        element.classList.add('active');
        const activeSection = element.getAttribute("data-id");
        document.querySelector(`.${activeSection}`).classList.add('active');
    })
});

//gestion carte interactive
const ethiqueSection = document.querySelector('.ethique');
const fournisseurs = [...ethiqueSection.querySelectorAll('li')];
const fournisseurLocalisations = ["69282 MEYZIEU", "69382 LYON--2E--ARRONDISSEMENT", "69019 BELLEVILLE", "69255 VAUGNERAY", "69027 BRIGNAIS"];

for (let i = 0; i < fournisseurs.length; i++) {
    const fournisseur = fournisseurs[i];
    fournisseur.addEventListener("mouseenter", () => {
        if(document.querySelector('.activate')){
            document.querySelector('.activate').classList.remove('activate');
        }
        const commune = document.getElementById(fournisseurLocalisations[i]);
        commune.classList.add('activate');
    })
}
for (let i = 0; i < fournisseurs.length; i++) {
    const fournisseur = fournisseurs[i];
    fournisseur.addEventListener("mouseover", () => {
        if(document.querySelector('.activate')){
            document.querySelector('.activate').classList.remove('activate');
        }
        const commune = document.getElementById(fournisseurLocalisations[i]);
        commune.classList.add('activate');
    })
}

document.querySelectorAll('.ethique__list').forEach(element => {
        element.addEventListener("mouseout", ()=>{
        if(document.querySelector('.activate')){
        document.querySelector('.activate').classList.remove('activate');
        }
        })
});
