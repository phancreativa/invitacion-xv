
const EVENT_DATE = "2026-12-05T18:00:00";
const WHATSAPP_NUMBER = "525500000000";
const CEREMONY_LOCATION = "Dirección de la ceremonia por confirmar";
const RECEPTION_LOCATION = "Dirección de la recepción por confirmar";

document.addEventListener("DOMContentLoaded", () => {
  const envelopeScreen = document.getElementById("envelopeScreen");
  const openButton = document.getElementById("openInvitation");
  const openLabel = document.getElementById("openLabel");
  const invitation = document.getElementById("invitation");

  // Abrir el sobre
  function openEnvelope() {
    if (!envelopeScreen || !invitation) return;
    if (envelopeScreen.hidden) return;

    envelopeScreen.classList.add("opening");

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
    openButton.addEventListener("click", openEnvelope);
  }

  if (openLabel) {
    openLabel.addEventListener("click", openEnvelope);
  }

  // Cuenta regresiva
  function updateCountdown() {
    const message = document.getElementById("countdownMessage");
    const eventTime = new Date(EVENT_DATE);
    let remaining = eventTime.getTime() - Date.now();

    if (Number.isNaN(eventTime.getTime())) {
      if (message) message.textContent = "Pronto compartiremos la fecha del evento.";
      return;
    }

    if (remaining <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.textContent = "00";
      });

      if (message) {
        message.textContent = "¡Hoy celebramos! Gracias por acompañarnos.";
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

  // Ubicaciones
  function mapsUrl(location) {
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(location);
  }

  const ceremonyMap = document.getElementById("ceremonyMap");
  const receptionMap = document.getElementById("receptionMap");

  if (ceremonyMap) ceremonyMap.href = mapsUrl(CEREMONY_LOCATION);
  if (receptionMap) receptionMap.href = mapsUrl(RECEPTION_LOCATION);

  // Confirmación por WhatsApp
  const rsvpButton = document.getElementById("rsvpButton");
  const message =
    "¡Hola! Confirmo mi asistencia a los XV años de Keyla Chávez Ventura el 5 de diciembre de 2026. Mi nombre es: ";

  if (rsvpButton) {
    rsvpButton.href = "https://wa.me/" + WHATSAPP_NUMBER +
      "?text=" + encodeURIComponent(message);
  }
});
