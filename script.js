//const GRAVITY = 5;
const BALL_WIDTH = 40;
// const POWER = 50;
let balls = [];

document.addEventListener("DOMContentLoaded",()=>{
	document.querySelector("#create-balls").addEventListener("click",()=>{
		if (!ballNumber.value) return
		
		balls.length = 0;
		document.querySelectorAll('img').forEach(el => el.remove());// удаляем предыдущие мячи
						
		for(let i = 0; i < +ballNumber.value; i++){
						
			// if(Math.floor(Math.random() * (1 - 0 + 1)) + 0) balls.push(new Ball()) //если рандомно 1 то создаем экземпляр Ball
			// else balls.push(new BlinkedBall()); // иначе экземпляр SpinnedBall
			switch(Math.floor(Math.random() * (3 - 0)) + 0) {
				case 0: balls.push(new Ball()); break;
				case 1: balls.push(new SpinnedBall()); break;
				case 2: balls.push(new BlinkedBall()); break;
			}
		}
		
		ballNumber.value = '';
				
		if(balls.length) {
			startAnimation();
			
		}
	})
})

class Ball{
	constructor(){
		this.el = document.createElement("img")
		this.el.classList.add("ball")
		this.el.src = "images/ball.svg"
	
		this.x = this.random(0,window.innerWidth - BALL_WIDTH)
		
		this.y = this.random(0,window.innerHeight - BALL_WIDTH)

		this.el.style.left = this.x + "px";
		this.el.style.top = this.y + "px";

		this.direction = 1;
		this.impulse = 0;
		this.GRAVITY = 5;

		this.drop_height  = (window.innerHeight - BALL_WIDTH) - this.y;
		this.rebound = (this.drop_height + 5 ** 2) / (2 * 10) * 10;
		
		//console.log(this.y);
		//console.log(this.drop_height);
		//console.log(this.rebound);
						
		document.body.append(this.el)
	}
	random(min,max){
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	fallDown(){
		if (this.y + BALL_WIDTH >= window.innerHeight) {

			this.direction = -1;
			// this.impulse = POWER;
			this.impulse = this.rebound;

			if(this.rebound <= 26) {
				return;
			}
			
			this.rebound = (this.rebound + 5 ** 2) / (2 * 10) * 10;			
		}

		if(this.direction === -1) {
			this.impulse -= 4.5;
						
		}
		
		if(this.impulse <= 0) {
			this.direction = 1;
			
		}
		this.y += this.GRAVITY * this.direction;
		this.el.style.top = this.y + "px";
	}
}
class SpinnedBall extends Ball {

	constructor(){
        super();
        this.rotationDegree = 0;
    }

	fallDown(){
		super.fallDown();
		this.rotationDegree += 2;
		this.el.style.transform = `rotate(${this.rotationDegree}deg)`; 
	}
}
class BlinkedBall extends Ball {

	constructor(){
        super();
		this.brightness = 0;
		this.flickerDirection = 1;

		this.OPACITY_SPEED = Math.round(Math.random() * 100) / 100;
    }

	fallDown(){
		super.fallDown();

		if(this.brightness >= 1) {
			this.flickerDirection = -1;
		}

		if(this.brightness <= 0) {
			this.flickerDirection = 1;
			
		}
		
		this.brightness += (this.OPACITY_SPEED / 10) * this.flickerDirection;
		this.el.style.opacity = this.brightness;
	}
}

function startAnimation(){
	for (let i = 0; i < balls.length; i++){
		balls[i].fallDown();

	}
	
	requestAnimationFrame(startAnimation)
}

