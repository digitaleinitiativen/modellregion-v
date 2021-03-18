import * as GC from "./Constants.js";

class GameScene extends Phaser.Scene {
	constructor() {
        super({ key: 'GameScene' });
	}

	preload() {
        this.load.image('backgroundGame', 'img/background.png');
	}

	create() {
        this.background = this.add.image(GC.WIDTH/2, GC.HEIGHT/2, 'backgroundGame');
        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {
            console.log('switching to EndScene');
            this.scene.start('EndScene');
        }, this);
	}

	update() {
	}
}

export default GameScene;