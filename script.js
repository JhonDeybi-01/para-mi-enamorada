const musica = document.getElementById("musica");
let videoActivo = null;

function reproducirMusica() {
    if (!musica) {
        return;
    }

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

musica.addEventListener("canplay", reproducirMusica, { once: true });
window.addEventListener("load", reproducirMusica);
window.addEventListener("pageshow", reproducirMusica);
document.addEventListener("pointerdown", iniciarMusica, { once: true });
document.addEventListener("touchstart", iniciarMusica, { once: true, passive: true });
document.addEventListener("keydown", iniciarMusica, { once: true });

const collageSlider = document.querySelector(".collage-slider");
const collageTrack = document.querySelector(".collage-track");
const collageSlides = document.querySelectorAll(".collage-slide");
const collagePrevious = document.querySelector(".collage-prev");
const collageNext = document.querySelector(".collage-next");
const collageDots = document.querySelectorAll(".collage-dot");
let collageIndice = 0;
let collageTemporizador = null;
let toqueInicial = null;

function actualizarCollage(indice) {
    if (collageSlides.length === 0) {
        return;
    }

    collageIndice = (indice + collageSlides.length) % collageSlides.length;
    collageTrack.style.transform = `translateX(-${collageIndice * 100}%)`;

    collageDots.forEach((dot, index) => {
        const isActive = index === collageIndice;
        dot.classList.toggle("is-active", isActive);

        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

function siguienteCollage() {
    actualizarCollage(collageIndice + 1);
}

function anteriorCollage() {
    actualizarCollage(collageIndice - 1);
}

function pausarCollage() {
    if (collageTemporizador) {
        clearInterval(collageTemporizador);
        collageTemporizador = null;
    }
}

function reanudarCollage() {
    pausarCollage();
    collageTemporizador = setInterval(siguienteCollage, 5000);
}

function seleccionarCollage(event) {
    const dot = event.currentTarget;
    const indice = Array.from(collageDots).indexOf(dot);
    actualizarCollage(indice);
    reanudarCollage();
}

if (collageSlider && collageTrack && collagePrevious && collageNext) {
    collagePrevious.addEventListener("click", anteriorCollage);
    collageNext.addEventListener("click", siguienteCollage);
    collageDots.forEach((dot) => {
        dot.addEventListener("click", seleccionarCollage);
    });

    collageSlider.addEventListener("mouseenter", pausarCollage);
    collageSlider.addEventListener("mouseleave", reanudarCollage);
    collageSlider.addEventListener("focusin", pausarCollage);
    collageSlider.addEventListener("focusout", reanudarCollage);

    collageSlider.addEventListener("touchstart", (event) => {
        toqueInicial = event.touches[0].clientX;
        pausarCollage();
    }, { passive: true });

    collageSlider.addEventListener("touchend", (event) => {
        if (toqueInicial === null) {
            return;
        }

        const toqueFinal = event.changedTouches[0].clientX;
        const diferencia = toqueFinal - toqueInicial;

        if (diferencia < -40) {
            siguienteCollage();
        } else if (diferencia > 40) {
            anteriorCollage();
        }

        toqueInicial = null;
        reanudarCollage();
    }, { passive: true });

    collageSlider.addEventListener("touchcancel", () => {
        toqueInicial = null;
        reanudarCollage();
    }, { passive: true });

    actualizarCollage(0);
    reanudarCollage();
}


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


function irASlide(n) {
    // No-op: carousel reemplazado por collage
}
