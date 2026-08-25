// ================================
// HAMBURGER MENU
// ================================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});


// ================================
// NAVIGATION + SLIDING INDICATOR
// ================================

const links = document.querySelectorAll(".nav-links a");
const indicator = document.querySelector(".nav-indicator");

function moveIndicator(link) {
    indicator.style.left = `${link.offsetLeft}px`;
    indicator.style.width = `${link.offsetWidth}px`;
}

links.forEach(link => {

    link.addEventListener("click", function () {

        // Remove active from all links
        links.forEach(item => {
            item.classList.remove("active");
        });

        // Add active to clicked link
        this.classList.add("active");

        // Move glass indicator
        moveIndicator(this);

        // Close mobile menu
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });

});


// Set initial indicator position
window.addEventListener("load", () => {

    const activeLink =
        document.querySelector(".nav-links a.active");

    if (activeLink) {
        moveIndicator(activeLink);
    }

});


// Recalculate indicator when screen size changes
window.addEventListener("resize", () => {

    const activeLink =
        document.querySelector(".nav-links a.active");

    if (activeLink) {
        moveIndicator(activeLink);
    }

});

const themeToggle =
    document.getElementById("theme-toggle");

themeToggle.addEventListener("change", () => {

    document.body.classList.toggle(
        "dark-mode",
        themeToggle.checked
    );

});

// ================================
// TYPING EFFECT
// ================================

const changingText =
    document.getElementById("changing-text");


// Words + individual fonts
const words = [

    {
        text: "Web developer.",
        font: "Fondamento",
        weight: "Regular 400 italic"
    },

    {
        text: "AI enthusiast.",
        font: "cinzel",
        weight: "900"
    },

    {
        text: "data scientist.",
        font: "datatype",
        weight: "700"
    },

    {
        text: "UI designer.",
        font: "Rock 3D"
    },

    {
        text: "problem solver.",
        font: "Silkscreen"
    }

];


// Typing variables
let wordIndex = 0;
let charIndex = 0;
let deleting = false;


// ================================
// TYPE EFFECT FUNCTION
// ================================

function typeEffect() {

    const currentWord = words[wordIndex];

    // Change font according to current word
    changingText.style.fontFamily =
    `"${currentWord.font}", sans-serif`;

    changingText.style.fontWeight =
    currentWord.weight;


    // ============================
    // TYPING
    // ============================

    if (!deleting) {

        changingText.textContent =
            currentWord.text.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        // Word completely typed
        if (
            charIndex ===
            currentWord.text.length
        ) {

            deleting = true;

            // Wait before deleting
            setTimeout(typeEffect, 1500);

            return;
        }

    }


    // ============================
    // DELETING
    // ============================

    else {

        changingText.textContent =
            currentWord.text.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        // Word completely deleted
        if (charIndex === 0) {

            // ======================
            // ⚡ GLITCH TRANSITION
            // ======================

            changingText.classList.remove(
                "glitch"
            );

            // Force animation restart
            void changingText.offsetWidth;

            changingText.classList.add(
                "glitch"
            );


            // Wait for glitch animation
            setTimeout(() => {

                // Move to next word
                wordIndex =
                    (wordIndex + 1) %
                    words.length;

                // Reset typing
                charIndex = 0;
                deleting = false;

                // Remove glitch
                changingText.classList.remove(
                    "glitch"
                );

                // Start next word
                typeEffect();

            }, 600);

            return;
        }

    }


    // ============================
    // TYPING SPEED
    // ============================

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}


// Start typing
typeEffect();

/* ================================================= */
/* ABOUT SCROLL REVEAL */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const aboutSection = document.getElementById("about");

    if (!aboutSection) return;

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    aboutSection.classList.add("about-visible");

                }

            });

        },
        {
            threshold: 0.2
        }
    );

    observer.observe(aboutSection);

});

/* ================================================= */
/* CONTACT FORM */
/* ================================================= */

const contactForm =
    document.querySelector(".contact-form");


const scriptURL =
    "https://script.google.com/macros/s/AKfycbxA2Mxelo2J84iqbOKMhnYlINFe9ioWS-SOxzDuQviGEmq1Xt1pt7fRAE4HwvATlPLErQ/exec";


contactForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document.querySelector(
                'input[name="name"]'
            ).value.trim();


        const email =
            document.querySelector(
                'input[name="email"]'
            ).value.trim();


        const message =
            document.querySelector(
                'textarea[name="message"]'
            ).value.trim();


        if (!name || !email || !message) {

            alert(
                "Please fill in all fields."
            );

            return;
        }


        const button =
            document.querySelector(
                ".contact-button"
            );


        const originalText =
            button.innerHTML;


        button.disabled = true;

        button.innerHTML =
            "Sending...";


        try {

            await fetch(
                scriptURL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        message: message

                    })
                }
            );


            /* SUCCESS */

            contactForm.reset();


            button.innerHTML =
                "Message Sent ✓";


            setTimeout(() => {

                button.innerHTML =
                    originalText;

                button.disabled = false;

            }, 3000);


        } catch (error) {

            console.error(error);


            button.innerHTML =
                "Try Again";


            button.disabled = false;

        }

    }
);

