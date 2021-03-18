import * as GC from "./Constants.js";
import StartScene from "./StartScene.js";
import GameScene from "./GameScene.js";
import EndScene from "./EndScene.js";

let game = new Phaser.Game({
	parent: 'phaser',
	width: GC.WIDTH,
	height: GC.HEIGHT,
	physics: {
		default: 'arcade',
	},
	scene: [/*StartScene, */GameScene, EndScene]
});

export default game;