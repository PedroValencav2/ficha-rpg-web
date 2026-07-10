# 🎲 Ficha de Personagem Automatizada

Uma folha de personagem digital para RPGs baseados no sistema d20 (como D&D 5e), reconstruída com uma interface tática minimalista no estilo **Cyberpunk / Sci-Fi**. O projeto calcula automaticamente modificadores, proficiências, CD de magias e salva o progresso do usuário em tempo real diretamente no navegador.

---

## 🚀 Funcionalidades Principais

*   **⚡ Sistema Dinâmico de Abas:** Alterne instantaneamente entre o painel **Geral** (Atributos, Perícias e Status) e o painel de **Magias & Inventário** sem recarregar a página.
*   **🧠 Core Mecânico Automatizado:** Digite o valor de um atributo (ex: `16`) e veja o modificador (`+3`) ser calculado na hora baseado na regra oficial ($\lfloor \frac{\text{Atributo} - 10}{2} \rfloor$).
*   **🎯 Vínculo de Perícias e Salvaguardas:** Ao marcar a proficiência de uma perícia, o script soma automaticamente o **Bônus de Proficiência** (que escala dinamicamente com o Nível do personagem) ao modificador base.
*   **🔮 Grimório Inteligente:** Selecione o atributo de conjuração (Inteligência, Sabedoria ou Carisma) e a ficha calcula na hora a sua **CD de Resistência a Magias** e o seu **Bônus de Ataque Mágico**.
*   **💾 Auto-Save (LocalStorage):** Nunca perca seu progresso. Qualquer letra ou número alterado é salvo automaticamente no banco local do navegador. Pode fechar a aba ou dar F5 sem medo.

---

## 🎨 Interface e Estilo

O projeto foi customizado com foco em interfaces táticas de computadores (*datapads/netrunners*), utilizando:
*   Tipografia monoespaçada simulando linhas de comando de terminais.
*   Paleta de cores escura com alto contraste em **Azul Ciano Neon** e **Verde Matrix**.
*   Sinalizações de vitalidade e falhas de morte com destaques em **Rosa Magenta**.
*   Visual 100% responsivo e scannável.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído puramente com tecnologias nativas da Web (**Vanilla JavaScript**), sem a necessidade de frameworks ou dependências externas, garantindo performance e leveza:

*   **HTML5:** Estruturação semântica da ficha de RPG.
*   **CSS3:** Estilização baseada em variáveis CSS nativas (`:root`), layouts em Grid e Flexbox, e efeitos visuais imersivos.
*   **JavaScript (ES6+):** Manipulação assíncrona do DOM, escutadores de eventos (`input`, `change`) e persistência de dados via `Web Storage API`.

---

## 💻 Como Executar o Projeto

Como o ecossistema é baseado no ecossistema Frontend nativo, o projeto roda direto na engrenagem do seu navegador, sem necessidade de servidores ou do Node.js:

1. Baixe os arquivos do repositório (`index.html`, `style.css` e `script.js`) na mesma pasta.
2. Dê **dois cliques no arquivo `index.html`**.
3. O projeto abrirá automaticamente no seu navegador padrão e já estará pronto para usar!

---

## 📂 Estrutura de Arquivos

```text
├── index.html       # Estrutura semântica da ficha (Abas Geral e Magias)
├── style.css        # Estilização completa (Tema Cyberpunk/Sci-Fi)
└── script.js        # Motor matemático do RPG, troca de abas e Auto-Save