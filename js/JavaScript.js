
<span title="1. МО, г. Можасйк">Адрес</span>

// Функции для модального окна
function openModal(name, specialty, experience, bio, details) {
    const modal = document.getElementById('doctorModal');
    document.getElementById('modalDoctorName').textContent = name;
    document.getElementById('modalDoctorSpecialty').textContent = specialty;
    document.getElementById('modalDoctorExperience').textContent = `Стаж работы: ${experience}`;
    document.getElementById('modalDoctorBio').textContent = bio;
    document.getElementById('modalDoctorDetails').textContent = details;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('doctorModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('doctorModal');
    if (event.target == modal) {
        closeModal();
    }
}