    //  Скрипт для фільтрації карток

        document.addEventListener('DOMContentLoaded', () => {
            const filterBtns = document.querySelectorAll('.filterBtn');
            const resourceCards = document.querySelectorAll('.resourceCard');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Знімаємо клас active з усіх кнопок
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Додаємо клас active на натиснуту кнопку
                    btn.classList.add('active');

                    // Отримуємо значення фільтра (наприклад "lesson", "article", або "all")
                    const filterValue = btn.getAttribute('data-filter');

                    // Показуємо або приховуємо картки залежно від категорії
                    resourceCards.forEach(card => {
                        if (filterValue === 'all') {
                            card.style.display = 'flex';
                        } else {
                            if (card.getAttribute('data-category') === filterValue) {
                                card.style.display = 'flex';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                });
            });
        });
