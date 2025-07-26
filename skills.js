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
}


function initSkillsTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const skillsGrids = document.querySelectorAll('.skills-grid');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons and grids
      tabButtons.forEach(btn => btn.classList.remove('active'));
      skillsGrids.forEach(grid => grid.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Add active class to corresponding grid
      const targetGrid = document.querySelector(`.skills-grid.${targetTab}`);
      if (targetGrid) {
        targetGrid.classList.add('active');
        
        // Animate the skill cards when switching tabs
        const skillCards = targetGrid.querySelectorAll('.skill-card');
        gsap.fromTo(skillCards, 
          {
            opacity: 0,
            y: 20,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
          }
        );
      }
    });
  });
}

// Initialize skills tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSkillsTabs();
  
  // Animate initial skill cards
  const initialSkillCards = document.querySelectorAll('.skills-grid.active .skill-card');
  gsap.fromTo(initialSkillCards, 
    {
      opacity: 0,
      y: 30,
      scale: 0.8
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.5 // Small delay to let other animations finish
    }
  );
});