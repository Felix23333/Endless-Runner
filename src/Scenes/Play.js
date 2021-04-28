class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image("background", "assets/testbackground.png");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 16, frameHeight: 48, startFrame: 0, endFrame: 3});//player is now a spritesheet
            //Frame 0: standing player, facing right
            //Frame 1: ducking player. facing right
            //Frame 2: standing player with inverse gravity
            //Frame 3: ducking player with inverse gravity
        this.load.image("plain", "assets/testplain.png");
        this.load.image("plainDown", "assets/testplain.png");
        this.load.image("plainUp", "assets/testplain2.png");
        this.load.image("woodBox", "assets/woodenBox.png");
        this.load.image("collection", "assets/testcollect.png");
        this.load.spritesheet("lives", "assets/testlive.png", {frameWidth: 144, frameHeight: 48, startFrame: 0, endFrame: 2});
    }

    create()
    {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#DEFACE',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
        }

        //init some values
        score = 0;
        gameSpeed = 1;
        lives = 3;
        gameOver = false;
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

        //set lives
        this.lives = new Lives(this, 100, 40, "lives", 0);

        //add Player
        this.player = new Player(this, game.config.width / 2, 360, "player", 0);
        
        //add box
        this.box1 = new Box(this, game.config.width, 372, "woodBox", 0);
        this.box2 = new Box(this, game.config.width * 1.5, 108, "woodBox", 0);

        //add collection
        this.collection1 = new Collection(this, game.config.width, 300, "collection", 0);
        this.collection2 = new Collection(this, game.config.width, 180, "collection", 0);

        //Keyboard input
        jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        duckKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        gravityKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //track score
        this.scoretext = this.add.text(420, 33, "Score: ", scoreConfig2);
        this.score = this.add.text(500, 25, score, scoreConfig);

        //change gamespeed overtime
        this.time.addEvent({ delay: 5000, callback: this.addDiff, 
            callbackScope: this, loop: true });
        
    }
    
    frameLoad(player, playerDuck, playerUpsideDown, playerDuckUpsideDown)
    {
        //change the frame of an object
        if(player.isDuck){
            if(player.gravity){
                player.setFrame(1);
            }else{
                player.setFrame(3);
            }
        }
        if(!player.isDuck){
            if(player.gravity){
                player.setFrame(0);
            }else{
                if(!player.isChangingGravity){
                    player.setFrame(2);
                }
            }
        }
    }

    checkCollision(player, box)
    {
        if(player.x < box.x + box.width &&
            player.x + player.width > box.x &&
            player.y < box.y + box.height &&
            player.y + player.height > box.y){
                return true;
            }else{
                return false;
            }
    }

    addDiff()
    {
        gameSpeed += 0.1;
    }

    update()
    {
        if(!gameOver)
        {
            this.lives.updateLives();
            this.score.text = score;
            this.player.update();
            this.box1.update();
            this.box2.update();
            this.collection1.update();
            this.collection2.update();
            if(this.checkCollision(this.player, this.collection1))
            {
                this.collection1.reset();
                score += 1;
            }
            if(this.checkCollision(this.player, this.collection2))
            {
                this.collection2.reset();
                score += 1;
            }
            if(this.checkCollision(this.player, this.box1)){//resets the position of the box when there is a collision between the player and the box
                lives--;
                this.box1.reset();
            }
            if(this.checkCollision(this.player, this.box2)){//resets the position of the box when there is a collision between the player and the box
                lives--;
                this.box2.reset();
            }
            this.frameLoad(this.player, this.playerDuck, this.playerUpsideDown, this.playerDuckUpsideDown);
            this.background.tilePositionX += 2;
        }
        
    }
}