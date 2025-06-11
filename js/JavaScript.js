
 // Функция для плавной прокрутки к секциям
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Код для кнопки "Записаться на прием"
        document.querySelector('.appointment-btn').addEventListener('click', function() {
            alert('Функция записи на прием будет реализована позже');
        });

        // Логика карусели врачей
        let currentSlide = 0;
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
            currentSlide += direction;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            updateCarousel();
        }

        // Функции для работы модального окна
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
            if (event.target === modal) {
                closeModal();
            }
        }

        // Функция для копирования текста в буфер обмена
        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const textToCopy = element.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const buttons = document.querySelectorAll('.copy-btn');
                buttons.forEach(btn => {
                    if (btn.getAttribute('onclick')?.includes(elementId)) {
                        const originalText = btn.textContent;
                        btn.textContent = 'Скопировано!';
                        setTimeout(() => {
                            btn.textContent = originalText;
                        }, 2000);
                    }
                });
            }).catch(err => {
                console.error('Ошибка при копировании: ', err);
            });
        }

        // Инициализация карусели при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            updateCarousel();

            // Автоматическая прокрутка карусели каждые 5 секунд
            setInterval(() => {
                moveSlide(1);
            }, 5000);
        });

        // js/script.js
function updateWorkingStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const isWorking = hours >= 8 && hours < 20;
    
    const statusElement = document.getElementById('working-hours-status');
    const hoursElement = document.getElementById('working-hours');
    
    if (isWorking) {
        statusElement.textContent = 'Сейчас работаем';
        statusElement.className = 'working';
        
        const closeHour = 20;
        const hoursLeft = closeHour - hours - (minutes > 0 ? 1 : 0);
        const minutesLeft = minutes > 0 ? 60 - minutes : 0;
        
        hoursElement.textContent = `8:00 - 20:00 (до закрытия ${hoursLeft}ч ${minutesLeft}м)`;
    } else {
        statusElement.textContent = 'Сейчас отдыхаем';
        statusElement.className = 'closed';
        
        const openHour = 8;
        let hoursLeft = openHour - hours;
        if (hoursLeft < 0) hoursLeft += 24;
        hoursLeft -= minutes > 0 ? 1 : 0;
        const minutesLeft = minutes > 0 ? 60 - minutes : 0;
        
        hoursElement.textContent = `8:00 - 20:00 (откроем через ${hoursLeft}ч ${minutesLeft}м)`;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', updateWorkingStatus);

// Обновление каждую минуту
setInterval(updateWorkingStatus, 60000);
