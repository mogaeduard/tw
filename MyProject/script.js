// tema light/dark
window.onload = function () {
  const themeToggle = document.getElementById("theme-toggle");

  // default este "light"
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.className = currentTheme;

  const themeDisplay = document.createElement("p"); // Afișează tema curentă
  document.body.appendChild(themeDisplay);

  const updateThemeDisplay = () => {
    const currentThemeComputed = getComputedStyle(document.body).backgroundColor;
    themeDisplay.textContent = `Tema curentă este: ${document.body.className} (${currentThemeComputed})`;
  };

  updateThemeDisplay();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = document.body.className === "light" ? "dark" : "light";
      document.body.className = newTheme;

      // salvează tema nouă 
      localStorage.setItem("theme", newTheme);
      updateThemeDisplay();
    });
  }

  // gestionare hobby-uri
  const addHobbyButton = document.getElementById("add-hobby");
  const hobbyList = document.getElementById("hobby-list");

  if (addHobbyButton && hobbyList) {
    // adaugare hobby-uri
    const addHobby = (hobbyText) => {
      const li = document.createElement("li");
      li.textContent = hobbyText;

      // stergerea hobby-ului
      li.addEventListener("click", () => {
        if (confirm(`Sigur doriți să ștergeți hobby-ul: "${hobbyText}"?`)) {
          li.remove();
        }
      });

      hobbyList.appendChild(li);
    };

    // adaugare hobby nou
    addHobbyButton.addEventListener("click", () => {
      const newHobby = prompt("Introduceți un hobby:");
      if (newHobby && newHobby.trim() !== "") {
        addHobby(newHobby.trim());
      } else {
        alert("Hobby-ul introdus este gol sau invalid!");
      }
    });

    // stergerea hobby-urilor existente
    hobbyList.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        if (confirm(`Sigur doriți să ștergeți hobby-ul: "${li.textContent}"?`)) {
          li.remove();
        }
      });
    });
  }

  // login și descarcarea CV-ului
  const loginForm = document.getElementById("login-form");
  const successMessage = document.getElementById("success-message");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // obține utilizatorii din localStorage
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      const localUser = localUsers.find(
        (u) => u.email === username && u.password === password
      );

      if (localUser) {
        // Dacă utilizatorul este în localStorage
        successMessage.style.display = "block";
        loginForm.style.display = "none";
        return;
      }

      // verifică utilizatorii din JSON
      fetch("users.json")
        .then((response) => response.json())
        .then((jsonUsers) => {
          const user = jsonUsers.find(
            (u) => u.username === username && u.password === password
          );

          if (user) {
            successMessage.style.display = "block";
            loginForm.style.display = "none";
          } else {
            alert("Nume utilizator sau parolă greșită!");
          }
        })
        .catch((error) => console.error("Eroare la obținerea utilizatorilor:", error));
    });
  }

  // Gestionarea formularului de înregistrare
  const registerForm = document.getElementById("register-form");
  const showRegisterButton = document.getElementById("show-register");
  const registerMessage = document.getElementById("register-message");

  // afiseaza formularul de inregistrare cand se apasa pe Sign Up!
  if (showRegisterButton) {
    showRegisterButton.addEventListener("click", () => {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    });
  }

  // formularul de inregistrare pentru descarcarea CV-ului
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      // expresii pentru validare
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email valid
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/; // parola cu literă mare si cel putin un numar

      if (!emailRegex.test(email)) {
        registerMessage.textContent = "Email invalid!";
        registerMessage.style.color = "red";
        return;
      }

      if (!passwordRegex.test(password)) {
        registerMessage.textContent = "Parola trebuie să conțină cel puțin o literă mare și un număr!";
        registerMessage.style.color = "red";
        return;
      }

      // daca emailul si parola sunt valide
      registerMessage.textContent = "Înregistrare reușită!";
      registerMessage.style.color = "green";

      // adaugare în localStorage 
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));

      // afiseaza mesajul de reusita pentru 2 secunde
      setTimeout(() => {
        registerForm.reset();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
      }, 2000);
    });
  }

  // culori random pe hover la butoane
  document.querySelectorAll("button").forEach(button => {
    const originalColor = button.style.backgroundColor; // pastreaza culoarea initiala
    button.addEventListener("mouseenter", () => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      button.style.backgroundColor = randomColor;
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = originalColor; // revine la culoarea initiala
    });
  });

  // salutul în functie de ora atunci cand intri pe pagina index.html
  if (window.location.pathname.endsWith("index.html")) {
    // verifica dacă mesajul a fost deja afisat in sesiunea curenta
    const hasShownGreeting = sessionStorage.getItem("shownGreeting");

    if (!hasShownGreeting) {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const greeting = hour < 12 ? "Bună dimineața" : hour < 18 ? "Bună ziua" : "Bună seara";
      alert(`${greeting}, ceasul este ${hour}:${minutes}:${seconds}`);

      // marchează mesajul ca afisat
      sessionStorage.setItem("shownGreeting", "true");
    }
  }

  // schimbarea fontului textului "Bine ai venit pe site-ul meu!" la fiecare 1.5 secunde
  const welcomeText = document.getElementById("welcome-text");

  if (welcomeText) {
    const fonts = [
      "Arial, sans-serif",
      "'Courier New', Courier, monospace",
      "Georgia, serif",
      "'Times New Roman', Times, serif",
      "'Comic Sans MS', cursive, sans-serif"
    ];

    let currentFontIndex = 0;

    // folosim setInterval pentru a schimba fontul la fiecare 1.5 secunde
    setInterval(() => {
      currentFontIndex = (currentFontIndex + 1) % fonts.length; // ciclu prin lista de fonturi
      welcomeText.style.fontFamily = fonts[currentFontIndex];
    }, 1500); 
  }
};
