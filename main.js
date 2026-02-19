// ================================
// EUSKADI HEALTHY & FUN - MAIN JS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // NAVEGACIÓN MÓVIL
    // ================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ================================
    // SCROLL SUAVE
    // ================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // NAVBAR AL HACER SCROLL
    // ================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra al hacer scroll
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ================================
    // FILTROS DE PLANES
    // ================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const planCards = document.querySelectorAll('.plan-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar tarjetas
            const filter = this.getAttribute('data-filter');
            
            planCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ================================
    // ANIMACIONES AL HACER SCROLL
    // ================================
    const revealElements = document.querySelectorAll(
        '.fade-in-up, .slide-in-left, .slide-in-right, .problema-card, .flow-step, .plan-card'
    );
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Ejecutar al cargar
    
    // ================================
    // CONTADOR ANIMADO (Stats)
    // ================================
    const animateCounter = function(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Observar cuando los stats entran en el viewport
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const number = entry.target.querySelector('.stat-number');
                if (number) {
                    const targetValue = parseInt(number.textContent);
                    animateCounter(number, targetValue);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-badge, .stat').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ================================
    // EFECTO PARALLAX EN HERO
    // ================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    // ================================
    // BOTONES CON EFECTO RIPPLE
    // ================================
    const buttons = document.querySelectorAll('.btn, .filter-btn, .btn-small');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Estilos para el efecto ripple
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ================================
    // LAZY LOADING DE IMÁGENES
    // ================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ================================
    // AJUSTES RESPONSIVE
    // ================================
    window.addEventListener('resize', function() {
        // Ajustar elementos según el tamaño de pantalla
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // ================================
    // MENSAJE DE BIENVENIDA
    // ================================
    console.log('%c🏃‍♀️ Euskadi Healthy & Fun 🏃‍♂️', 
        'font-size: 20px; font-weight: bold; color: #2ecc71;');
    console.log('%c¡Tu agenda activa de planes saludables!', 
        'font-size: 14px; color: #3498db;');
    console.log('%cProyecto desarrollado con ❤️ para Open Data Euskadi', 
        'font-size: 12px; color: #e67e22;');
    
    console.log('✅ JavaScript principal cargado correctamente');
});

// ================================
// MAPA INTERACTIVO - FUERA DEL DOMContentLoaded
// ================================

// Esperar a que TODO esté cargado (incluyendo Leaflet)
window.addEventListener('load', function() {
    
    console.log('🔄 Intentando cargar mapa...');
    
    // Verificar si Leaflet está disponible
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet no está cargado');
        return;
    }
    
    // Verificar si el elemento del mapa existe
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.log('ℹ️ Elemento del mapa no encontrado');
        return;
    }
    
    console.log('✅ Leaflet cargado, elemento encontrado');
    
    // Coordenadas del centro del País Vasco (Vitoria-Gasteiz)
    const euskadiCenter = [42.8467, -2.6716];
    
    try {
        // Inicializar el mapa
        const map = L.map('map', {
            center: euskadiCenter,
            zoom: 9,
            zoomControl: true,
            scrollWheelZoom: true
        });
        
        console.log('✅ Mapa inicializado');
        
        // Añadir capa de tiles (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(map);
        
        console.log('✅ Tiles añadidos');
        
        // ================================
        // DATOS DE EJEMPLO - ACTIVOS DE SALUD
        // ================================
        const activosSalud = [
            {
                nombre: "Parque Etxebarria",
                tipo: "Parque Biosaludable",
                lat: 43.2627,
                lng: -2.9253,
                ciudad: "Bilbao",
                descripcion: "Parque con aparatos biosaludables y zonas de ejercicio al aire libre.",
                categoria: "activos"
            },
            {
                nombre: "Paseo Nuevo",
                tipo: "Ruta de Paseo",
                lat: 43.3213,
                lng: -1.9812,
                ciudad: "Donostia",
                descripcion: "Paseo marítimo ideal para caminar y hacer ejercicio junto al mar.",
                categoria: "activos"
            },
            {
                nombre: "Parque de la Florida",
                tipo: "Parque Urbano",
                lat: 42.8467,
                lng: -2.6716,
                ciudad: "Vitoria-Gasteiz",
                descripcion: "Amplio parque urbano con senderos para caminar y hacer running.",
                categoria: "activos"
            },
            {
                nombre: "Reserva de Urdaibai",
                tipo: "Espacio Natural",
                lat: 43.3833,
                lng: -2.6833,
                ciudad: "Bizkaia",
                descripcion: "Reserva de la Biosfera con múltiples rutas de senderismo.",
                categoria: "activos"
            },
            {
                nombre: "Monte Urgull",
                tipo: "Ruta de Senderismo",
                lat: 43.3242,
                lng: -1.9831,
                ciudad: "Donostia",
                descripcion: "Monte con senderos y vistas panorámicas de la ciudad.",
                categoria: "activos"
            },
            {
                nombre: "Anillo Verde",
                tipo: "Ruta Ciclista",
                lat: 42.8500,
                lng: -2.6900,
                ciudad: "Vitoria-Gasteiz",
                descripcion: "Red de rutas verdes que rodean la ciudad, perfecta para ciclismo.",
                categoria: "activos"
            },
            {
                nombre: "Parque Europa",
                tipo: "Parque Biosaludable",
                lat: 43.2580,
                lng: -2.9235,
                ciudad: "Bilbao",
                descripcion: "Parque con instalaciones deportivas y aparatos de ejercicio.",
                categoria: "activos"
            },
            {
                nombre: "Paseo de la Concha",
                tipo: "Ruta de Paseo",
                lat: 43.3187,
                lng: -1.9897,
                ciudad: "Donostia",
                descripcion: "Icónico paseo junto a la playa de la Concha.",
                categoria: "activos"
            }
        ];
        
        // ================================
        // DATOS DE EJEMPLO - EVENTOS
        // ================================
        const eventos = [
            {
                nombre: "Yoga al Aire Libre",
                tipo: "Evento Deportivo",
                lat: 43.2627,
                lng: -2.9253,
                ciudad: "Bilbao",
                fecha: "Sábado 12 Feb, 10:00h",
                plazas: 20,
                descripcion: "Clase de yoga para todos los niveles en el Parque Etxebarria.",
                categoria: "eventos"
            },
            {
                nombre: "Ruta Guiada por Urdaibai",
                tipo: "Evento de Naturaleza",
                lat: 43.3833,
                lng: -2.6833,
                ciudad: "Bizkaia",
                fecha: "Domingo 13 Feb, 09:00h",
                plazas: 25,
                descripcion: "Ruta de senderismo guiada por la Reserva de la Biosfera.",
                categoria: "eventos"
            },
            {
                nombre: "Grupo de Running Matutino",
                tipo: "Evento Deportivo",
                lat: 43.3187,
                lng: -1.9897,
                ciudad: "Donostia",
                fecha: "Mar-Jue-Sáb, 07:00h",
                plazas: 15,
                descripcion: "Sesión de running junto al Paseo de la Concha.",
                categoria: "eventos"
            },
            {
                nombre: "Taller de Danza Moderna",
                tipo: "Evento Cultural",
                lat: 42.8467,
                lng: -2.6716,
                ciudad: "Vitoria-Gasteiz",
                fecha: "Lunes 14 Feb, 18:00h",
                plazas: 15,
                descripcion: "Iniciación a la danza contemporánea. No se requiere experiencia.",
                categoria: "eventos"
            }
        ];
        
        // ================================
        // ICONOS PERSONALIZADOS
        // ================================
        
        // Icono para Activos de Salud
        const iconoActivo = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: #2ecc71;
                    width: 40px;
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-running" style="
                        color: white;
                        font-size: 18px;
                        transform: rotate(45deg);
                    "></i>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        // Icono para Eventos
        const iconoEvento = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: #e67e22;
                    width: 40px;
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-calendar-check" style="
                        color: white;
                        font-size: 18px;
                        transform: rotate(45deg);
                    "></i>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        // Icono para Espacios Naturales
        const iconoNaturaleza = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: #3498db;
                    width: 40px;
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-tree" style="
                        color: white;
                        font-size: 18px;
                        transform: rotate(45deg);
                    "></i>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        // ================================
        // GRUPOS DE CAPAS (para filtros)
        // ================================
        const grupoActivos = L.layerGroup().addTo(map);
        const grupoEventos = L.layerGroup().addTo(map);
        
        console.log('✅ Grupos de capas creados');
        
        // ================================
        // AÑADIR MARCADORES - ACTIVOS
        // ================================
        activosSalud.forEach(activo => {
            // Seleccionar icono según el tipo
            let icono = iconoActivo;
            if (activo.tipo.includes('Natural') || activo.tipo.includes('Senderismo')) {
                icono = iconoNaturaleza;
            }
            
            const marker = L.marker([activo.lat, activo.lng], { icon: icono })
                .bindPopup(`
                    <div class="map-popup">
                        <span class="map-popup-type">${activo.tipo}</span>
                        <h3>${activo.nombre}</h3>
                        <div class="map-popup-meta">
                            <span>
                                <i class="fas fa-map-marker-alt"></i>
                                ${activo.ciudad}
                            </span>
                        </div>
                        <p>${activo.descripcion}</p>
                        <a href="#planes" class="map-popup-btn">
                            <i class="fas fa-info-circle"></i>
                            Más información
                        </a>
                    </div>
                `)
                .addTo(grupoActivos);
            
            // Animación al hacer hover
            marker.on('mouseover', function() {
                this.openPopup();
            });
        });
        
        console.log('✅ Marcadores de activos añadidos:', activosSalud.length);
        
        // ================================
        // AÑADIR MARCADORES - EVENTOS
        // ================================
        eventos.forEach(evento => {
            const marker = L.marker([evento.lat, evento.lng], { icon: iconoEvento })
                .bindPopup(`
                    <div class="map-popup">
                        <span class="map-popup-type">${evento.tipo}</span>
                        <h3>${evento.nombre}</h3>
                        <div class="map-popup-meta">
                            <span>
                                <i class="fas fa-calendar"></i>
                                ${evento.fecha}
                            </span>
                            <span>
                                <i class="fas fa-map-marker-alt"></i>
                                ${evento.ciudad}
                            </span>
                            <span>
                                <i class="fas fa-users"></i>
                                ${evento.plazas} plazas
                            </span>
                        </div>
                        <p>${evento.descripcion}</p>
                        <a href="#planes" class="map-popup-btn">
                            <i class="fas fa-calendar-plus"></i>
                            Ver detalles
                        </a>
                    </div>
                `)
                .addTo(grupoEventos);
            
            marker.on('mouseover', function() {
                this.openPopup();
            });
        });
        
        console.log('✅ Marcadores de eventos añadidos:', eventos.length);
        
        // ================================
        // CONTROLES DE FILTRO
        // ================================
        const filterMapButtons = document.querySelectorAll('.map-filter-btn');
        
        filterMapButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Actualizar botón activo
                filterMapButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-map-filter');
                
                // Mostrar/ocultar capas según el filtro
                switch(filter) {
                    case 'all':
                        map.addLayer(grupoActivos);
                        map.addLayer(grupoEventos);
                        break;
                    case 'activos':
                        map.addLayer(grupoActivos);
                        map.removeLayer(grupoEventos);
                        break;
                    case 'eventos':
                        map.removeLayer(grupoActivos);
                        map.addLayer(grupoEventos);
                        break;
                }
            });
        });
        
        console.log('✅ Filtros configurados');
        
        // ================================
        // ACTUALIZAR ESTADÍSTICAS
        // ================================
        const totalActivosEl = document.getElementById('totalActivos');
        const totalEventosEl = document.getElementById('totalEventos');
        
        if (totalActivosEl) totalActivosEl.textContent = activosSalud.length;
        if (totalEventosEl) totalEventosEl.textContent = eventos.length;
        
        // ================================
        // AJUSTAR VISTA A TODOS LOS MARCADORES
        // ================================
        const allMarkers = [...activosSalud, ...eventos];
        const bounds = L.latLngBounds(allMarkers.map(item => [item.lat, item.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
        
        console.log('🗺️ ¡Mapa interactivo cargado correctamente!');
        
    } catch (error) {
        console.error('❌ Error al cargar el mapa:', error);
    }
});

