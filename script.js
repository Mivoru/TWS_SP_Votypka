document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const altModeToggle = document.getElementById("alt-mode-toggle");
    const footer = document.querySelector("footer");
    const audioElements = document.querySelectorAll("audio");
    const settingsIcon = document.getElementById("settingsIcon");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;
    const fontDefault = document.getElementById("font-default");
    const fontAlt1 = document.getElementById("font-alt-1");
    const fontAlt2 = document.getElementById("font-alt-2");

    // Načtení Lottie.js pro animaci ikon
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
    document.head.appendChild(script);

    // Ověříme, zda existuje menuToggle a navMenu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

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
        if (settingsIcon) {
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
            if (!darkModeToggle || !altModeToggle) return;

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
            if (!footer) return;
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

        if (darkModeToggle) {
            darkModeToggle.addEventListener("click", () => {
                if (document.body.classList.contains("dark-mode")) {
                    toggleTheme("light");
                } else {
                    toggleTheme("dark-mode");
                }
            });
        }

        if (altModeToggle) {
            altModeToggle.addEventListener("click", () => {
                if (document.body.classList.contains("alt-mode")) {
                    toggleTheme("light");
                } else {
                    toggleTheme("alt-mode");
                }
            });
        }

        // Přepínání fontů
        function toggleFont(fontClass) {
            body.classList.remove("alt-font-1", "alt-font-2");

            if (fontClass !== "default") {
                body.classList.add(fontClass);
            }

            localStorage.setItem("selectedFont", fontClass);
        }

        // Načtení uloženého fontu při načtení stránky
        function applySavedFont() {
            const savedFont = localStorage.getItem("selectedFont") || "default";
            toggleFont(savedFont);
        }

        applySavedTheme();
        applySavedFont();

        if (fontDefault) {
            fontDefault.addEventListener("click", () => toggleFont("default"));
        }

        if (fontAlt1) {
            fontAlt1.addEventListener("click", () => toggleFont("alt-font-1"));
        }

        if (fontAlt2) {
            fontAlt2.addEventListener("click", () => toggleFont("alt-font-2"));
        }


    };
});
