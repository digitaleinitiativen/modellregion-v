class GameScene extends Phaser.Scene {
	constructor() {
		super('game');

		this.markus = null;
	}

	preload() {
		this.load.spritesheet('markus-w', 'img/markus-w.png', {
			frameWidth: 96,
			frameHeight: 128
		});
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
	}

	create() {
		this.add.image(512, 128, 'background');
		this.add.image(512, 256 - 32 / 2, 'floor');

		this.markus = this.add.sprite(128, 256 - 34 - 128 / 2, 'markus-w', 0);
		this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('markus-w', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.markus.play('walk');
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