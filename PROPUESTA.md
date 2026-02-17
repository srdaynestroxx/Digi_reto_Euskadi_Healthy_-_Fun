# Euskadi Healthy & Fun: Tu Agenda Activa

## Descripción del problema
Muchas personas quieren llevar una vida más activa y saludable, pero les resulta difícil encontrar planes concretos, gratuitos y cercanos que combinen ejercicio físico con el ocio. Los "activos de salud" (parques, grupos de caminata) a menudo son desconocidos y están desconectados de la agenda de ocio (eventos, talleres).

## Origen de los datos
Utilizaremos datos oficiales de Open Data Euskadi, combinando recursos de salud y agenda cultural/deportiva:

*   **Euskadi Aktiboa (Activos de Salud):**
    *   URL: `https://opendata.euskadi.eus/catalogo/-/euskadi-aktiboa-actividades-relacionadas-con-la-salud-y-la-vida-saludable/`
    *   *Obtenemos:* Ubicación de parques biosaludables, rutas de paseo, asociaciones y grupos de actividad física.
*   **Agenda Cultural (Kulturklik) y Eventos:**
    *   URL: `https://opendata.euskadi.eus/api-culture/`
    *   *Obtenemos:* Eventos puntuales, talleres y actividades de ocio activo en fechas específicas.

## Valor aportado
La aplicación **cruza la ubicación de activos permanentes con la agenda temporal**. En lugar de simplemente listar "parques", ofrecemos "planes de acción":
1.  **Visibilidad:** Hacemos visibles recursos de salud comunitarios infrautilizados.
2.  **Oportunidad:** Convertimos un recurso estático en un plan de fin de semana ("Este sábado hay un taller de yoga en el parque X").
3.  **Prescripción Social:** Facilita a los usuarios encontrar alternativas saludables de ocio sin coste, fomentando la cohesión social y el bienestar físico.
