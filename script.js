document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar on Scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Animate Sections on Scroll ---
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length > 0 && navLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSectionId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- 3D Tilt Effect on Cards ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            const maxRotation = 7;
            const rotateX = (deltaY / centerY) * -maxRotation;
            const rotateY = (deltaX / centerX) * maxRotation;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Recommendation Slider Logic ---
    const slider = document.querySelector('.recommendation-slider');
    if (slider) {
        const recommendations = document.querySelectorAll('.recommendation');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function showRecommendation(index) {
            if (recommendations.length === 0) return;
            const totalRecommendations = recommendations.length;
            if (index >= totalRecommendations) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalRecommendations - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                showRecommendation(currentIndex + 1);
            });
            prevBtn.addEventListener('click', () => {
                showRecommendation(currentIndex - 1);
            });
        }

        setInterval(() => {
            showRecommendation(currentIndex + 1);
        }, 6000);
    }

    // --- Project Modal Logic ---
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal .close');
    const projectImages = document.querySelectorAll('#gallery .image-grid img');

    if (modal && modalBody && closeModal && projectImages.length > 0) {
        const openModal = (project) => {
            const projectDetailElement = document.querySelector(`#project-details [data-project='${project}']`);
            const projectImageElement = document.querySelector(`#gallery [data-project='${project}']`);

            if (projectDetailElement && projectImageElement) {
                const imageClone = projectImageElement.cloneNode();
                const detailsClone = projectDetailElement.cloneNode(true);
                
                modalBody.innerHTML = '';
                modalBody.appendChild(imageClone);
                modalBody.appendChild(detailsClone);
                
                modal.style.display = 'block';
            }
        };

        projectImages.forEach(img => {
            img.addEventListener('click', () => {
                const project = img.dataset.project;
                openModal(project);
            });
        });

        const closeTheModal = () => {
            modal.style.display = 'none';
            modalBody.innerHTML = '';
        };

        closeModal.addEventListener('click', closeTheModal);

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeTheModal();
            }
        });
    }

    // --- Accordion for Skills Section ---
    const skillCategoryTitles = document.querySelectorAll('.skill-category-title');
    if (skillCategoryTitles.length > 0) {
        // Open the first category by default
        skillCategoryTitles[0].parentElement.classList.add('active');

        skillCategoryTitles.forEach(title => {
            title.addEventListener('click', () => {
                const currentlyActive = document.querySelector('.skill-category.active');
                const parentCategory = title.parentElement;

                if (currentlyActive && currentlyActive !== parentCategory) {
                    currentlyActive.classList.remove('active');
                }
                
                parentCategory.classList.toggle('active');
            });
        });
    }
});
