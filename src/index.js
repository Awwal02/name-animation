
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 10;
let adjustY =  10;
let mouse = {
  x: null,
  y: null,
  radius: 450
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
//   console.log(event);
//   console.log(mouse.x);
  mouse.y = event.y;
});

ctx.fillStyle='white';
ctx.font = "90px Verdana";
ctx.fillText("Aashna", 20, 60)
const textCoordinates =ctx.getImageData(0,0,500,500);
// ctx.

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX =  this.x;
        this.baseY = this.y;
        this.density =  Math.random()* 30 + 1;
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x , this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();        
    }
    update() {
        // console.log('test');
        // console.log(mouse.x, mouse.y);
        let dx = mouse.x - this.x;
        let dy =  mouse.y - this.y;
        
        let distance = Math.hypot(dx,dy);
        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance -distance) / maxDistance;
        // console.log(dx, dy,distance);
        let directionX =  forceDirectionX * force * this.density;
        let directionY =  forceDirectionY * force * this.density;
        if(distance < mouse.radius) {
            this.x -= directionX;//forceDirectionX * 3;
            this.y -= directionY;//forceDirectionY * 3;
            // this.size = 30;
        } else {
            if(this.x != this.baseX ){
            // this.size = 3;
            let dx = this.x - this.baseX;
            this.x -= dx/10;
            } 
            if(this.y != this.baseY ){
                // this.size = 3;
                let dy = this.y - this.baseY;
                this.y -= dy/10;
                }
        }
    }

}


function init() {
    particleArray = [];
    // for(let i=0;i<1000;i++) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     particleArray.push(new Particle(x, y));
    // }
    for(let y=0,y2=textCoordinates.height;y<y2;y++) {
        for(let x=0,x2=textCoordinates.width;x<x2;x++) {
            if(textCoordinates.data[(y*4*textCoordinates.width) + (x*4) + 3] > 128) {
                let positionX  = x + adjustX;
                let positionY  = y + adjustY;
                particleArray.push(new Particle(positionX *4, positionY * 4))
            }
        }
    }
    // particleArray.push(new Particle(50, 50));
    // particleArray.push(new Particle(80, 50));

}
init();

function animate() {
    ctx.clearRect(0,0,  canvas.width, canvas.height);
    for(let i=0;i< particleArray.length;i++) {
        particleArray[i].draw()
        particleArray[i].update()
    }
    // connect()
    requestAnimationFrame(animate);

}
animate()

function connect() {
    for(let a=0;a< particleArray.length;a++) 
    {
        for(let b=a;b < particleArray.length;b++) {
        //     let dx = mouse.x - this.x;
        // let dy =  mouse.y - this.y;
        
        // let distance = Math.hypot(dx,dy);
        let dx  =particleArray[a].x - particleArray[b].x;
        let dy  =particleArray[a].y - particleArray[b].y;
        let distance = Math.hypot(dx,dy);
        if(distance < 500) {
            ctx.strokeStyle='white';
            ctx.lineWidth= 2;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y)
            ctx.lineTo(particleArray[b].x, particleArray[b].y)
            
        ctx.stroke()
            // ctx.moveTo()
        }
        }
    }
}
