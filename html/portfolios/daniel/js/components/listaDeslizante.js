class ListaDeslizante extends HTMLElement {
    gap = parseInt(this.dataset.listaGap || 0);
    larguraCard = parseInt(this.dataset.listaLarguraCard || 0);
    indiceAtual = 0;

    constructor() {
        super();
        this.style.display = "block";
        this.attachShadow({mode: "open"});

        // HTML do elemento aqui
        this.shadowRoot.innerHTML = `
            <style>
                slot {
                    display: flex;
                    gap: ${this.gap}px;
                    overflow: hidden;
                    scroll-behavior: smooth;
                }
            </style>
            <slot class="lista">

            </slot>
        `;

        this.lista = this.shadowRoot.querySelector(".lista");
    }

    avancar() {
        const verificaPosicaoCard = parseInt(this.children[this.indiceAtual].getBoundingClientRect().left) <= parseInt(this.lista.getBoundingClientRect().left) && this.indiceAtual < this.children.length - 1;
        if (parseInt(this.lastElementChild.getBoundingClientRect().right) > parseInt(this.lista.getBoundingClientRect().right) && verificaPosicaoCard)
            this.indiceAtual++;
        console.log(this.indiceAtual);
        this.mover();
    }

    voltar() {
        const verificaPosicaoCard = parseInt(this.children[this.indiceAtual].getBoundingClientRect().left) >= parseInt(this.lista.getBoundingClientRect().left);
        if (this.indiceAtual > 0 && verificaPosicaoCard)
            this.indiceAtual--;
        this.mover();
    }

    mover() {
        this.lista.scrollLeft = (this.larguraCard + this.gap) * this.indiceAtual;
    }
}

class BtnVoltar extends HTMLElement {
    constructor() {
        super();
        this.style.display = "block";
        this.style.width = "max-content";
        const listaAlvo = document.querySelector(this.dataset.listaAlvo);
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            slot:hover {
                cursor: pointer;
            }
        </style>
        <slot></slot>`;
        this.addEventListener("click", () => listaAlvo.voltar());
    }
}

class BtnAvancar extends HTMLElement {
    constructor() {
        super();
        this.style.display = "block";
        this.style.width = "max-content";
        const listaAlvo = document.querySelector(this.dataset.listaAlvo);
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            slot:hover {
                cursor: pointer;
            }
        </style>
        <slot></slot>`;
        this.addEventListener("click", () => listaAlvo.avancar());
    }
}

customElements.define("lista-deslizante", ListaDeslizante);
customElements.define("lista-deslizante-voltar", BtnVoltar);
customElements.define("lista-deslizante-avancar", BtnAvancar);
