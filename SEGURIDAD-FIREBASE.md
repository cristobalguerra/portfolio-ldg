# Seguridad de Firebase — Guía de activación

## Qué se corrigió

Antes de este cambio la base de datos estaba **completamente abierta**: cualquier
visitante podía leer la contraseña `pefpr26` en el código fuente y, peor aún,
leer, escribir o **borrar toda la base** llamando directamente a la API REST de
Firebase (se verificó con un PUT anónimo que fue aceptado).

Ahora:

- La contraseña `pefpr26` ya no existe en el código. Los gates de admin usan
  **Firebase Authentication** (correo + contraseña).
- La autorización real vive en las **reglas del RTDB** (`database.rules.json`),
  no en JavaScript del cliente: solo los UID listados en `/admins` pueden
  escribir proyectos, premios o leer el feedback.
- El feedback de profesores se guarda con `push()` bajo una sesión anónima:
  cualquiera puede **crear** una entrada (con campos validados por las reglas),
  pero nadie puede modificar ni borrar las existentes salvo un admin.
- Las reglas validan server-side los campos de los formularios PEF (tipos,
  longitudes máximas, dominio @udem.edu/@udem.edu.mx en el correo, valores
  permitidos de "interés").

> Nota: la `apiKey` de `index.html` **no es un secreto** y no necesita rotarse;
> solo identifica el proyecto. La seguridad depende de las reglas + Auth.

## Pasos para activar (consola de Firebase, ~10 minutos)

Proyecto: [portfolioldg-3ca20](https://console.firebase.google.com/project/portfolioldg-3ca20)

### 1. Habilitar proveedores de autenticación

En **Authentication → Sign-in method**, habilita:

- **Correo electrónico/contraseña** (para el admin).
- **Anónimo** (para que el formulario de feedback pueda escribir). Si no se
  habilita, el envío de feedback fallará.

### 2. Crear tu usuario administrador

En **Authentication → Users → Add user**: tu correo (p. ej. institucional) y
una **contraseña nueva y fuerte** (no reutilices `pefpr26`; considérala
quemada: estuvo publicada en el código fuente del sitio).

Copia el **UID** que aparece en la lista de usuarios.

### 3. Registrar el UID como admin en la base

En **Realtime Database → Datos**, crea el nodo:

```
admins
  └── <TU_UID>: true
```

(En la raíz: botón "+", clave `admins`; dentro, clave = tu UID, valor = `true`
tipo booleano.) Puedes agregar más admins repitiendo este paso con otros UID.
Este nodo solo es editable desde la consola; las reglas bloquean su escritura
desde el cliente.

### 4. Autorizar el dominio del sitio

En **Authentication → Settings → Authorized domains**, agrega
`portfolioldg.com` (y `www.portfolioldg.com` si aplica). Sin esto, el login
fallará en el dominio propio.

### 5. Publicar el sitio actualizado

Haz commit y push de estos cambios a GitHub Pages **antes** de publicar las
reglas, para que el código nuevo (con Auth) ya esté en producción cuando las
reglas empiecen a exigir autenticación.

### 6. Publicar las reglas

Opción A — Consola: **Realtime Database → Reglas**, pega el contenido de
`database.rules.json` y publica.

Opción B — CLI (los archivos `firebase.json` y `.firebaserc` ya están listos):

```bash
npx firebase-tools login
npx firebase-tools deploy --only database
```

### 7. Verificar

```bash
# Lectura pública de proyectos: debe responder datos (200)
curl "https://portfolioldg-3ca20-default-rtdb.firebaseio.com/pefProjects.json?shallow=true"

# Lectura de feedback sin auth: debe responder "Permission denied"
curl "https://portfolioldg-3ca20-default-rtdb.firebaseio.com/pefFeedback.json"

# Escritura anónima: debe responder "Permission denied"
curl -X PUT -d '"x"' "https://portfolioldg-3ca20-default-rtdb.firebaseio.com/prueba.json"
```

En el sitio: entra con el engrane del footer (⚙) usando tu correo y contraseña
nuevos, y prueba dar de alta/editar un PEF y enviar un feedback de prueba.

## Notas de operación

- **Orden importa**: si publicas las reglas antes que el sitio, el formulario
  de feedback del sitio viejo fallará hasta que el push a Pages se propague
  (los formularios de admin del sitio viejo también, pero eso es justo lo que
  se busca bloquear).
- La sesión de admin persiste en el navegador (Firebase Auth); el botón
  **CERRAR SESIÓN** del panel de admin la termina.
- El feedback dejó de ser un arreglo sobrescrito completo; las entradas nuevas
  usan claves `push` de Firebase. Las 3 entradas viejas (claves 0, 1, 2)
  conviven sin problema con las nuevas.
- Si un día quieres que el feedback sea legible públicamente, cambia
  `".read"` de `pefFeedback` a `true` — pero hoy contiene opiniones de
  profesores con nombre, así que se dejó solo para admins.
