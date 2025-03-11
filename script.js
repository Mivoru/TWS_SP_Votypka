document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const altModeToggle = document.getElementById("alt-mode-toggle");
    const footer = document.querySelector("footer");
    const audioElements = document.querySelectorAll("audio");
    const settingsIcon = document.getElementById("settingsIcon");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Neplatný e-mail.";
        event.preventDefault(); // Zabrání odeslání formuláře
    }


    // Načtení Lottie.js pro animaci ikon
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
    document.head.appendChild(script);

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });


    function toggleMethod(id) {
        const details = document.querySelector(`#${id} .method-details`);
        if (!details) return;
        details.style.display = details.style.display === "block" ? "none" : "block";
    }

    function toggleGroup(id) {
        const group = document.getElementById(id);
        if (!group) return;
        group.style.display = group.style.display === "block" ? "none" : "block";
    }

    document.querySelectorAll(".method-toggle").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.parentElement.id;
            toggleMethod(id);
        });
    });

    document.querySelectorAll(".group-toggle").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.nextElementSibling.id;
            toggleGroup(id);
        });
    });

    script.onload = () => {
        let settingsAnimation = lottie.loadAnimation({
            container: settingsIcon,
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "animation/Animation - 1741020087118.json",
        });

        settingsIcon.addEventListener("mouseenter", () => {
            settingsAnimation.goToAndPlay(0, true);
        });

        settingsIcon.addEventListener("mouseleave", () => {
            settingsAnimation.stop();
        });

        function updateIcon() {
            const theme = localStorage.getItem("theme") || "light";
            let jsonPath = "animation/Animation - 1741020087118.json";

            if (theme === "dark-mode") {
                jsonPath = "animation/Animation - 1741020087118.json";
            } else if (theme === "alt-mode") {
                jsonPath = "animation/Animation - 1741019998037.json";
            }

            settingsAnimation.destroy();
            settingsAnimation = lottie.loadAnimation({
                container: settingsIcon,
                renderer: "svg",
                loop: false,
                autoplay: false,
                path: jsonPath,
            });

            settingsIcon.addEventListener("mouseenter", () => {
                settingsAnimation.goToAndPlay(0, true);
            });

            settingsIcon.addEventListener("mouseleave", () => {
                settingsAnimation.stop();
            });
        }

        function toggleTheme(theme) {
            document.body.classList.remove("dark-mode", "alt-mode");

            if (theme !== "light") {
                document.body.classList.add(theme);
            }

            localStorage.setItem("theme", theme);
            updateIcon();
            updateFooterTheme();
            updateAudioTheme();
            updateButtonText();
        }

        function updateButtonText() {
            if (document.body.classList.contains("dark-mode")) {
                darkModeToggle.textContent = "Světlý režim";
                altModeToggle.textContent = "Alternativní režim";
            } else if (document.body.classList.contains("alt-mode")) {
                altModeToggle.textContent = "Světlý režim";
                darkModeToggle.textContent = "Tmavý režim";
            } else {
                darkModeToggle.textContent = "Tmavý režim";
                altModeToggle.textContent = "Alternativní režim";
            }
        }

        function updateFooterTheme() {
            footer.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));
            footer.classList.toggle("alt-mode", document.body.classList.contains("alt-mode"));
        }

        function updateAudioTheme() {
            audioElements.forEach(audio => {
                audio.style.transition = "background-color 0.4s ease, filter 0.4s ease";
                if (document.body.classList.contains("dark-mode")) {
                    audio.style.backgroundColor = "#333";
                    audio.style.filter = "invert(1)";
                } else {
                    audio.style.backgroundColor = "#f0f0f0";
                    audio.style.filter = "invert(0)";
                }
            });
        }

        function applySavedTheme() {
            const savedTheme = localStorage.getItem("theme") || "light";
            toggleTheme(savedTheme);
        }

        applySavedTheme();

        darkModeToggle?.addEventListener("click", () => {
            if (document.body.classList.contains("dark-mode")) {
                toggleTheme("light");
            } else {
                toggleTheme("dark-mode");
            }
        });

        altModeToggle?.addEventListener("click", () => {
            if (document.body.classList.contains("alt-mode")) {
                toggleTheme("light");
            } else {
                toggleTheme("alt-mode");
            }
        });
    };
});
