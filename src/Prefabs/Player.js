class Player extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.jumpHeight = 3;
        this.isJump = false;
        this.isChangingGravity = false;
        this.gravity = true;
        this.changeSpeed = 0.1;
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
            callbackScope: this, repeat: 30 });
        this.fall = this.scene.time.addEvent({ delay: 10, callback: this.Fall, 
            callbackScope: this, repeat: 30, paused: true });
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
            //teleport version
            //while(this.y <= 360)
            //{
            //    this.y += this.changeSpeed;
            //}
            //this.y = 360;

            //animation version
            this.scene.time.addEvent({ delay: 10, callback: this.Gravity, 
                callbackScope: this, repeat: 26 });
            this.scene.time.delayedCall(270, () => {
                    this.y = 365;
                    this.isChangingGravity = false;
                }
            )
        }
        else
        {
            //teleport version
            //while(this.y >= 120)
            //{
            //this.y -= this.changeSpeed;   
            //}
            //this.y = 120;

            //animation version
            this.scene.time.addEvent({ delay: 10, callback: this.Gravity, 
                callbackScope: this, repeat: 26 });
            this.scene.time.delayedCall(270, () => {
                    this.y = 115;
                    this.isChangingGravity = false;
                }
            )
        }
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(jumpKey) && !this.isJump && !this.isChangingGravity)
        {
            this.isJump = true;
            this.JumpDetect();
        }
        if(Phaser.Input.Keyboard.JustDown(gravityKey) && !this.isChangingGravity)
        {
            this.isChangingGravity = true;
            this.gravity = !this.gravity;
            this.ChangeGravity();
        }
    }
}