import Phaser from 'phaser'
import logoImg from '@/assets/logo.png'
const ColorTheme = [0xffc64b, 0x0aa344, 0xdb5a6b, 0x0aa344, 0xe9bb1d, 0x9d2933, 0x4c221b, 0x801dae, 0x725e82, 0xef7a82, 0x827100]
class NoteBrick {
  constructor (scene, x = 0, y = 0, width = 100, height = 100, index = 0) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.index = index
    this.scene = scene

    this.create()
  }

  create () {
    const colorThemeIndex = Phaser.Math.Between(0, ColorTheme.length - 1)
    const graphics = new Phaser.GameObjects.Graphics(this.scene)
    graphics.fillStyle(ColorTheme[colorThemeIndex])
    graphics.fillRoundedRect(this.x, this.y, this.width, this.height, 10)
    this.gameObject = graphics
    this.scene.tweens.add({
      targets: graphics,
      y: this.scene.game.canvas.height - this.height,
      ease: 'Linear',
      loop: -1,
      yoyo: true,
      duration: 3000,
      delay: 100 * this.index
    })
  }
}

class NoteGrid {
  constructor (scene) {
    this.scene = scene
    this.colNum = 5
    this.colWidth = 100
    this.create()
  }

  create () {
    this.container = new Phaser.GameObjects.Container(this.scene)
    this.container.width = this.colNum * this.colWidth
    this.container.height = this.scene.game.canvas.height
    const grid = new Phaser.GameObjects.Grid(
      this.scene,
      this.container.width / 2,
      this.container.height / 2,
      this.container.width,
      this.container.height,
      this.colWidth,
      this.colWidth,
      0x00b9f2,
      0.5).setAltFillStyle(0x016fce).setOutlineStyle()
    this.container.add(grid)
    // this.scene.add.grid(300, 340, 512, 256, 64, 64, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle()
    // this.scene.add.grid((this.scene.game.canvas.width - this.container.width) / 2, 0, this.container.width, this.container.height, this.colWidth, this.colWidth, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle()
    let noteBrick = null
    for (let i = 0; i < this.colNum; i++) {
      noteBrick = new NoteBrick(this.scene, i * this.colWidth, 0, 100, 100, i)
      this.container.add(noteBrick.gameObject)
    }

    this.scene.add.container((this.scene.game.canvas.width - this.container.width) / 2, 0, this.container)

    // const noteBricks = []
    // this.group = this.scene.add.group()
    // for (let i = 0; i < this.colNum; i++) {
    //   // noteBricks.push(new NoteBrick(this.scene, i * this.colWidth, 0))
    //   this.group.create(new NoteBrick(this.scene, i * this.colWidth, 0))
    // }
    // Phaser.Actions.IncX(this.group.getChildren(), this.colWidth)
    // this.container = new Phaser.GameObjects.Container(this.scene)
    // this.scene.add.container((this.scene.game.canvas.width - this.container.width) / 2, 0, this.container)
  }
}

class Base extends Phaser.Scene {
  constructor () {
    super('game-scene')
  }

  preload () {
    this.load.image('logo', logoImg)
  }

  create () {
    const logo = this.add.image(400, 150, 'logo')
    // eslint-disable-next-line no-new
    new NoteGrid(this, 0, 0)
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })
  }
}

export default Base
