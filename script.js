const particles = [];


//Called initially
function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    const particlesLength = Math.floor(window.innerWidth/ 7);

    for(let i = 0; i < particlesLength; i++)
    {
        particles.push(new Particle());
    }
}
//called for every frame
function draw(){
    background(55,100, 144);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor(){
        // Position
        this.pos = createVector(random(width), random(height));
        //Velocity (how much movement in certain timeframe)
        this.vel = createVector(random(-2, 2), random(-2, 2));
        //Size
        this.size = 10;
    }
    //Update movement by adding velocity
    update(){
        this.pos.add(this.vel);
        this.edges();
    }
    //Draw single particle
    draw(){
        noStroke();
        fill('rgb(255,255,255,0.5)')
        circle(this.pos.x, this.pos.y, this.size);
    }

    //Detect Edges
    edges(){
        //Here if particle hits the edge, turn the velocity negative so it changes direction to whatever it currently is going
        //x axis
        if(this.pos.x < 0 || this.pos.x > width){
            this.vel.x *= -1;
        }
        //y axis
        if(this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1;
        }
    }

    //Connect Particles
    checkParticles(particles){
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if(d < 120)
            {
                stroke('rgba(255,255,255,0.1)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });
    }
}