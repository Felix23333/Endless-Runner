class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image("background", "assets/testbackground.png");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 16, frameHeight: 48, startFrame: 0, endFrame: 1});//player is now a spritesheet
        
            //Frame 0: standing player, facing right
            //Frame 1: ducking player. facing right
        this.load.image("plain", "assets/testplain.png");
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
        this.player = new Player(this, game.config.width / 2, 360, "player", 0);
        this.playerDuck = new Player(this, game.config.width / 2, 360, "player", 1);
        
        //Keyboard input
        jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        duckKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //animation config
        this.anims.create({
            key: 'duckAnim',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1, first: 1}),
            frameRate: 1
        });
        //
        this.firstJump = true;
        gravityKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update()
    {
        this.player.update();
        this.frameLoad(this.player, this.playerDuck);
        this.background.tilePositionX += 2;
    }
    
    frameLoad(player, playerDuck)
    {
        //change the frame of an object
        if(player.isDuck){
            player.alpha = 0;
            playerDuck.alpha = 1;
        }
        if(!player.isDuck){
            player.alpha = 1;
            playerDuck.alpha = 0;
        }
    }
}