
var CasaTabuleiro = function () {
    'use strict';
    this.valor = 0;
    this.fechada = 0;

    this.reiniciar =  function () {
        this.valor = 0;
        this.fechada = 0;
    };

    this.estaVazia = function () {
        return this.valor === 0;
    };

    this.setValor = function (valor) {
        this.valor = valor || 0;
    };
};


var Tabuleiro = function () {
    'use strict';
    var i = 0, j = 0;
    
    this.tamanho = 4;
    this.iniciado = 0;
    this.acabou = 0;
    this.pontuacao = 0;
    this.casas = [];
    
    this.iterar = function (obj, callback) {
        var i = 0, j = 0;
        
        for (i = 0; i < this.tamanho; i++) {
            for (j = 0; j < this.tamanho; j++) {
                if (callback.call(obj[i][j]) === false) {
                    break;
                }
            }
        }

        return obj;
    };
    
    this.gameOver = function () {
        var acabou = true;
        
        // verifica se há alguma vazia
        this.iterar(this.casas, function () {
            if (this.estaVazia()) {
                acabou = false;
            }
        });
    };
    
    this.iniciar = function (tamanho) {
        var i = 0, j = 0;
        
        this.tamanho = tamanho || 4;
        
        if (this.iniciado === 0) {
            for (i = 0; i < this.tamanho; i++) {
                this.casas[i] = [];
                for (j = 0; j < this.tamanho; j++) {
                    this.casas[i].push(new CasaTabuleiro());
                }
            }
            this.iniciado = 1;
            this.acabou = 0;
            this.pontuacao = 0;
        }
        
        return true;
    };
    
    this.casaRandom = function () {
        var x = Math.ceil(Math.random() * this.tamanho) - 1, y = Math.ceil(Math.random() * this.tamanho) - 1;
        
        this.iniciar(this.tamanho);
        
        while (!this.casas[x][y].estaVazia()) {
            x = Math.ceil(Math.random() * this.tamanho) - 1;
            y = Math.ceil(Math.random() * this.tamanho) - 1;
        }
        return this.casas[x][y];
    };
    
    this.iniciarCasa = function (valor) {
        var casa = this.casaRandom(), valorCasa = valor || 2;
        
        casa.setValor(valorCasa);
    };
    
    this.retornaEixos = function (direcao) {
        switch (direcao) {
        case 37: // esquerda
            return { x: [0, 1, 2, 3], y: [0, 1, 2, 3], ordem: "linha"};
        case 39: // direita
            return { x: [0, 1, 2, 3], y: [3, 2, 1, 0], ordem: "linha"};
        case 38: // cima
            return { x: [0, 1, 2, 3], y: [0, 1, 2, 3], ordem: "coluna"};
        case 40: // baixo
            return { x: [3, 2, 1, 0], y: [0, 1, 2, 3], ordem: "coluna"};
        default:
            return null;
        }
    };
    
    this.movimento = function (direcao) {
        var i = 0, j = 0, limite = 0, movimentou = false, eixo, transversal, eixos, p, atual, proximo;
        
        this.iterar(this.casas, function () { this.fechada = 0; });
        
        eixos = this.retornaEixos(direcao);
        
        if (eixos === null) {
            return;
        }
        
        if (eixos.ordem === "linha") {
            eixo = eixos.x;
            transversal = eixos.y;
        } else {
            eixo = eixos.y;
            transversal = eixos.x;
        }
        
        for (i = 0; i < eixo.length; i++) {
            for (j = 0; j < transversal.length; j++) {
                p = 0;
                        
                while (p < transversal.length - 1) {

                    if (eixos.ordem === "linha") {
                        atual = this.casas[eixo[i]][transversal[p]];
                        proximo =  this.casas[eixo[i]][transversal[p + 1]];
                    } else {
                        atual = this.casas[transversal[p]][eixo[i]];
                        proximo = this.casas[transversal[p + 1]][eixo[i]];
                    }

                    if ((atual.estaVazia() || atual.valor === proximo.valor) && !atual.fechada) {
                        atual.fechada = atual.estaVazia() ? 0 : 1;
                        atual.valor += proximo.valor;
                        proximo.valor = 0;
                        this.pontuacao += atual.valor;
                        movimentou = true;
                    } else if (!atual.estaVazia() && atual.valor !== proximo.valor && proximo.valor !== 0) {
                        atual.fechada = 1;
                    }
                    p = p + 1;
                }
            }
        }
        return movimentou;
    };
        
    this.pintar = function () {
        var d, i, j, placar;
        
        placar = document.getElementById('div_pontuacao');
        placar.innerHTML = this.pontuacao;
        
        for (i = 0; i < this.tamanho; i++) {
            for (j = 0; j < this.tamanho; j++) {
                d = document.getElementById('td' + i + j);
                d.innerHTML = this.casas[i][j].valor;
            }
        }
    };
    
    this.randomNumeroInicial = function () {
        var numInicial = Math.floor(Math.random * 100) + 1;
        return (numInicial <= 92) ? 2 : 4;
    };
};


var tabuleiro = null;

function comecaJogo() {
    'use strict';
    
    tabuleiro = new Tabuleiro();
    tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
    tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
    tabuleiro.pintar();
    
    window.addEventListener("keydown", function (evt) {
        if (!tabuleiro.gameOver()) {
            tabuleiro.movimento(evt.keyCode);
            tabuleiro.pintar();
            tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            tabuleiro.pintar();
        } else {
            tabuleiro.iniciado = 0;
            if (confirm('O jogo acabou. Deseja reiniciar?')) {
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
                tabuleiro.pintar();
            }
        }
    });
}