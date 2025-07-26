// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

//Theme management

const themeToggle = document.getElementById("themeToggle");

const body = document.body;

//check for saved theme preference or default to "dark"

const currentTheme = localStorage.getItem("theme")|| "dark"//store on browser

body.setAttribute("data-theme",currentTheme)

themeToggle.addEventListener("click",()=>{
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme",newTheme)

  localStorage.setItem("theme",newTheme)
})

//Animate theme toggle

gsap.to(themeToggle,{
  scale: 0.9,
  duration: 0.3,
  yoyo: true,
  repeat:1,
  ease:"power2.inOut"
})


//Mobile Menu Management

const menuToggle = document.getElementById("menuToggle")
const mobileMenu = document.getElementById("mobileMenu")

menuToggle.addEventListener("click",()=>{
  menuToggle.classList.toggle("active")
  mobileMenu.classList.toggle("active")

  //if body scroll when menu is open
  if(mobileMenu.classList.contains("active"))
  {
    body.style.overflow = "hidden"
  }
  else{
    body.style.overflow=""
  }

})

//loader

function initLoader()
{
  const loader = document.querySelector(".loader")
  const loaderText = document.querySelector(".loader-text")
  const loaderProgress = document.querySelector(".loader-progress")

  //animation
  gsap.to(loaderText,{
    opacity:1,
    duration:0.7,
    ease:"power2.out"
  })

  //animate width
  gsap.to(loaderProgress,{
    width:"100%",
    duration:2,
    ease:"power2.inOut",
    onComplete: ()=>{
      gsap.to(loader,{
        opacity:0,
        duration:0.7,
        onComplete:()=>{
          loader.style.display = "none"
          initAnimations()
        }
      })
    }
  })
}

window.addEventListener("load",initLoader)

//customer cursor only on desktop

if(window.innerWidth > 768)
{
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove",(e)=>{
    gsap.to(cursor,{
      x: e.clientX -10,//as 20 pixel dim
      y: e.clientY-10,
      duration:0.1,
    })
    gsap.to(cursorFollower,{
      x: e.clientX -20,
      y:e.clientY -20,
      duration:0.2
    })
  })
}

function initAnimations(){
  //navigation animation
  gsap.to("nav",{
    y:0,
    duration:1,
    ease:"power3.out",
  })

  //hero animation
  const heroTl = gsap.timeline()
  heroTl
          .to(".hero-title",{
            opacity:1,
            filter:'blur(0px)',
            y:0,
            duration:1.2,
            ease:"power3.out"
          })
          .to(".hero-subtitle",{
            opacity:1,
            filter:'blur(0px)',
            y:0,
            duration:0.8,
            ease:"power3.out"
          },"-=0.5")
          .to(".hero-description",{
            opacity:1,
            filter:'blur(0px)',
            y:0,
            duration:0.8,
            ease:"power3.out"
          },"-=0.3")
          .to(".cta-button",{
            opacity:1,
            filter:'blur(0px)',
            y:0,
            duration:0.8,
            ease:"power3.out"
          },"-=0.3")

}


// JavaScript to handle infinite scroll and pause on hover
       const flashcards = document.querySelectorAll('.flashcard');
        const track = document.querySelector('.flashcard-track');

      

        track.addEventListener('mouseover', () => {
            if (!track.classList.contains('paused')) {
                track.style.animationPlayState = 'paused';
            }
        });

        track.addEventListener('mouseout', () => {
            if (!track.classList.contains('paused')) {
                track.style.animationPlayState = 'running';
            }
        });

  gsap.from(".about-container h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".about-text p", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from(".about-text .cta-button", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.6,
  });

  gsap.from(".about-image img", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "power3.out",
    delay: 0.8,
  });

  // Smooth scroll for CTA button
  document.querySelectorAll('[data-smooth-scroll]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        gsap.to(window, {
          scrollTo: { y: targetElement, offsetY: 50 },
          duration: 1,
          ease: "power3.out"
        });
      }
    });
  });


const tabButtons = document.querySelectorAll('.tab-button');
const skillsGrids = document.querySelectorAll('.skills-grid');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');

    // Remove active class from all buttons and grids
    tabButtons.forEach(btn => btn.classList.remove('active'));
    skillsGrids.forEach(grid => grid.classList.remove('active'));

    // Add active class to clicked button and target grid
    button.classList.add('active');
    const targetGrid = document.getElementById(targetTab);
    if (targetGrid) {
      targetGrid.classList.add('active');

      // Animate cards in the active grid
      const cards = targetGrid.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = `fadeInUp 0.6s ease-out forwards`;
        card.style.animationDelay = `${(index % 3) * 0.1}s`;
      });
    }
  });
});

// Add click feedback for buttons
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  });
});

// Initialize animations on page load
window.addEventListener('load', () => {
  const activeGrid = document.querySelector('.skills-grid.active');
  if (activeGrid) {
    const cards = activeGrid.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      card.style.animation = `fadeInUp 0.6s ease-out forwards`;
      card.style.animationDelay = `${(index % 3) * 0.1}s`;
    });
  }
});

document.querySelectorAll('.tab-button').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.skills-grid').forEach(grid => grid.classList.remove('active'));
        document.getElementById(this.dataset.tab).classList.add('active');
      });
    });