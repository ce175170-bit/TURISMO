
/* =========================================================
   TURISMO BETANZOS
   SCRIPT.JS
   Interacciones y animaciones
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPALES
    ====================================================== */

    const body =
        document.body;

    const header =
        document.getElementById("header");

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const scrollProgressBar =
        document.getElementById("scrollProgressBar");

    const backToTop =
        document.getElementById("backToTop");

    const preloader =
        document.getElementById("preloader");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       AÑO AUTOMÁTICO
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PRELOADER
    ====================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {

                preloader.classList.add(
                    "loaded"
                );

            }

        }, 600);

    });


    /* =====================================================
       MENÚ MÓVIL
    ====================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                menuToggle.classList.toggle(
                    "active"
                );

                mainNav.classList.toggle(
                    "active"
                );

                body.classList.toggle(
                    "menu-open"
                );


                const isOpen =
                    mainNav.classList.contains(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );


        const navLinks =
            mainNav.querySelectorAll(
                ".nav-link"
            );


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menuToggle.classList.remove(
                        "active"
                    );

                    mainNav.classList.remove(
                        "active"
                    );

                    body.classList.remove(
                        "menu-open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       CERRAR MENÚ CON ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (mainNav) {

                    mainNav.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       SCROLL SUAVE
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length <= 1
                ) {

                    return;

                }


                let target = null;


                try {

                    target =
                        document.querySelector(
                            targetId
                        );

                } catch (error) {

                    return;

                }


                if (!target) {

                    return;

                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight +
                    5;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });


    /* =====================================================
       SCROLL PRINCIPAL
    ====================================================== */

    function handleScroll() {

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;


        /* -------------------------------------------------
           HEADER
        ------------------------------------------------- */

        if (header) {

            if (scrollTop > 70) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }


        /* -------------------------------------------------
           BARRA DE PROGRESO
        ------------------------------------------------- */

        if (scrollProgressBar) {

            let progress = 0;


            if (documentHeight > 0) {

                progress =
                    (scrollTop / documentHeight) *
                    100;

            }


            scrollProgressBar.style.width =
                `${Math.min(progress, 100)}%`;

        }


        /* -------------------------------------------------
           VOLVER ARRIBA
        ------------------------------------------------- */

        if (backToTop) {

            if (scrollTop > 500) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ====================================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       NAVEGACIÓN ACTIVA
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const currentSection =
                                entry.target.getAttribute(
                                    "id"
                                );


                            navigationLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${currentSection}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       ATRACTIVOS TURÍSTICOS
       FLIP + GOOGLE MAPS
    ====================================================== */

    const tourSearch =
        document.getElementById(
            "tourSearch"
        );

    const clearTourSearch =
        document.getElementById(
            "clearTourSearch"
        );

    const tourCards =
        document.querySelectorAll(
            ".tour-card"
        );

    const noTourResults =
        document.getElementById(
            "noTourResults"
        );


    /* =====================================================
       FLIP DE TARJETAS
    ====================================================== */

    tourCards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".tour-btn"
                    ) ||
                    event.target.closest("a")
                ) {

                    return;

                }


                card.classList.toggle(
                    "flipped"
                );

            }
        );


        /* -------------------------------------------------
           TECLADO
        ------------------------------------------------- */

        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.target.closest("a")
                ) {

                    return;

                }


                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    card.classList.toggle(
                        "flipped"
                    );

                }

            }
        );

    });


    /* =====================================================
       GOOGLE MAPS
       CONTROL DIRECTO

       IMPORTANTE:
       JavaScript respeta ahora el href del HTML.
       No modifica ni reemplaza las coordenadas.
    ====================================================== */

    const tourMapButtons =
        document.querySelectorAll(
            ".tour-btn-map"
        );


    const tourRouteButtons =
        document.querySelectorAll(
            ".tour-btn-route"
        );


    /* =====================================================
       BOTÓN VER EN GOOGLE MAPS
    ====================================================== */

    tourMapButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const mapsUrl =
                        button.getAttribute(
                            "href"
                        );


                    if (
                        mapsUrl &&
                        mapsUrl !== "#"
                    ) {

                        window.open(
                            mapsUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );

                        return;

                    }


                    const destination =
                        button.dataset.destination;


                    if (destination) {

                        const fallbackUrl =
                            "https://www.google.com/maps/@?api=1" +
                            "&map_action=map" +
                            "&center=" +
                            encodeURIComponent(
                                destination
                            ) +
                            "&zoom=18";


                        window.open(
                            fallbackUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       BOTÓN CÓMO LLEGAR
    ====================================================== */

    tourRouteButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const mapsUrl =
                        button.getAttribute(
                            "href"
                        );


                    if (
                        mapsUrl &&
                        mapsUrl !== "#"
                    ) {

                        window.open(
                            mapsUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );

                        return;

                    }


                    const destination =
                        button.dataset.destination;


                    if (destination) {

                        const fallbackUrl =
                            "https://www.google.com/maps/dir/?api=1" +
                            "&destination=" +
                            encodeURIComponent(
                                destination
                            ) +
                            "&travelmode=driving";


                        window.open(
                            fallbackUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       NORMALIZAR TEXTO
    ====================================================== */

    function normalizeText(value) {

        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );

    }


    /* =====================================================
       BUSCAR ATRACTIVOS
    ====================================================== */

    function filterTours() {

        if (!tourSearch) {

            return;

        }


        const searchValue =
            normalizeText(
                tourSearch.value.trim()
            );


        let visibleCount = 0;


        tourCards.forEach(
            card => {

                const placeName =
                    card.getAttribute(
                        "data-place"
                    ) || "";


                const normalizedPlace =
                    normalizeText(
                        placeName
                    );


                const matches =
                    normalizedPlace.includes(
                        searchValue
                    );


                if (matches) {

                    card.style.display =
                        "";

                    card.classList.remove(
                        "search-hidden"
                    );

                    visibleCount++;

                } else {

                    card.style.display =
                        "none";

                    card.classList.add(
                        "search-hidden"
                    );

                }

            }
        );


        if (noTourResults) {

            noTourResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }


        if (clearTourSearch) {

            clearTourSearch.classList.toggle(
                "visible",
                searchValue.length > 0
            );

        }

    }


    /* =====================================================
       EVENTO DEL BUSCADOR
    ====================================================== */

    if (tourSearch) {

        tourSearch.addEventListener(
            "input",
            filterTours
        );


        tourSearch.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    tourSearch.value =
                        "";

                    filterTours();

                    tourSearch.blur();

                }

            }
        );

    }


    /* =====================================================
       LIMPIAR BUSCADOR
    ====================================================== */

    if (clearTourSearch) {

        clearTourSearch.addEventListener(
            "click",
            () => {

                if (!tourSearch) {

                    return;

                }


                tourSearch.value =
                    "";

                filterTours();

                tourSearch.focus();

            }
        );

    }


    /* =====================================================
       GASTRONOMÍA
       SABORES DE BETANZOS
    ====================================================== */

    const gastronomyItems =
        document.querySelectorAll(
            ".gastronomy-item"
        );


    gastronomyItems.forEach(
        item => {

            const image =
                item.querySelector(
                    ".gastronomy-image img"
                );


            if (!image) {

                return;

            }


            item.addEventListener(
                "mouseenter",
                () => {

                    item.classList.add(
                        "gastronomy-hover"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    item.classList.remove(
                        "gastronomy-hover"
                    );

                }
            );

        }
    );


    /* =====================================================
       GALERÍA / LIGHTBOX
    ====================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );

    const lightboxImage =
        document.querySelector(
            ".lightbox-image"
        );

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    /* =====================================================
       ABRIR LIGHTBOX
    ====================================================== */

    function openLightbox(item) {

        if (!lightbox) {

            return;

        }


        const caption =
            item.querySelector(
                ".gallery-caption span"
            );


        const image =
            item.querySelector(
                "img"
            );


        if (lightboxImage) {

            lightboxImage.innerHTML =
                "";

            lightboxImage.style.background =
                "transparent";

            lightboxImage.style.backgroundColor =
                "transparent";

            lightboxImage.style.width =
                "100%";

            lightboxImage.style.height =
                "100%";

            lightboxImage.style.display =
                "flex";

            lightboxImage.style.flexDirection =
                "column";

            lightboxImage.style.alignItems =
                "center";

            lightboxImage.style.justifyContent =
                "center";

            lightboxImage.style.overflow =
                "visible";

            lightboxImage.style.padding =
                "0";

            lightboxImage.style.boxSizing =
                "border-box";


            /* ---------------------------------------------
               CREAR IMAGEN
            --------------------------------------------- */

            if (image) {

                const newImage =
                    document.createElement(
                        "img"
                    );


                newImage.src =
                    image.currentSrc ||
                    image.src;


                newImage.alt =
                    image.alt ||
                    "Imagen de Betanzos";


                newImage.style.display =
                    "block";

                newImage.style.width =
                    "auto";

                newImage.style.height =
                    "auto";

                newImage.style.maxWidth =
                    "calc(100vw - 40px)";

                newImage.style.maxHeight =
                    "calc(100vh - 120px)";

                newImage.style.objectFit =
                    "contain";

                newImage.style.objectPosition =
                    "center";

                newImage.style.margin =
                    "0 auto";

                newImage.style.borderRadius =
                    "4px";

                newImage.style.boxShadow =
                    "0 25px 70px rgba(0, 0, 0, 0.55)";

                newImage.style.background =
                    "transparent";

                newImage.style.backgroundColor =
                    "transparent";


                newImage.style.setProperty(
                    "object-fit",
                    "contain",
                    "important"
                );


                newImage.style.setProperty(
                    "max-width",
                    "calc(100vw - 40px)",
                    "important"
                );


                newImage.style.setProperty(
                    "max-height",
                    "calc(100vh - 120px)",
                    "important"
                );


                lightboxImage.appendChild(
                    newImage
                );

            }


            /* ---------------------------------------------
               TÍTULO DE LA FOTO
            --------------------------------------------- */

            if (caption) {

                const title =
                    document.createElement(
                        "div"
                    );


                title.textContent =
                    caption.textContent.trim();


                title.style.marginTop =
                    "16px";

                title.style.textAlign =
                    "center";

                title.style.color =
                    "var(--dorado-claro)";

                title.style.fontFamily =
                    '"Cormorant Garamond", serif';

                title.style.fontSize =
                    "1.5rem";

                title.style.fontWeight =
                    "600";

                title.style.lineHeight =
                    "1.2";

                title.style.textShadow =
                    "0 2px 10px rgba(0, 0, 0, 0.7)";


                lightboxImage.appendChild(
                    title
                );

            }

        }


        /* ---------------------------------------------
           FONDO DEL LIGHTBOX
        --------------------------------------------- */

        lightbox.style.background =
            "rgba(3, 8, 5, 0.97)";

        lightbox.style.backgroundColor =
            "#030805";


        lightbox.style.position =
            "fixed";

        lightbox.style.inset =
            "0";

        lightbox.style.width =
            "100vw";

        lightbox.style.height =
            "100vh";

        lightbox.style.zIndex =
            "99999";


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CERRAR LIGHTBOX
    ====================================================== */

    function closeLightbox() {

        if (!lightbox) {

            return;

        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        if (lightboxImage) {

            lightboxImage.innerHTML =
                "";

        }


        body.style.overflow =
            "";

    }


    /* =====================================================
       ABRIR AL HACER CLIC EN UNA FOTO
    ====================================================== */

    galleryItems.forEach(
        item => {

            item.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            "a"
                        ) ||
                        event.target.closest(
                            "button"
                        )
                    ) {

                        return;

                    }


                    openLightbox(
                        item
                    );

                }
            );

        }
    );


    /* =====================================================
       BOTÓN CERRAR
    ====================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       CERRAR HACIENDO CLIC EN EL FONDO
    ====================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                        lightbox ||
                    event.target.classList.contains(
                        "lightbox-overlay"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE LIGHTBOX
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       EFECTO HOVER DE ELEMENTOS
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".tour-card, " +
            ".experience-item"
        );


    cards.forEach(
        card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.setProperty(
                        "--mouse-active",
                        "1"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--mouse-active",
                        "0"
                    );

                }
            );

        }
    );


    /* =====================================================
       EVENTOS Y FESTIVIDADES
       NUEVA AGENDA POR MESES
    ====================================================== */

    const monthButtons =
        document.querySelectorAll(
            ".wheel-month"
        );

    const monthContents =
        document.querySelectorAll(
            ".month-events"
        );


    /* =====================================================
       CAMBIAR DE MES
    ====================================================== */

    function changeMonth(month) {

        if (!month) {

            return;

        }


        /* -------------------------------------------------
           QUITAR ACTIVO DE TODOS LOS BOTONES
        ------------------------------------------------- */

        monthButtons.forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


        /* -------------------------------------------------
           OCULTAR TODOS LOS CONTENIDOS
        ------------------------------------------------- */

        monthContents.forEach(
            content => {

                content.classList.remove(
                    "active"
                );

            }
        );


        /* -------------------------------------------------
           BUSCAR BOTÓN SELECCIONADO
        ------------------------------------------------- */

        const selectedButton =
            document.querySelector(
                `.wheel-month[data-month="${month}"]`
            );


        /* -------------------------------------------------
           BUSCAR CONTENIDO SELECCIONADO
        ------------------------------------------------- */

        const selectedContent =
            document.querySelector(
                `.month-events[data-content="${month}"]`
            );


        /* -------------------------------------------------
           ACTIVAR BOTÓN
        ------------------------------------------------- */

        if (selectedButton) {

            selectedButton.classList.add(
                "active"
            );

        }


        /* -------------------------------------------------
           MOSTRAR CONTENIDO
        ------------------------------------------------- */

        if (selectedContent) {

            selectedContent.classList.add(
                "active"
            );

        }

    }


    /* =====================================================
       CLICK EN LOS MESES
    ====================================================== */

    monthButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const month =
                        button.getAttribute(
                            "data-month"
                        );


                    if (month) {

                        changeMonth(
                            month
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       NAVEGACIÓN CON TECLADO
    ====================================================== */

    monthButtons.forEach(
        (button, index) => {

            button.addEventListener(
                "keydown",
                event => {

                    /* -------------------------------------
                       ENTER / ESPACIO
                    ------------------------------------- */

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();


                        const month =
                            button.getAttribute(
                                "data-month"
                            );


                        if (month) {

                            changeMonth(
                                month
                            );

                        }

                    }


                    /* -------------------------------------
                       FLECHA DERECHA
                    ------------------------------------- */

                    if (
                        event.key === "ArrowRight"
                    ) {

                        event.preventDefault();


                        const newIndex =
                            (
                                index + 1
                            ) %
                            monthButtons.length;


                        const nextButton =
                            monthButtons[
                                newIndex
                            ];


                        nextButton.focus();


                        changeMonth(
                            nextButton.getAttribute(
                                "data-month"
                            )
                        );

                    }


                    /* -------------------------------------
                       FLECHA IZQUIERDA
                    ------------------------------------- */

                    if (
                        event.key === "ArrowLeft"
                    ) {

                        event.preventDefault();


                        const newIndex =
                            (
                                index -
                                1 +
                                monthButtons.length
                            ) %
                            monthButtons.length;


                        const previousButton =
                            monthButtons[
                                newIndex
                            ];


                        previousButton.focus();


                        changeMonth(
                            previousButton.getAttribute(
                                "data-month"
                            )
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       MES INICIAL
    ====================================================== */

    const initialMonth =
        document.querySelector(
            ".wheel-month.active"
        );


    if (initialMonth) {

        changeMonth(
            initialMonth.getAttribute(
                "data-month"
            )
        );

    } else if (
        monthButtons.length > 0
    ) {

        changeMonth(
            monthButtons[0].getAttribute(
                "data-month"
            )
        );

    }


    /* =====================================================
       ANIMACIÓN AL HACER SCROLL
    ====================================================== */

    const eventSection =
        document.getElementById(
            "eventos"
        );


    if (
        "IntersectionObserver" in window &&
        eventSection
    ) {

        const eventsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                eventSection.classList.add(
                                    "events-visible"
                                );


                                eventsObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        eventsObserver.observe(
            eventSection
        );

    }


    /* =====================================================
       PARALLAX HERO
    ====================================================== */

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );


    function heroParallax() {

        if (!heroBackground) {

            return;

        }


        const scrollY =
            window.pageYOffset;


        if (
            scrollY >
            window.innerHeight
        ) {

            return;

        }


        const movement =
            scrollY * 0.15;


        heroBackground.style.transform =
            `translateY(${movement}px)`;

    }


    window.addEventListener(
        "scroll",
        heroParallax,
        {
            passive: true
        }
    );


    /* =====================================================
       ANIMACIÓN DEL LOGO
    ====================================================== */

    const logos =
        document.querySelectorAll(
            ".logo"
        );


    logos.forEach(
        logo => {

            logo.addEventListener(
                "mouseenter",
                () => {

                    const symbol =
                        logo.querySelector(
                            ".logo-symbol"
                        );


                    if (symbol) {

                        symbol.style.transform =
                            "rotate(135deg)";

                    }

                }
            );


            logo.addEventListener(
                "mouseleave",
                () => {

                    const symbol =
                        logo.querySelector(
                            ".logo-symbol"
                        );


                    if (symbol) {

                        symbol.style.transform =
                            "rotate(45deg)";

                    }

                }
            );

        }
    );


    /* =====================================================
       ANIMACIÓN DE BOTONES
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.style.transform =
                            "translateX(4px)";

                    }

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.style.transform =
                            "";

                    }

                }
            );

        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        handleScroll();

                        heroParallax();

                    },
                    150
                );

        }
    );


    /* =====================================================
       INICIO
    ====================================================== */

    handleScroll();

    heroParallax();

    filterTours();

});


/* =========================================================
   PLANIFICA TU VISITA
========================================================= */

const planningCards =
    document.querySelectorAll(
        ".planning-card"
    );

const planningModal =
    document.getElementById(
        "planningModal"
    );

const planningModalClose =
    document.getElementById(
        "planningModalClose"
    );

const planningModalTitle =
    document.getElementById(
        "planningModalTitle"
    );

const planningModalLabel =
    document.getElementById(
        "planningModalLabel"
    );

const planningModalIcon =
    document.getElementById(
        "planningModalIcon"
    );

const planningList =
    document.getElementById(
        "planningList"
    );

const planningOverlay =
    document.querySelector(
        ".planning-modal-overlay"
    );


/* =========================================================
   DATOS DE PLANIFICA TU VISITA
========================================================= */

const planningData = {

    /* =====================================================
       ALOJAMIENTOS
    ====================================================== */

    alojamientos: {

        title:
            "Alojamientos",

        label:
            "DÓNDE DESCANSAR",

        icon:
            "fa-hotel",

        items: [

            {
                nombre:
                    "Hotel CIORVA",

                imagen:
                    "img/ciorva.webp",

                direccion:
                    "Betanzos, Potosí",

                telefono:
                    "69621569",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=-19.55335185615868%2C-65.45253379260363"
            },


            {
                nombre:
                    "Residencial HERBAS",

                imagen:
                    "img/herbas.webp",

                direccion:
                    "Calle Potosí",

                telefono:
                    "69621569",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=-19.55279026898487%2C-65.45379206937685"
            },


            {
                nombre:
                    "Residencial BOLIVAR",

                imagen:
                    "img/bolivar.webp",

                direccion:
                    "Av. Bolivar",

                telefono:
                    "69621569",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=-19.554243349547733%2C-65.44919019338394"
            }

        ]

    },


    /* =====================================================
       RESTAURANTES
    ====================================================== */

    restaurantes: {

        title:
            "Restaurantes",

        label:
            "DÓNDE COMER",

        icon:
            "fa-utensils",

        items: [

            {
                nombre:
                    "Comidas Avaroa",

                imagen:
                    "img/planifica/restaurantes/comidas-avaroa.webp",

                direccion:
                    "Betanzos, Potosí",

                telefono:
                    "No disponible",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=Comidas+Avaroa+Betanzos+Potosi"
            },


            {
                nombre:
                    "Truchería Otalora",

                imagen:
                    "img/planifica/restaurantes/trucheria-otalora.webp",

                direccion:
                    "Betanzos, Potosí",

                telefono:
                    "+591 63691241",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=Trucheria+Otalora+Betanzos+Potosi"
            }

        ]

    },


    /* =====================================================
       SALUD
    ====================================================== */

    salud: {

        title:
            "Salud",

        label:
            "ATENCIÓN MÉDICA",

        icon:
            "fa-hospital",

        items: [

            {
                nombre:
                    "Centro de Salud ROBERTO LOAYZA",

                imagen:
                    "img/hospital.webp",

                direccion:
                    "Betanzos, Potosí",

                telefono:
                    "+591 26279102",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=-19.556213025208905%2C-65.44670284639497"
            },


            {
                nombre:
                    "Caja Nacional de Salud Betanzos",

                imagen:
                    "img/caja.webp",

                direccion:
                    "Betanzos, Potosí",

                telefono:
                    "+591 26279102",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=-19.556786314307114%2C-65.45282140674607"
            }

        ]

    },


    /* =====================================================
       FARMACIAS
    ====================================================== */

    farmacias: {

        title:
            "Farmacias",

        label:
            "SERVICIOS FARMACÉUTICOS",

        icon:
            "fa-pills",

        items: [

            {
                nombre:
                    "Farmacia Betanzos",

                imagen:
                    "img/planifica/farmacias/farmacia-betanzos.webp",

                direccion:
                    "Avenida Bolívar, frente a COTAP y Parque Infantil",

                telefono:
                    "+591 79438302",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=Farmacia+Betanzos+Potosi"
            },


            {
                nombre:
                    "Farmacia Medrano",

                imagen:
                    "img/planifica/farmacias/farmacia-medrano.webp",

                direccion:
                    "Zona Chorrillos, Avenida Final Bolívar",

                telefono:
                    "No disponible",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=Farmacia+Medrano+Betanzos+Potosi"
            }

        ]

    },


    /* =====================================================
       TRANSPORTE
    ====================================================== */

    transporte: {

        title:
            "Transporte",

        label:
            "MOVILIDAD",

        icon:
            "fa-bus",

        items: [

            {
                nombre:
                    "Transporte local",

                imagen:
                    "img/planifica/transporte/transporte-local.webp",

                direccion:
                    "Betanzos, Potosí",

                telefono:
                    "Consultar localmente",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=Transporte+Betanzos+Potosi"
            },


            {
                nombre:
                    "Transporte hacia Potosí",

                imagen:
                    "img/planifica/transporte/transporte-potosi.webp",

                direccion:
                    "Puntos de salida locales",

                telefono:
                    "Consultar horarios",

                maps:
                    "https://www.google.com/maps/search/?api=1&query=Transporte+Betanzos+Potosi"
            }

        ]

    }

};


/* =========================================================
   ESCAPAR TEXTO
========================================================= */

function escapePlanningText(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text ?? "";


    return div.innerHTML;

}


/* =========================================================
   ABRIR PLANIFICA TU VISITA
========================================================= */

function openPlanningModal(category) {

    if (
        !planningModal ||
        !planningList
    ) {

        return;

    }


    const data =
        planningData[category];


    if (!data) {

        return;

    }


    /* -----------------------------------------------------
       TÍTULO
    ----------------------------------------------------- */

    if (planningModalTitle) {

        planningModalTitle.textContent =
            data.title;

    }


    /* -----------------------------------------------------
       ETIQUETA
    ----------------------------------------------------- */

    if (planningModalLabel) {

        planningModalLabel.textContent =
            data.label;

    }


    /* -----------------------------------------------------
       ICONO
    ----------------------------------------------------- */

    if (planningModalIcon) {

        planningModalIcon.innerHTML = `
            <i class="fa-solid ${data.icon}"></i>
        `;

    }


    /* -----------------------------------------------------
       LIMPIAR LISTA
    ----------------------------------------------------- */

    planningList.innerHTML =
        "";


    /* -----------------------------------------------------
       SI NO HAY ESTABLECIMIENTOS
    ----------------------------------------------------- */

    if (
        !data.items ||
        data.items.length === 0
    ) {

        planningList.innerHTML = `

            <div class="planning-empty">

                <i class="fa-solid fa-circle-info"></i>

                <p>
                    Próximamente agregaremos información
                    de este servicio.
                </p>

            </div>

        `;


        showPlanningModal();

        return;

    }


    /* -----------------------------------------------------
       CREAR CADA ESTABLECIMIENTO
    ----------------------------------------------------- */

    data.items.forEach(
        item => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "planning-list-item";


            const nombre =
                escapePlanningText(
                    item.nombre
                );


            const imagen =
                escapePlanningText(
                    item.imagen
                );


            const direccion =
                escapePlanningText(
                    item.direccion
                );


            const telefono =
                escapePlanningText(
                    item.telefono
                );


            /* ---------------------------------------------
               TELÉFONO VÁLIDO
            --------------------------------------------- */

            const tieneTelefono =
                item.telefono &&
                ![
                    "No disponible",
                    "Información no disponible",
                    "Consultar localmente",
                    "Consultar horarios"
                ].includes(
                    item.telefono
                );


            /* ---------------------------------------------
               NÚMERO PARA TEL
            --------------------------------------------- */

            const telefonoLimpio =
                item.telefono
                    ? item.telefono.replace(
                        /[^0-9+]/g,
                        ""
                    )
                    : "";


            /* ---------------------------------------------
               BOTÓN LLAMAR
            --------------------------------------------- */

            let botonTelefono =
                "";


            if (tieneTelefono) {

                botonTelefono = `

                    <a
                        href="tel:${telefonoLimpio}"
                        class="planning-list-phone">

                        <i class="fa-solid fa-phone"></i>

                        Llamar

                    </a>

                `;

            } else {

                botonTelefono = `

                    <span
                        class="planning-list-phone">

                        <i class="fa-solid fa-circle-info"></i>

                        Sin teléfono

                    </span>

                `;

            }


            /* ---------------------------------------------
               CREAR HTML DEL ESTABLECIMIENTO
            --------------------------------------------- */

            article.innerHTML = `

                <div class="planning-list-item-image">

                    <img
                        src="${imagen}"
                        alt="${nombre}"
                        loading="lazy"
                        onerror="
                            this.style.display='none';
                            this.parentElement.innerHTML =
                            '<i class=&quot;fa-solid fa-image&quot;></i>';
                        "
                    >

                </div>


                <div class="planning-list-item-icon">

                    <i class="fa-solid ${data.icon}"></i>

                </div>


                <div>

                    <h4>
                        ${nombre}
                    </h4>


                    <div class="planning-list-data">

                        <span>

                            <i class="fa-solid fa-location-dot"></i>

                            ${direccion}

                        </span>


                        <span>

                            <i class="fa-solid fa-phone"></i>

                            ${telefono}

                        </span>

                    </div>

                </div>


                <div class="planning-list-actions">

                    ${botonTelefono}


                    <a
                        href="${item.maps}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="planning-list-map">

                        <i class="fa-solid fa-location-arrow"></i>

                        Cómo llegar

                    </a>

                </div>

            `;


            planningList.appendChild(
                article
            );

        }
    );


    /* -----------------------------------------------------
       MOSTRAR MODAL
    ----------------------------------------------------- */

    showPlanningModal();

}


/* =========================================================
   MOSTRAR MODAL
========================================================= */

function showPlanningModal() {

    if (!planningModal) {

        return;

    }


    planningModal.classList.add(
        "active"
    );


    planningModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CERRAR MODAL
========================================================= */

function closePlanningModal() {

    if (!planningModal) {

        return;

    }


    planningModal.classList.remove(
        "active"
    );


    planningModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   EVENTO - TARJETAS
========================================================= */

planningCards.forEach(
    card => {

        card.addEventListener(
            "click",
            function () {

                const category =
                    this.dataset.planning;


                openPlanningModal(
                    category
                );

            }
        );

    }
);


/* =========================================================
   EVENTO - BOTÓN CERRAR
========================================================= */

if (planningModalClose) {

    planningModalClose.addEventListener(
        "click",
        closePlanningModal
    );

}


/* =========================================================
   EVENTO - FONDO DEL MODAL
========================================================= */

if (planningOverlay) {

    planningOverlay.addEventListener(
        "click",
        closePlanningModal
    );

}


/* =========================================================
   EVENTO - TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            planningModal &&
            planningModal.classList.contains(
                "active"
            )
        ) {

            closePlanningModal();

        }

    }
);

