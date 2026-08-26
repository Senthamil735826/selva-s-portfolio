/* ================================================= */
/* PREMIUM PAGE LOADER */
/* ================================================= */

const pageLoader =
    document.getElementById("page-loader");


if (pageLoader) {

    setTimeout(() => {

        createDustParticles();

        pageLoader.classList.add(
            "dust-exit"
        );


        /* Remove loader after animation */

        setTimeout(() => {

            pageLoader.classList.add(
                "loader-hide"
            );

        }, 1200);

    }, 3000);


    /* Safety fallback */

    setTimeout(() => {

        pageLoader.style.opacity = "0";

        pageLoader.style.visibility =
            "hidden";

        pageLoader.style.pointerEvents =
            "none";

    }, 5000);

}


/* ================================================= */
/* CREATE GOLD DUST */
/* ================================================= */

function createDustParticles() {

    const loader =
        document.getElementById(
            "page-loader"
        );


    const elements = [
        document.querySelector(".loader-name"),
        document.querySelector(".loader-subtitle"),
        document.querySelector(".loader-line")
    ];


    elements.forEach(element => {

        if (!element) return;


        const rect =
            element.getBoundingClientRect();


        /* Number of particles */

        const particleCount =
            element.classList.contains(
                "loader-name"
            )
                ? 100
                : 30;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "dust-particle";


            /* Random starting position */

            const startX =
                rect.left +
                Math.random() *
                rect.width;


            const startY =
                rect.top +
                Math.random() *
                rect.height;


            particle.style.left =
                startX + "px";


            particle.style.top =
                startY + "px";


            /* Random dust direction */

            const x =
                (Math.random() - 0.5)
                * 300;


            const y =
                -(
                    Math.random() * 180
                    + 40
                );


            particle.style.setProperty(
                "--x",
                `${x}px`
            );


            particle.style.setProperty(
                "--y",
                `${y}px`
            );


            /* Random particle size */

            const size =
                Math.random() * 3 + 1;


            particle.style.width =
                `${size}px`;


            particle.style.height =
                `${size}px`;


            /* Random animation delay */

            particle.style.animationDelay =
                `${Math.random() * 0.25}s`;


            loader.appendChild(
                particle
            );


            /* Remove particle */

            setTimeout(() => {

                particle.remove();

            }, 3000);

        }

    });

}


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

/* ================================================= */
/* DARK / LIGHT MODE */
/* ================================================= */

const themeToggle =
    document.getElementById("theme-toggle");

const savedTheme =
    localStorage.getItem("theme");

/* Default = Dark Mode */

if (savedTheme !== "light") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.checked = true;
    }

    localStorage.setItem("theme", "dark");

} else {

    document.body.classList.remove("dark-mode");

    if (themeToggle) {
        themeToggle.checked = false;
    }

}

/* Theme change */

if (themeToggle) {

    themeToggle.addEventListener("change", () => {

        if (themeToggle.checked) {

            document.body.classList.add("dark-mode");

            localStorage.setItem("theme", "dark");

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem("theme", "light");

        }

    });

}
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
/* ABOUT SCROLL ANIMATION */
/* ================================================= */

const aboutSection =
    document.getElementById("about");

let lastScrollY =
    window.scrollY;

if (aboutSection) {

    const aboutObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        aboutSection.classList.remove(
                            "about-exit-down",
                            "about-exit-up"
                        );

                        aboutSection.classList.add(
                            "about-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.25
            }
        );


    aboutObserver.observe(
        aboutSection
    );


    window.addEventListener(
        "scroll",
        () => {

            const currentScrollY =
                window.scrollY;

            const scrollingDown =
                currentScrollY > lastScrollY;

            const rect =
                aboutSection.getBoundingClientRect();


            /*
             * SCROLLING DOWN
             * About leaves toward opposite sides
             */

            if (
                scrollingDown &&
                rect.bottom < window.innerHeight * 0.2
            ) {

                aboutSection.classList.remove(
                    "about-exit-up"
                );

                aboutSection.classList.add(
                    "about-exit-down"
                );

            }


            /*
             * SCROLLING UP
             * About leaves in opposite direction
             */

            if (
                !scrollingDown &&
                rect.top > window.innerHeight * 0.8
            ) {

                aboutSection.classList.remove(
                    "about-exit-down"
                );

                aboutSection.classList.add(
                    "about-exit-up"
                );

            }


            /*
             * About comes back into view
             */

            if (
                rect.top < window.innerHeight * 0.75 &&
                rect.bottom > window.innerHeight * 0.25
            ) {

                aboutSection.classList.remove(
                    "about-exit-down",
                    "about-exit-up"
                );

                aboutSection.classList.add(
                    "about-visible"
                );

            }


            lastScrollY =
                currentScrollY;

        }
    );

}

/* ================================================= */
/* CONTACT FORM */
/* ================================================= */

const contactForm =
    document.querySelector(".contact-form");

const scriptURL =
    "https://script.google.com/macros/s/AKfycbwZe-lEqTDWf0MWHTYggv8XOcT3Z7Pu30NPQ1WmGvGeRRFzHDSoheOjmqvoAj_Xv9b2Bw/exec";


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameInput =
                contactForm.querySelector(
                    'input[name="name"]'
                );

            const emailInput =
                contactForm.querySelector(
                    'input[name="email"]'
                );

            const messageInput =
                contactForm.querySelector(
                    'textarea[name="message"]'
                );

            const button =
                contactForm.querySelector(
                    ".contact-button"
                );


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const message =
                messageInput.value.trim();


            /* ============================= */
            /* VALIDATION */
            /* ============================= */

            if (!name || !email || !message) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            /* ============================= */
            /* SAVE DATA */
            /* ============================= */

            const formData = {

                name: name,

                email: email,

                message: message

            };


            /* ============================= */
            /* SHOW SENDING */
            /* ============================= */

            if (button) {

                button.disabled = true;

                button.innerHTML = `
                    <span class="button-text">
                        Sending...
                    </span>

                    <span class="mail-icon">
                        <i class="fa-solid fa-envelope"></i>
                    </span>
                `;

            }


            /* ============================= */
            /* SEND TO GOOGLE */
            /* ============================= */

            fetch(
                scriptURL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify(formData)

                }
            );


            /* ============================= */
            /* WAIT 4 SECONDS */
            /* ============================= */

            setTimeout(() => {

                /* Clear form */

                contactForm.reset();


                /* Message Sent */

                if (button) {

                    button.innerHTML = `
                        <span class="button-text">
                            Message Sent ✓
                        </span>

                        <span class="mail-icon">
                            <i class="fa-solid fa-check"></i>
                        </span>
                    `;

                }


                /* ============================= */
                /* RESTORE AFTER 3 SECONDS */
                /* ============================= */

                setTimeout(() => {

                    if (button) {

                        button.disabled = false;

                        button.innerHTML = `
                            <span class="button-text">
                                Send Message
                            </span>

                            <span class="mail-icon">
                                <i class="fa-solid fa-envelope"></i>
                            </span>
                        `;

                    }

                }, 3000);


            }, 4000);

        }
    );

}