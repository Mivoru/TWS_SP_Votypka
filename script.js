document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const altModeToggle = document.getElementById("alt-mode-toggle");
    const footer = document.querySelector("footer");
    const audioElements = document.querySelectorAll("audio");
    const settingsIcon = document.getElementById("settingsIcon");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // 📌 Načtení Lottie.js pro animaci ikon
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
    document.head.appendChild(script);

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // 📌 Po kliknutí na odkaz menu automaticky zavřít
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    script.onload = () => {
        let settingsAnimation = lottie.loadAnimation({
            container: settingsIcon,
            renderer: "svg",
            loop: false, // ✅ Animace nebude nekonečná
            autoplay: false, // ✅ Animace se nespustí hned při načtení stránky
            path: "animation/Animation - 1741020087118.json", // Výchozí ikona (světlý režim)
        });

        // 📌 Spustit animaci při najetí myší
        settingsIcon.addEventListener("mouseenter", () => {
            settingsAnimation.goToAndPlay(0, true);
        });

        // 📌 Zastavit animaci při opuštění (volitelné)
        settingsIcon.addEventListener("mouseleave", () => {
            settingsAnimation.stop();
        });

        // 📌 Aktualizace ikony podle režimu
        function updateIcon() {
            const theme = localStorage.getItem("theme") || "light";
            let jsonPath = "animation/Animation - 1741020087118.json"; // Světlá verze

            if (theme === "dark-mode") {
                jsonPath = "animation/Animation - 1741020063156.json"; // Tmavá verze
            } else if (theme === "alt-mode") {
                jsonPath = "animation/Animation - 1741019998037.json"; // Alternativní verze
            }

            settingsAnimation.destroy();
            settingsAnimation = lottie.loadAnimation({
                container: settingsIcon,
                renderer: "svg",
                loop: false,
                autoplay: false,
                path: jsonPath,
            });

            // 📌 Přidání posluchačů pro nový objekt animace
            settingsIcon.addEventListener("mouseenter", () => {
                settingsAnimation.goToAndPlay(0, true);
            });

            settingsIcon.addEventListener("mouseleave", () => {
                settingsAnimation.stop();
            });
        }

        // 📌 Přepnutí režimu a změna textu tlačítek
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

        // 📌 Aktualizace textu tlačítek podle aktuálního režimu
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

        // 📌 Aktualizace vzhledu patičky
        function updateFooterTheme() {
            footer.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));
            footer.classList.toggle("alt-mode", document.body.classList.contains("alt-mode"));
        }

        // 📌 Aktualizace vzhledu audio přehrávačů
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

        // 📌 Načtení uloženého režimu při načtení stránky
        function applySavedTheme() {
            const savedTheme = localStorage.getItem("theme") || "light";
            toggleTheme(savedTheme);
        }

        applySavedTheme();

        // 📌 Event listenery pro tlačítka přepínání režimů
        darkModeToggle?.addEventListener("click", () => {
            if (document.body.classList.contains("dark-mode")) {
                toggleTheme("light"); // Přepnutí zpět na světlý režim
            } else {
                toggleTheme("dark-mode");
            }
        });

        altModeToggle?.addEventListener("click", () => {
            if (document.body.classList.contains("alt-mode")) {
                toggleTheme("light"); // Přepnutí zpět na světlý režim
            } else {
                toggleTheme("alt-mode");
            }
        });
    };
});
