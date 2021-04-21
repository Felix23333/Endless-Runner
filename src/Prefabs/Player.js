class Player extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.jumpHeight = 3;
        this.isJump = false;
    }

    Jump()
    {
        this.y -= this.jumpHeight;
    }

    Fall()
    {
        this.y += this.jumpHeight;
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
        }
    )

    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(jumpKey) && !this.isJump)
        {
            this.isJump = true;
            this.JumpDetect();
        }
    }
}