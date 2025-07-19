// Navegação móvel
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de fade-in ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.beneficio, .produto, .experiencia-item, .sustentabilidade-item, .combo, .unidade').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Header transparente/opaco baseado no scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animação dos elementos flutuantes no hero
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 2000; // 2 segundos de delay entre cada elemento
        
        setInterval(() => {
            element.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + delay);
    });
}

// Iniciar animações quando a página carregar
window.addEventListener('load', function() {
    animateFloatingElements();
});

// Contador animado para as estatísticas do hero
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        
        if (target === '∞') return; // Não animar o infinito
        
        const isPercentage = target.includes('%');
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericTarget / 50; // 50 frames de animação
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            counter.textContent = isPercentage ? Math.floor(current) + '%' : Math.floor(current);
        }, 50);
    });
}

// Observar quando a seção hero entra na tela para iniciar contadores
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target); // Executar apenas uma vez
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// Efeito parallax sutil no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    const floatingElements = document.querySelectorAll('.float-element');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    floatingElements.forEach((element, index) => {
        const speed = 0.05 + (index * 0.02);
        element.style.transform += ` translateY(${scrolled * speed}px)`;
    });
});

// Destacar topping ao hover
document.querySelectorAll('.toppings-list span').forEach(topping => {
    topping.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.fontWeight = '600';
    });
    
    topping.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.fontWeight = 'normal';
    });
});

// Efeito de clique nos produtos
document.querySelectorAll('.produto, .combo, .tamanho').forEach(item => {
    item.addEventListener('click', function() {
        // Efeito de "pulse"
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Feedback visual
        const originalBg = this.style.background;
        this.style.background = 'linear-gradient(135deg, #A3E4D7 0%, #F9E79F 100%)';
        setTimeout(() => {
            this.style.background = originalBg;
        }, 300);
    });
});

// Copiar hashtags ao clicar
document.querySelectorAll('.hashtags-list span').forEach(hashtag => {
    hashtag.addEventListener('click', function() {
        const text = this.textContent;
        
        // Tentar copiar para a área de transferência
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(this);
            });
        } else {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyFeedback(this);
        }
    });
});

function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copiado!';
    element.style.background = '#5B2C6F';
    element.style.color = '#FFFFFF';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.background = '#A3E4D7';
        element.style.color = '#5B2C6F';
    }, 1500);
}

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preloader simples
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remover qualquer preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// Melhorar acessibilidade - navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar menu mobile
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Detectar se o usuário prefere movimento reduzido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desabilitar animações complexas
    document.documentElement.style.setProperty('--transition', 'none');
    
    // Remover animações CSS
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Performance: debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(function() {
    // Lógica de scroll aqui se necessário
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Adicionar classe para indicar que JavaScript está ativo
document.documentElement.classList.add('js-enabled');

console.log('🍇 Gelaí - Site carregado com sucesso! Sabor que gela, energia que fica. 💜');

