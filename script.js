/* =========================================================
   ADITHYAN S
   SHADOWBROKER
   PREMIUM PORTFOLIO ENGINE
========================================================= */


/* =========================================================
   TERMINAL BOOT
========================================================= */

const bootLines = [

    {
        text: "$ sudo ./initialize_portfolio.sh",
        type: "command"
    },

    {
        text: "[ OK ] Initializing secure environment...",
        type: "ok"
    },

    {
        text: "[ OK ] Loading cyber interface...",
        type: "ok"
    },

    {
        text: "[ OK ] Establishing encrypted connection...",
        type: "ok"
    },

    {
        text: "[ OK ] Loading security modules...",
        type: "ok"
    },

   
    {
        text: "",
        type: ""
    },

    {
        text: "$ whoami",
        type: "command"
    },

    {
        text: "adithyan",
        type: ""
    },

    {
        text: "$ identify --alias",
        type: "command"
    },

    {
        text: "SHADOWBROKER",
        type: ""
    },

    {
        text: "$ ./enter.sh",
        type: "command"
    },

    {
        text: "[ ACCESS GRANTED ]",
        type: "access"
    }

];


const terminal = document.getElementById(
    "terminal-content"
);


const bootScreen = document.getElementById(
    "boot-screen"
);
const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.12;

// Try autoplay
window.addEventListener("load", () => {
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked by browser.");
    });
});

// Start when visitor first interacts
const startMusic = () => {
    bgMusic.play().catch(() => {});

    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
    document.removeEventListener("keydown", startMusic);
};

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);
document.addEventListener("keydown", startMusic);

async function typeLine(line) {

    const div = document.createElement("div");

    div.className = "terminal-line";

    if (line.type) {

        div.classList.add(
            `terminal-${line.type}`
        );

    }

    terminal.appendChild(div);


    const cursor = document.createElement("span");

    cursor.className = "typing-cursor";

    div.appendChild(cursor);


    for (let i = 0; i < line.text.length; i++) {

        cursor.insertAdjacentText(
            "beforebegin",
            line.text[i]
        );

        await new Promise(resolve =>
            setTimeout(resolve, 14)
        );

    }

    cursor.remove();

}


async function bootSequence() {

    for (const line of bootLines) {

        await typeLine(line);

        await new Promise(resolve =>
            setTimeout(
                resolve,
                line.text === "" ? 80 : 55
            )
        );

    }


    await new Promise(resolve =>
        setTimeout(resolve, 900)
    );


    bootScreen.classList.add("hidden");

}


bootSequence();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileNavigation =
    document.getElementById("mobileNavigation");


mobileMenu.addEventListener(
    "click",
    () => {

        mobileNavigation.classList.toggle(
            "active"
        );

    }
);


document
    .querySelectorAll(".mobile-navigation a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNavigation.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   3D TILT
========================================================= */

const tiltCards =
    document.querySelectorAll(".tilt-card");


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        }
    );

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticButtons =
    document.querySelectorAll(".magnetic");


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;


            button.style.transform =
                `translate(${x * .12}px, ${y * .12}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0,0)";

        }
    );

});


/* =========================================================
   THREE.JS PARTICLES
========================================================= */

const canvas =
    document.getElementById("particleCanvas");


if (window.THREE) {

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            70,
            window.innerWidth /
            window.innerHeight,
            .1,
            1000
        );


    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    camera.position.z = 5;


    /* -----------------------------------------------------
       PARTICLES
    ----------------------------------------------------- */

    const particleCount =
        window.innerWidth < 700
            ? 700
            : 1400;


    const geometry =
        new THREE.BufferGeometry();


    const positions =
        new Float32Array(
            particleCount * 3
        );


    const colors =
        new Float32Array(
            particleCount * 3
        );


    const cyan =
        new THREE.Color("#00f6ff");

    const magenta =
        new THREE.Color("#ff00d4");

    const blue =
        new THREE.Color("#1769ff");


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const i3 = i * 3;


        positions[i3] =
            (Math.random() - .5) * 12;

        positions[i3 + 1] =
            (Math.random() - .5) * 8;

        positions[i3 + 2] =
            (Math.random() - .5) * 8;


        const selectedColor =
            Math.random() < .33
                ? cyan
                : Math.random() < .5
                    ? magenta
                    : blue;


        colors[i3] =
            selectedColor.r;

        colors[i3 + 1] =
            selectedColor.g;

        colors[i3 + 2] =
            selectedColor.b;

    }


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            colors,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            size: .018,

            transparent: true,

            opacity: .7,

            vertexColors: true,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const particles =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(particles);


    /* -----------------------------------------------------
       ANIMATION
    ----------------------------------------------------- */

    let targetRotationX = 0;
    let targetRotationY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            targetRotationY =
                (event.clientX /
                    window.innerWidth -
                    .5) * .12;

            targetRotationX =
                (event.clientY /
                    window.innerHeight -
                    .5) * .12;

        }
    );


    function animate() {

        requestAnimationFrame(
            animate
        );


        particles.rotation.y +=
            .00035;

        particles.rotation.x +=
            .00012;


        particles.rotation.y +=
            (targetRotationY -
                particles.rotation.y)
            * .0008;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%c ADITHYAN S ",
    "color:#00f6ff;font-size:22px;font-weight:bold;"
);


console.log(
    "%c SHADOWBROKER ",
    "color:#ff00d4;font-size:16px;font-weight:bold;"
);


console.log(
    "%c INVEX // FOUNDER ",
    "color:#1769ff;font-size:13px;"
);


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.style.color = "";

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.style.color =
                    "#00f6ff";

            }

        });

    }
);