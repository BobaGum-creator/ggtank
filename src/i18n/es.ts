/**
 * es.ts — Spanish translation. Must satisfy `Translation` (the shape of en.ts).
 * Proper nouns, agency acronyms, chemical names, source-document titles, and
 * units are intentionally left untranslated. Lookup KEYS (event ids, source ids,
 * English label keys, threshold numbers) are unchanged — only values translate.
 */
import type { Translation } from "./en";

export const es: Translation = {
  langName: "Español",
  ui: {
    language: "Idioma",
    whatThisMeans: "Qué significa esto",
    sectionNav: "Navegación de secciones",
    skipToContent: "Saltar al contenido",
    reset: "Restablecer",
    resetToObserved: (rate: string) => `Volver al valor observado (${rate}°F/h)`,
    sourcePrefix: "Fuente:",
    notWithin: (h: number) => `no dentro de ${h} h`,
    alreadyAtAbove: "ya alcanzado o superado",
    approxHours: (h: number) => `~${h} h`,
  },

  banner: {
    subtitle: "Una estimación transparente, no orientación oficial.",
    importantLabel: "Importante:",
    disclaimer:
      "Este sitio no está afiliado a OCFA, GKN Aerospace, la Ciudad de Garden Grove, la EPA ni Cal OES. No determina si alguna dirección es segura.",
    followOfficial: "Siga las instrucciones oficiales de evacuación y reingreso.",
    officialHeading: "Siga las fuentes oficiales",
    channelRoles: {
      "Orange County Fire Authority (OCFA)": "Mando del incidente, evacuación y reingreso",
      "City of Garden Grove": "Notificaciones de emergencia locales",
      "California Governor's Office of Emergency Services (Cal OES)": "Coordinación estatal de emergencias",
      "U.S. Environmental Protection Agency (EPA)": "Monitoreo del aire y respuesta ambiental",
      "Orange County Health Care Agency": "Guía de salud pública",
    },
    lastUpdate: "Última actualización de datos:",
    reportedNote: "Solo cifras reportadas — vea Fuentes y supuestos más abajo.",
  },

  nav: {
    summary: "Resumen",
    timeline: "Cronología",
    temperature: "Temperatura",
    composition: "Composición",
    pressure: "Presión",
    plume: "Pluma",
    unknowns: "Incógnitas",
    faq: "Preguntas",
    glossary: "Glosario",
    sources: "Fuentes",
  },

  sections: {
    summary: {
      eyebrow: "Resumen de la situación",
      title: "Situación actual",
      intro: (p) =>
        `Una instantánea de las condiciones reportadas en ${p.facility} en ${p.city}, presentada con la incertidumbre que merece. Contenido reportado: aproximadamente ${p.lo}–${p.hi} galones de ${p.chemical} (CAS ${p.cas}) en un tanque de ${p.cap} galones.`,
    },
    timeline: {
      eyebrow: "Cronología reportada",
      title: "Cronología de los datos reportados",
      intro:
        "Cuándo ocurrió cada lectura de temperatura y evento reportado, en orden. Son horas reportadas por fuentes públicas, no verificadas de forma independiente.",
    },
    temperature: {
      eyebrow: "Modelo de escenarios",
      title: "Escenarios de temperatura",
      intro:
        "Ajuste los supuestos y compare tres curvas hipotéticas transparentes con umbrales de referencia publicados. Ninguna de ellas es una predicción.",
    },
    composition: {
      eyebrow: "Estimador de energía",
      title: "Composición interna / estimación de energía",
      intro:
        "Una estimación de energía equivalente de cuánta polimerización podría representar el aumento de temperatura medido — no una medición de lo que realmente hay dentro del tanque.",
    },
    pressure: {
      eyebrow: "Contexto",
      title: "Contexto de presión y vapor",
      intro:
        "La presión de vapor en equilibrio aumenta con la temperatura, pero no es lo mismo que la presión total dentro del tanque.",
    },
    plume: {
      eyebrow: "Educación",
      title: "Cómo se comportan las plumas de vapor",
      intro:
        "Una explicación conceptual —deliberadamente no un mapa de peligro en vivo— de por qué las trayectorias de las plumas son inciertas.",
    },
    unknowns: {
      eyebrow: "Honestidad",
      title: "Incógnitas conocidas",
      intro:
        "Las variables que se requerirían para cualquier evaluación genuina y que no se conocen públicamente.",
    },
    faq: {
      eyebrow: "Preguntas",
      title: "Preguntas frecuentes",
      intro:
        "Respuestas claras a preguntas comunes. Ninguna le dice si un lugar es seguro — solo las autoridades pueden.",
    },
    glossary: {
      eyebrow: "Lenguaje sencillo",
      title: "Glosario",
      intro: "Definiciones breves de los términos clave usados en esta página.",
    },
    sources: {
      eyebrow: "Transparencia",
      title: "Fuentes y supuestos",
      intro:
        "Cada dato, constante y umbral se remite a una fuente pública aquí enumerada.",
    },
  },

  summary: {
    reportedTemp: "Temp. interna reportada",
    atAbove: (label: string) => `En o por encima de: ${label}`,
    belowThresholds: "Por debajo de los umbrales listados",
    reportedTrend: "Tendencia reportada",
    fromTwoReadings: "De las dos últimas lecturas reportadas",
    needTwo: "Se necesitan ≥2 lecturas",
    estVolume: "Volumen estimado de MMA",
    gallonsReported: "galones (rango reportado)",
    knownUnknowns: "Incógnitas conocidas",
    criticalVars: "variables críticas no conocidas públicamente",
    modelConfidence: "Confianza del modelo",
    low: "Baja",
    medium: "Media",
    confMedium: "≥2 lecturas reportadas",
    confLow: "Datos limitados",
    plainHeading: "En palabras sencillas",
    plainBody:
      "El tanque probablemente contiene MMA líquido más un espacio de vapor. La preocupación no es solo el calor común. El MMA puede polimerizarse en PMMA/acrílico, liberando calor. Si esa reacción supera al enfriamiento o bloquea la ventilación, la presión y el riesgo de ruptura pueden aumentar.",
    wtmPre:
      "Estas tarjetas resumen cifras reportadas y cómo se sitúan frente a la guía de almacenamiento publicada. La «confianza del modelo» refleja qué tan completos están los datos —se limita a Media porque las variables más importantes (enumeradas en ",
    wtmLink: "Incógnitas conocidas",
    wtmPost:
      ") no se conocen públicamente. Nada de esto le dice si algún lugar es seguro; solo las autoridades pueden.",
  },

  timeline: {
    kind: {
      incident: "Incidente",
      reading: "Dato",
      report: "Noticia",
      official: "Oficial",
    },
    readingTitle: (tempF: number) => `Temperatura interna reportada: ${tempF}°F`,
    observationLabels: {
      "Earlier reported internal temperature": "Temperatura interna reportada anterior",
      "Reported internal gauge temperature": "Temperatura reportada del manómetro interno",
      "Internal temperature 100°F+ (the gauge maxes out at 100°F)": "Temperatura interna 100°F+ (el manómetro llega como máximo a 100°F)",
    },
    observationSources: {
      "Reuters/AP public reporting": "Reuters/AP, reportes públicos",
      "Reuters public reporting": "Reuters, reportes públicos",
      "ABC7 (KABC), citing OCFA": "ABC7 (KABC), citando a OCFA",
    },
    confidence: {
      reported: "reportado",
      estimated: "estimado",
      official: "oficial",
      unconfirmed: "sin confirmar",
    },
    events: {
      "incident-start": {
        title: "Inicio reportado del incidente",
        detail:
          "Preocupación reportada en la instalación de GKN Aerospace en Garden Grove por un tanque de almacenamiento de 34,000 galones con metacrilato de metilo (MMA).",
      },
      "reuters-report": {
        title: "Reuters reporta el aumento de temperatura y los esfuerzos de enfriamiento",
        detail:
          "Bomberos enfriando el tanque externamente con agua; expertos explorando la estabilización/neutralización; válvulas rotas/atascadas que limitarían la remoción del químico y el alivio de presión.",
      },
      "state-emergency": {
        title: "El Gobernador de California declara un Estado de Emergencia",
        detail: "Emergencia a nivel estatal declarada en respuesta al incidente.",
      },
      "ap-report": {
        title: "Reporte de Associated Press sobre la crisis",
        detail:
          "Cobertura de las acciones de respuesta y el contexto de evacuación; según se informó, el monitoreo del aire no había detectado contaminación fuera del sitio en ese momento, pero se pidió a los residentes seguir las órdenes de evacuación.",
      },
    },
    wtmPre:
      "Estas son horas reportadas, tomadas de la prensa pública y anuncios oficiales —no verificadas de forma independiente, y las horas del día son aproximadas salvo que se diera una hora de lectura específica. Agregue nuevas lecturas en ",
    wtmPost:
      " y aparecerán aquí automáticamente. Para la situación actual, confíe siempre en los canales oficiales.",
  },

  temperature: {
    assumptions: "Supuestos",
    startTemp: "Temperatura inicial",
    startTempHelp: "Temperatura interna reportada más reciente.",
    prevTemp: "Temperatura conocida anterior",
    prevTempHelp: "Una lectura reportada anterior, usada para estimar la tasa.",
    hoursBetween: "Horas entre lecturas",
    observedRate: "Tasa de aumento observada",
    observedRateHelp:
      "Se calcula automáticamente a partir de las dos lecturas, pero puede modificarla.",
    ambient: "Temperatura ambiente",
    ambientHelp:
      "Temperatura del aire exterior; usada por el término ilustrativo de pérdida por enfriamiento.",
    cooling: "Eficacia del enfriamiento",
    coolingHelp:
      "Cuánto amortigua el enfriamiento activo la tasa de aumento con el tiempo. 0% = sin amortiguación.",
    acceleration: "Factor de aceleración",
    accelerationHelp:
      "Impulsa SOLO la curva ilustrativa tipo descontrol. Mayor = autocalentamiento más rápido.",
    horizon: "Horizonte de simulación",
    hoursFromNow: "Horas a partir de ahora",
    nowReported: "ahora (reportado)",
    illustrativeNote: (ceiling: number) =>
      `La curva roja discontinua es un escenario ilustrativo tipo descontrol, no una predicción. Está limitada a ${ceiling}°F y puede salirse de la parte superior del gráfico.`,
    legend: {
      linear: "Lineal (tasa constante)",
      cooling: "Controlada por enfriamiento",
      accelerating: "Ilustrativa tipo descontrol",
    },
    timeToThreshold: "Tiempo para alcanzar cada umbral",
    timeToThresholdNote: "— cálculo del escenario, no un tiempo de falla predicho",
    thColThreshold: "Umbral",
    wtmPre:
      "Estas tres curvas son aritmética, no pronósticos. La curva lineal simplemente extiende la tasa observada. La curva controlada por enfriamiento supone que el enfriamiento activo frena gradualmente el aumento. La curva ilustrativa tipo descontrol muestra cómo se vería el calor autoacelerado si la polimerización superara al enfriamiento —es una forma didáctica, no una predicción. El comportamiento real del tanque depende de las ",
    wtmLink: "incógnitas conocidas",
    wtmPost:
      ". Los valores de «tiempo para alcanzar el umbral» son solo donde cada línea cruza una temperatura de referencia, nunca un tiempo de falla predicho.",
  },

  thresholds: {
    86: { label: "Objetivo de almacenamiento preferido", detail: "Por debajo de ~30°C / 86°F es un objetivo de almacenamiento preferido cuando es posible." },
    95: { label: "Estabilidad de almacenamiento BASF", detail: "La SDS de BASF indica estabilidad de almacenamiento por debajo de 35°C / 95°F." },
    104: { label: "Límite de protección del inhibidor", detail: "Guía de manejo de ésteres de metacrilato: mantener por debajo de 40°C / 104°F para ayudar a evitar la pérdida del estabilizador." },
    113: { label: "Umbral de reestabilización", detail: "SDS de BASF: a 45°C / 113°F en un tanque a granel, debe usarse un sistema de reestabilización." },
    140: { label: "Umbral de emergencia mayor", detail: "SDS de BASF: a 60°C / 140°F en contexto de cercanía a fuego, se recomienda evacuación de un área mayor." },
  },

  composition: {
    assumptions: "Supuestos",
    volMin: "Volumen — mínimo",
    volLikely: "Volumen — probable",
    volMax: "Volumen — máximo",
    density: "Densidad",
    heatCapacity: "Capacidad calorífica",
    initialTemp: "Temperatura inicial",
    currentTemp: "Temperatura actual",
    coolingMult: "Multiplicador de remoción por enfriamiento",
    coolingMultHelp:
      "1× = puramente adiabático (sin calor removido). Valores mayores suponen que el enfriamiento se llevó calor antes de que apareciera como aumento de temperatura.",
    convFromTemp: "Conversión de energía equivalente (solo por el aumento de temp.)",
    withCoolingMult: (n: number) => `Con multiplicador de enfriamiento (${n}×)`,
    inconsistentTitle: "Estos supuestos son inconsistentes.",
    inconsistentBody:
      "La estimación ajustada por enfriamiento supera el 100%, lo cual es físicamente imposible. Suele significar que el multiplicador de enfriamiento está por encima de lo que los datos permiten. Tómelo como «los supuestos no cuadran», no como un resultado real.",
    conceptualTitle: "Composición conceptual (energía equivalente, no medida)",
    segRemaining: "MMA líquido restante",
    segRemainingNote: "Monómero sin reaccionar, aún en forma líquida.",
    segPolymerized: "Polimerizado / gelificado (energía equivalente)",
    segPolymerizedNote:
      "Porción de energía equivalente implicada solo por el aumento de temperatura medido.",
    segUnknown: "Desconocido / gradientes no medidos",
    segUnknownNote:
      "Reacción adicional que el enfriamiento activo pudo haber ocultado. Crece con el multiplicador de enfriamiento.",
    segVapor: "Vapor / espacio de cabeza",
    segVaporNote: "Grande en volumen, mínimo en masa — se muestra de forma conceptual.",
    absByVolume: "Energía absoluta por volumen",
    absByVolumeNote:
      "— el % de conversión de arriba es igual para todo volumen; solo escalan los Julios",
    colVolume: "Volumen",
    colMass: "Masa",
    colIfFully: "Si se polimeriza por completo",
    colHeatFromRise: "Calor del aumento medido",
    rowMinimum: "Mínimo",
    rowLikely: "Probable",
    rowMaximum: "Máximo",
    badgeHeatOfPoly: (v: number) => `Calor de polimerización: ${v} kJ/mol`,
    badgeEnergyEquiv: "Estimación de energía equivalente — no una medición",
    wtm:
      "El aumento observado de 77°F → 90°F por sí solo correspondería a apenas un porcentaje bajo de un solo dígito de la energía total de polimerización MMA→PMMA si no se hubiera removido calor. Como los bomberos están enfriando el tanque, y como las temperaturas internas pueden ser desiguales, la conversión real podría ser mayor o menor. Esta es una estimación de energía equivalente, no una medición de la composición real. Puede estar muy equivocada si el agua de enfriamiento removió calor significativo, si la temperatura interna no es uniforme, si hay ventilación, si el material se ha gelificado o si hubo alivio de presión.",
  },

  pressure: {
    tempAxis: "Temperatura (°F)",
    vpCaptionPre: "Presión de vapor en equilibrio del líquido según NOAA CHRIS — no la presión total del tanque.",
    vpCaptionAt90: (psi: number) => `A ~90°F es de aproximadamente ${psi} psi.`,
    vpTooltip: "PV en equilibrio",
    forceTitle: "Presión → fuerza (solo educativo)",
    forceIntro: "Una presión pequeña actuando sobre un área grande produce igualmente una fuerza total grande:",
    pressureLabel: "Presión",
    areaLabel: "Área de superficie",
    resultingForce: "Fuerza resultante",
    tonsApprox: (tons: string) => `≈ ${tons} toneladas de fuerza (EE. UU.)`,
    forceDisclaimer:
      "Esta es una ilustración de manual de cómo la presión escala con el área. No es una afirmación sobre la resistencia o el punto de falla de este tanque.",
    wtm:
      "La presión de vapor en equilibrio aumenta con la temperatura, pero la presión real del tanque depende de la ventilación, el espacio de cabeza, la generación de gas, el polímero que bloquea líneas, fugas o grietas, y la condición estructural — así que no las equipare. Un valor bajo de psi puede generar grandes fuerzas sobre una gran superficie del tanque. Deliberadamente no estimamos la presión de falla del tanque: es desconocida sin datos de diseño, soldaduras, corrosión, ajustes de ventilación, nivel de llenado y deformación.",
  },

  plume: {
    svgAlt:
      "Ilustración conceptual de una pluma de vapor impulsada por el viento que se ensancha a favor del viento, con acumulación en zonas bajas y efectos de edificios. No es un mapa de peligro.",
    labelSource: "fuente",
    labelWind: "dirección del viento",
    labelCrosswind: "dispersión transversal",
    labelBuilding: "remolino por edificio",
    labelLowArea: "acumulación en zona baja",
    figCaption: "Solo conceptual — no es un mapa de peligro ni específico de este incidente.",
    p1: "Una pluma no es un rayo láser ni un círculo perfecto.",
    p2: "El viento controla generalmente la dirección principal, mientras que la pendiente, los edificios, los desagües y las zonas bajas pueden influir en dónde se acumula cerca del suelo el vapor más pesado que el aire.",
    p3: "Los mapas oficiales de pluma o explosión pueden provenir de modelos simplificados y supuestos de planificación de emergencias. Son herramientas de planificación, no garantías de dónde estará o no estará exactamente el vapor.",
    limitationsTitle: "Limitaciones de las herramientas de pluma (p. ej., NOAA ALOHA)",
    limitations: {
      gaussian: { title: "Supuestos gaussianos", detail: "Supone una dispersión suave e idealizada en forma de campana que las liberaciones reales rara vez siguen con exactitud." },
      lowWind: { title: "Viento débil y aire estable", detail: "Menos confiable con vientos muy ligeros o condiciones atmosféricas estables." },
      patchiness: { title: "Irregularidad cerca de la fuente", detail: "Las concentraciones cerca de la fuente pueden ser desiguales y difíciles de modelar." },
      windShifts: { title: "Cambios de viento", detail: "No tiene plenamente en cuenta los cambios de dirección del viento con el tiempo." },
      terrain: { title: "Encauzamiento por el terreno", detail: "Colinas, pendientes y zonas bajas pueden encauzar el vapor de formas que el modelo ignora." },
      urban: { title: "Remolinos urbanos por edificios", detail: "Los edificios crean remolinos y zonas muertas no captadas por una pluma simple." },
      reactions: { title: "Reacciones químicas", detail: "No modela reacciones que cambian la nube a medida que viaja." },
      fragments: { title: "Fragmentos peligrosos", detail: "Una ruptura violenta puede lanzar escombros — no es parte de un modelo de dispersión de vapor." },
    },
    wtm:
      "Deliberadamente no dibujamos un mapa de peligro preciso y en vivo —eso implicaría una falsa certeza sobre dónde está el vapor. Use esto solo para entender por qué las plumas son inciertas. Para saber dónde es realmente seguro, confíe en el monitoreo oficial en tiempo real y en las órdenes de evacuación.",
  },

  unknowns: {
    items: {
      "Actual tank pressure": { item: "Presión real del tanque", why: "La presión de vapor no es la presión del tanque; el valor real depende de la ventilación, la generación de gas y la estructura." },
      "Tank design pressure (atmospheric vs. low-pressure rating)": { item: "Presión de diseño del tanque (atmosférica vs. baja presión)", why: "Determina cuánta presión interna puede soportar el recipiente antes de fallar." },
      "Relief-valve condition": { item: "Estado de la válvula de alivio", why: "Reportada como rota/atascada, lo que limita el alivio de presión." },
      "Whether vents are blocked by polymer": { item: "Si los respiraderos están bloqueados por polímero", why: "El polímero/gel puede tapar respiraderos y atrapar presión." },
      "Inhibitor (stabilizer) concentration": { item: "Concentración de inhibidor (estabilizador)", why: "El inhibidor suprime la polimerización; si se agota, aumenta el riesgo de reacción." },
      "Dissolved / headspace oxygen": { item: "Oxígeno disuelto / en el espacio de cabeza", why: "El oxígeno interactúa con la química del inhibidor y la reactividad." },
      "Contamination or initiators present": { item: "Contaminación o iniciadores presentes", why: "Peróxidos, óxido u otros iniciadores pueden iniciar la polimerización." },
      "Actual internal temperature gradients": { item: "Gradientes reales de temperatura interna", why: "Un solo manómetro no puede mostrar puntos calientes dentro del líquido a granel." },
      "Polymer / gel fraction": { item: "Fracción de polímero / gel", why: "Cuánto ha reaccionado ya cambia el comportamiento del calor y del flujo." },
      "Cooling water flow rate and heat removal": { item: "Caudal de agua de enfriamiento y remoción de calor", why: "Determina cuánto calor se está retirando frente al que se retiene." },
      "Tank wall deformation / bulging": { item: "Deformación / abombamiento de la pared del tanque", why: "El abombamiento indica tensión y cambia el comportamiento de falla." },
      "Leak / crack status": { item: "Estado de fugas / grietas", why: "Las fugas existentes cambian la presión, la liberación y el riesgo de incendio." },
      "Nearby tank contents and status": { item: "Contenido y estado de tanques cercanos", why: "Los peligros adyacentes pueden agravar o cambiar el escenario." },
      "Wind and real-time air monitoring": { item: "Viento y monitoreo del aire en tiempo real", why: "Controla hacia dónde va el vapor y si hay algo fuera del sitio ahora." },
    },
    wtm:
      "Cada casilla de arriba está sin marcar porque la información no está disponible públicamente. Por eso ningún sitio web —incluido este— puede decirle si un lugar específico es seguro. Quienes pueden medir estas cosas son los equipos de respuesta oficiales; siga sus instrucciones.",
  },

  sources: {
    heading: "Fuentes",
    note:
      "Los enlaces apuntan al sitio canónico de cada organización. Si un documento específico cambió de lugar, busque el título dentro de esa organización.",
    keyAssumptions: "Supuestos clave",
    categories: {
      "official-order": "Oficial",
      news: "Noticias",
      "chemical-reference": "Referencia química",
      "safety-data": "Datos de seguridad",
      scientific: "Científico",
    },
    usedFor: {
      "ca-emergency": "Estado del incidente y contexto de la respuesta oficial.",
      ap: "Hechos del incidente, acciones de respuesta y contexto de evacuación.",
      reuters: "Temperaturas reportadas, tendencia de ~1°F/hora y objetivo de enfriamiento.",
      "noaa-cameo": "Reactividad, peligro de polimerización y guía general de respuesta.",
      "noaa-chris": "Densidad, verificación de la capacidad calorífica y tabla de presión de vapor.",
      "niosh-pocket": "Límites de exposición ocupacional (solo educativo).",
      "basf-sds": "Estabilidad de almacenamiento, reestabilización y umbrales de evacuación.",
      "cefic-handling": "Guía de temperatura de almacenamiento y manejo para proteger el inhibidor.",
      "nist-webbook": "Valor por defecto de capacidad calorífica del líquido (~191 J/mol·K a ~298 K).",
      "noaa-aloha": "Limitaciones del modelo de pluma descritas en la sección educativa.",
      "heat-of-poly": "Cálculo de energía equivalente en el estimador de composición.",
    },
    assumptions: {
      molarMass: (v: number) => `Masa molar del MMA = ${v} g/mol`,
      density: (v: number) => `Densidad por defecto = ${v} kg/L (ajustable 0.92–0.96)`,
      heatCapacity: (v: number) => `Capacidad calorífica por defecto = ${v} kJ/(kg·K)`,
      heatOfPoly: (v: number) => `Calor de polimerización = ${v} kJ/mol`,
      vaporPressure: "Presión de vapor = tabla de equilibrio NOAA CHRIS (no presión del tanque)",
      tempCurves: "Las curvas de temperatura son escenarios aritméticos, no pronósticos",
      conversion: "La fracción de conversión es energía equivalente, no una composición medida",
    },
  },

  faq: {
    items: [
      {
        q: "¿Es este un sitio oficial? ¿Puede decirme si mi casa es segura?",
        a: "No. Este es un proyecto educativo independiente, no afiliado a ninguna agencia, y no puede determinar si alguna dirección es segura. Solo los equipos de respuesta oficiales pueden. Siga a OCFA, la Ciudad de Garden Grove, Cal OES, la EPA y la Agencia de Salud del Condado de Orange.",
      },
      {
        q: "¿Qué es el metacrilato de metilo (MMA)?",
        a: "Un líquido incoloro e inflamable usado para fabricar plástico PMMA (acrílico). A temperaturas normales es mayormente líquido con vapor encima, y puede polimerizarse —unirse químicamente hasta formar un sólido— liberando calor.",
      },
      {
        q: "¿Por qué preocupa tanto la temperatura? ¿No es solo calor?",
        a: "La preocupación no es solo el calor común. Si el MMA empieza a polimerizarse, la propia reacción libera calor. Si ese calor supera al enfriamiento o bloquea la ventilación, la presión y el riesgo de ruptura pueden aumentar. Por eso los equipos están enfriando el tanque.",
      },
      {
        q: "El aire huele fuerte o como a salón de uñas. ¿Es peligroso?",
        a: "El olor no es una medición de seguridad —puede oler MMA en niveles muy por debajo o por encima de lo que importa, así que su nariz no es un indicador fiable del riesgo. Confíe en el monitoreo oficial del aire en tiempo real y en cualquier guía de salud.",
      },
      {
        q: "¿Explotará el tanque?",
        a: "Eso es desconocido. Una ruptura violenta es un peligro reconocido si la polimerización se descontrola, pero nadie puede predecir públicamente si ocurrirá o cuándo —la información necesaria no está disponible (vea Incógnitas conocidas). Siga las órdenes de evacuación de todos modos.",
      },
      {
        q: "¿Qué tan actuales son los datos de este sitio?",
        a: "Muestra cifras reportadas con marcas de tiempo (vea la Cronología), no un flujo en vivo, y no están verificadas de forma independiente. Para la situación actual, use siempre los canales oficiales.",
      },
      {
        q: "¿Por qué el sitio no da respuestas exactas?",
        a: "Porque las variables más importantes —presión real, estado de las válvulas, nivel de inhibidor, puntos calientes internos y más— no se conocen públicamente. Dar cifras exactas sería falsa precisión. Las herramientas aquí sirven para entender mecanismos y rangos, no predicciones.",
      },
      {
        q: "¿Cómo recibo alertas oficiales?",
        a: "Use las fuentes oficiales enlazadas en la parte superior de esta página y regístrese para las alertas de emergencia de su condado. Esas autoridades toman las decisiones de evacuación, refugio y reingreso.",
      },
    ],
  },

  glossary: {
    items: [
      { term: "Metacrilato de metilo (MMA)", def: "El químico del tanque (CAS 80-62-6): un monómero líquido incoloro e inflamable usado para fabricar plástico acrílico." },
      { term: "Monómero", def: "Una molécula pequeña que puede unirse con muchas copias de sí misma para formar un polímero. El MMA es el monómero; el PMMA es el polímero." },
      { term: "Polimerización", def: "La reacción que une moléculas de monómero en cadenas largas (un polímero). Para el MMA libera calor (es exotérmica)." },
      { term: "PMMA / acrílico", def: "Poli(metacrilato de metilo) — el plástico sólido (acrílico, p. ej. Plexiglás) que forma el MMA al polimerizarse." },
      { term: "Exotérmico", def: "Una reacción que libera calor. La polimerización exotérmica descontrolada es la preocupación central con este tanque." },
      { term: "Inhibidor (estabilizador)", def: "Un aditivo que suprime la polimerización no deseada durante el almacenamiento. Si se agota o se ve superado, el riesgo de reacción aumenta." },
      { term: "Presión de vapor", def: "La presión del vapor en equilibrio con el líquido a una temperatura dada. Aumenta con la temperatura — pero NO es lo mismo que la presión total dentro del tanque." },
      { term: "Espacio de cabeza", def: "El espacio lleno de vapor por encima del líquido dentro del tanque." },
      { term: "Adiabático", def: "Un caso idealizado en el que no se retira calor. El supuesto del estimador de 'sin calor removido' es adiabático; el enfriamiento real cambia el panorama." },
      { term: "Pluma", def: "Una nube de vapor arrastrada por el viento. Su trayectoria depende del viento, el terreno y los edificios, así que no es una línea recta ni un círculo perfecto." },
      { term: "Reestabilización", def: "Volver a añadir inhibidor a un tanque a granel para recuperar estabilidad. La guía la señala a unos 45°C / 113°F." },
    ],
  },

  share: {
    title: "Compártalo de forma responsable",
    body:
      "Este panel sirve para entender mecanismos e incertidumbre. No lo use para ignorar las órdenes oficiales de evacuación, refugio o reingreso. Si lo comparte, hágalo junto con las fuentes oficiales que están en la parte superior de la página —y deje claro que es una estimación educativa independiente, no orientación de ninguna agencia.",
    copyLink: "Copiar enlace",
    copied: "¡Copiado!",
    share: "Compartir",
    shareScenario: "Compartir este escenario",
    revisitAt: "Comparta o vuelva a esta página en",
    message:
      "GKN Aerospace MMA Tank — Garden Grove — una estimación transparente y consciente de la incertidumbre. No es orientación oficial; siga las órdenes oficiales.",
  },

  footer: {
    line1Brand: "GKN Aerospace MMA Tank — Garden Grove.",
    line1:
      " Un proyecto educativo independiente y de código abierto. No está afiliado a OCFA, GKN Aerospace, la Ciudad de Garden Grove, la EPA ni Cal OES. No determina si alguna dirección es segura.",
    line2:
      "Todas las cifras son valores reportados o supuestos con incertidumbre real. Siga siempre las instrucciones oficiales de emergencia.",
  },
};
