class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image("background", "assets/testbackground.png");
        this.load.image("player", "assets/testplayer.png");
        this.load.image("plain", "assets/testplain.png");
    }

    create()
    {
        //set background
        this.background = this.add.tileSprite(
            0, 0, 640, 480, "background"
        ).setOrigin(0);
        
        //set plain
        this.plain = this.add.tileSprite(
            0, 380, 640, 100, "plain"
        ).setOrigin(0);

        //add Player
        this.player = new Player(this, game.config.width / 2, 360, "player");
    }

    update()
    {
        this.background.tilePositionX += 2;
    }
}