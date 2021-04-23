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
        this.load.image("plainDown", "assets/testplain.png");
        this.load.image("plainUp", "assets/testplain2.png");
    }

    create()
    {
        //set background
        this.background = this.add.tileSprite(
            0, 0, 640, 480, "background"
        ).setOrigin(0);
        
        //set plain
        this.plainDown = this.add.tileSprite(
            0, 380, 640, 100, "plainDown"
        ).setOrigin(0);

        this.plainUp = this.add.tileSprite(
            0, 0, 640, 100, "plainUp"
        ).setOrigin(0);

        //add Player
        this.player = new Player(this, game.config.width / 2, 360, "player");

        //Keyboard input
        jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        gravityKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update()
    {
        this.player.update();
        this.background.tilePositionX += 2;
    }
}