class GameScene extends Phaser.Scene {
	constructor() {
		super('game');
	}

	preload() {
	}

	create() {
	}

	update() {
	}
}


let game = new Phaser.Game({
	parent: 'phaser',
	width: 1024,
	height: 256,
	physics: {
		default: 'arcade',
	},
	scene: [GameScene]
});

export default game;