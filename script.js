const API_KEY = "API";
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatMarkdown(text) {
    const lines = escapeHtml(text).split("\n");
    const output = [];
    let inList = false;

    lines.forEach((line) => {
        const listMatch = line.match(/^\s*[-*]\s+(.*)$/);
        if (listMatch) {
            if (!inList) {
                output.push("<ul>");
                inList = true;
            }
            output.push(`<li>${listMatch[1]}</li>`);
            return;
        }

        if (inList) {
            output.push("</ul>");
            inList = false;
        }

        output.push(line === "" ? "<br>" : line);
    });

    if (inList) {
        output.push("</ul>");
    }

    return output
        .join("\n")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\n/g, "<br>");
}

// Función para añadir mensajes a la pantalla
function appendMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    if (sender === "bot") {
        messageDiv.innerHTML = formatMarkdown(text);
    } else {
        messageDiv.innerText = text;
    }
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll hacia abajo
    return messageDiv;
}

// Función que conecta con la API de Gemini
async function fetchBotResponse(userMessage) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    // Añadimos un mensaje de "Pensando..." temporal
    const thinkingMessage = appendMessage("Escribiendo...", "bot");

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
        const finalText = botText || "No se recibio respuesta valida.";
        thinkingMessage.innerHTML = formatMarkdown(finalText);

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
