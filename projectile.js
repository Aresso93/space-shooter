class Projectile extends GameObject {

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.speed = 15;
        this.isAlive = true;
    }

    draw(ctx){
        super.draw(ctx);
    }

    move(){
        this.y = this.y - this.speed;
        this.outOfGame();
    }

    outOfGame(){

        if (this.y + this.height <= 0) {                                 //questo dice che se l'angolino in basso a sx oltrepassa il bordo della canvas, deve despawnare
           this.isAlive = false; 
        }

    }
}