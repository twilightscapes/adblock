// Enhanced swipe functionality for all sections
document.addEventListener('DOMContentLoaded', function() {
  // Add wheel scroll support for horizontal sliders
  function addWheelScrollSupport() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
      slider.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          // Already scrolling horizontally, let it be
          return;
        }
        
        // Convert vertical scroll to horizontal
        e.preventDefault();
        slider.scrollLeft += e.deltaY * 2; // Multiply for faster scrolling
      }, { passive: false });
    });
  }

  // Add touch/swipe support for mobile
  function addTouchSupport() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Multiply for faster scrolling
        slider.scrollLeft = scrollLeft - walk;
      });

      // Touch events for mobile
      slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
    });
  }

  // Initialize both features
  addWheelScrollSupport();
  addTouchSupport();

  // Re-initialize when view mode changes
  document.addEventListener('astro:after-swap', () => {
    addWheelScrollSupport();
    addTouchSupport();
  });
});
