
document.addEventListener('DOMContentLoaded', () => {
  // Ajustar margen de galería según altura del header
  const header = document.querySelector('.encabezado');
  const galeria = document.querySelector('.galeria');
  if (header && galeria) {
    galeria.style.marginTop = header.offsetHeight + 'px';
  }

  // --- Modal de contacto ---
  const modalContacto = document.getElementById('modal-contacto');
  const abrirContacto = document.getElementById('abrir-contacto'); // botón/enlace cabecera
  const cerrarContacto = document.getElementById('cerrar-contacto');
  const selectAsunto = document.getElementById('asunto');
  const campoMensaje = document.getElementById('mensaje');

  // Abrir desde cabecera
  if (abrirContacto) {
    abrirContacto.addEventListener('click', (e) => {
      e.preventDefault();
      modalContacto.style.display = 'block';
      modalContacto.setAttribute('aria-hidden', 'false');
      // Limpiar selección y mensaje
      if (selectAsunto) selectAsunto.value = '';
      if (campoMensaje) campoMensaje.value = '';
    });
  }

  // Abrir desde modal de cuadro
  const btnContactarCuadro = document.getElementById('btn-contactar-cuadro');
  const modalCuadro = document.getElementById('modal-cuadro');
  if (btnContactarCuadro) {
    btnContactarCuadro.addEventListener('click', () => {
      const tituloCuadro = document.getElementById('modal-cuadro-titulo').textContent.trim();
      modalCuadro.style.display = 'none';
      modalContacto.style.display = 'block';
      modalContacto.setAttribute('aria-hidden', 'false');
      if (selectAsunto) {
        for (let option of selectAsunto.options) {
          if (option.value === tituloCuadro) {
            option.selected = true;
            break;
          }
        }
      }
      if (campoMensaje) {
        campoMensaje.value = `Me gustaría recibir información sobre el cuadro "${tituloCuadro}".`;
      }
    });
  }

  // Cerrar modal de contacto
  if (cerrarContacto) {
    cerrarContacto.addEventListener('click', () => {
      modalContacto.style.display = 'none';
      modalContacto.setAttribute('aria-hidden', 'true');
    });
  }
  modalContacto.addEventListener('click', (e) => {
    if (e.target === modalContacto) {
      modalContacto.style.display = 'none';
      modalContacto.setAttribute('aria-hidden', 'true');
    }
  });

  // Rellenar mensaje al cambiar asunto manualmente
  if (selectAsunto && campoMensaje) {
    selectAsunto.addEventListener('change', function () {
      if (this.value && this.value !== 'Otra información') {
        campoMensaje.value = `Me gustaría recibir información sobre el cuadro "${this.value}".`;
      } else {
        campoMensaje.value = '';
      }
    });
  }

  // --- Modal de cuadro ---
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
      modalCuadro.style.display = 'block';
    });
  });
  if (cerrarCuadro) {
    cerrarCuadro.addEventListener('click', () => {
      modalCuadro.style.display = 'none';
    });
  }
  modalCuadro.addEventListener('click', (e) => {
    if (e.target === modalCuadro) {
      modalCuadro.style.display = 'none';
    }
  });

  // --- Botón volver arriba ---
  const botonArriba = document.querySelector('.boton-volver-arriba');
  window.addEventListener('scroll', () => {
    botonArriba.style.display = window.scrollY > 200 ? 'block' : 'none';
  });

  // --- Modal legal ---
  const modalLegal = document.getElementById('modal-legal');
  const abrirPrivacidad = document.getElementById('abrir-privacidad');
  const abrirTerminos = document.getElementById('abrir-terminos');
  const cerrarModalLegal = modalLegal.querySelector('.cerrar');

  function abrirModalLegal(e) {
    e.preventDefault();
    modalLegal.style.display = 'block';
  }
  if (abrirPrivacidad) abrirPrivacidad.addEventListener('click', abrirModalLegal);
  if (abrirTerminos) abrirTerminos.addEventListener('click', abrirModalLegal);
  if (cerrarModalLegal) {
    cerrarModalLegal.addEventListener('click', () => {
      modalLegal.style.display = 'none';
    });
  }
  window.addEventListener('click', (e) => {
    if (e.target === modalLegal) {
      modalLegal.style.display = 'none';
    }
  });

  // --- Envío del formulario de contacto ---
  const formContacto = document.getElementById('form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
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








