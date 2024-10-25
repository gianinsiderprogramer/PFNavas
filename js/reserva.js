const whatsappNumber = '3413549742';

function getFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };
}

function validateForm(formData) {

    if (Object.values(formData).some(value => !value)) {
        alert("Por favor completa todos los campos.");
        return false;
    }


    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
        alert("Por favor ingresa un número de teléfono válido.");
        return false;
    }

    return true;
}

function buildWhatsAppMessage(formData) {

    return `*Reserva Nueva*\n\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nServicio: ${formData.service}\nFecha: ${formData.date}\nHora: ${formData.time}`;
}

function sendWhatsApp(event) {
    event.preventDefault(); 

    const formData = getFormData();
    if (!validateForm(formData)) return;

    const message = buildWhatsAppMessage(formData);
    const confirmationMessage = `¿Estás seguro de que deseas enviar la siguiente información?\n\n${message}`;


    if (confirm(confirmationMessage)) {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", sendWhatsApp);
    }
});
