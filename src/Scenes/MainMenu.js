class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.audio("hurt", "assets/player-hurt.wav");
        this.load.audio("backgroundMusic", "assets/backgroundmusic.mp3");
        this.load.audio("menuMusic", "assets/introMusic.mp3");
        this.load.audio("sfx_collection", "assets/collectorEffect.mp3");
    }

    create()
    {
        console.log("Open Game!");
        this.input.keyboard.on('keydown-S', this.StartGame, this);
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x0081FA).setOrigin(0);

        if(!addMenuMusic)
        {
            addMenuMusic = true;
            menuMusic = this.sound.add("menuMusic");
            backgroundMusic = this.sound.add("backgroundMusic");
            menuMusic.loop = true;
            backgroundMusic.loop = true;
        }
        menuMusic.play();
    }

    StartGame()
    {
        this.scene.start("playScene");
        menuMusic.stop();
    }
}