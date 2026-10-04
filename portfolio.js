const topBtn = document.getElementById("topBtn");

window.onscroll = function() {
    if (
        this.document.body.scrollTop > 300 || 
        this.document.documentElement.scrollTop > 300
    ) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})


//Form Handling

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const msg = document.getElementById("form-msg");

    if(name && email && message) {
        msg.textContent = "Thank you for reaching out!";
        msg.style.color = "green";
        this.reset();
    } else {
        msg.textContent = "Please fill in all fields.";
        msg.style.color = "red";
    }
})


// Project Carousel Display

const projects = [{
    title: "Weather App",

    shortDescription: "A responsive weather application that displays current weather data for a selected city.",

    description: "This Weather App uses the OpenWeatherMap API to search and retrieve real-time weather data based on a city entered by the user. It displays information such as temperature, humidity, wind speed and weather conditions while providing input validation and error handling.",

    technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],

    image: "img/WeatherApp.png",

    liveURL: "",

    githubURL: "https://github.com/sebastianborisov676-dotcom/Weather-app"
},


{
    title: "Login Page",

    shortDescription: "A responsive animated login page built with HTML and CSS.",

    description: "This Login Page project demonstrates a responsive and visually animated login interface built with HTML and CSS. It includes styled email and password fields, browser-based required-field validation, login and sign-up controls, and a circular animated design created with multiple styled span elements.",

    technologies: ["HTML", "CSS"],

    image: "img/LoginPage.png",

    liveURL: "https://sebastianborisov676-dotcom.github.io/login-page/",

    githubURL: "https://github.com/sebastianborisov676-dotcom/login-page"
},


{
    title: "Carousel style card Project",

    shortDescription:
        "A carousel-style card project that showcases multiple items in a visually appealing and interactive manner.",

    description:
        "This project implements a carousel-style card layout that allows users to navigate through multiple items, such as products or portfolio pieces. The carousel is designed to be responsive and interactive, providing a smooth user experience. It can be customized with different styles and animations.",

    technologies: [
        "HTML",
        "CSS",
        "JavaScript"
    ],

    image: "img/IntercativeCards.png",

    liveURL: "",

    githubURL: "https://github.com/sebastianborisov676-dotcom/Interactive-Carousel-Cards"
    
}];

const projectCarouselTrack = document.getElementById("projectCarouselTrack");

projects.forEach((project) => {

    const card = document.createElement("article");

    card.classList.add("portfolio-project-card");

    const technologies = project.technologies.map(function(technology) {
        return `
            <span class="technology-tag">
                ${technology}
            </span>
        `;
    })
    .join("");

    card.innerHTML = `
        <div class="project-card-inner">
        
            <img 
                class="project-image"
                src="${project.image}" 
                alt="${project.title} project screenshot"
            >
            
            <div class="project-card-content">
                <h3> ${project.title} </h3>
                
                <p class="project-short-description">
                    ${project.shortDescription} 
                </p>
                
                <div class="project-technologies">
                    ${technologies}
                </div>

                <div class="project-links">
                    <button 
                        type="button"
                        class="more-details-button"
                    >
                        More details
                    </button>
                    ${
                        project.liveURL
                        ? `
                            <a
                                href="${project.liveURL}"
                                target="_blank"
                                rel="noopener"
                            >
                                View Live
                            </a>
                        `
                        : ""
                    }
                    
                    ${
                        project.githubURL
                            ? `
                                <a
                                    href="${project.githubURL}"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    GitHub
                                </a>
                            `
                            : ""
                    }
                </div>
            </div>
        </div>
    `;

    const moreDetailsButton = card.querySelector(".more-details-button");

    moreDetailsButton.addEventListener("click", function(event) {
        
        event.stopPropagation();

        openProjectDialog(project);
    });

    const projectActionLinks = card.querySelectorAll(".project-links a");

    projectActionLinks.forEach((link) => {

        link.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    });

    projectCarouselTrack.appendChild(card);
})

const projectDialog = document.getElementById("projectDialog");

const dialogCloseButton = document.getElementById("dialogCloseButton");

const dialogProjectImage = document.getElementById("dialogProjectImage");

const dialogProjectTitle = document.getElementById("dialogProjectTitle");

const dialogProjectDescription = document.getElementById("dialogProjectDescription");

const dialogProjectTechnologies = document.getElementById("dialogProjectTechnologies");

const dialogProjectLinks = document.getElementById("dialogProjectLinks");

let isProjectDialogOpen = false;


function openProjectDialog(project) {
    dialogProjectTitle.textContent = project.title;

    dialogProjectDescription.textContent = project.description;

    dialogProjectTechnologies.innerHTML = 
        project.technologies.map(function(technology) {

            return `
                <span class="technology-tag">
                    ${technology}
                </span>
            `;
        })
        .join("");

    dialogProjectImage.src = project.image;
    
    dialogProjectImage.alt = `${project.title} project screenshot`;

    dialogProjectLinks.innerHTML = "";


    if (project.liveURL) {
        const liveLink = document.createElement("a");

        liveLink.href = project.liveURL;

        liveLink.target = "_blank";

        liveLink.rel = "noopener";

        liveLink.textContent = "View Live";

        dialogProjectLinks.appendChild(liveLink);
    }

    if (project.githubURL) {
        const githubLink = document.createElement("a");

        githubLink.href = project.githubURL;

        githubLink.target = "_blank";

        githubLink.rel = "noopener";

        githubLink.textContent = "GitHub";

        dialogProjectLinks.appendChild(githubLink);
    }

    isProjectDialogOpen = true;

    stopAutoRotation();

    projectDialog.showModal();
}


