# 🤖 YAYOS AI — Abueletes

> Un asistente de conversación con inteligencia artificial diseñado para personas mayores, con una interfaz sencilla, amigable y accesible.

---

## 📋 Descripción del Proyecto

**YAYOS AI** (también conocido como **Abueletes**) es una aplicación web de chat impulsada por inteligencia artificial cuyo objetivo es ofrecer un espacio de conversación simple y cálido, especialmente pensado para personas mayores. El usuario puede escribir libremente sobre cualquier tema y recibir respuestas naturales generadas por la IA.

La IA se llama **Clara** y saluda al usuario al arrancar la aplicación con el mensaje:
> *"Hola, soy Clara. Me encantará charlar contigo."*

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión / Detalle |
|---|---|
| **HTML5** | Estructura semántica de la aplicación |
| **CSS3** | Estilos visuales con diseño responsivo |
| **JavaScript (ES6+)** | Lógica del chat y llamadas a la API |
| **Google Gemini API** | Modelo `gemini-2.5-flash` para generar respuestas |

---

## 📁 Estructura del Proyecto

```
abueletes/
│
├── index.html       # Estructura principal de la interfaz de usuario
├── styles.css       # Estilos visuales y diseño responsivo
├── script.js        # Lógica del chat y conexión con la API de Gemini
└── README.md        # Documentación del proyecto
```

---

## ⚙️ Cómo Funciona

### Flujo de la aplicación

1. El usuario abre la página web y ve la interfaz de chat con el mensaje de bienvenida de **Clara**.
2. El usuario escribe un mensaje en el área de texto.
3. Al pulsar el botón **"Enviar"** o la tecla **`Enter`**, el mensaje se muestra en el chat como mensaje de usuario.
4. Mientras la IA procesa la respuesta, aparece el mensaje temporal **"Escribiendo..."**.
5. La aplicación realiza una llamada `POST` a la **API de Google Gemini** (`gemini-2.5-flash`).
6. La respuesta de la IA reemplaza el mensaje de "Escribiendo..." y se muestra en el chat.
7. El chat hace scroll automático hacia el último mensaje.

### Diagrama de flujo

```
Usuario escribe → Pulsa "Enviar" / Enter
        ↓
Mensaje aparece en el chat (burbuja verde derecha)
        ↓
Aparece "Escribiendo..." (burbuja gris izquierda)
        ↓
Llamada POST → API Gemini (gemini-2.5-flash)
        ↓
Respuesta de Clara → Reemplaza "Escribiendo..."
        ↓
Chat hace auto-scroll hacia abajo
```

---

## 🗂️ Descripción de Archivos

### `index.html`

Contiene la estructura HTML de la aplicación. Los elementos principales son:

| Elemento | ID / Clase | Descripción |
|---|---|---|
| Barra superior | `.topbar` | Muestra el logo "A", el nombre "Abueletes" y el estado "En línea" |
| Área principal | `.planner` | Sección central con título, subtítulo y la tarjeta de entrada |
| Campo de texto | `#userInput` | Textarea donde el usuario escribe su mensaje |
| Botón adjuntar | `#attachBtn` | Botón `+` para adjuntar (reservado para uso futuro) |
| Botón enviar | `#sendBtn` | Botón que envía el mensaje al pulsar |
| Área del chat | `#chatBox` | Contenedor donde se muestran los mensajes de usuario y de Clara |

---

### `script.js`

Contiene toda la lógica de la aplicación. Funciones principales:

#### `appendMessage(text, sender)`
Añade un nuevo mensaje al área del chat.

- **`text`** *(string)*: El contenido del mensaje.
- **`sender`** *(string)*: `"user"` para mensajes del usuario o `"bot"` para mensajes de Clara.
- Aplica la clase CSS correspondiente (`.message.user` o `.message.bot`).
- Hace scroll automático hacia el último mensaje.

#### `fetchBotResponse(userMessage)`
Conecta con la API de Google Gemini para obtener una respuesta de la IA.

- **`userMessage`** *(string)*: El mensaje enviado por el usuario.
- Muestra "Escribiendo..." mientras espera la respuesta.
- Realiza una petición `POST` al endpoint:  
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=API_KEY`
- Si la petición es exitosa, reemplaza "Escribiendo..." con la respuesta real.
- Si ocurre un error, muestra: *"Lo siento, hubo un error al procesar tu mensaje."*

#### Eventos registrados

| Evento | Elemento | Acción |
|---|---|---|
| `click` | `#sendBtn` | Envía el mensaje al pulsar el botón |
| `keypress` (Enter) | `#userInput` | Envía el mensaje al pulsar la tecla Enter |

---

### `styles.css`

Define el diseño visual de la aplicación. Aspectos destacados:

| Elemento | Descripción |
|---|---|
| **Paleta de colores** | Verde principal `#1b7b47`, fondo degradado suave de verde a blanco |
| **Tipografía** | `Plus Jakarta Sans` / `Segoe UI` (sans-serif) |
| **Tarjeta de entrada** | Fondo blanco con sombra suave y bordes redondeados |
| **Burbujas de chat** | Verde para el usuario (derecha), gris suave para Clara (izquierda) |
| **Responsividad** | Media queries para pantallas ≤ 900px y ≤ 600px |

#### Breakpoints responsivos

| Breakpoint | Cambios |
|---|---|
| `≤ 900px` | Reducción de paddings en topbar y main |
| `≤ 600px` | La fila de entrada pasa a disposición vertical (`flex-direction: column`) |

---

## 🔑 Configuración de la API

La API Key de Google Gemini se define al inicio de `script.js`:

```js
const API_KEY = "API";
```

> ⚠️ **Importante:** Para que la aplicación funcione correctamente, debes reemplazar `"API"` con tu clave de API válida de [Google AI Studio](https://aistudio.google.com/app/apikey).  
> **Nunca compartas tu API Key públicamente ni la subas a repositorios públicos.**

---

## 🌐 Cómo Ejecutar el Proyecto

El proyecto es una aplicación web estática. No requiere instalación de dependencias ni servidores especiales.

### Opción 1 — Abrir directamente en el navegador

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.
3. Asegúrate de haber configurado tu `API_KEY` en `script.js`.

### Opción 2 — Servidor local (recomendado)

Para evitar posibles restricciones de CORS en algunos navegadores:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .
```

Luego abre `http://localhost:8000` en tu navegador.

---

## 🎨 Diseño de la Interfaz

- **Estilo visual:** Moderno y limpio con tonos verdes que transmiten calma y confianza.
- **Accesibilidad:** Botones con `aria-label` para lectores de pantalla.
- **Tipografía grande y legible:** Ideal para personas mayores.
- **Interfaz centrada:** Máximo 820px de ancho, centrado en pantalla.

---

## 📌 Características Principales

- ✅ Chat en tiempo real con IA (Google Gemini 2.5 Flash)
- ✅ Indicador visual de "Escribiendo..." mientras la IA responde
- ✅ Envío de mensajes con botón o tecla Enter
- ✅ Auto-scroll automático al último mensaje
- ✅ Diseño responsivo para móviles, tablets y escritorio
- ✅ Interfaz simple y accesible pensada para personas mayores

---

## 👤 Autor

**YAYOS AI** — Proyecto desarrollado como asistente conversacional accesible para personas mayores.

---

*Documentación generada para el proyecto YAYOS AI / Abueletes.*



