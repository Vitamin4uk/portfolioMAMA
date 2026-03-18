        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Плавне прокручування
            const navLinks = document.querySelectorAll('.navItemLink');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if(targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // 2. Галерея
            const galleryImages = document.querySelectorAll('.galleryImage');
            const lightboxModal = document.getElementById('lightboxModal');
            const lightboxImage = document.getElementById('lightboxImage');
            const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

            galleryImages.forEach(image => {
                image.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    lightboxImage.src = image.src;
                    lightboxImage.alt = image.alt;
                    lightboxModal.style.display = 'flex';
                });
            });

            const closeLightbox = () => {
                lightboxModal.style.display = 'none';
            };

            lightboxCloseBtn.addEventListener('click', closeLightbox);
            lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) closeLightbox(); });

            // 2.1 Логіка Каруселі
            const track = document.getElementById('galleryTrack');
            const prevBtn = document.querySelector('.prevBtn');
            const nextBtn = document.querySelector('.nextBtn');

            if (track && prevBtn && nextBtn) {
                // Визначаємо на скільки пікселів зсувати галерею (ширина 1 фото + відступ)
                const scrollAmount = () => {
                    const item = track.querySelector('.galleryItem');
                    const gap = parseInt(window.getComputedStyle(track).gap) || 24;
                    return item.offsetWidth + gap;
                };

                prevBtn.addEventListener('click', () => {
                    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
                });

                nextBtn.addEventListener('click', () => {
                    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
                });
            }

            // 3. Форма (Виправлена відправка)
            const contactForm = document.getElementById('contactForm');
            const submitBtn = document.querySelector('.submitBtn');
            
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Підготовка даних
                const formData = new FormData(contactForm);
                const dataObj = Object.fromEntries(formData.entries());

                submitBtn.textContent = 'Надсилання...';
                submitBtn.disabled = true;

                try {
                    const response = await fetch('https://formsubmit.co/ajax/mostovyi.zsu@gmail.com', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(dataObj)
                    });

                    const result = await response.json();

                    if (response.ok) {
                        showNotification('Повідомлення успішно надіслано!', '#48bb78');
                        contactForm.reset();
                    } else {
                        throw new Error(result.message || 'Помилка сервера');
                    }
                } catch (error) {
                    console.error('FormSubmit Error:', error);
                    showNotification('Помилка: ' + error.message, '#f56565');
                } finally {
                    submitBtn.textContent = 'Надіслати повідомлення';
                    submitBtn.disabled = false;
                }
            });

            function showNotification(text, bgColor) {
                const note = document.createElement('div');
                note.style.cssText = `position:fixed;top:100px;right:20px;background:${bgColor};color:white;padding:15px 25px;border-radius:5px;z-index:3000;box-shadow:0 4px 10px rgba(0,0,0,0.2);`;
                note.textContent = text;
                document.body.appendChild(note);
                setTimeout(() => note.remove(), 4000);
            }
        });
