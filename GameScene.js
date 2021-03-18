import * as GC from "./Constants.js";
import LEVEL from "./Level.js";

class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });

		this.markus = null;
		this.background1 = null;
		this.background2 = null;
		this.person = null;

		this.lastPosition = 0;
		this.runPosition = 0;
		this.levelIterator = 0;
		this.levelIterationX = 0;
	}

	preload() {
		this.load.spritesheet('markus-w', 'img/markus-w.png', {
			frameWidth: 96,
			frameHeight: 128
		});
		this.load.image('backgroundGame', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.spritesheet('gang', 'img/gang.png', {
			frameWidth: 56,
			frameHeight: 128
		});
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

        this.fillObjects();
	}

	update() {
		this.runPosition += this.lastPosition - this.background1.x;
		if(this.background1.x < -GC.WIDTH) this.background1.x += 2 * GC.WIDTH;
		if(this.background2.x < -GC.WIDTH) this.background2.x += 2 * GC.WIDTH;
		this.lastPosition = this.background1.x;

		this.fillObjects();
	}

	fillObjects() {
		while(LEVEL[this.levelIterator] 
			&& LEVEL[this.levelIterator].deltaX + this.levelIterationX 
			<= this.runPosition + GC.WIDTH
		) {
			switch(LEVEL[this.levelIterator].type) {
				case 'person':
					this.createPerson(LEVEL[this.levelIterator]);
				break;
				case 'end':
					this.end();
				break;
			}
			this.levelIterationX =+ LEVEL[this.levelIterator].deltaX;
			this.levelIterator++;
		}
	}

	end() {
        this.scene.start('EndScene');
	}
	createPerson(obj) {
		let person = this.add.sprite(
			LEVEL[this.levelIterator].deltaX + this.levelIterationX - this.runPosition, 
			GC.HEIGHT - GC.FLOOR_HEIGHT,
			'gang', 3
		);
		person.setOrigin(0, 1);
		this.physics.add.existing(person);
		person.body.setVelocityX(GC.PERSON_SCROLL_SPEED);

		//person.data.set('type', 'person');
		//person.data.set('reacted', false);
	}

}
export default GameScene;