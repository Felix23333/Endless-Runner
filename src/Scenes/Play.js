class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image("background", "assets/testbackground.png");
        this.load.spritesheet("player", "assets/testplayer.png", {frameWidth: 16, frameHeight: 48, startFrame: 0, endFrame: 13});//player is now a spritesheet
            //Frame 0 - 3: standing player, walking animation, facing right
            //Frame 4 - 6: ducking animation
            //Frame 7 - 10: upside down standing player, walking animation, facing right
            //Frame 11 - 13: upside down ducking animation
        this.load.spritesheet("box", "assets/box.png", {frameWidth: 24, frameHeight: 72, startFrame: 0, endFrame: 2});
        this.load.image("collection", "assets/testcollect.png");
        this.load.spritesheet("lives", "assets/testlive.png", {frameWidth: 144, frameHeight: 48, startFrame: 0, endFrame: 2});
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 368, frameHeight: 387, startFrame: 0, endFrame: 3});
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
        this.isPlayingDuck = false;
        //set background
        this.background = this.add.tileSprite(
            0, 0, 640, 480, "background"
        ).setOrigin(0);

        //set plain
        // this.plainDown = this.add.tileSprite(
        //     0, 380, 640, 100, "plainDown"
        // ).setOrigin(0);

        // this.plainUp = this.add.tileSprite(
        //     0, 0, 640, 100, "plainUp"
        // ).setOrigin(0);

        
        //music stuff
        this.hurtSFX = this.sound.add("hurt");
        //add box
        this.box1 = new Box(this, game.config.width, 365, "box", 0).setOrigin(0);
        this.box2 = new Box(this, game.config.width * 1.5, 65, "box", 0).setOrigin(0);
        this.box2.flipY = true;

        //add collection
        this.collection1 = new Collection(this, game.config.width, 310, "collection", 0).setOrigin(0);
        this.collection2 = new Collection(this, game.config.width, 150, "collection", 0).setOrigin(0);

        //Keyboard input
        jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        duckKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        gravityKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //track score
        this.scoretext = this.add.text(420, 33, "Score: ", scoreConfig2).setOrigin(0);
        this.score = this.add.text(500, 25, score, scoreConfig).setOrigin(0);

        //change gamespeed overtime
        this.time.addEvent({ delay: 5000, callback: this.addDiff, 
            callbackScope: this, loop: true });

        //animation configuration
        this.anims.create({
            key: 'ex',
            frames: this.anims.generateFrameNumbers('explosion', {frames: [0, 1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'upsideWalk',
            frames: this.anims.generateFrameNumbers('player', {frames: [7, 8, 9, 10]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'duck',
            frames: this.anims.generateFrameNumbers('player', {frames: [4, 5, 6]}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'upsideDuck',
            frames: this.anims.generateFrameNumbers('player', {frames: [11, 12, 13]}),
            frameRate: 10,
            repeat: 0
        });
        //const keys = ['walk', 'upsideWalk', 'duck', 'upsideDuck'];
        //add Player
        this.player = new Player(this, game.config.width / 2, 365, "player", 0).setOrigin(0);
        //this.player = this.add.sprite(game.config.width /2 , 360).setOrigin(0);
        //this.player.play('walk');

        //set explosion
        this.explosion = this.add.sprite(
            -200, 40/*, game.config.width / 2, game.config.width / 2, 'explosion'*/
        ).setOrigin(0);
        this.explosion.setScale(1);
        this.explosion.play('ex');
        //set lives
        this.lives = new Lives(this, 100, 15, "lives", 0).setOrigin(0);

        
    }
    
    frameLoad(player)
    {
        //change the frame of an object
        if(player.isDuck){
            if(player.gravity){
                //player.anims.play('duck', true);
                //this.isPlayingDuck = true;
                player.setFrame(5);
            }else{
                //player.anims.play('upsideDuck',true);
                //this.isPlayingDuck = true;
                player.setFrame(12);
            }
        }
        if(!player.isDuck){
            this.isPlayingDuck = false;
            if(player.gravity){
                //player.setFrame(0);
                player.anims.play('walk', true);
            }else{
                if(!player.isChangingGravity){
                    player.anims.play('upsideWalk', true);
                    //player.setFrame(7);
                }
            }
        }
    }

    checkCollision(player, box)
    {
        if(box.currentFrame == 1){//boxes are stacked
            if(!player.isDuck){
                if(player.x < box.x + box.width &&
                    player.x + player.width > box.x &&
                    player.y < box.y + box.height &&
                    player.y + player.height > box.y){
                        return true;
                    }else{
                        return false;
                    }
            }else{
                if(player.x < box.x + box.width &&
                    player.x + player.width > box.x &&
                    player.y + (player.height / 2) < box.y + box.height &&
                    player.y + player.height > box.y){
                        return true;
                    }else{
                        return false;
                    }
            }
        }else if(box.currentFrame == 0){//only bottom box
            if(!player.isDuck){
                if(player.x < box.x + box.width &&
                    player.x + player.width > box.x &&
                    player.y < box.y + box.height &&
                    player.y + player.height > box.y + (box.height / 2)){
                        return true;
                    }else{
                        return false;
                    }
            }else{
                    if(player.x < box.x + box.width &&
                        player.x + player.width > box.x &&
                        player.y + (player.height / 2) < box.y + box.height &&
                        player.y + player.height > box.y + (box.height / 2)){
                            return true;
                        }else{
                            return false;
                        }
            }
        }else if(box.currentFrame == 2){//only top box
            if(!player.isDuck){
                if(player.x < box.x + box.width &&
                    player.x + player.width > box.x &&
                    player.y < box.y + (box.height/2) &&
                    player.y + player.height > box.y){
                        return true;
                    }else{
                        return false;
                    }
            }else{
                    if(player.x < box.x + box.width &&
                        player.x + player.width > box.x &&
                        player.y + (player.height / 2) < box.y + (box.height/2) &&
                        player.y + player.height > box.y){
                            return true;
                        }else{
                            return false;
                        }
            }
        }else{
            if(!player.isDuck){
                if(player.x < box.x + box.width &&
                    player.x + player.width > box.x &&
                    player.y < box.y + box.height &&
                    player.y + player.height > box.y){
                        return true;
                    }else{
                        return false;
                    }
            }else{
                if(player.x < box.x + box.width &&
                    player.x + player.width > box.x &&
                    player.y + (player.height / 2) < box.y + box.height &&
                    player.y + player.height > box.y){
                        return true;
                    }else{
                        return false;
                    }
            }
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
                this.hurtSFX.play();
                lives--;
                this.box1.reset();
            }
            if(this.checkCollision(this.player, this.box2)){//resets the position of the box when there is a collision between the player and the box
                this.hurtSFX.play();
                lives--;
                this.box2.reset();
            }
            this.frameLoad(this.player);
            this.background.tilePositionX += 2;

            if(lives == 2){
                this.explosion.x = -100;
            }else if(lives == 1){
                this.explosion.x = -40;
            }
            if(lives == 0){
                this.explosion.x = 10;
            }
            this.explosion.setScale((Math.random()*0.02) + 1);
        }
        else
        {
            this.scene.start("endScene");
        }
        
    }
}