/**
 * core phaser game
 *
 * usa a logica em 2048 js e monta o jogo
 *
 **/

(function () {
    var jogo = new Phaser.Game( 800, 800, Phaser.AUTO, 'containerJogo');
    var tabuleiro = new Tabuleiro();
    var map, imgt;
    
    var prejogo = {
        
        textura: null, 
        
        imagem: null,
        
        preload: function () {
            this.load.tilemap('tilemap2048', 'assets/tiled2048.csv');
            this.load.image('tilesetimage', 'assets/tiles.png');
            this.load.image('imagetextura', 'assets/textura.png');
        },
        create: function () {
            imgt = this.add.image(0, 0, 'imagetextura');

            tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());

            map = this.add.tilemap('tilemap2048', 200, 200);
            map.addTilesetImage('tileset2048', 'tilesetimage', 200, 200);
            
            this.resizeGame();
            
        },
        update: function () {

        }, 
        resizeGame: function () {
            var height = 800, width = 800, dimension = 800, scale=1, scale2=1;
        
            height = 0.8 * (window.innerHeight * window.devicePixelRatio) > 800 ? 800 : 0.8 * (window.innerHeight * window.devicePixelRatio);
            width = 0.8 * (window.innerWidth * window.devicePixelRatio) > 800 ? 800 : 0.8 * (window.innerWidth * window.devicePixelRatio);

            dimension = width > height ? height : width;
            scale = dimension / 800;
            scale2 = dimension / 40;

            document.getElementById('containerPrincipal').style = "width: " + dimension + "px;";
            
            this.backgroundLayer = map.createLayer(0);
            this.backgroundLayer.scale = new Phaser.Point(scale, scale);
            
            imgt.scale = new Phaser.Point( scale2, scale2);
            imgt.bringToTop();

            this.game.scale.setGameSize(dimension, dimension);
 
        }
    }
    

    var estadojogo = {

        preload:  function () {

        },

        create: function () {


            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.downKey.onDown.add( tratarTeclas, this);

            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.upKey.onDown.add( tratarTeclas, this);

            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.rightKey.onDown.add( tratarTeclas, this);

            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.leftKey.onDown.add( tratarTeclas, this);
        },

        update: function () {
            var i, j, tile, index;
            for (i = 0; i < tabuleiro.tamanho; i++) {
                for (j = 0; j < tabuleiro.tamanho; j++) {
                    tile = tabuleiro.casas[i][j].valor === 0 ? 0 : Math.log2(tabuleiro.casas[i][j].valor);
                    index = map.getTile(j, i).index;
                    map.replace( index, tile, j, i, 1, 1 );
                }
            }
        }
    };

    function tratarTeclas (key) {
        if (!tabuleiro.gameOver()) {
            if (tabuleiro.movimento(key.keyCode) && tabuleiro.haAlgumaCasaVazia()) {
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            }
        } else {
            tabuleiro.iniciado = 0;
            if (confirm('O jogo acabou. Deseja reiniciar?')) {
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            }
        }

        document.getElementById('painelScore').textContent = tabuleiro.pontuacao;
    }

    jogo.state.add('prejogo', prejogo); 
    jogo.state.add('estadojogo', estadojogo);
    
    jogo.state.start('prejogo');   
} () );