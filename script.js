document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.recommendation-slider');
    const recommendations = document.querySelectorAll('.recommendation');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalRecommendations = recommendations.length;

    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalRecommendations - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < totalRecommendations - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Optional: Auto-slide
    // setInterval(() => {
    //     currentIndex = (currentIndex < totalRecommendations - 1) ? currentIndex + 1 : 0;
    //     updateSlider();
    // }, 5000); // Change slide every 5 seconds
});