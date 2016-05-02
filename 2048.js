
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
    this.casas = [];
    this.iterar = function (obj, callback) {
        var i=0, j=0;
        
        for (i=0; i<this.tamanho; i++) {
            for (j=0; j<this.tamanho; j++) {        
                if (callback.call(obj[i][j]) === false) {
                    break;
                }
            }
        }

        return obj;
    };
    this.gameOver = function () {
        return !this.iterar(this.casas, estaVazia);
    };
    this.iniciar = function (tamanho) {
        var i=0; j=0;
        
        this.tamanho = tamanho || 4;
        
        if (this.iniciado === 0) {
            for (i=0; i<this.tamanho; i++) {
                this.casas[i]=[];
                for (j=0; j<this.tamanho; j++) {    
                    this.casas[i].push(new CasaTabuleiro());
                }
            }
            this.iniciado = 1;
        }
        
        return true;
    };
    this.casaRandom = function () {
        var x = Math.ceil(Math.random() * this.tamanho) - 1, y = Math.ceil(Math.random() * this.tamanho) - 1;
        
        if (this.iniciado === 0) {
            this.iniciar(this.tamanho);
        }
        while ( !this.casas[x][y].estaVazia() ) {
            x = Math.ceil(Math.random() * this.tamanho) - 1;
            y = Math.ceil(Math.random() * this.tamanho) - 1;
        } 
        return this.casas[x][y];
    };
    this.iniciarCasa = function (valor) {
        var casa = this.casaRandom(), valorCasa = valor || 2;
        
        casa.setValor(valorCasa);
    };
    this.eixoEsquerda = { primeiroEixo : [0,1,2,3], segundoEixo : [0,1,2,3] };
    this.eixoDireita = { primeiroEixo : [0,1,2,3], segundoEixo : [3,2,1,0] };
    this.eixoBaixo = { primeiroEixo : [0,1,2,3], segundoEixo : [0,1,2,3] };
    this.eixoCima = { primeiroEixo : [3,2,1,0 ], segundoEixo : [0,1,2,3] };
    
    
    
    
    this.moveLeft = function () {
        var i=0, j=0, limite=0;
        
        this.iterar(this.casas, function () { this.fechada = 0; });
        
        for (i=0;i<this.tamanho;i++) {
            for (j=0;j<this.tamanho;j++) {
                var p=j;
                if (p === limite) {
                    continue;
                } else {
                    while (p-1 >= limite) {
                        
                        if ((this.casas[i][p-1].estaVazia() || this.casas[i][p-1].valor === this.casas[i][p].valor) && !this.casas[i][p-1].fechada){
                            this.casas[i][p-1].valor += this.casas[i][p].valor;
                            this.casas[i][p].valor = 0;
                            this.casas[i][p-1].fechada = this.casas[i][p-1].estaVazia()?0:1;
                        }
                        
                        p = p-1;
                    }
                }
            }
        }
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    this.moveLeft = function () {
        var i=0, j=0, limite=0;
        
        this.iterar(this.casas, function () { this.fechada = 0; });
        
        for (i=0;i<this.tamanho;i++) {
            for (j=0;j<this.tamanho;j++) {
                var p=j;
                if (p === limite) {
                    continue;
                } else {
                    while (p-1 >= limite) {
                        
                        if ((this.casas[i][p-1].estaVazia() || this.casas[i][p-1].valor === this.casas[i][p].valor) && !this.casas[i][p-1].fechada){
                            this.casas[i][p-1].valor += this.casas[i][p].valor;
                            this.casas[i][p].valor = 0;
                            this.casas[i][p-1].fechada = this.casas[i][p-1].estaVazia()?0:1;
                        }
                        
                        p = p-1;
                    }
                }
            }
        }
    };
    this.moveRight = function () {
        var i=0, j=0, limite=this.tamanho-1;
        
        this.iterar(this.casas, function () { this.fechada = 0; });
        
        for (i=0;i<this.tamanho;i++) {
            for (j=limite;j>=0;j--) {
                var p=j;
                if (p === limite) {
                    continue;
                } else {
                    while (p+1 <= limite) {
                        
                        if ((this.casas[i][p+1].estaVazia() || this.casas[i][p+1].valor === this.casas[i][p].valor) && !this.casas[i][p+1].fechada){
                            this.casas[i][p+1].valor += this.casas[i][p].valor;
                            this.casas[i][p].valor = 0;
                            this.casas[i][p+1].fechada = this.casas[i][p+1].estaVazia()?0:1;
                        }
                        
                        p = p+1;
                    }
                }
            }
        }
    };
    this.moveUp = function () {
        var i=0, j=0, limite=0;
        
        this.iterar(this.casas, function () { this.fechada = 0; });
        
        for (i=0;i<this.tamanho;i++) {
            for (j=limite;j<this.tamanho;j++) {
                var p=j;
                if (p === limite) {
                    continue;
                } else {
                    while (p-1 >= limite) {
                        
                        if ((this.casas[p-1][i].estaVazia() || this.casas[p-1][i].valor === this.casas[p][i].valor) && !this.casas[p-1][i].fechada){
                            this.casas[p-1][i].valor += this.casas[p][i].valor;
                            this.casas[p][i].valor = 0;
                            this.casas[p-1][i].fechada = this.casas[p-1][i].estaVazia()?0:1;
                        }
                        
                        p = p-1;
                    }
                }
            }
        }
    };
    this.moveDown = function () {
        var i=0, j=0, limite=this.tamanho-1;
        
        this.iterar(this.casas, function () { this.fechada = 0; });
        
        for (i=0;i<this.tamanho;i++) {
            for (j=limite;j>=0;j--) {
                var p=j;
                if (p === limite) {
                    continue;
                } else {
                    while (p+1 <= limite) {
                        
                        if ((this.casas[p+1][i].estaVazia() || this.casas[p+1][i].valor === this.casas[p][i].valor) && !this.casas[p+1][i].fechada){
                            this.casas[p+1][i].valor += this.casas[p][i].valor;
                            this.casas[p][i].valor = 0;
                            this.casas[p+1][i].fechada = this.casas[p+1][i].estaVazia()?0:1;
                        }
                        
                        p = p+1;
                    }
                }
            }
        }
    };
    this.pintar = function () {
        var d, i, j;
        for ( i = 0; i<this.tamanho; i++ ) {
            for ( j = 0; j<this.tamanho; j++ ) {
                d = document.getElementById('td'+ i + j);
                d.innerHTML = this.casas[i][j].valor;
            }
        }
    };
};


var tabuleiro = null;

function comecaJogo() {
    tabuleiro = new Tabuleiro();
    tabuleiro.iniciar(4);
    tabuleiro.iniciarCasa(2);
    tabuleiro.iniciarCasa(2);
    tabuleiro.pintar();
    
    window.addEventListener("keydown", function(evt){
        switch (evt.keyIdentifier) {
            case "Left": 
                tabuleiro.moveLeft();
                tabuleiro.pintar();
                tabuleiro.iniciarCasa(2);
                tabuleiro.pintar();
                break;
            case "Right":
                tabuleiro.moveRight();
                tabuleiro.pintar();
                tabuleiro.iniciarCasa(2);
                tabuleiro.pintar();
                break;
            case "Up":
                tabuleiro.moveUp();
                tabuleiro.pintar();
                tabuleiro.iniciarCasa(2);
                tabuleiro.pintar();
                break;
            case "Down":
                tabuleiro.moveDown();
                tabuleiro.pintar();
                tabuleiro.iniciarCasa(2);
                tabuleiro.pintar();
                break;
            default:
        }
    });
}






var cont = 0;