
// =================== PERSONALIZA AQUÍ ===================
const EVENT_DATE = "2026-12-05T18:00:00";
const WHATSAPP_NUMBER = "525500000000";
const CEREMONY_LOCATION = "Dirección de la ceremonia por confirmar";
const RECEPTION_LOCATION = "Dirección de la recepción por confirmar";
// =========================================================

const envelopeScreen = document.getElementById("envelopeScreen");
const openButton = document.getElementById("openInvitation");
const openLabel = document.getElementById("openLabel");
const invitation = document.getElementById("invitation");
const music = document.getElementById("backgroundMusic");

let invitationOpened = false;

function handleOpenInvitation() {
  if (invitationOpened) return;
  invitationOpened = true;

  // Iniciar la animación inmediatamente, sin esperar a la música.
  envelopeScreen.classList.add("opening");

  // La música es opcional: si falla, el sobre debe abrirse de todos modos.
  if (music) {
    music.volume = 0.42;
    const playRequest = music.play();

    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch((error) => {
        console.info("No se pudo reproducir la música:", error);
      });
    }
  }

  window.setTimeout(() => {
    envelopeScreen.classList.add("is-opening");
    invitation.classList.remove("is-hidden");
    envelopeScreen.setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
      envelopeScreen.hidden = true;
    }, 900);
  }, 1050);
}

if (openButton) {
  openButton.addEventListener("click", handleOpenInvitation);
}

if (openLabel) {
  openLabel.addEventListener("click", handleOpenInvitation);
}

// Cuenta regresiva
function updateCountdown() {
  const message = document.getElementById("countdownMessage");
  const eventTime = new Date(EVENT_DATE);
  let remaining = eventTime.getTime() - Date.now();

  if (Number.isNaN(eventTime.getTime())) {
    if (message) {
      message.textContent = "Pronto compartiremos la fecha del evento.";
    }
    return;
  }

  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.textContent = "00";
    });

    if (message) {
      message.textContent =
        "¡Hoy celebramos! Gracias por acompañarnos.";
    }
    return;
  }

  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;

  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  const values = { days, hours, minutes, seconds };

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = String(value).padStart(2, "0");
    }
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

// Botones de Google Maps
function mapsUrl(location) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(location)
  );
}

const ceremonyMap = document.getElementById("ceremonyMap");
const receptionMap = document.getElementById("receptionMap");

if (ceremonyMap) {
  ceremonyMap.href = mapsUrl(CEREMONY_LOCATION);
}

if (receptionMap) {
  receptionMap.href = mapsUrl(RECEPTION_LOCATION);
}

// Confirmación por WhatsApp
const rsvpButton = document.getElementById("rsvpButton");

const rsvpMessage =
  "¡Hola! Confirmo mi asistencia a los XV años de Keyla Chávez Ventura el 5 de diciembre de 2026. Mi nombre es: ";

if (rsvpButton) {
  rsvpButton.href =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(rsvpMessage);
}
