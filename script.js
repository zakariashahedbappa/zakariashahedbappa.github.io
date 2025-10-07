document.addEventListener('DOMContentLoaded', () => {
    // Recommendation Slider Logic
    const slider = document.querySelector('.recommendation-slider');
    if (slider) {
        const recommendations = document.querySelectorAll('.recommendation');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function showRecommendation(index) {
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

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                showRecommendation(currentIndex + 1);
            });

            prevBtn.addEventListener('click', () => {
                showRecommendation(currentIndex - 1);
            });
        }

        setInterval(() => {
            showRecommendation(currentIndex + 1);
        }, 5000);
    }

    // Project Modal Logic
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
});
