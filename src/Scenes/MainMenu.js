class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.audio("hurt", "assets/player-hurt.wav");
    }

    create()
    {
        console.log("Open Game!");
        this.input.keyboard.on('keydown-S', this.StartGame, this);
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x0081FA).setOrigin(0);
    }

    StartGame()
    {
        this.scene.start("playScene");
    }
}