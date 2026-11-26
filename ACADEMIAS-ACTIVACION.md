# Mesa de Academias · Guía de activación

`academias.html` es una página interna (noindex, sin liga en el menú). El HTML es
público como todo el sitio, pero **no contiene datos**: materias, academias,
líderes, equivalencias, candados y perfiles viven en Firebase bajo `/plataforma`
y solo se leen con sesión iniciada y permiso.

## Quién puede qué

| Rol | Cómo se da de alta | Puede |
| --- | --- | --- |
| Dirección | UID en `/admins` (ya existente) | Leer y editar todo, cargar datos |
| Academia | UID en `/plataformaMiembros` | Leer todo, capturar perfiles, editar el directorio, asignar profesores a materias y subir archivos |

## Pasos (consola de Firebase, proyecto portfolioldg-3ca20)

1. **Publicar las reglas.** Realtime Database → Reglas: pega `database.rules.json`
   y publica (o `npx firebase-tools deploy --only database`). Sin este paso la
   página abre pero responde "sin acceso": la base niega todo por defecto.
2. **Publicar el sitio.** Merge de esta rama a `main` (GitHub Pages).
3. **Cargar los datos.** Entra a `portfolioldg.com/academias.html` con tu cuenta
   de admin → pestaña Datos → sube `plataforma-semilla.json`. Ese archivo NO va
   en el repositorio (está en `.gitignore`).
4. **Dar acceso a líderes de academia.** Authentication → Users → Add user
   (correo y contraseña). Copia su UID y crea en Realtime Database:

   ```
   plataformaMiembros
     └── <UID>: true
   ```

## Verificar

```bash
# Sin sesión debe responder "Permission denied"
curl "https://portfolioldg-3ca20-default-rtdb.firebaseio.com/plataforma.json"
```

## Modelo de datos (`/plataforma`)

- `materias/{clave}`: plan, nombre, semestre, creditos, horas, academia, objetivo, unidades[], entregables[], nota, fuente
- `academias/{id}`: num, nombre, lider, apoyo
- `equivalencias/{clave2021}`: destino, tipo, cubiertas, total, relacion, evidencia, pendiente
- `candados/{id}`: plan, materia, requiere, tipo (candado o simultanea), origen (vigente o sugerido)
- `perfiles/{clave}/entrada|salida/{habilidad}`: true
- `habilidades/{slug}`: nombre
- `personas/{id}`: nombre, puesto, correo, telefono, ubicacion
- `archivos/{clave}/{id}`: categoria (Syllabus, Entregable, Rúbrica, Otro), titulo, nombre, tamano, por, fecha, url
- `materias/{clave}/profesores/{personaId}`: true
- `academias/{id}/liderId` y `apoyoIds/{personaId}`

Fuera de `/plataforma`, para no cargar la escucha principal:

- `/plataformaFotos/{personaId}`: foto recortada a 480 px (data URL JPEG)
- `/plataformaArchivos/{id}`: contenido del archivo (data URL, máx. 4 MB). Para
  archivos más pesados se guarda una liga de Drive en `archivos/.../url`.

## Archivos y fotos

Los archivos se guardan en la Realtime Database, no en Firebase Storage, para no
depender de un servicio adicional. El plan gratuito incluye 1 GB: alcanza para
syllabus y rúbricas, no para entregables pesados (video, PDF de tesis); esos van
como liga de Drive.
