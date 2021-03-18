import * as GC from "./Constants.js";

class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });

		this.markus = null;
		this.background1 = null;
		this.background2 = null;
	}

	preload() {
		this.load.spritesheet('markus-w', 'img/markus-w.png', {
			frameWidth: 96,
			frameHeight: 128
		});
		this.load.image('backgroundGame', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
	}

	create() {
		this.background1 = this.add.image(0, 0, 'backgroundGame');
		this.background2 = this.add.image(GC.WIDTH, 0, 'backgroundGame');
		this.background1.setOrigin(0);
		this.background2.setOrigin(0);
		this.physics.add.existing(this.background1);
		this.background1.body.setVelocityX(GC.BACKGROUND_SCROLL_SPEED);
		this.physics.add.existing(this.background2);
		this.background2.body.setVelocityX(GC.BACKGROUND_SCROLL_SPEED);

		this.add.image(GC.WIDTH/2, GC.HEIGHT - 32 / 2, 'floor');

		this.markus = this.add.sprite(128, GC.HEIGHT - 34 - 128 / 2, 'markus-w', 0);
		this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('markus-w', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.markus.play('walk');

        this.input.once('pointerdown', function () {
            console.log('switching to EndScene');
            this.scene.start('EndScene');
        }, this);
	}

	update() {
		if(this.background1.x < -GC.WIDTH) this.background1.x += 2 * GC.WIDTH;
		if(this.background2.x < -GC.WIDTH) this.background2.x += 2 * GC.WIDTH;
	}
}
export default GameScene;