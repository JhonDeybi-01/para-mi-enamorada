const musica = document.getElementById("musica");
let videoActivo = null;

function reproducirMusica() {
    musica.play().catch(() => {});
}

function configurarVideos() {
    document.querySelectorAll("video").forEach((video) => {
        video.addEventListener("play", () => {
            videoActivo = video;
            musica.pause();
        });

        video.addEventListener("pause", () => {
            if (videoActivo === video) {
                videoActivo = null;
                reproducirMusica();
            }
        });

        video.addEventListener("ended", () => {
            if (videoActivo === video) {
                videoActivo = null;
                reproducirMusica();
            }
        });
    });
}

function iniciarMusica() {
    reproducirMusica();
}

configurarVideos();
reproducirMusica();
document.addEventListener("pointerdown", iniciarMusica, { once: true });
document.addEventListener("keydown", iniciarMusica, { once: true });


function mostrarMensaje() {

    const mensaje = document.getElementById("mensaje");

    mensaje.classList.remove("oculto");

    mensaje.scrollIntoView({
        behavior: "smooth"
    });

}


// Crear corazones automáticamente

function crearCorazon() {

    const corazon = document.createElement("div");

    corazon.classList.add("corazon");

    corazon.innerHTML = "♥";

    corazon.style.left = Math.random() * 100 + "vw";

    corazon.style.fontSize =
        (Math.random() * 20 + 15) + "px";

    corazon.style.animationDuration =
        (Math.random() * 3 + 4) + "s";

    document.querySelector(".corazones")
        .appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 7000);

}

setInterval(crearCorazon, 800);


// Crear mariposas automáticamente

function crearMariposa() {

    const mariposa = document.createElement("div");

    mariposa.classList.add("mariposa");

    mariposa.innerHTML = "🦋";

    mariposa.style.left = Math.random() * 100 + "vw";

    mariposa.style.animationDuration =
        (Math.random() * 4 + 6) + "s";

    mariposa.style.fontSize =
        (Math.random() * 15 + 20) + "px";

    document.querySelector(".mariposas")
        .appendChild(mariposa);

    setTimeout(() => {
        mariposa.remove();
    }, 10000);

}

setInterval(crearMariposa, 1500);


// Decisión: botones

function aceptar() {

    const respuesta = document.getElementById("respuesta");

    respuesta.classList.remove("oculto");

    respuesta.scrollIntoView({
        behavior: "smooth"
    });

    const botones = document.querySelector(".botones");
    botones.style.display = "none";

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            crearCorazon();
        }, i * 100);
    }

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            crearMariposa();
        }, i * 200);
    }

}

function noAcepta() {

    const botonNo = document.querySelector(".btn-no");

    botonNo.style.opacity = "0.5";

    setTimeout(() => {
        botonNo.style.opacity = "1";
    }, 300);

}


// Abrir tarjeta con mensaje de perdón

function abrirTarjeta() {

    const mensaje = document.getElementById("mensaje-perdon");

    const tarjeta = document.querySelector(".tarjeta-frente");

    tarjeta.classList.add("abierta");

    mensaje.classList.remove("oculto");

    mensaje.scrollIntoView({
        behavior: "smooth"
    });

}


// Carousel de fotos

let slideActual = 1;
const totalSlides = 6;
let autoplay;

iniciarCarousel();

function iniciarCarousel() {

    mostrarSlide(slideActual);

    autoplay = setInterval(() => {
        slideSiguiente();
    }, 4000);

}

function mostrarSlide(n) {

    if (n > totalSlides) {
        slideActual = 1;
    } else if (n < 1) {
        slideActual = totalSlides;
    } else {
        slideActual = n;
    }

    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");

    slides.forEach((slide, i) => {
        slide.classList.toggle("activo", i + 1 === slideActual);
    });

    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.classList.toggle("activa", i + 1 === slideActual);
            dot.onclick = () => irASlide(i + 1);
            dotsContainer.appendChild(dot);
        }
    }

}

function slideSiguiente() {

    clearTimeout(autoplay);

    slideActual = slideActual % totalSlides + 1;

    mostrarSlide(slideActual);

    autoplay = setInterval(() => {
        slideSiguiente();
    }, 4000);

}

function slideAnterior() {

    clearTimeout(autoplay);

    slideActual = slideActual === 1 ? totalSlides : slideActual - 1;

    mostrarSlide(slideActual);

    autoplay = setInterval(() => {
        slideSiguiente();
    }, 4000);

}

function irASlide(n) {

    clearTimeout(autoplay);

    slideActual = n;

    mostrarSlide(slideActual);

    autoplay = setInterval(() => {
        slideSiguiente();
    }, 4000);

}
