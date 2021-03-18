import * as GC from "./Constants.js";
import LEVEL from "./Level.js";

class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });

		this.markus = null;

		this.obstacles = [];
		this.mood = 0;
		this.infected = 1000;
		this.vaccinated = 0;
		this.masked = 0;
		this.opened = 0;
		this.hidden = 0;
		this.background1 = null;
		this.background2 = null;

		this.lastPostion = 0;
		this.position = 0;
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

        this.input.once('pointerdown', function () {
            console.log('switching to EndScene');
            this.scene.start('EndScene');
        }, this);

        //this.fillObjects();

        // key to open doors
        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        // syringe to vaccinate people
        this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        // masks to give it to people
        this.three = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        // disguise with sunglasses
        this.four = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
	}

	update() {
		this.position =+ this.lastPosition - this.background1.x;
		if(this.background1.x < -GC.WIDTH) this.background1.x += 2 * GC.WIDTH;
		if(this.background2.x < -GC.WIDTH) this.background2.x += 2 * GC.WIDTH;
		this.lastPosition = this.background1.x;

		this.fillObjects();

		this.checkHitAndCount();
	}

	checkHitAndCount() {
		// find objects that are within the HIT_RANGE of markus
		//console.log(this.markus.x, this.obstacles.map(obj => obj.x));
		let hitObjs = this.obstacles.filter(
			obj => {obj.x <= this.markus.x + GC.HIT_REGION && obj.x >= this.markus.x - GC.HIT_REGION}
		);
		// find objects that are left of the HIT_RANGE of markus and markus has not reacted to them
		let notReactedObjs = this.obstacles.filter(
			obj => {obj.x <= this.markus.x - GC.HIT_REGION && obj.data.get('reacted') === false}
		);

		// open doors
		if (this.one.isDown) {
			console.log('OPEN doors');

			let houses = hitObjs.filter( obj => obj.data.get('type') === GC.TYPE_HOUSE);

			// do open doors
			houses.forEach( house => {
				// store on the house that it has been opened - we use the same attribute
				// for all game objects so that we can identify those that have not been handled
				house.data.set('reacted', true);
			} );

			// score the opening
			this.opened += houses.length;
		}

		// vaccinate people
		if (this.two.isDown) {
			console.log('VACCINATE people');

			let humans = hitObjs.filter( obj => obj.data.get('type') === GC.TYPE_PERSON);

console.log(this.markus.x, this.obstacles.map(obj => obj.x));	
			console.log(humans.length);

			// do vaccinate humans
			humans.forEach( human => {
				// store on the human that they have been vaccinated
				human.data.set('reacted', true);
			} );

			// score the vaccination
			this.vaccinated += humans.length;
		}

		// mask people
		if (this.three.isDown) {
			console.log('MASK people');

			let humans = hitObjs.filter( obj => obj.data.get('type') === GC.TYPE_PERSON);

			// do mask humans
			humans.forEach( human => {
				// store on the human that they have been masked
				human.data.set('reacted', true);
			} );

			// score the masking
			this.masked += humans.length;
		}

		// disguise with sunglasses
		if (this.four.isDown) {
			console.log('DISGUISE');

			let demonstrations = hitObjs.filter( obj => obj.data.get('type') === GC.TYPE_DEMONSTRATION);

			// do mask humans
			demonstrations.forEach( human => {
				// store on the demonstrations that markus has disguised
				demonstrations.data.set('reacted', true);
			} );

			// score the disguise
			this.hidden += demonstrations.length;
		}
	}

	fillObjects() {
		while(LEVEL[this.levelIterator] && LEVEL[this.levelIterator].deltaX + this.levelIterationX 
			< this.position + GC.WIDTH) {
			switch(LEVEL[this.levelIterator].type) {
				case 'person':
					this.createPerson(LEVEL[this.levelIterator]);
				break;
			}
			this.levelIterationX =+ LEVEL[this.levelIterator].deltaX;
			this.levelIterator++;
		}
	}

	createPerson(obj) {
		let person = this.add.sprite(
			LEVEL[this.levelIterator].deltaX + this.levelIterationX - this.position, 
			GC.HEIGHT - GC.FLOOR_HEIGHT,
			'gang', 3
		);
		person.setOrigin(0, 1);
		this.physics.add.existing(person);
		person.body.setVelocityX(GC.PERSON_SCROLL_SPEED);
		person.setDataEnabled();
		person.data.set('type', 'person');
		person.data.set('reacted', false);
		this.obstacles.push(person);
	}

}
export default GameScene;