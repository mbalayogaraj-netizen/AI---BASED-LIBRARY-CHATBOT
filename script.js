/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        if (username === "admin" && password === "1234") {

            localStorage.setItem("librobotUser", username);

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid username or password!");

        }

    });

}


/* =========================
   DASHBOARD USER
========================= */

const welcomeUser =
    document.getElementById("welcomeUser");

if (welcomeUser) {

    const user =
        localStorage.getItem("librobotUser") || "Student";

    welcomeUser.innerText =
        "Welcome, " + user + " 👋";

}


/* =========================
   BOOK DATABASE
========================= */

const books = [

    {
        title: "Python Programming",
        author: "Guido van Rossum",
        status: "Available"
    },

    {
        title: "Artificial Intelligence",
        author: "Stuart Russell",
        status: "Available"
    },

    {
        title: "Computer Networks",
        author: "Andrew Tanenbaum",
        status: "Issued"
    },

    {
        title: "Database Management Systems",
        author: "Raghu Ramakrishnan",
        status: "Available"
    },

    {
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        status: "Available"
    },

    {
        title: "Machine Learning",
        author: "Tom Mitchell",
        status: "Issued"
    },

    {
        title: "Java Programming",
        author: "Herbert Schildt",
        status: "Available"
    },

    {
        title: "Data Structures",
        author: "Mark Allen Weiss",
        status: "Available"
    }

];


/* =========================
   DISPLAY BOOKS
========================= */

function displayBooks(list = books) {

    const bookList =
        document.getElementById("bookList");

    if (!bookList) return;

    bookList.innerHTML = "";

    list.forEach(book => {

        const div =
            document.createElement("div");

        div.className = "book";

        div.innerHTML = `

            <div>

                <h3>📕 ${book.title}</h3>

                <p>Author: ${book.author}</p>

            </div>

            <span class="${book.status === "Available"
                ? "available"
                : "issued"}">

                ${book.status}

            </span>
        `;

        bookList.appendChild(div);

    });

}


displayBooks();


/* =========================
   SEARCH BOOKS
========================= */

function searchBooks() {

    const input =
        document.getElementById("bookSearch")
        .value
        .toLowerCase();

    const result =
        books.filter(book =>
            book.title.toLowerCase().includes(input) ||
            book.author.toLowerCase().includes(input)
        );

    displayBooks(result);

}


/* =========================
   CHATBOT
========================= */

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const message =
        input.value.trim();

    if (!message) return;

    addUserMessage(message);

    input.value = "";

    setTimeout(() => {

        const response =
            getBotResponse(message);

        addBotMessage(response);

        speak(response);

    }, 500);

}


function addUserMessage(message) {

    const chat =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.className = "user-message";

    div.innerText = message;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}


function addBotMessage(message) {

    const chat =
        document.getElementById("chatMessages");

    const div =
        document.createElement("div");

    div.className = "bot-message";

    div.innerHTML = message;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}


/* =========================
   AI RESPONSE ENGINE
========================= */

function getBotResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("python") ||
        text.includes("programming")
    ) {

        return `
        📚 <b>Python Programming</b><br>
        Author: Guido van Rossum<br>
        Status: <span class="available">Available</span>
        `;

    }


    if (
        text.includes("available") ||
        text.includes("book available")
    ) {

        const available =
            books
            .filter(book =>
                book.status === "Available"
            )
            .map(book => "📕 " + book.title)
            .join("<br>");

        return `
        📚 Available books:<br><br>
        ${available}
        `;

    }


    if (
        text.includes("timing") ||
        text.includes("time") ||
        text.includes("open")
    ) {

        return `
        🕘 <b>Library Timings</b><br><br>

        Monday - Friday: 9:00 AM - 6:00 PM<br>
        Saturday: 9:00 AM - 2:00 PM<br>
        Sunday: Closed
        `;

    }


    if (
        text.includes("ai") ||
        text.includes("artificial intelligence")
    ) {

        return `
        🤖 <b>Artificial Intelligence</b><br>
        Author: Stuart Russell<br>
        Status: Available
        `;

    }


    if (
        text.includes("computer network") ||
        text.includes("network")
    ) {

        return `
        📘 <b>Computer Networks</b><br>
        Author: Andrew Tanenbaum<br>
        Status: Issued
        `;

    }


    if (
        text.includes("database") ||
        text.includes("dbms")
    ) {

        return `
        📘 <b>Database Management Systems</b><br>
        Author: Raghu Ramakrishnan<br>
        Status: Available
        `;

    }


    if (
        text.includes("operating system") ||
        text.includes("os")
    ) {

        return `
        📗 <b>Operating System Concepts</b><br>
        Author: Abraham Silberschatz<br>
        Status: Available
        `;

    }


    if (
        text.includes("machine learning") ||
        text.includes("ml")
    ) {

        return `
        📙 <b>Machine Learning</b><br>
        Author: Tom Mitchell<br>
        Status: Issued
        `;

    }


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
        👋 Hello! I'm LibroBot.<br><br>
        How can I help you today?
        `;

    }


    if (
        text.includes("who are you") ||
        text.includes("your name")
    ) {

        return `
        🤖 I'm <b>LibroBot</b>, an AI-based
        library assistant.
        `;

    }


    if (
        text.includes("help")
    ) {

        return `
        I can help you with:<br><br>

        🔎 Find books<br>
        📚 Check availability<br>
        👨‍💻 Find programming books<br>
        🤖 AI/ML books<br>
        🕘 Library timings<br>
        🎤 Voice search
        `;

    }


    return `
        🤔 I'm still learning.

        Try asking:

        <br><br>

        • Find Python books<br>
        • Which books are available?<br>
        • What are library timings?<br>
        • Find AI books
    `;

}


/* =========================
   QUICK QUESTIONS
========================= */

function quickQuestion(question) {

    document.getElementById("userInput")
        .value = question;

    sendMessage();

}


/* =========================
   ENTER KEY
========================= */

function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}


/* =========================
   VOICE RECOGNITION
========================= */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported. Use Google Chrome."
        );

        return;

    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function(event) {

        const text =
            event.results[0][0].transcript;

        document.getElementById("userInput")
            .value = text;

        sendMessage();

    };

}


/* =========================
   TEXT TO SPEECH
========================= */

function speak(text) {

    if (!window.speechSynthesis) return;

    const cleanText =
        text.replace(/<[^>]*>/g, "");

    const speech =
        new SpeechSynthesisUtterance(cleanText);

    speech.rate = 1;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

}


/* =========================
   FACE VERIFICATION
========================= */

let cameraStream = null;


async function startFaceVerification() {

    const modal =
        document.getElementById("faceModal");

    modal.style.display = "flex";

    try {

        cameraStream =
            await navigator.mediaDevices
            .getUserMedia({
                video: true
            });

        document.getElementById("camera")
            .srcObject = cameraStream;

        document.getElementById("faceStatus")
            .innerText =
            "📷 Camera active. Position your face.";

    } catch (error) {

        document.getElementById("faceStatus")
            .innerText =
            "❌ Camera permission denied.";

    }

}


function verifyFace() {

    document.getElementById("faceStatus")
        .innerText =
        "✅ Face verified successfully!";

    setTimeout(() => {

        localStorage.setItem(
            "librobotUser",
            "Face User"
        );

        window.location.href =
            "dashboard.html";

    }, 1000);

}


function closeFaceModal() {

    const modal =
        document.getElementById("faceModal");

    modal.style.display = "none";

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

    }

}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem("librobotUser");

    window.location.href =
        "index.html";

}