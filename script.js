document.addEventListener('DOMContentLoaded', () => {
    const botoesAbas = document.querySelectorAll('.tab-btn');
    const conteudosAbas = document.querySelectorAll('.tab-conteudo');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesAbas.forEach(b => b.classList.remove('active'));
            conteudosAbas.forEach(c => c.classList.remove('active'));

            botao.classList.add('active');
            const abaAlvoId = botao.getAttribute('data-tab'); 
            const abaAlvo = document.getElementById(abaAlvoId);
            
            if (abaAlvo) {
                abaAlvo.classList.add('active');
            }
        });
    });

    inicializarFicha();
});

function calcularModificador(valorAtributo) {
    return Math.floor((valorAtributo - 10) / 2);
}

function formatarModificador(modificador) {
    return modificador >= 0 ? `+${modificador}` : modificador.toString();
}

function inicializarFicha() {
    const inputNivel = document.getElementById('char-level');
    const labelProfBonus = document.getElementById('prof-bonus');
    const selectAtributoMagia = document.getElementById('spell-casting-ability');

    const modAtributos = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };

    const salvaguardas = [
        { checkboxId: 'prof-save-str', displayId: 'save-str', attr: 'str' },
        { checkboxId: 'prof-save-dex', displayId: 'save-dex', attr: 'dex' },
        { checkboxId: 'prof-save-con', displayId: 'save-con', attr: 'con' },
        { checkboxId: 'prof-save-int', displayId: 'save-int', attr: 'int' },
        { checkboxId: 'prof-save-wis', displayId: 'save-wis', attr: 'wis' },
        { checkboxId: 'prof-save-cha', displayId: 'save-cha', attr: 'cha' }
    ];

    const pericias = [
        { checkboxId: 'prof-acrobatics', displayId: 'mod-acrobatics', attr: 'dex' },
        { checkboxId: 'prof-animal-handling', displayId: 'mod-animal-handling', attr: 'wis' },
        { checkboxId: 'prof-arcana', displayId: 'mod-arcana', attr: 'int' },
        { checkboxId: 'prof-athletics', displayId: 'mod-athletics', attr: 'str' },
        { checkboxId: 'prof-deception', displayId: 'mod-deception', attr: 'cha' },
        { checkboxId: 'prof-history', displayId: 'mod-history', attr: 'int' },
        { checkboxId: 'prof-insight', displayId: 'mod-insight', attr: 'wis' },
        { checkboxId: 'prof-intimidation', displayId: 'mod-intimidation', attr: 'cha' },
        { checkboxId: 'prof-investigation', displayId: 'mod-investigation', attr: 'int' },
        { checkboxId: 'prof-medicine', displayId: 'mod-medicine', attr: 'wis' },
        { checkboxId: 'prof-nature', displayId: 'mod-nature', attr: 'int' },
        { checkboxId: 'prof-perception', displayId: 'mod-perception', attr: 'wis' },
        { checkboxId: 'prof-performance', displayId: 'mod-performance', attr: 'cha' },
        { checkboxId: 'prof-persuasion', displayId: 'mod-persuasion', attr: 'cha' },
        { checkboxId: 'prof-religion', displayId: 'mod-religion', attr: 'int' },
        { checkboxId: 'prof-sleight-of-hand', displayId: 'mod-sleight-of-hand', attr: 'dex' },
        { checkboxId: 'prof-stealth', displayId: 'mod-stealth', attr: 'dex' },
        { checkboxId: 'prof-survival', displayId: 'mod-survival', attr: 'wis' }
    ];

    function atualizarTudo() {
        const nivel = parseInt(inputNivel.value) || 1;
        const profBonus = Math.floor((nivel - 1) / 4) + 2;
        labelProfBonus.textContent = `+${profBonus}`;

        ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
            const inputAttr = document.getElementById(`attr-${attr}`);
            const displayMod = document.getElementById(`mod-${attr}`);
            
            if (inputAttr && displayMod) {
                const valor = parseInt(inputAttr.value) || 10;
                const mod = calcularModificador(valor);
                modAtributos[attr] = mod;
                displayMod.textContent = formatarModificador(mod);
            }
        });

        salvaguardas.forEach(save => {
            const chk = document.getElementById(save.checkboxId);
            const display = document.getElementById(save.displayId);
            if (chk && display) {
                let valorFinal = modAtributos[save.attr];
                if (chk.checked) valorFinal += profBonus;
                display.textContent = formatarModificador(valorFinal);
            }
        });

        pericias.forEach(pericia => {
            const chk = document.getElementById(pericia.checkboxId);
            const display = document.getElementById(pericia.displayId);
            if (chk && display) {
                let valorFinal = modAtributos[pericia.attr];
                if (chk.checked) valorFinal += profBonus;
                display.textContent = formatarModificador(valorFinal);

                if (pericia.checkboxId === 'prof-perception') {
                    const passivaDisplay = document.getElementById('passive-perception');
                    if (passivaDisplay) {
                        passivaDisplay.textContent = 10 + valorFinal;
                    }
                }
            }
        });

        if (selectAtributoMagia) {
            const attrEscolhido = selectAtributoMagia.value;
            const modConjuracao = modAtributos[attrEscolhido];

            const displayModMagia = document.getElementById('spell-mod-exibir');
            const displayCD = document.getElementById('spell-save-dc');
            const displayAtaqueMagia = document.getElementById('spell-attack-bonus');

            if (displayModMagia) displayModMagia.textContent = formatarModificador(modConjuracao);
            if (displayCD) displayCD.textContent = 8 + profBonus + modConjuracao;
            if (displayAtaqueMagia) displayAtaqueMagia.textContent = formatarModificador(profBonus + modConjuracao);
        }
    }

    
    function salvarFichaNoStorage() {
        const dadosFicha = {};
        

        const campos = document.querySelectorAll('input[id], select[id], textarea[id]');
        
        campos.forEach(campo => {
            if (campo.type === 'checkbox') {
                dadosFicha[campo.id] = campo.checked;
            } else {
                dadosFicha[campo.id] = campo.value;
            }
        });

        const inputsAtaques = document.querySelectorAll('.tabela-ataques input[type="text"]');
        const dadosAtaques = [];
        inputsAtaques.forEach((input, index) => {
            dadosAtaques.push({ index: index, value: input.value });
        });
        dadosFicha['inputsAtaques'] = dadosAtaques;

        const textareasMagias = document.querySelectorAll('.textarea-magias');
        const dadosMagias = [];
        textareasMagias.forEach((textarea, index) => {
            dadosMagias.push({ index: index, value: textarea.value });
        });
        dadosFicha['textareasMagias'] = dadosMagias;

        localStorage.setItem('ficha_rpg_dados', JSON.stringify(dadosFicha));
    }

    function carregarFichaDoStorage() {
        const dadosSalvosRaw = localStorage.getItem('ficha_rpg_dados');
        if (!dadosSalvosRaw) return;

        const dadosFicha = JSON.parse(dadosSalvosRaw);

        for (const id in dadosFicha) {
            const campo = document.getElementById(id);
            if (campo) {
                if (campo.type === 'checkbox') {
                    campo.checked = dadosFicha[id];
                } else {
                    campo.value = dadosFicha[id];
                }
            }
        }

        if (dadosFicha['inputsAtaques']) {
            const inputsAtaques = document.querySelectorAll('.tabela-ataques input[type="text"]');
            dadosFicha['inputsAtaques'].forEach(item => {
                if (inputsAtaques[item.index]) {
                    inputsAtaques[item.index].value = item.value;
                }
            });
        }

        if (dadosFicha['textareasMagias']) {
            const textareasMagias = document.querySelectorAll('.textarea-magias');
            dadosFicha['textareasMagias'].forEach(item => {
                if (textareasMagias[item.index]) {
                    textareasMagias[item.index].value = item.value;
                }
            });
        }
    }
    
    const containerFicha = document.querySelector('.ficha-container');
    containerFicha.addEventListener('input', () => {
        atualizarTudo();
        salvarFichaNoStorage();
    });
    containerFicha.addEventListener('change', () => {
        atualizarTudo();
        salvarFichaNoStorage();
    });

    carregarFichaDoStorage();
    
    atualizarTudo();
}