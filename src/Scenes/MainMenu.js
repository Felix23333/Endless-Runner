class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {

    }

    create()
    {
        console.log("Open Game!");
        this.input.keyboard.on('keydown-S', this.StartGame, this);
    }

    StartGame()
    {
        this.scene.start("playScene");
    }
}