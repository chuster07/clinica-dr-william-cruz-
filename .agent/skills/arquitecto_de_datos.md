# Metadata (Descripción)

"Usa esta skill para definir modelos de datos, esquemas de bases de datos y lógica de negocio. Es el experto en la estructura interna (el sistema de juego), no en lo visual."

# Parámetros (JSON Schema)

{
  "type": "object",
  "properties": {
    "nombre_modelo": { "type": "string" },
    "campos": { "type": "array", "items": { "type": "string" } },
    "relaciones": { "type": "string" }
  },
  "required": ["nombre_modelo", "campos"]
}

# Código (Logic)

// Lógica para estructurar el esquema de datos
export default async function({ nombre_modelo, campos, relaciones }) {
  const esquema = {
      id: nombre_modelo.toLowerCase(),
      fields: campos,
      relations: relaciones || []
  };
  return esquema;
}
