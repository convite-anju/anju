document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const abrirBtn = envelope.querySelector('button');
  const music = document.getElementById('background-music');

  function iniciarConvite() {
    document.body.classList.add('slideshow-ativo');
    document.getElementById('main-content').style.opacity = '1';
    music.play().catch(() => console.log("Música aguardando interação."));

    // === SLIDESHOW ===
    const slideshowContainer = document.getElementById('background-slideshow');
    const fotos = [
      './foto1.jpg', './foto2.jpg', './foto3.jpg',
      './foto4.jpg', './foto5.jpg', './foto6.jpg',
      './foto7.jpg', './foto8.jpg', './foto9.jpg', './foto10.jpg'
    ];
    const tempoPorFoto = 15000;
    const tempoTransicao = 3000;
    let fotoAtual = 0;
    let fotoAnterior = null;

    const slides = fotos.map((foto) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.style.backgroundImage = `url(${foto})`;
      slideshowContainer.appendChild(slide);
      return slide;
    });

    slides[fotoAtual].classList.add('active');

    setInterval(() => {
      fotoAnterior = fotoAtual;
      fotoAtual = (fotoAtual + 1) % slides.length;
      slides[fotoAtual].classList.add('active');
      setTimeout(() => {
        slides[fotoAnterior].classList.remove('active');
      }, tempoTransicao);
    }, tempoPorFoto);

    // === DIGITAÇÃO DO NOME E FRASE ===
    const headline = document.getElementById('typewriter');
    if (headline) {
      const text = headline.textContent;
      headline.innerHTML = '';

      text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
        span.classList.add('soft-glow-letter');
        span.style.animationDelay = `${index * 100}ms`;
        headline.appendChild(span);
      });

      // Frase abaixo
      const subline = document.getElementById('subtypewriter');
      if (subline) {
        const subtext = subline.textContent;
        subline.innerHTML = '';

        setTimeout(() => {
          subtext.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
            span.classList.add('soft-glow-letter');
            span.style.animationDelay = `${index * 80}ms`;
            subline.appendChild(span);
          });

          // === BOTÕES EM SEQUÊNCIA ===
          const navButtons = document.querySelectorAll('nav button');
          setTimeout(() => {
            navButtons.forEach((btn, index) => {
              setTimeout(() => {
                btn.classList.add('button-glow');
              }, index * 200);
            });

            // === RODAPÉ COM FRASE FINAL E 💚 ISOLADO ===
            const footerText = document.getElementById('footer-text');
            if (footerText) {
              const footerContent = footerText.textContent.replace('💚', '').trim(); // remove emoji para digitar texto
              footerText.innerHTML = '';
              footerText.style.visibility = 'visible';

              setTimeout(() => {
                footerContent.split('').forEach((letter, index) => {
                  const span = document.createElement('span');
                  span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
                  span.classList.add('soft-glow-letter');
                  span.style.animationDelay = `${index * 80}ms`;
                  footerText.appendChild(span);
                });

                // Adiciona coração com delay final
                const heart = document.createElement('span');
                heart.textContent = ' 💚';
                heart.style.opacity = '0';
                heart.classList.add('soft-glow-letter');
                heart.style.animation = 'softGlowFadeIn 0.8s ease-out forwards';
                heart.style.animationDelay = `${footerContent.length * 80 + 300}ms`;
                footerText.appendChild(heart);
              }, navButtons.length * 200 + 500); // após botões
            }

          }, subtext.length * 80 + 500); // após frase
        }, text.length * 100 + 500); // após nome
      }
    }
  }

  // ABERTURA DO CONVITE
  abrirBtn.addEventListener('click', () => {
    envelope.style.opacity = '0';
    setTimeout(() => {
      envelope.style.display = 'none';
      iniciarConvite();
    }, 500);
  }, { once: true });

  // NAVEGAÇÃO ENTRE SEÇÕES
  const navButtons = document.querySelectorAll('nav button');
  const contentSections = document.querySelectorAll('.content-section');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const targetSection = document.getElementById(targetId);
      contentSections.forEach(section => section.classList.remove('active'));
      if (targetSection) targetSection.classList.add('active');
    });
  });

  // MÚSICA
  const musicToggle = document.getElementById('music-toggle');
  musicToggle.addEventListener('click', () => {
    music.paused ? music.play() : music.pause();
  });
});

// Galeria interativa
const galeriaImgs = document.querySelectorAll('.galeria-container img');
const modalGaleria = document.getElementById('modal-galeria');
const modalImg = document.getElementById('modal-img');
const fecharModal = document.getElementById('fechar-modal');

galeriaImgs.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modalGaleria.classList.add('active');
  });
});

fecharModal.addEventListener('click', () => {
  modalGaleria.classList.remove('active');
});

// Fechar modal ao clicar fora da imagem
modalGaleria.addEventListener('click', (e) => {
  if (e.target === modalGaleria) {
    modalGaleria.classList.remove('active');
  }
});
