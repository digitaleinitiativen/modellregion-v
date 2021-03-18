import * as GC from "./Constants.js";

class EndScene extends Phaser.Scene {

    constructor () {
        super({ key: 'EndScene' });
    }

    preload () {
        this.load.image('backgroundEnd', 'img/backgroundEnd.png');
    }

    create () {
        this.background = this.add.image(GC.WIDTH/2, GC.HEIGHT/2, 'backgroundEnd');
        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {
            console.log('switching to StartScene');
            this.scene.start('StartScene');
        }, this);
    }
}

export default EndScene;