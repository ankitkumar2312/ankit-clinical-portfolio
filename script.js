console.log("Portfolio Loaded Successfully 🚀");
// Scroll Reveal Animation

const hiddenElements = document.querySelectorAll(
".about, .studies, .skills, .experience, .contact"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

hiddenElements.forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});
// Animated Counter

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;

            const speed = target / 60;

            const update = () => {

                if (count < target) {

                    count += speed;
                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(update);

                } else {

                    if(target === 2){
                        counter.innerText = "2+";
                    }
                    else if(target === 35){
                        counter.innerText = "35+";
                    }
                    else{
                        counter.innerText = target;
                    }

                }

            };

            update();
            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{
    counterObserver.observe(counter);
});
// Active Navbar

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
// Back To Top Button

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.style.display = "block";

    }else{

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});
// Mobile Menu

// Mobile Menu

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".nav-links");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        });

    });

}
// Cursor Glow

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

});
/* =========================================
   MOLECULAR BACKGROUND - PART 1
========================================= */

const canvas = document.getElementById("molecule-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 140
};

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

class Particle{

    constructor(){

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 2;

        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;

    }
        draw(){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(56,189,248,0.9)";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 15;

        ctx.fill();

        ctx.shadowBlur = 0;

    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width){
            this.speedX *= -1;
        }

        if(this.y < 0 || this.y > canvas.height){
            this.speedY *= -1;
        }

        if(mouse.x){

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < mouse.radius){

                this.x += dx / 20;
                this.y += dy / 20;

            }

        }

        this.draw();

    }

}
function initParticles(){

    particles = [];

    for(let i = 0; i < 35; i++){

        particles.push(new Particle());

    }

}

document.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

document.addEventListener("mouseleave",()=>{

    mouse.x = null;
    mouse.y = null;

});

function connectParticles(){

    for(let a = 0; a < particles.length; a++){

        for(let b = a + 1; b < particles.length; b++){

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 150){

                ctx.beginPath();

                ctx.strokeStyle = `rgba(56,189,248,${1 - distance/150})`;

                ctx.lineWidth = 1;

                ctx.moveTo(particles[a].x, particles[a].y);

                ctx.lineTo(particles[b].x, particles[b].y);

                ctx.stroke();

            }

        }

    }

}
function animateParticles(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle)=>{

        particle.update();

    });

    connectParticles();

    requestAnimationFrame(animateParticles);

}

initParticles();

animateParticles();
