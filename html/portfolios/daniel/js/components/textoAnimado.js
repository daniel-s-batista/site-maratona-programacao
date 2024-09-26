// PROTÓTIPO: No momento, só aceita uma tag de texto por vez e não suporta quebras de linha

class TextoAnimado extends HTMLElement {
    constructor() {
        super();
    }
    escrever() {
        const velocidade = (parseInt(this.getAttribute("velocidade")) || 25);
        const tipoElemento = this.getAttribute("tag");
        const textoParaEscrever = this.querySelector("custom-text").innerText.trim();
        const tamanhoTexto = textoParaEscrever.length;
        let indiceTexto = 0;
        const espacoParaEscrever = this.shadowRoot.querySelector(`${tipoElemento} > .texto`); // appendChild(`${elementoTexto.tagName.toLowerCase()}`);
        espacoParaEscrever.innerText = "";
        let intervalo = setInterval(function escreverCaractere() {
            if (indiceTexto === tamanhoTexto) {
                clearInterval(intervalo);
                return;
            }
            espacoParaEscrever.innerHTML += (textoParaEscrever[indiceTexto] !== " " ? textoParaEscrever[indiceTexto] : "&nbsp;");
            indiceTexto++;
        }, velocidade);
    }
    connectedCallback() {
        const tipoElemento = this.getAttribute("tag");
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                @keyframes underline {
                    0%, 100% {
                        opacity: 100%;
                    }
                    50% {
                        opacity: 0%;
                    }
                }
                * {
                    margin: 0;
                    padding: 0;
                }
                slot {
                    display: none;
                }
                .underline {
                    animation: underline 1s linear;
                    animation-iteration-count: infinite;
                }
            </style>
            <${tipoElemento}>
                <span class="texto"></span><span class="underline">_</span>
            </${tipoElemento}>
        `;
        this.escrever();
    }
}

customElements.define("texto-animado", TextoAnimado);
