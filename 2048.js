
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
        if ( this.casas[x][y].estaVazia() ) {
            return this.casas[x][y];
        } else {
            this.casaRandom();
        }
    };
    this.iniciarCasa = function (valor) {
        var casa = this.casaRandom(), valorCasa = valor || 2;
        
        casa.setValor(valorCasa);
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
    }
    this.pintar = function (){
        var d, i, j;
        for ( i = 0; i<this.tamanho; i++ ) {
            for ( j = 0; j<this.tamanho; j++ ) {
                d = document.getElementById('td'+ i + j);
                d.innerHTML = this.casas[i][j].valor;
            }
        }
    };
};

var tabuleiro = new Tabuleiro();
tabuleiro.iniciar(4);
tabuleiro.iniciarCasa(2);
tabuleiro.iniciarCasa(2);

var cont = 0;
var x = setInterval( function(){
    
    tabuleiro.pintar();
    tabuleiro.iniciarCasa(2);
    tabuleiro.moveLeft();
    
    if (cont === 10) {
        clearInterval(x)
    };
    cont++;
    
    
}, 1000);