dialogCloseButton.addEventListener("click", function() {
    projectDialog.close();
});

projectDialog.addEventListener("click", function(event) {
    if (event.target === projectDialog) {
        projectDialog.close();
    }
});

projectDialog.addEventListener("close", function() {
    isProjectDialogOpen = false;

    startAutoRotation();
});



// Project Controls and Dots

const projectCards = document.querySelectorAll(".portfolio-project-card");

const previousProjectButton = document.getElementById("previousProjectButton");
const nextProjectButton = document.getElementById("nextProjectButton");

const projectDotsContainer = document.getElementById("projectCarouselDots"); 
const projectCarousel = document.getElementById("projectCarousel");

let activeProjectIndex = Math.floor(projectCards.length / 2);


projectCards.forEach((card, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.classList.add("carousel-dot");

    dot.setAttribute(
        "aria-label",
        `Go to project ${index + 1}`
    );


    dot.addEventListener("click", function() {
        activeProjectIndex = index;
        updateProjectCarousel();
        restartAutoRotation();
    });

    projectDotsContainer.appendChild(dot);
})

const projectDots = document.querySelectorAll(".carousel-dot");



// Card Positioning

function updateProjectCarousel() {
    projectCards.forEach(
        (card, index) => {
            card.classList.remove(
                "active",
                "left-one",
                "left-two",
                "right-one",
                "right-two",
                "hidden"
            );

            let difference = index - activeProjectIndex;

            if (difference > projectCards.length / 2) {
                difference -= projectCards.length;
            }

            if (difference < -projectCards.length / 2) {
                difference += projectCards.length;
            }

            if (difference === 0) {
                card.classList.add("active");

            } else if (difference === -1) {
                card.classList.add("left-one");

            } else if (difference === -2) {
                card.classList.add("left-two");

            } else if (difference === 1) {
                card.classList.add("right-one");

            } else if (difference === 2) {
                card.classList.add("right-two");
            
            } else {
                card.classList.add("hidden");
            }
        }
    );

    projectDots.forEach((dot, index) => {
        
        dot.classList.toggle("active", index === activeProjectIndex);
    })
}

function nextProject() {
    
    activeProjectIndex++;


    if (activeProjectIndex >= projectCards.length) {
        activeProjectIndex = 0;
    }

    updateProjectCarousel();
}

function previousProject() {
    
    activeProjectIndex--;


    if (activeProjectIndex < 0) {
        activeProjectIndex = projectCards.length - 1;
    }

    updateProjectCarousel();
}


// Previous and Next Button Event Listeners

nextProjectButton.addEventListener("click", function() {
    nextProject();
    restartAutoRotation();
});

previousProjectButton.addEventListener("click", function() {
    previousProject();
    restartAutoRotation();
});


// Active Card Click Event Listeners

projectCards.forEach((card, index) => {
    card.addEventListener("click", function() {
        
        if (index !== activeProjectIndex) {
            activeProjectIndex = index;
            updateProjectCarousel();
            restartAutoRotation();
        }
    });
});


// Keyboard Navigation

document.addEventListener("keydown", function(event) {
    if (isProjectDialogOpen) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextProject();
        restartAutoRotation();
    }
    
    if (event.key === "ArrowLeft") {
        previousProject();
        restartAutoRotation();
    }
});

let projectTouchStartX = 0;
let projectTouchEndX = 0;


// Touch Event Listeners

projectCarousel.addEventListener("touchstart", function(event) {

    projectTouchStartX = event.changedTouches[0].clientX;
});

projectCarousel.addEventListener("touchend", function(event) {
    projectTouchEndX = event.changedTouches[0].clientX;

    handleProjectSwipe();
});

function handleProjectSwipe() {
    const swipeDistance = projectTouchStartX - projectTouchEndX;

    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    if (swipeDistance > 0) {
        nextProject();
    }

    else {
        previousProject();
    }

    restartAutoRotation();
}


// Auto-Rotation

const AUTO_ROTATION_DELAY = 3000;

let autoRotationTimer;

function startAutoRotation() {
    stopAutoRotation();

    if(isProjectDialogOpen) {
        return;
    }
    autoRotationTimer = setInterval(nextProject, AUTO_ROTATION_DELAY);
}

function stopAutoRotation() {
    clearInterval(autoRotationTimer);
}

function restartAutoRotation() {
    startAutoRotation();
}

// Pause auto-rotation on hover

projectCarousel.addEventListener("mouseenter", stopAutoRotation);

projectCarousel.addEventListener("mouseleave", startAutoRotation);


// Initialize the carousel

updateProjectCarousel();
startAutoRotation();