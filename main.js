

function iniciaJogo () {
    var jogo = new Phaser.Game( 800, 800, Phaser.AUTO, 'containerJogo');
    var tabuleiro = new Tabuleiro();
    var map;

    var estado = {

        preload:  function () {
            this.load.tilemap('tilemap2048', 'assets/tiled2048.csv');
            this.load.image('tilesetimage', 'assets/tiles.png');
        },

        create: function () {
            var dimension = redimensionarJogo();
            var d = dimension / 800;

            tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());

            map = this.game.add.tilemap('tilemap2048', 200, 200);
            map.addTilesetImage('tileset2048', 'tilesetimage', 200, 200);

            this.backgroundLayer = map.createLayer(0);
            this.backgroundLayer.scale = new Phaser.Point(d, d);

            this.game.scale.setGameSize(dimension, dimension);

            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.downKey.onDown.add( tratarTeclas, this);

            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.upKey.onDown.add( tratarTeclas, this);

            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.rightKey.onDown.add( tratarTeclas, this);

            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.leftKey.onDown.add( tratarTeclas, this);

            console.log( this.game.time);
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
            tabuleiro.movimento(key.keyCode);
            if (tabuleiro.haAlgumaCasaVazia()) {
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            }
        } else {
            tabuleiro.iniciado = 0;
            if (confirm('O jogo acabou. Deseja reiniciar?')) {
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
                tabuleiro.iniciarCasa(tabuleiro.randomNumeroInicial());
            }
        }
    }


    function redimensionarJogo () {
        var height = 800, width = 800, dimension = 800;
        
        height = 0.8 * (window.innerHeight * window.devicePixelRatio) > 800 ? 800 : 0.8 * (window.innerHeight * window.devicePixelRatio);
        width = 0.8 * (window.innerWidth * window.devicePixelRatio) > 800 ? 800 : 0.8 * (window.innerWidth * window.devicePixelRatio);
        
        dimension = width > height ? height : width;

        return dimension;
    }

    jogo.state.add('estado', estado);

    jogo.state.start('estado');   
}