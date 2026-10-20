// =================== PERSONALIZA AQUÍ ===================
// Fecha y hora local del evento. Las 18:00 son provisionales.
const EVENT_DATE = "2026-12-05T14:00:00";

// Reemplaza con el teléfono de WhatsApp con código de país, solo números.
// Ejemplo de México: 525512345678. Este número es solo un marcador.
const WHATSAPP_NUMBER = "527472546662";

// Sustituye estas direcciones por los nombres o direcciones reales de las sedes.
const CEREMONY_LOCATION = "Dirección de la ceremonia por confirmar";
const RECEPTION_LOCATION = "Dirección de la recepción por confirmar";
// =========================================================

const envelopeScreen = document.getElementById("envelopeScreen");
const openButton = document.getElementById("openInvitation");
const openLabel = document.getElementById("openLabel");
const invitation = document.getElementById("invitation");
const music = document.getElementById("backgroundMusic");

let opened = false;

async function openInvitation() {
  if (opened) return;
  opened = true;

  // Empieza a solicitar la reproducción durante el toque del usuario.
  // Es la opción más compatible con las restricciones de autoplay móvil.
  try {
    music.volume = 0.42;
    await music.play();
  } catch (error) {
    // Si falta el MP3 o el navegador lo bloquea, la invitación sigue abriendo.
    console.info("Añade assets/piano-romantico.mp3 y prueba en un navegador móvil.", error);
  }

  envelopeScreen.classList.add("opening");
  window.setTimeout(() => {
    envelopeScreen.classList.add("is-opening");
    invitation.classList.remove("is-hidden");
    envelopeScreen.setAttribute("aria-hidden", "true");
    window.setTimeout(() => { envelopeScreen.hidden = true; }, 900);
  }, 1050);
}
openButton.addEventListener("click", openInvitation);
openLabel.addEventListener("click", openInvitation);

function updateCountdown() {
  const eventTime = new Date(EVENT_DATE);
  let remaining = eventTime.getTime() - Date.now();

  if (Number.isNaN(eventTime.getTime())) {
    document.getElementById("countdownMessage").textContent = "Pronto compartiremos la fecha del evento.";
    return;
  }
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    document.getElementById("countdownMessage").textContent = "¡Hoy celebramos! Gracias por acompañarnos.";
    return;
  }

  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

function mapsUrl(location) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location);
}
// Los enlaces de Google Maps se definen directamente en index.html para conservar las ubicaciones compartidas.

const rsvpMessage = "¡Hola! Confirmo mi asistencia a los XV años de Keyla 💗 el 5 de diciembre de 2026. Mi nombre es: ";
document.getElementById("rsvpButton").href =
  "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(rsvpMessage);

// No se muestran controles de audio en la página.
// El navegador puede bloquear el sonido si no detecta interacción del usuario.
