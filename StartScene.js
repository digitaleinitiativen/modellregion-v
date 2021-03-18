import * as GC from "./Constants.js";

class StartScene extends Phaser.Scene {

    constructor () {
        super({ key: 'StartScene' });
    }

    preload () {
        this.load.image('backgroundStart', 'img/backgroundStart.png');
    }

    create () {
        this.background = this.add.image(GC.WIDTH/2, GC.HEIGHT/2, 'backgroundStart');
        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {
            console.log('switching to GameScene');
            this.scene.start('GameScene');
        }, this);
    }
}

export default StartScene;