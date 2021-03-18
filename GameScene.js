import * as GC from "./Constants.js";

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
		this.add.image(GC.WIDTH/2, GC.HEIGHT/2, 'background');
		this.add.image(GC.WIDTH/2, GC.HEIGHT - 32 / 2, 'floor');

		this.markus = this.add.sprite(128, GC.HEIGHT - 34 - 128 / 2, 'markus-w', 0);
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
export default GameScene;