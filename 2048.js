
var CasaTabuleiro = function () {
        'use strict';
        this.valor = 0;
        this.fechada = 0;
        this.reiniciar =  function () {
            this.valor = 0;
            this.fechada = 0;
        };
        this.setValor = function (valor) {
            this.valor = valor || 0;
        };
    };


var Tabuleiro = function () {
    'use strict';
    var i = 0, j = 0;
    
    this.tamanho = 4;
    this.casas = [];
    this.iterar = function (callback) {
        console.log(i);
        console.log(j);
        
        // for (i; i < this.tamanho; i++) {
        //    for (j; j < this.tamanho; j++) {
        if (i == this.tamanho && j == this.tamanho) {
            i = 0;
            j = 0;
            return false;
        } else if (i == this.tamanho && j < this.tamanho) {
            j++;
        } else if (i < this.tamanho && j < this.tamanho) {
            i++;
        }
        
        
        
        this.casas[i] = [];
        this.casas[i][j];
        
        //}
        // };
        
        
    };
    this.gameOver = function () {
            
    };
    this.iniciar = function (tamanho) {
        this.gameOver = 0;
        this.tamanho = tamanho || 4; 
    };
    this.casaRandom = function () {
        var x = Math.ceil(Math.random() * this.tamanho), y = Math.ceil(Math.random() * this.tamanho);
        
        if ( !this.gameOver ) {
       //    while () 
        }
        
        return this.casas[x][y];
    };
    this.iniciarCasa = function (valor) {
        var casa = this.casaRandom(), valorCasa = valor || 2;
        
        
        
        casa.setValor(valorCasa);
    };
};
  
var tabuleiro = new Tabuleiro();
tabuleiro.iniciar(4);
    
var x;
while ( tabuleiro.iterar() ) {
    // 
    
    console.log( x );
}
console.log(tabuleiro);