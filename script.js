document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Анимация появления секций при прокрутке
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Функция для отправки данных формы в Google Sheets
    document.getElementById('rsvp-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Замените на URL вашего скрипта Google Apps Script
        const scriptURL = 'https://script.google.com/macros/s/AKfycbycsodxT_oOYZvJC0n6bvEs75NejLfR6naKdxjZxFZrTeEZQ3Qlnonx7jf5K08HWJCl/exec';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Успешно отправлено!', response);
            alert('Ваш ответ успешно отправлен!');
            this.reset();
        })
        .catch(error => {
            console.error('Ошибка отправки!', error);
            alert('Произошла ошибка при отправке вашего ответа. Пожалуйста, попробуйте позже.');
        });
    });
});