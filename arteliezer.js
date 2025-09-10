
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.encabezado');
  const galeria = document.querySelector('.galeria');
  if (header && galeria) galeria.style.marginTop = `${header.offsetHeight}px`;

  const abrirModal = (modal) => {
    if (modal) {
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  };
  const cerrarModal = (modal) => {
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  };

  const modalContacto = document.getElementById('modal-contacto');
  const abrirContacto = document.getElementById('abrir-contacto');
  const cerrarContacto = document.getElementById('cerrar-contacto');
  const selectAsunto = document.getElementById('asunto');
  const campoMensaje = document.getElementById('mensaje');

  if (abrirContacto) {
    abrirContacto.addEventListener('click', (e) => {
      e.preventDefault();
      abrirModal(modalContacto);
      if (selectAsunto) selectAsunto.value = '';
      if (campoMensaje) campoMensaje.value = '';
    });
  }

  const btnContactarCuadro = document.getElementById('btn-contactar-cuadro');
  const modalCuadro = document.getElementById('modal-cuadro');
  if (btnContactarCuadro) {
    btnContactarCuadro.addEventListener('click', () => {
      const tituloCuadro = document.getElementById('modal-cuadro-titulo').textContent.trim();
      cerrarModal(modalCuadro);
      abrirModal(modalContacto);
      if (selectAsunto) {
        [...selectAsunto.options].forEach(opt => {
          if (opt.value === tituloCuadro) opt.selected = true;
        });
      }
      if (campoMensaje) {
        campoMensaje.value = `Me gustaría recibir información sobre el cuadro "${tituloCuadro}".`;
      }
    });
  }

  if (cerrarContacto) cerrarContacto.addEventListener('click', () => cerrarModal(modalContacto));
  modalContacto?.addEventListener('click', (e) => { if (e.target === modalContacto) cerrarModal(modalContacto); });

  if (selectAsunto && campoMensaje) {
    selectAsunto.addEventListener('change', function () {
      campoMensaje.value = (this.value && this.value !== 'Otra información')
        ? `Me gustaría recibir información sobre el cuadro "${this.value}".`
        : '';
    });
  }

  const cerrarCuadro = document.getElementById('cerrar-cuadro');
  const modalImg = document.getElementById('modal-cuadro-img');
  const modalTitulo = document.getElementById('modal-cuadro-titulo');
  const modalHistoria = document.getElementById('modal-cuadro-historia');

  document.querySelectorAll('.cuadro').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitulo.textContent = img.dataset.titulo || '';
      modalHistoria.textContent = img.dataset.historia || '';
      abrirModal(modalCuadro);
    });
  });

  if (cerrarCuadro) cerrarCuadro.addEventListener('click', () => cerrarModal(modalCuadro));
  modalCuadro?.addEventListener('click', (e) => { if (e.target === modalCuadro) cerrarModal(modalCuadro); });

  const botonArriba = document.querySelector('.boton-volver-arriba');
  window.addEventListener('scroll', () => {
    if (botonArriba) botonArriba.style.display = window.scrollY > 200 ? 'block' : 'none';
  });

  const modalLegal = document.getElementById('modal-legal');
  const abrirPrivacidad = document.getElementById('abrir-privacidad');
  const abrirTerminos = document.getElementById('abrir-terminos');
  const cerrarModalLegal = modalLegal?.querySelector('.cerrar');

  const abrirLegal = (e) => { e.preventDefault(); abrirModal(modalLegal); };
  if (abrirPrivacidad) abrirPrivacidad.addEventListener('click', abrirLegal);
  if (abrirTerminos) abrirTerminos.addEventListener('click', abrirLegal);
  if (cerrarModalLegal) cerrarModalLegal.addEventListener('click', () => cerrarModal(modalLegal));
  modalLegal?.addEventListener('click', (e) => { if (e.target === modalLegal) cerrarModal(modalLegal); });

  const formContacto = document.getElementById('form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const asunto = document.getElementById('asunto').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      const acepto = document.getElementById('acepto').checked;
      if (!nombre || !asunto || !mensaje || !acepto) {
        alert('Por favor, rellena todos los campos y acepta la política de privacidad.');
        return;
      }
      const destinatario = 'info@arteliecer.com';
      const asuntoCorreo = `Consulta: ${asunto}`;
      const cuerpoCorreo = `Hola Arteliecer,\n\nMi nombre es ${nombre}.\n\n${mensaje}`;
      window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(asuntoCorreo)}&body=${encodeURIComponent(cuerpoCorreo)}`;
    });
  }
});

  const botonCompartir = document.getElementById('boton-compartir');

  botonCompartir.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el enlace recargue la página

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ARTELIEZER | Arte reciclado por Eliezer Pérez',
          text: 'Descubre la galería de arte reciclado de Eliezer Pérez.',
          url: 'https://www.arteliezer.com'
        });
        console.log('Compartido con éxito');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('Tu navegador no soporta el botón de compartir nativo.');
    }
  });

const abrirMenu = document.getElementById('abrir-menu');
  const menuLateral = document.getElementById('menu-lateral');

  abrirMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    menuLateral.classList.toggle('activo');
  });

  document.addEventListener('click', (e) => {
    if (!menuLateral.contains(e.target) && e.target !== abrirMenu) {
      menuLateral.classList.remove('activo');
    }
  });

  menuLateral.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
      menuLateral.classList.remove('activo');
    });
  });


