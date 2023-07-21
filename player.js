class Player extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.speed = 10;                    //la velocità è espressa in pixel per frame
    this.controller = {};
    this.projectiles = [];
    this.cooldown = 15;
  }

  draw(ctx) {
    super.draw(ctx);
    this.cooldown --;    
    this.projectiles = this.projectiles.filter(p => p.isAlive);                                                            //per far scomparire il proiettile dalla pagina, bisogna toglierlo dall'array dei proiettili
    for (let i = 0; i < this.projectiles.length; i++) {         //sennò continua a sovraccaricare la memoria alla lunga
        const proj = this.projectiles[i];
        proj.draw(ctx);
        proj.move(ctx);
    }
  }



  control(canvasWidth, canvasHeight) {
    document.onkeydown = (keyevent => {

      this.controller[keyevent.key] = true;
    });
      document.onkeyup = (keyevent => {
        
        this.controller[keyevent.key] = false;
      });

      console.log(this.controller);
  
        for (const key in this.controller) {
           if(key.includes('Left') && this.controller[key] === true){
            this.x = this.x > 0 ? this.x - this.speed : 0;
           }

           if(key.includes('Right') && this.controller[key] === true){
            this.x = (this.x + this.width) < canvasWidth ? this.x + this.speed : canvasWidth - this.width;
           }
           if(key.includes('Up') && this.controller[key] === true){
            this.y = this.y > 0 ? this.y - this.speed : 0;
           }
           if(key.includes('Down') && this.controller[key] === true){
            this.y = (this.y + this.height) < canvasHeight ? this.y + this.speed : canvasHeight - this.height;
            }

           

           if(key === ' ' && this.controller[key] === true){
            this.baseAttack();
           }

        }  

    }

        baseAttack(){
            if (this.cooldown <= 0) {
                let proj = new Projectile(this.x + (this.width/2) -2.5, this.y, 5, 20);
                this.projectiles.push(proj);
                this.cooldown = 15;                     //quando il cooldown arriva a 0, torna a 30
            }
           
        }

}
