class Player extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.jumpHeight = 3;
        this.isJump = false;
        this.isDuck = false;
        this.isChangingGravity = false;
        this.gravity = true;
        this.changeSpeed = 0.1;
        this.currentFrame = 0;
    }

    Jump()
    {
        if(this.gravity)
        {
            this.y -= this.jumpHeight;
        }
        else
        {
            this.y += this.jumpHeight;
        }
        
    }

    Fall()
    {
        if(this.gravity)
        {
            this.y += this.jumpHeight;
        }
        else
        {
            this.y -= this.jumpHeight;
        }
    }

    Gravity()
    {
        if(this.gravity)
        {
            this.y += this.jumpHeight * 3;
        }
        else
        {
            this.y -= this.jumpHeight * 3;
        }
    }

    JumpDetect()
    {
        this.jump = this.scene.time.addEvent({ delay: 10, callback: this.Jump, 
            callbackScope: this, repeat: 17 });
        this.fall = this.scene.time.addEvent({ delay: 10, callback: this.Fall, 
            callbackScope: this, repeat: 17, paused: true });
        this.scene.time.delayedCall(300, () => {
                this.fall.paused = false;
            }
        )
        this.scene.time.delayedCall(600, () => {
            this.isJump = false;
        })
    }

    ChangeGravity()
    {
        if(this.gravity)
        {
            //animation version change gravity
            this.scene.time.addEvent({ delay: 10, callback: this.Gravity, 
                callbackScope: this, repeat: 32 });
            this.scene.time.delayedCall(550, () => {
                    this.y = 365;
                    this.isChangingGravity = false;
                }
            )
        }
        else
        {

            //animation version change gravity
            this.scene.time.addEvent({ delay: 10, callback: this.Gravity, 
                callbackScope: this, repeat: 32 });
            this.scene.time.delayedCall(550, () => {
                    this.y = 65;
                    this.isChangingGravity = false;
                }
            )
        }
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(jumpKey) && !this.isJump && !this.isChangingGravity && !this.isDuck)
        {
            this.isJump = true;
            this.JumpDetect();
        }
        if(duckKey.isDown && !this.isJump && !this.isChangingGravity)
        {
            this.isDuck = true;
        }else{
            this.isDuck = false;
        if(Phaser.Input.Keyboard.JustDown(gravityKey) && !this.isChangingGravity && !this.isJump && !this.isDuck)
        {
            this.gravity = !this.gravity;
            this.isChangingGravity = true;
            this.ChangeGravity();
        }
        }
        
        this.currentFrame = this.frame;
    }
}