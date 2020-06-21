import Phaser from 'phaser'
import BaseScene from './scene/base'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [BaseScene]
}
// eslint-disable-next-line no-new
new Phaser.Game(config)
