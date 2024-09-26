const telaMenu = document.querySelector("#telaMenu");
const btnMenu = document.querySelector("#btnMenu");
let menuAberto = false;

function mudarMenu() {
    telaMenu.style.right = (menuAberto) ? "-100vw" : "0";
    menuAberto = !menuAberto;
}

btnMenu.addEventListener("click", mudarMenu);
