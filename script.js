document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    const mobileMenu = () => {
        const menuBtn = document.querySelector('.menu-movil');
        const navLinks = document.querySelector('.nav-links-elegante');
        
        if (!menuBtn || !navLinks) return;
        
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };

    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    const navLinks = document.querySelector('.nav-links-elegante');
                    const menuBtn = document.querySelector('.menu-movil');
                    if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('active') && menuBtn) {
                        navLinks.classList.remove('active');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
    };

    const navScrollEffect = () => {
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('.navegacion-elegante');
            if (nav) {
                if (window.scrollY > 100) {
                    nav.style.padding = '0.5rem 0';
                } else {
                    nav.style.padding = '0.8rem 0';
                }
            }
        });
    };

const videoHandler = () => {
    const videoHero = document.querySelector('.video-manos');
    const playBtn = document.querySelector('.play-btn');
    
    if (videoHero && playBtn) {
        videoHero.muted = false;
        videoHero.volume = 0.3;
        
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (videoHero.paused) {
                videoHero.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                videoHero.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        videoHero.addEventListener('play', function() {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        videoHero.addEventListener('pause', function() {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        setTimeout(() => {
            if (videoHero.paused) {
                videoHero.play().catch(error => {
                    console.log('Autoplay falló:', error);
                    // Si falla el autoplay, mostrar botón de play
                });
            }
        }, 1000);
    }
};

const comparisonHandler = () => {
    const comparacionContainer = document.getElementById('comparacionContainer');
    const controlComparacion = document.getElementById('controlComparacion');
    const imagenAntes = document.querySelector('.imagen-antes');
    
    if (!comparacionContainer || !controlComparacion || !imagenAntes) return;
    
    let isDragging = false;
    
    controlComparacion.addEventListener('mousedown', function(e) {
        isDragging = true;
        document.body.style.cursor = 'ew-resize';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const containerRect = comparacionContainer.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        
        let percentage = (x / containerRect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        
        imagenAntes.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        controlComparacion.style.left = `${percentage}%`;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.style.cursor = '';
    });
    
    controlComparacion.addEventListener('touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging || !e.touches[0]) return;
        
        const containerRect = comparacionContainer.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - containerRect.left;
        
        let percentage = (x / containerRect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        
        imagenAntes.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        controlComparacion.style.left = `${percentage}%`;
        
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    controlComparacion.style.left = '50%';
    imagenAntes.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
};

    const init = () => {
        mobileMenu();
        smoothScroll();
        navScrollEffect();
        videoHandler();
        comparisonHandler();
    };

    init();
});