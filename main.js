

function iniciaJogo () {
    var jogo = new Phaser.Game(800, 800, Phaser.AUTO, 'containerJogo');

    var estado = {
        preload:  function () {
            /*this.load.image('tile0', 'assets/tile0.png');
            this.load.image('tile2', 'assets/tile2.png');
            this.load.image('tile4', 'assets/tile4.png');
            this.load.image('tile8', 'assets/tile2.png');
            this.load.image('tile16', 'assets/tile16.png');
            this.load.image('tile32', 'assets/tile32.png');
            this.load.image('tile64', 'assets/tile64.png');
            this.load.image('tile128', 'assets/tile128.png');
            this.load.image('tile256', 'assets/tile256.png');
            this.load.image('tile512', 'assets/tile512.png');
            this.load.image('tile1024', 'assets/tile1024.png');
            this.load.image('tile2048', 'assets/tile2048.png');*/
 
            this.load.tilemap('tilemap2048', null, tileset2048json, Phaser.Tilemap.TILED_JSON);
            
            var tilemap1 = new Phaser.Tilemap(this.game, 'tilemap2048', 200, 200, 4, 4);
            
            this.load.sprite('tilemapLayer', new Phaser.TilemapLayer(this.game, tilemap1, 0, 800, 800));

        },
        create: function () {
           //this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'tile0');
            
        },
        update: function () {

        }
    };

    jogo.state.add('estado', estado);

    jogo.state.start('estado');   
}