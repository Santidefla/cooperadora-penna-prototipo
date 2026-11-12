/* ==========================================================
   Cooperadora del Hospital Penna — lógica del prototipo
   ========================================================== */
(function () {
  "use strict";

  var D = window.DATOS;
  var pagina = document.body.getAttribute("data-pagina");

  /* ---------- Utilidades ---------- */
  function pesos(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }
  function pct(a, b) {
    return Math.min(100, Math.round((a / b) * 100));
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function slug(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  // Al llegar con un #ancla a un elemento que se dibuja con JS, desplazarse hasta él y resaltarlo
  function irAlAncla() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    // Si al cargar las fotos de arriba se corre el contenido, se vuelve a ubicar
    // (durante 2 segundos y solo si la persona no empezó a moverse por la página)
    var tocado = false, inicio = Date.now();
    ["wheel", "touchstart", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, function () { tocado = true; }, { once: true, passive: true });
    });
    function reubicar() { if (!tocado && Date.now() - inicio < 2000) el.scrollIntoView({ block: "start" }); }
    $all("img").forEach(function (img) { if (!img.complete) img.addEventListener("load", reubicar, { once: true }); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reubicar);
    setTimeout(reubicar, 600);
    if (!el.matches(".tarjeta, .evento")) return; // las secciones enteras solo se desplazan
    el.classList.remove("resaltado");
    void el.offsetWidth; // reinicia la animación si ya estaba resaltado
    el.classList.add("resaltado");
    setTimeout(function () { el.classList.remove("resaltado"); }, 3100);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- Isotipo (guía de marca) ---------- */
  function isotipo(negativo) {
    var c = negativo
      ? { cruz: "#2B8FD6", madre: "#FFFFFF", bebe: "#18A3B5", cabezaBebe: "#FF4A55", contorno: "#0B2A4A", brazo: "#FFFFFF" }
      : { cruz: "#0A6FB0", madre: "#0B2A4A", bebe: "#18A3B5", cabezaBebe: "#E0313B", contorno: "#FFFFFF", brazo: "#0B2A4A" };
    return '<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">' +
      '<rect x="148" y="20" width="12" height="36" rx="6" fill="' + c.cruz + '"/>' +
      '<rect x="136" y="32" width="36" height="12" rx="6" fill="' + c.cruz + '"/>' +
      '<circle cx="82" cy="46" r="20" fill="' + c.madre + '"/>' +
      '<path d="M78 74 C52 74 36 94 36 122 L36 178 C36 183 39 186 44 186 L112 186 C117 186 120 183 120 178 L120 122 C120 94 104 74 78 74 Z" fill="' + c.madre + '"/>' +
      '<ellipse cx="110" cy="124" rx="34" ry="20" transform="rotate(-15 110 124)" fill="' + c.bebe + '" stroke="' + c.contorno + '" stroke-width="6"/>' +
      '<circle cx="148" cy="100" r="15" fill="' + c.cabezaBebe + '" stroke="' + c.contorno + '" stroke-width="5"/>' +
      '<path d="M54 150 C78 162 122 160 154 128" fill="none" stroke="' + c.contorno + '" stroke-width="22" stroke-linecap="round"/>' +
      '<path d="M54 150 C78 162 122 160 154 128" fill="none" stroke="' + c.brazo + '" stroke-width="12" stroke-linecap="round"/>' +
      "</svg>";
  }

  function logo(negativo) {
    return '<a class="logo' + (negativo ? " logo--negativo" : "") + '" href="index.html" aria-label="Cooperadora Hospital Penna, inicio">' +
      isotipo(negativo) +
      '<span class="logo-texto"><span class="l1">COOPERADORA</span><span class="l2">HOSPITAL PENNA</span></span></a>';
  }

  /* ---------- Íconos ---------- */
  var ICONOS = {
    monitor: '<path d="M3 4h18v12H3z M8 20h8 M12 16v4 M6 11h3l2-4 2 7 2-3h3"/>',
    pc: '<path d="M3 4h18v11H3z M2 19h20 M9 15l-1 4 M15 15l1 4"/>',
    cama: '<path d="M3 18V7 M3 14h18v4 M21 14v-2a3 3 0 0 0-3-3h-7v5 M7 11.5a1.5 1.5 0 1 0 0-.01"/>',
    silla: '<path d="M7 3h10v8H7z M5 11h14 M12 11v6 M8 21l4-4 4 4"/>',
    escritorio: '<path d="M3 8h18 M5 8v12 M19 8v12 M13 8v6h6"/>',
    rayos: '<path d="M4 20h16 M12 4a7 7 0 0 1 7 7 M12 4a7 7 0 0 0-7 7 M12 4v9 M9 13h6v3H9z"/>',
    corazon: '<path d="M12 20s-7-4.5-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
    lista: '<path d="M9 6h11 M9 12h11 M9 18h11 M4 6h.01 M4 12h.01 M4 18h.01"/>',
    lupa: '<path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M21 21l-5-5"/>',
    calendario: '<path d="M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5"/>',
    personas: '<path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M2 20a7 7 0 0 1 14 0 M16 4.5a3.5 3.5 0 0 1 0 6.5 M18 14a6 6 0 0 1 4 6"/>',
    empresa: '<path d="M4 21V5l8-3v19 M12 9h8v12 M7 8h2 M7 12h2 M7 16h2 M15 13h2 M15 17h2 M2 21h20"/>',
    paquete: '<path d="M3 7l9-4 9 4-9 4-9-4z M3 7v10l9 4 9-4V7 M12 11v10"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    documento: '<path d="M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6"/>'
  };
  function icono(nombre) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS[nombre] || "") + "</svg>";
  }
  window.icono = icono;

  /* ---------- Encabezado, aviso y pie ---------- */
  var enlaces = [
    ["index", "index.html", "Inicio"],
    ["necesidades", "necesidades.html", "Necesidades"],
    ["transparencia", "transparencia.html", "Transparencia"],
    ["agenda", "agenda.html", "Agenda"],
    ["nosotros", "nosotros.html", "Quiénes somos"]
  ];

  function renderEncabezado() {
    var nav = enlaces.map(function (e) {
      return '<a href="' + e[1] + '"' + (pagina === e[0] ? ' aria-current="page"' : "") + ">" + e[2] + "</a>";
    }).join("");
    var html =
      '<a class="saltar" href="#contenido">Saltar al contenido</a>' +
      '<div class="aviso-prototipo" role="note"><strong>Prototipo académico</strong> · Práctica Profesional, Licenciatura en Administración (UBA). ' +
      "La Cooperadora todavía no está constituida: las donaciones y los montos recaudados son simulados.</div>" +
      '<header class="encabezado"><div class="contenedor">' + logo(false) +
      '<button class="menu-btn" aria-expanded="false" aria-controls="nav-principal">Menú</button>' +
      '<nav class="nav" id="nav-principal" aria-label="Principal">' + nav +
      '<a class="btn btn--donar btn--chico" href="dona.html">Doná hoy</a></nav>' +
      "</div></header>";
    var cont = document.getElementById("encabezado");
    if (cont) cont.outerHTML = html;

    var btn = $(".menu-btn");
    var menu = $("#nav-principal");
    if (btn && menu) {
      btn.addEventListener("click", function () {
        var abierto = menu.classList.toggle("abierto");
        btn.setAttribute("aria-expanded", abierto ? "true" : "false");
      });
    }
  }

  function renderPie() {
    var html =
      '<footer class="pie"><div class="contenedor"><div class="columnas">' +
      "<div>" + logo(true) +
      '<p style="margin-top:16px">Asociación Civil Cooperadora del Hospital General de Agudos Dr. José María Penna.<br><em>“Nacemos juntos, vivimos Penna”</em></p></div>' +
      "<div><h4>Navegá</h4><ul>" +
      enlaces.map(function (e) { return '<li><a href="' + e[1] + '">' + e[2] + "</a></li>"; }).join("") +
      '<li><a href="dona.html">Doná / Asociate</a></li></ul></div>' +
      "<div><h4>Contacto</h4><ul>" +
      "<li>Oficina en el predio del hospital<br>Almafuerte 406, Parque Patricios (CABA)</li>" +
      '<li><a href="nosotros.html#contacto">Escribinos</a></li></ul></div>' +
      "<div><h4>Redes</h4><ul>" +
      // Redes previstas en el TP (E8). No llevan a ningún lado: los perfiles no se van a crear.
      ["Instagram", "Facebook", "TikTok", "LinkedIn"].map(function (red) {
        return '<li><a class="red-social" role="link" aria-disabled="true">' + red + "</a></li>";
      }).join("") + "</ul></div>" +
      "</div>" +
      '<div class="legal"><span>© 2027 Cooperadora del Hospital Penna · Prototipo académico</span>' +
      '<span>Fondos depositados en una cuenta oficial del Banco Ciudad a nombre de la Cooperadora.</span></div>' +
      "</div></footer>";
    var cont = document.getElementById("pie");
    if (cont) cont.outerHTML = html;
  }

  /* ---------- Modal ---------- */
  function abrirModal(titulo, cuerpoHtml) {
    var modal = document.getElementById("modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modal";
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "modal-titulo");
      document.body.appendChild(modal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.hasAttribute("data-cerrar")) cerrarModal();
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarModal(); });
    }
    modal.innerHTML = '<div class="modal-caja"><div class="icono">' + icono("check") + "</div>" +
      '<h3 id="modal-titulo">' + titulo + "</h3>" + cuerpoHtml +
      '<button class="btn btn--primario" data-cerrar>Entendido</button></div>';
    modal.hidden = false;
    var b = modal.querySelector("[data-cerrar]");
    if (b) b.focus();
  }
  function cerrarModal() {
    var modal = document.getElementById("modal");
    if (modal) modal.hidden = true;
  }
  window.abrirModal = abrirModal;

  /* ---------- Contadores ---------- */
  function animarNumero(el, fin, formato) {
    var dur = 1200, ini = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = formato(fin); return; }
    function paso(t) {
      if (!ini) ini = t;
      var p = Math.min(1, (t - ini) / dur);
      el.textContent = formato(fin * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
  function renderContadores() {
    $all("[data-contador]").forEach(function (el) {
      var clave = el.getAttribute("data-contador");
      var valor = D.resumen[clave];
      var formato = (clave === "recaudado" || clave === "saldo") ? pesos : function (n) { return Math.round(n).toLocaleString("es-AR"); };
      animarNumero(el, valor, formato);
    });
  }

  /* ---------- Necesidades ---------- */
  function tarjetaNecesidad(n) {
    var p = pct(n.recaudado, n.meta);
    var completa = p >= 100;
    var etapa = D.etapas[n.etapa];
    return '<article class="tarjeta necesidad" data-etapa="' + n.etapa + '">' +
      '<span class="etapa' + (completa ? " etapa--completa" : "") + '">' + (completa ? "Meta cumplida · " : "") + etapa + "</span>" +
      '<div class="icono icono--azul">' + icono(n.icono) + "</div>" +
      "<h3>" + esc(n.titulo) + "</h3>" +
      '<div class="servicio">' + esc(n.servicio) + "</div>" +
      '<p class="detalle">' + esc(n.detalle) + "</p>" +
      (n.entregadas
        ? '<p class="entregadas">' + icono("check") + "<span><strong>" + n.entregadas + " de " + n.unidades + "</strong> ya entregad" +
          (/^(\d+ )?(mesas|sillas|computadoras)/.test(n.titulo) ? "as" : "os") + " al hospital</span></p>"
        : "") +
      '<div class="barra" role="img" aria-label="Recaudado ' + p + ' por ciento de la meta">' +
      '<div class="barra-pista"><div class="barra-relleno' + (completa ? " completa" : "") + '" data-pct="' + p + '"></div></div>' +
      '<div class="barra-datos"><span><strong>' + pesos(n.recaudado) + "</strong> de " + pesos(n.meta) + "</span><span><strong>" + p + "%</strong></span></div></div>" +
      (n.legajo ? '<a class="enlace" href="transparencia.html#' + n.legajo + '">Ver la rendición</a>' : "") +
      "</article>";
  }

  function animarBarras(ctx) {
    var barras = $all(".barra-relleno", ctx);
    var activar = function (b) { b.style.width = b.getAttribute("data-pct") + "%"; };
    if (!("IntersectionObserver" in window)) { barras.forEach(activar); return; }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { activar(e.target); obs.unobserve(e.target); } });
    }, { threshold: .3 });
    barras.forEach(function (b) { obs.observe(b); });
  }

  function renderNecesidades() {
    var cont = document.getElementById("lista-necesidades");
    if (!cont) return;
    var limite = parseInt(cont.getAttribute("data-limite") || "0", 10);
    var lista = D.necesidades.filter(function (n) { return limite ? n.recaudado < n.meta : true; });
    if (limite) lista = lista.slice(0, limite);
    cont.innerHTML = lista.map(tarjetaNecesidad).join("");
    animarBarras(cont);

    $all(".filtro").forEach(function (f) {
      f.addEventListener("click", function () {
        $all(".filtro").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        f.setAttribute("aria-pressed", "true");
        var et = f.getAttribute("data-filtro");
        $all(".necesidad", cont).forEach(function (t) {
          t.hidden = !(et === "todas" || t.getAttribute("data-etapa") === et);
        });
      });
    });
  }

  /* ---------- Agenda ---------- */
  function renderEventos() {
    var cont = document.getElementById("lista-eventos");
    if (!cont) return;
    var limite = parseInt(cont.getAttribute("data-limite") || "0", 10);
    // En Inicio (con límite) se muestran los próximos eventos; en Agenda, todos
    var lista = limite
      ? D.eventos.filter(function (e) { return !(D.hoy && e.fin && e.fin < D.hoy); }).slice(0, limite)
      : D.eventos;
    cont.innerHTML = lista.map(function (e) {
      // Si el evento ya pasó (según la "fecha de hoy" del prototipo), se ofrece ver su contenido
      var pasado = D.hoy && e.fin && e.fin < D.hoy;
      var boton = pasado
        ? '<button class="btn btn--secundario btn--chico" data-contenido="' + D.eventos.indexOf(e) + '">Ver contenido</button>'
        : '<a class="btn btn--secundario btn--chico" href="agenda.html#voluntariado">Quiero participar</a>';
      return '<article class="evento" id="' + slug(e.campana) + '"><div class="fecha"><div class="dia">' + esc(e.dia) + '</div><div class="mes">' + esc(e.mes) + "</div></div>" +
        '<div><p class="efemeride">' + esc(e.efemeride) + "</p><h3>" + esc(e.campana) + "</h3><p>" + esc(e.descripcion) + "</p></div>" +
        boton + "</article>";
    }).join("");

    // Cartel del contenido (como el de los documentos de Transparencia)
    $all("[data-contenido]", cont).forEach(function (b) {
      b.addEventListener("click", function () {
        var e = D.eventos[parseInt(b.getAttribute("data-contenido"), 10)];
        abrirModal("Contenido del evento",
          "<p>Acá se publican las fotos, los videos y un resumen de <strong>“" + esc(e.campana) + "”</strong> (" +
          esc(e.dia) + " de " + esc(e.mes.toLowerCase()) + ").</p>");
      });
    });
  }

  /* ---------- Imagen o collage ---------- */
  function visualImagen(item) {
    if (item.imagenes) {
      return '<div class="collage" role="img" aria-label="' + esc(item.alt || "") + '">' +
        item.imagenes.map(function (src, i) {
          return '<img src="' + src + '" alt="" loading="lazy" class="collage-' + i + '">';
        }).join("") + "</div>";
    }
    return '<img src="' + item.imagen + '" alt="' + esc(item.alt || "") + '" loading="lazy">';
  }

  /* ---------- Novedades ---------- */
  function renderNovedades() {
    var cont = document.getElementById("lista-novedades");
    if (!cont) return;
    cont.innerHTML = D.novedades.map(function (n) {
      return '<article class="tarjeta novedad">' + visualImagen(n) +
        '<div class="cuerpo"><span class="fecha-nota">' + esc(n.fecha) + "</span><h3>" + esc(n.titulo) + "</h3><p>" + esc(n.resumen) + "</p>" +
        '<a class="enlace" href="' + (n.enlace || "transparencia.html#legajos") + '">Leer más</a></div></article>';
    }).join("");
  }

  /* ---------- Transparencia ---------- */
  function renderLegajos() {
    var cont = document.getElementById("lista-legajos");
    if (!cont) return;
    var docs = [["Presupuestos", "los presupuestos comparativos"], ["Factura", "la factura del proveedor"],
      ["Remito", "el remito de entrega"], ["Acta de donación", "el acta de donación con cargo"]];
    cont.innerHTML = D.legajos.map(function (l) {
      var visual = (l.imagen || l.imagenes)
        ? visualImagen(l)
        : '<div class="legajo-icono">' + icono(l.icono) + "</div>";
      return '<article class="tarjeta legajo" id="' + l.id + '">' + visual + '<div class="cuerpo">' +
        '<span class="estado">Entregado · ' + esc(l.fecha) + "</span>" +
        '<h3 style="margin-top:10px">' + esc(l.titulo) + "</h3>" +
        "<p>" + esc(l.descripcion) + " Inversión: <strong>" + pesos(l.monto) + "</strong>.</p>" +
        '<div class="documentos">' + docs.map(function (d) {
          return '<button class="documento" data-documento="' + d[1] + '">' + icono("documento") + d[0] + "</button>";
        }).join("") + "</div>" +
        '<p style="font-size:.88rem;margin:0"><strong>Impacto:</strong> ' + esc(l.impacto) + "</p></div></article>";
    }).join("");
  }

  /* Cinta de agradecimientos: avanza sola y también se puede mover a mano con la barra.
     Se frena mientras el cursor está encima o se la toca, y retoma al soltar. */
  function moverCinta(cont) {
    var copia = cont.querySelector(".cinta-copia");
    var velocidad = 30; // píxeles por segundo
    var pausada = false, pos = 0, previo = null;
    function mitad() { return copia.offsetLeft; }
    function paso(t) {
      if (previo === null) previo = t;
      var dt = (t - previo) / 1000; previo = t;
      if (!pausada && mitad() > 0) {
        pos += velocidad * dt;
        if (pos >= mitad()) pos -= mitad();
        cont.scrollLeft = pos;
      } else {
        pos = cont.scrollLeft; // si la persona la movió, sigue desde ahí
      }
      requestAnimationFrame(paso);
    }
    cont.addEventListener("scroll", function () {
      if (cont.scrollLeft >= mitad() && mitad() > 0) cont.scrollLeft -= mitad();
    });
    cont.addEventListener("mouseenter", function () { pausada = true; });
    cont.addEventListener("mouseleave", function () { pausada = false; });
    cont.addEventListener("touchstart", function () { pausada = true; }, { passive: true });
    cont.addEventListener("touchend", function () { setTimeout(function () { pausada = false; }, 1500); });
    requestAnimationFrame(paso);
  }

  function renderTransparencia() {
    renderLegajos();
    var tabla = document.getElementById("tabla-movimientos");
    if (tabla) {
      tabla.innerHTML = D.movimientos.map(function (m) {
        // Sin columna "Tipo": el signo (+ ingreso / − egreso) y el color ya lo indican
        var ingreso = m.tipo !== "Egreso";
        // En celular se oculta la columna Fecha y la fecha se muestra arriba del concepto (.mov-fecha)
        return "<tr><td>" + m.fecha + '</td><td><span class="mov-fecha">' + m.fecha + "</span>" + esc(m.concepto) + '</td><td class="monto-celda' + (ingreso ? " monto--ingreso" : "") + '">' +
          (ingreso ? "+ " : "− ") + pesos(m.monto) + "</td></tr>";
      }).join("");
    }
    var don = document.getElementById("lista-donantes");
    if (don) {
      // Cinta continua: la lista se repite dos veces para que el movimiento no tenga cortes
      var chips = D.donantes.map(function (d) { return '<span class="donante">' + esc(d) + "</span>"; }).join("");
      don.innerHTML = '<div class="cinta-pista">' + chips + '<span class="cinta-copia" aria-hidden="true">' + chips + "</span></div>";
      moverCinta(don);
    }
    $all("[data-documento]").forEach(function (b) {
      b.addEventListener("click", function () {
        var doc = esc(b.getAttribute("data-documento"));
        var de = doc.indexOf("el ") === 0 ? "del " + doc.slice(3) : "de " + doc; // "de el remito" → "del remito"
        abrirModal("Documentación pública",
          "<p>Acá se abre el PDF " + de.replace(/^(del?) (.*)$/, "$1 <strong>$2</strong>") +
          ", para que cualquier persona pueda " + esc(b.getAttribute("data-motivo") || "verificar la compra") + ".</p>");
      });
    });
  }

  /* ---------- Donar ---------- */
  function renderDonar() {
    var form = document.getElementById("form-personas");
    if (!form) return;

    // Pestañas personas / empresas
    $all(".pestana").forEach(function (p) {
      p.addEventListener("click", function () {
        $all(".pestana").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        p.setAttribute("aria-selected", "true");
        $all(".panel").forEach(function (panel) { panel.hidden = panel.id !== p.getAttribute("aria-controls"); });
      });
    });
    if (location.hash === "#empresas") { var pe = $('.pestana[aria-controls="panel-empresas"]'); if (pe) pe.click(); }

    var MONTOS = {
      mensual: { opciones: [5000, 10000, 15000], minimo: 2000 },
      unico: { opciones: [10000, 15000, 20000], minimo: 5000 }
    };
    var contMontos = document.getElementById("montos");
    var otro = document.getElementById("otro-monto");
    var ayudaMin = document.getElementById("ayuda-minimo");

    function tipoActual() { return form.querySelector('input[name="tipo"]:checked').value; }
    function pintarMontos() {
      var cfg = MONTOS[tipoActual()];
      contMontos.innerHTML = cfg.opciones.map(function (m, i) {
        return '<div class="monto"><input type="radio" name="monto" id="m' + i + '" value="' + m + '"' + (i === 1 ? " checked" : "") +
          '><label for="m' + i + '">' + pesos(m) + "</label></div>";
      }).join("");
      ayudaMin.textContent = "Monto mínimo: " + pesos(cfg.minimo) + (tipoActual() === "mensual" ? " por mes." : ".");
      otro.value = "";
    }
    $all('input[name="tipo"]', form).forEach(function (r) { r.addEventListener("change", pintarMontos); });
    otro.addEventListener("input", function () {
      if (otro.value) $all('input[name="monto"]', form).forEach(function (r) { r.checked = false; });
    });
    contMontos.addEventListener("change", function () { otro.value = ""; });
    pintarMontos();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = document.getElementById("error-donacion");
      var cfg = MONTOS[tipoActual()];
      var marcado = form.querySelector('input[name="monto"]:checked');
      var monto = otro.value ? parseInt(otro.value, 10) : (marcado ? parseInt(marcado.value, 10) : 0);
      var nombre = document.getElementById("nombre").value.trim();
      var mail = document.getElementById("mail").value.trim();
      if (!monto || monto < cfg.minimo) { err.textContent = "El monto mínimo es " + pesos(cfg.minimo) + "."; return; }
      if (!nombre || !/^\S+@\S+\.\S+$/.test(mail)) { err.textContent = "Completá tu nombre y un mail válido para recibir el comprobante."; return; }
      err.textContent = "";
      // Cómo figura en los agradecimientos de Transparencia: "Anónimo" o nombre + inicial ("Ana P.")
      var partes = nombre.split(/\s+/);
      var comoFigura = document.getElementById("anonimo").checked
        ? "Anónimo"
        : partes[0] + (partes[1] ? " " + partes[1].charAt(0).toUpperCase() + "." : "");
      abrirModal("¡Gracias, " + esc(partes[0]) + "!",
        '<p style="font-size:.85rem;color:var(--gris-texto)">Prototipo: no se realizó ningún cobro.</p><div class="comprobante">' +
        "<strong>Tu comprobante</strong><br>" +
        "Tipo: " + (tipoActual() === "mensual" ? "Cuota social mensual" : "Aporte único") + "<br>" +
        "Monto: " + pesos(monto) + "<br>" +
        "En agradecimientos: " + esc(comoFigura) + "<br>" +
        "Medio: Mercado Pago / Payway / transferencia al Banco Ciudad<br>Recibo: emitido por ARCA a nombre de la Cooperadora</div>" +
        "<p>Tu aporte se destina a las necesidades más urgentes que define la Dirección del hospital.</p>");
      form.reset();
      pintarMontos();
    });

    // Botones de empresas
    $all("[data-membresia]").forEach(function (b) {
      b.addEventListener("click", function () {
        var opcion = b.getAttribute("data-membresia");
        abrirModal("Solicitud enviada", opcion === "Padrinazgo de equipamiento"
          // El padrinazgo es un convenio por un proyecto, no un débito mensual
          ? "<p>La Vocalía de Relaciones Institucionales y RSE se va a contactar con tu empresa para armar el convenio de padrinazgo y definir juntos el proyecto, según las prioridades de la Dirección del hospital.</p>"
          : "<p>La Vocalía de Relaciones Institucionales y RSE se va a contactar con tu empresa para formalizar la opción <strong>" +
            esc(opcion) + "</strong> y el débito o la transferencia programada al Banco Ciudad.</p>");
      });
    });
  }

  /* ---------- Formularios simples (voluntariado, especie) ---------- */
  function renderFormsSimples() {
    $all("form[data-simulado]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        abrirModal("¡Gracias!", "<p>" + esc(f.getAttribute("data-simulado")) + "</p>");
        f.reset();
      });
    });
  }

  /* ---------- Íconos declarativos ---------- */
  function renderIconos() {
    $all("[data-icono]").forEach(function (el) { el.innerHTML = icono(el.getAttribute("data-icono")); });
  }

  renderEncabezado();
  renderPie();
  renderIconos();
  renderContadores();
  renderNecesidades();
  renderEventos();
  renderNovedades();
  renderTransparencia();
  renderDonar();
  renderFormsSimples();
  irAlAncla();
  window.addEventListener("hashchange", irAlAncla); // también si el destino está en la misma página
})();
