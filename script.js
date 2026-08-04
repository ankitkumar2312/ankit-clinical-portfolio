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

menuToggle.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

    });

});
