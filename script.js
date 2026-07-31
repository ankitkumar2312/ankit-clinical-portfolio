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
