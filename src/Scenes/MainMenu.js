class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        //The hurt effect is reused from my CMPM80K game project
        this.load.audio("hurt", "assets/player-hurt.wav");
        //The menu & play music is from royalty free music,
        //epidemicsound.com/music/genres/electro/?_us=adwords&_usx=11282646959_&gclid=CjwKCAiA9vOABhBfEiwATCi7GHNKfLA29qr2qCiNelpEUg-gbymFchVhzs1kjlT53VkqWRp6M_jZuxoCiK8QAvD_BwE
        this.load.audio("backgroundMusic", "assets/backgroundmusic.mp3");
        this.load.audio("menuMusic", "assets/intromusic.mp3");
        //The collect sfx is modified by
        //https://www.videvo.net/sound-effect/water-lapping-closeu-b-t053901/261257/
        //https://www.videvo.net/sound-effect/human-swallow-02/429168/
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