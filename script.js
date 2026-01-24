document.addEventListener('DOMContentLoaded', function() {
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
        }, { passive: true });
    };

    const serviceButtons = () => {
        document.querySelectorAll('.btn-servicio').forEach(button => {
            button.addEventListener('click', function() {
                const servicio = this.getAttribute('data-servicio');
                
                const whatsappMessage = `¡Hola! Me interesa agendar una cita para: ${servicio}. ¿Podrías darme más información sobre disponibilidad?`;
                const whatsappURL = `https://wa.me/5355509377?text=${encodeURIComponent(whatsappMessage)}`;
                
                window.open(whatsappURL, '_blank');
            });
        });
    };

    const videoHandler = () => {
        const videoHero = document.querySelector('.video-manos');
        const playBtn = document.querySelector('.play-btn');
        const modal = document.getElementById('modalVideo');
        const modalVideo = document.querySelector('.modal-video-element');
        const cerrarModal = document.querySelector('.cerrar-modal');
        
        let heroVideoWasPlaying = false;
        let heroVideoCurrentTime = 0;
        let heroVideoVolume = 0.3;
        let heroVideoWasMuted = false;
        
        if (videoHero && playBtn) {
            heroVideoVolume = 0.3;
            heroVideoWasMuted = false;
            videoHero.volume = heroVideoVolume;
            videoHero.muted = heroVideoWasMuted;
            
            const volumeBtn = document.createElement('button');
            volumeBtn.className = 'video-control-btn volume-btn';
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeBtn.setAttribute('aria-label', 'Silenciar video');
            playBtn.parentElement.appendChild(volumeBtn);
            
            volumeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (videoHero.muted || videoHero.volume === 0) {
                    videoHero.muted = false;
                    videoHero.volume = heroVideoVolume || 0.3;
                    heroVideoWasMuted = false;
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                    this.setAttribute('aria-label', 'Silenciar video');
                } else {
                    videoHero.muted = true;
                    heroVideoVolume = videoHero.volume;
                    heroVideoWasMuted = true;
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    this.setAttribute('aria-label', 'Activar sonido');
                }
            });
            
            volumeBtn.addEventListener('wheel', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (videoHero.muted) {
                    videoHero.muted = false;
                    heroVideoWasMuted = false;
                }
                
                if (e.deltaY < 0) {
                    videoHero.volume = Math.min(1, videoHero.volume + 0.1);
                } else {
                    videoHero.volume = Math.max(0, videoHero.volume - 0.1);
                }
                
                heroVideoVolume = videoHero.volume;
                updateVolumeIcon(volumeBtn, videoHero);
            });
            
            function updateVolumeIcon(btn, video) {
                if (video.muted || video.volume === 0) {
                    btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    btn.setAttribute('aria-label', 'Activar sonido');
                } else if (video.volume < 0.5) {
                    btn.innerHTML = '<i class="fas fa-volume-down"></i>';
                    btn.setAttribute('aria-label', 'Aumentar volumen');
                } else {
                    btn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    btn.setAttribute('aria-label', 'Silenciar video');
                }
            }
            
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (videoHero.paused) {
                    videoHero.play().then(() => {
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                        this.setAttribute('aria-label', 'Pausar video');
                    }).catch(error => {
                        console.log('Error al reproducir:', error);
                    });
                } else {
                    videoHero.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    this.setAttribute('aria-label', 'Reproducir video');
                }
            });
            
            videoHero.addEventListener('play', function() {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playBtn.setAttribute('aria-label', 'Pausar video');
            });
            
            videoHero.addEventListener('pause', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.setAttribute('aria-label', 'Reproducir video');
            });
            
            setTimeout(() => {
                if (videoHero.paused) {
                    videoHero.play().then(() => {
                    }).catch(error => {
                        console.log('Autoplay falló:', error);
                        videoHero.muted = true;
                        heroVideoWasMuted = true;
                        videoHero.play().then(() => {
                            updateVolumeIcon(volumeBtn, videoHero);
                        });
                    });
                }
            }, 1000);
            
            videoHero.addEventListener('click', function(e) {
                e.stopPropagation();
                if (videoHero.paused) {
                    videoHero.play();
                } else {
                    videoHero.pause();
                }
            });
            
            videoHero.addEventListener('volumechange', function() {
                updateVolumeIcon(volumeBtn, videoHero);
                if (!videoHero.muted) {
                    heroVideoVolume = videoHero.volume;
                }
                heroVideoWasMuted = videoHero.muted;
            });
            
            setInterval(() => {
                if (!videoHero.paused) {
                    heroVideoCurrentTime = videoHero.currentTime;
                }
            }, 1000);
        }
        
        if (modal && modalVideo) {
            createModalControls(modal, modalVideo);
            
            let openModalBtn = document.querySelector('.modal-trigger-btn');
            if (!openModalBtn) {
                openModalBtn = document.createElement('button');
                openModalBtn.className = 'modal-trigger-btn video-control-btn';
                openModalBtn.innerHTML = '<i class="fas fa-expand"></i>';
                openModalBtn.setAttribute('aria-label', 'Ver video en pantalla completa');
                
                const videoContenedor = document.querySelector('.video-contenedor');
                if (videoContenedor) {
                    videoContenedor.appendChild(openModalBtn);
                }
            }
            
            if (openModalBtn) {
                openModalBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    if (videoHero) {
                        heroVideoWasPlaying = !videoHero.paused;
                        heroVideoCurrentTime = videoHero.currentTime;
                        heroVideoVolume = videoHero.volume;
                        heroVideoWasMuted = videoHero.muted;
                        videoHero.pause();
                    }
                    
                    modalVideo.currentTime = heroVideoCurrentTime;
                    modalVideo.volume = heroVideoVolume;
                    modalVideo.muted = heroVideoWasMuted;
                    
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    
                    modalVideo.play().catch(error => {
                        console.log('Error al reproducir modal:', error);
                    });
                });
            }
            
            function restoreHeroVideo() {
                if (videoHero) {
                    videoHero.currentTime = modalVideo.currentTime;
                    videoHero.volume = modalVideo.volume;
                    videoHero.muted = modalVideo.muted;
                    heroVideoVolume = videoHero.volume;
                    heroVideoWasMuted = videoHero.muted;
                    
                    if (heroVideoWasPlaying) {
                        videoHero.play().catch(error => {
                            console.log('Error al reanudar video hero:', error);
                        });
                    }
                    
                    const volumeBtn = document.querySelector('.volume-btn');
                    if (volumeBtn && videoHero) {
                        updateVolumeIcon(volumeBtn, videoHero);
                    }
                }
            }
            
            function closeModal() {
                heroVideoCurrentTime = modalVideo.currentTime;
                modalVideo.pause();
                modal.style.display = 'none';
                document.body.style.overflow = '';
                restoreHeroVideo();
            }
            
            if (cerrarModal) {
                cerrarModal.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeModal();
                });
            }
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    closeModal();
                }
            });
            
            modalVideo.addEventListener('ended', function() {
                closeModal();
            });
        }
        
        function createModalControls(modal, video) {
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'modal-controls';
            controlsContainer.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
                z-index: 1001;
                padding: 10px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 10px;
                margin: 0 20px;
            `;
            
            const playPauseBtn = document.createElement('button');
            playPauseBtn.className = 'modal-control-btn';
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.setAttribute('aria-label', 'Pausar video');
            
            const volumeBtn = document.createElement('button');
            volumeBtn.className = 'modal-control-btn';
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeBtn.setAttribute('aria-label', 'Silenciar video');
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-control-btn';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.setAttribute('aria-label', 'Cerrar video');
            closeBtn.style.background = 'rgba(255, 0, 0, 0.7)';
            
            controlsContainer.appendChild(playPauseBtn);
            controlsContainer.appendChild(volumeBtn);
            controlsContainer.appendChild(closeBtn);
            modal.querySelector('.modal-contenido').appendChild(controlsContainer);
            
            playPauseBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    this.setAttribute('aria-label', 'Pausar video');
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    this.setAttribute('aria-label', 'Reproducir video');
                }
            });
            
            volumeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (video.muted || video.volume === 0) {
                    video.muted = false;
                    video.volume = 0.5;
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                    this.setAttribute('aria-label', 'Silenciar video');
                } else {
                    video.muted = true;
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    this.setAttribute('aria-label', 'Activar sonido');
                }
            });
            
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal();
            });
            
            video.addEventListener('play', function() {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtn.setAttribute('aria-label', 'Pausar video');
            });
            
            video.addEventListener('pause', function() {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                playPauseBtn.setAttribute('aria-label', 'Reproducir video');
            });
            
            video.addEventListener('volumechange', function() {
                if (video.muted || video.volume === 0) {
                    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    volumeBtn.setAttribute('aria-label', 'Activar sonido');
                } else if (video.volume < 0.5) {
                    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
                    volumeBtn.setAttribute('aria-label', 'Aumentar volumen');
                } else {
                    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    volumeBtn.setAttribute('aria-label', 'Silenciar video');
                }
            });
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
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const containerRect = comparacionContainer.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            
            if (x >= 0 && x <= containerRect.width) {
                const percentage = (x / containerRect.width) * 100;
                imagenAntes.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
                controlComparacion.style.left = `${percentage}%`;
            }
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
            if (!isDragging) return;
            
            const containerRect = comparacionContainer.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - containerRect.left;
            
            if (x >= 0 && x <= containerRect.width) {
                const percentage = (x / containerRect.width) * 100;
                imagenAntes.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
                controlComparacion.style.left = `${percentage}%`;
            }
            
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    };

    const scrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.servicio-card, .item-galeria, .paso-card, .info-card').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
    };

    const init = () => {
        mobileMenu();
        smoothScroll();
        navScrollEffect();
        serviceButtons();
        videoHandler();
        comparisonHandler();
        scrollAnimations();
    };

    init();
});

window.addEventListener('load', function() {
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
});