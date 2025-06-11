// Функция для плавной прокрутки к секциям
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Модальное окно записи на прием
const appointmentBtn = document.querySelector('.appointment-btn');
const appointmentModal = document.getElementById('appointmentModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const appointmentForm = document.getElementById('appointmentForm');

// Открытие модального окна записи
appointmentBtn.addEventListener('click', function() {
    appointmentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Закрытие всех модальных окон
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

// Закрытие при клике вне окна
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Обработка формы записи
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        comment: document.getElementById('comment').value
    };
    
    console.log('Данные для записи:', formData);
    alert('Ваша заявка принята! Мы свяжемся с вами для подтверждения записи.');
    
    appointmentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    appointmentForm.reset();
});

// Функционал копирования контактов
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const textToCopy = document.getElementById(targetId).textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Скопировано!';
            this.classList.add('copied');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            alert('Не удалось скопировать текст. Попробуйте еще раз.');
        });
    });
});

// Логика карусели врачей
let currentSlide = 0;
let carouselInterval;
const slides = document.querySelectorAll('.doctor-slide');
const track = document.getElementById('carousel-track');
const specialtyTitle = document.getElementById('current-specialty');

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    if (slides[currentSlide]) {
        specialtyTitle.textContent = slides[currentSlide].dataset.specialty;
    }
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
    resetCarouselInterval();
}

function startCarouselInterval() {
    carouselInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
}

// Функции для работы модального окна врача
function openModal(name, specialty, experience, bio, details) {
    const modal = document.getElementById('doctorModal');
    document.getElementById('modalDoctorName').textContent = name;
    document.getElementById('modalDoctorSpecialty').textContent = specialty;
    document.getElementById('modalDoctorExperience').textContent = `Стаж работы: ${experience}`;
    document.getElementById('modalDoctorBio').textContent = bio;
    document.getElementById('modalDoctorDetails').textContent = details;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Функция для проверки рабочего времени
function updateWorkingStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const openTime = 8 * 60; // 8:00
    const closeTime = 20 * 60; // 20:00

    const statusElement = document.getElementById('working-hours-status');
    const hoursElement = document.getElementById('working-hours');
    
    if (currentTime >= openTime && currentTime < closeTime) {
        statusElement.textContent = 'Сейчас открыто';
        statusElement.style.color = 'green';
        
        const timeLeft = closeTime - currentTime;
        const hoursLeft = Math.floor(timeLeft / 60);
        const minutesLeft = timeLeft % 60;
        hoursElement.textContent = `8:00 - 20:00 (до закрытия ${hoursLeft}ч ${minutesLeft}м)`;
    } else {
        statusElement.textContent = 'Сейчас закрыто';
        statusElement.style.color = 'red';
        
        let timeLeft = openTime - currentTime;
        if (timeLeft < 0) timeLeft += 24 * 60;
        const hoursLeft = Math.floor(timeLeft / 60);
        const minutesLeft = timeLeft % 60;
        hoursElement.textContent = `8:00 - 20:00 (откроем через ${hoursLeft}ч ${minutesLeft}м)`;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Установка минимальной даты для формы
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Инициализация карусели
    updateCarousel();
    startCarouselInterval();
    
    // Проверка рабочего времени
    updateWorkingStatus();
    setInterval(updateWorkingStatus, 60000); // Обновление каждую минуту
});