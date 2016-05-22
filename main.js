var jogo = new Phaser.Game(800, 800, Phaser.AUTO, 'containerJogo');

var estado = new Phaser.State();

estado.prototype = {
	preload:  function () {
		var tijolos = [];

	},
	create: function () {

	},
	update: function () {

	}
};

jogo.state.add(estado, 'estado');

jogo.state.start('estado');