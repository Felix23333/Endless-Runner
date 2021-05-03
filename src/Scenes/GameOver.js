class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("endScene");
    }

    preload()
    {
        this.load.image("score", "assets/Score_Holder.png");
        this.load.image("deathScreen","assets/deathScreen.png")
    }

    create()
    {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#000000',
        }
        console.log("End Game!");
        this.input.keyboard.on('keydown-M', this.BackToMain, this);
        this.input.keyboard.on('keydown-R', this.Restart, this);
        this.add.sprite(0, 0, "deathScreen").setOrigin(0);
        this.add.sprite(game.config.width / 4 , game.config.height / 2, "score").setOrigin(0);
        this.add.text(365, 265, score, scoreConfig).setOrigin(0);
    }

    BackToMain()
    {
        this.scene.start("menuScene");
    }

    Restart()
    {
        this.scene.start("playScene");
    }
}