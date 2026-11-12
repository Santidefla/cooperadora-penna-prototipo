/* ==========================================================
   DATOS DEL PROTOTIPO
   - Necesidades, metas y costos: REALES, del TP (sección J2),
     priorizadas por la Dirección del hospital (entrevista del 1/9/2026).
   - Escenario: el sitio se muestra a los 2/3 del primer año.
     Recaudado = evento del Centenario ($10.500.000)
               + 2/3 de la recaudación del primer año ($66.400.000)
               = $76.900.000
   - Compras ya entregadas: las del Centenario y, del primer año,
     3 monitores, 8 PC, 15 sillas, 15 escritorios y 40 mesas de luz.
   - Donantes, socios y movimientos puntuales: ilustrativos.
   ========================================================== */

window.DATOS = {
  // "Fecha de hoy" del prototipo (AAAA-MM-DD). Los eventos que terminaron antes de esta fecha
  // muestran "Ver contenido" en lugar de "Quiero participar".
  hoy: "2027-09-10",

  // Cifras generales
  resumen: {
    recaudado: 76900000,
    saldo: 17020000, // 76.900.000 recaudado − 59.880.000 invertido en compras entregadas
    socios: 186,
    empresas: 25,
    entregas: 143 // bienes entregados: 30+16+16 (Centenario) + 3+8+15+15+40 (primer año)
  },

  // Catálogo de necesidades prioritarias
  // etapa: "centenario" | "anio1" | "anio2"
  // recaudado = lo ya invertido en las unidades entregadas (la barra muestra el avance de compra)
  // Los aportes no se eligen por ítem: la Dirección del hospital define el orden de urgencia.
  necesidades: [
    {
      id: "monitores",
      legajo: "legajo-monitores",
      titulo: "5 monitores multiparamétricos",
      servicio: "Terapia intensiva",
      detalle: "Monitores de signos vitales para pacientes críticos. Costo aproximado: $10.000.000 cada uno.",
      icono: "monitor",
      etapa: "anio1",
      unidades: 5,
      entregadas: 3,
      meta: 50000000,
      recaudado: 30000000
    },
    {
      id: "pcs",
      legajo: "legajo-computadoras",
      titulo: "16 computadoras con monitor",
      servicio: "Áreas administrativas y asistenciales",
      detalle: "Puestos de trabajo para agilizar turnos, registros y circuitos internos. Costo aproximado: $900.000 cada una.",
      icono: "pc",
      etapa: "anio1",
      unidades: 16,
      entregadas: 8,
      meta: 14400000,
      recaudado: 7200000
    },
    {
      id: "mesas-luz-2",
      legajo: "legajo-muebles",
      titulo: "50 mesas de luz hospitalarias",
      servicio: "Salas de internación",
      detalle: "Mobiliario básico que el presupuesto estatal no cubre. Costo aproximado: $200.000 cada una.",
      icono: "cama",
      etapa: "anio1",
      unidades: 50,
      entregadas: 40,
      meta: 10000000,
      recaudado: 8000000
    },
    {
      id: "sillas-2",
      legajo: "legajo-muebles",
      titulo: "30 sillas ergonómicas",
      servicio: "Equipos de salud",
      detalle: "Sillas operativas giratorias para mejorar las condiciones de trabajo. Costo aproximado: $180.000 cada una.",
      icono: "silla",
      etapa: "anio1",
      unidades: 30,
      entregadas: 15,
      meta: 5400000,
      recaudado: 2700000
    },
    {
      id: "escritorios-2",
      legajo: "legajo-muebles",
      titulo: "30 escritorios",
      servicio: "Equipos de salud",
      detalle: "Escritorios de melamina estándar para consultorios y oficinas. Costo aproximado: $100.000 cada uno.",
      icono: "escritorio",
      etapa: "anio1",
      unidades: 30,
      entregadas: 15,
      meta: 3000000,
      recaudado: 1500000
    },
    {
      id: "arco-c",
      titulo: "Arco en C vascular",
      servicio: "Guardia y quirófano",
      detalle: "Equipo de imágenes de alta complejidad para resolver en el Penna casos que hoy deben derivarse a otros hospitales.",
      icono: "rayos",
      etapa: "anio2",
      meta: 350000000,
      recaudado: 0
    },
    {
      id: "mesas-luz-1",
      legajo: "legajo-centenario",
      titulo: "30 mesas de luz hospitalarias",
      servicio: "Salas de internación",
      detalle: "Financiadas con la Cena Benéfica del Centenario, a través de la Fundación Banco Ciudad.",
      icono: "cama",
      etapa: "centenario",
      meta: 6000000,
      recaudado: 6000000
    },
    {
      id: "sillas-1",
      legajo: "legajo-centenario",
      titulo: "16 sillas ergonómicas",
      servicio: "Equipos de salud",
      detalle: "Financiadas con la Cena Benéfica del Centenario, a través de la Fundación Banco Ciudad.",
      icono: "silla",
      etapa: "centenario",
      meta: 2880000,
      recaudado: 2880000
    },
    {
      id: "escritorios-1",
      legajo: "legajo-centenario",
      titulo: "16 escritorios",
      servicio: "Equipos de salud",
      detalle: "Financiados con la Cena Benéfica del Centenario, a través de la Fundación Banco Ciudad.",
      icono: "escritorio",
      etapa: "centenario",
      meta: 1600000,
      recaudado: 1600000
    }
  ],

  etapas: {
    centenario: "Centenario 2026",
    anio1: "Primer año",
    anio2: "Segundo año"
  },

  // Legajos de compras entregadas (se muestran en Transparencia)
  legajos: [
    {
      id: "legajo-monitores",
      fecha: "Julio 2027",
      titulo: "3 monitores multiparamétricos para terapia intensiva",
      monto: 30000000,
      imagen: "img/monitor.webp",
      alt: "Monitor multiparamétrico mostrando signos vitales",
      descripcion: "Primera incorporación de tecnología médica de la Cooperadora, financiada con cuotas sociales y membresías corporativas del primer año.",
      impacto: "Más camas de terapia intensiva con monitoreo continuo de signos vitales."
    },
    {
      id: "legajo-computadoras",
      fecha: "Junio 2027",
      titulo: "8 computadoras de escritorio con monitor",
      monto: 7200000,
      icono: "pc",
      descripcion: "Puestos de trabajo para áreas administrativas y asistenciales, financiados con aportes del primer año.",
      impacto: "Menos trámites en papel y circuitos de turnos y registros más ágiles."
    },
    {
      id: "legajo-muebles",
      fecha: "Mayo 2027",
      titulo: "40 mesas de luz, 15 sillas ergonómicas y 15 escritorios",
      monto: 12200000,
      imagenes: ["img/mesa-de-luz.webp", "img/silla.webp", "img/escritorio.jpg"],
      alt: "Mesa de luz hospitalaria, silla ergonómica y escritorio",
      descripcion: "Mobiliario para internación y para los equipos de salud, financiado con aportes del primer año.",
      impacto: "Mejores condiciones de trabajo y de confort para pacientes, en rubros que el presupuesto estatal no cubre."
    },
    {
      id: "legajo-centenario",
      fecha: "Diciembre 2026",
      titulo: "30 mesas de luz, 16 sillas ergonómicas y 16 escritorios",
      monto: 10480000,
      imagenes: ["img/mesa-de-luz.webp", "img/silla.webp", "img/escritorio.jpg"],
      alt: "Mesa de luz hospitalaria, silla ergonómica y escritorio",
      descripcion: "Financiado con la Cena Benéfica del Centenario. Como la Cooperadora todavía no estaba constituida, la compra se gestionó a través de la Fundación Banco Ciudad.",
      impacto: "El primer aporte de la comunidad al hospital en su centenario."
    }
  ],

  // Agenda 2027 (real, del calendario del TP)
  eventos: [
    {
      dia: "8", mes: "Marzo", fin: "2027-03-08", efemeride: "Día Internacional de la Mujer",
      campana: "El Penna somos todas",
      descripcion: "Jornada de concientización, talleres de salud integral femenina y postas informativas en espacios públicos y sedes sociales."
    },
    {
      dia: "1 al 7", mes: "Agosto", fin: "2027-08-07", efemeride: "Semana Mundial de la Lactancia Materna",
      campana: "El primer vínculo",
      descripcion: "Junto al Comité de Lactancia del hospital: contención a familias, promoción de la puericultura y colecta de insumos y pañales para Maternidad y Neonatología."
    },
    {
      dia: "15", mes: "Agosto", fin: "2027-08-15", efemeride: "Día de las Infancias",
      campana: "Juguemos con el Penna",
      descripcion: "Festejo recreativo en una sede aliada, con juegos, actividades para chicos y postas sanitarias infantiles."
    },
    {
      dia: "21", mes: "Septiembre", fin: "2027-09-21", efemeride: "Día de la Primavera",
      campana: "Florece el Penna",
      descripcion: "Encuentro comunitario al aire libre en plazas cercanas, con actividades saludables y música."
    },
    {
      dia: "Todo el mes", mes: "Octubre", fin: "2027-10-31", efemeride: "Mes de Sensibilización sobre el Cáncer de Mama",
      campana: "Octubre rosa",
      descripcion: "Campaña territorial y digital de prevención, con información para sacar turno de mamografía, junto a los CeSACs de la Comuna 4."
    },
    {
      dia: "23", mes: "Diciembre", fin: "2027-12-23", efemeride: "Navidad",
      campana: "Penna Noel",
      descripcion: "Jornada solidaria de cierre de año para recolectar y entregar regalos a los chicos internados en el hospital."
    }
  ],

  // Novedades / entregas
  novedades: [
    {
      fecha: "Agosto 2027",
      titulo: "Juguemos con el Penna: un Día de las Infancias a puro juego",
      enlace: "agenda.html#juguemos-con-el-penna",
      resumen: "Familias del barrio, voluntarios y aliados compartieron una tarde de juegos y postas de salud infantil.",
      imagen: "img/juguemos-con-el-penna.webp",
      alt: "Chicos y familias jugando en ronda sobre alfombras de colores al aire libre"
    },
    {
      fecha: "Julio 2027",
      titulo: "Llegaron 3 monitores multiparamétricos a terapia intensiva",
      enlace: "transparencia.html#legajo-monitores",
      resumen: "Una inversión de $30.000.000, faltando dos según las necesidades. Para fin de año ya estarán en funcionamiento los 5 monitores.",
      imagen: "img/monitor.webp",
      alt: "Monitor multiparamétrico mostrando signos vitales en terapia intensiva"
    },
    {
      fecha: "Mayo 2027",
      titulo: "Entregamos 70 muebles a internación y a los equipos de salud",
      enlace: "transparencia.html#legajo-muebles",
      resumen: "40 mesas de luz, 15 sillas ergonómicas y 15 escritorios, con factura y acta de donación publicadas.",
      imagenes: ["img/mesa-de-luz.webp", "img/silla.webp", "img/escritorio.jpg"],
      alt: "Mesa de luz hospitalaria, silla ergonómica y escritorio entregados"
    }
  ],

  // Agradecimientos (con consentimiento de cada donante)
  donantes: [
    "Familia R.", "Lucía M.", "Club del barrio", "Anónimo", "Martín G.", "Comercio de Av. Caseros",
    "Anónimo", "Sofía P.", "Empresa del Distrito Tecnológico", "Jorge y Ana", "Anónimo", "Valentina C."
  ],

  // Movimientos recientes de la cuenta
  movimientos: [
    { fecha: "12/08/2027", concepto: "Cuotas sociales de agosto (186 socios)", tipo: "Ingreso", monto: 1860000 },
    { fecha: "08/08/2027", concepto: "Membresías corporativas de agosto (25 empresas)", tipo: "Ingreso", monto: 3800000 },
    { fecha: "28/07/2027", concepto: "Compra de 3 monitores multiparamétricos (factura y acta de donación)", tipo: "Egreso", monto: 30000000 },
    { fecha: "16/06/2027", concepto: "Compra de 8 computadoras con monitor (factura y acta de donación)", tipo: "Egreso", monto: 7200000 },
    { fecha: "20/05/2027", concepto: "Compra de 40 mesas de luz, 15 sillas y 15 escritorios (factura y acta)", tipo: "Egreso", monto: 12200000 }  ]
};
