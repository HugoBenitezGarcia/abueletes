const API_KEY = “API”;
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Función para añadir mensajes a la pantalla
function appendMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll hacia abajo
}

// Función que conecta con la API de Gemini
async function fetchBotResponse(userMessage) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    // Añadimos un mensaje de "Pensando..." temporal
    appendMessage("Escribiendo...", "bot");
    const thinkingMessage = chatBox.lastChild;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        });

        const data = await response.json();
        const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Reemplazamos el "Pensando..." con la respuesta real
        thinkingMessage.innerText = botText || "No se recibio respuesta valida.";

    } catch (error) {
        console.error("Error al conectar con Gemini:", error);
        thinkingMessage.innerText = "Lo siento, hubo un error al procesar tu mensaje.";
    }
}

// Evento al hacer clic en enviar
sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage(message, "user");
    userInput.value = ""; // Limpiar input

    fetchBotResponse(message);
});

// Permitir enviar también pulsando la tecla Enter
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
    }
});
