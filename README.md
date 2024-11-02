
# Caso Práctico - Prueba Técnica para Domina

¿Cuáles eran los requerimientos del esta aplicación? Diseñar una aplicación con arquitectura orientada a micro servicios que permita gestionar la información del usuario y sus tareas:

Los artefactos a construir serán los siguientes:

1.	Un micro servicio que permita el registro del usuario y posteriormente la autenticación (básica) del mismo ✅
2.	Un micro servicio que provee las funcionalidades de crear, actualizar y eliminar las tareas de un usuario ✅
3.	Desarrolle en el front de preferencia (React deseable) las interfaces de usuario que permita la captura y la visualización de datos ✅
4.	Puede trabajar con el gestor de base de datos de su preferencia
Tecnologías a utilizar que debe tener instalado: ✅

- Una versión reciente de node ✅
- React deseable ✅
- IDE de desarrollo de su preferencia ✅
- RDBMS de su preferencia o en su defecto MongoDB ✅

Una vez terminada esta prueba, subir sus artefactos a un repositorio de GIT (https://github.com/jfcatano/tasks-app-microservicios) de su preferencia y adjunte las instrucciones que considere necesarias para poder ejecutar los artefactos de forma exitosa.

NOTA: Para mayor comodidad se subieron ambos microservicios a este mismo repositorio.

## Requerimientos
- NodeJS 20 o superior.
- Instalador de dependencias de Node (Preferiblemente npm)
- Un IDE (Visual Studio Code recomendado) para mayor comodidad durante la ejecución del proyecto.

## Instalación

Clonar el repositorio

```bash
  git clone https://github.com/jfcatano/tasks-app-microservicios
```
    
Ir al directorio clonado y ejecutar comandos de instalación de dependencias. Luego volver atrás usando ``cd ../`` para ejecutar el siguiente. Para mayor comodidad, abrir tres terminales para ejecutar los proyectos.

```bash
  cd auth-service && npm install
  cd tasks-service && npm install
  cd react-frontend && npm install
```
    
Ejecutar migraciones de Prisma para generar la base de datos (En este caso SQLite, para almacenar el local de forma rápida)

- Ejecutar el comando en ambos microservicios:
```bash
  npx prisma migrate deploy
```
## Despliegue local

Hay dos formas de ejecutar los proyectos en local:
1. Ejecutar en modo desarrollo (```npm run dev```)
2. Crear build de todos los proyectos y luego iniciarlos en producción. (```npm start```)

- Abordaremos el tutorial para ejecutar los micro-servicios en build, y el frontend en dev para no tener que generar los archivos estáticos de React.

Ejecutar comandos para construir archivos. (Transformar TypeScript en JavaScript)

```bash
  npm run build
```

Copiar contenido del archivo ``.env.template`` a un nuevo archivo ``.env``, o renombrar el anterior, esto en cada proyecto. (Solo en los micro servicios)

Iniciar todos los proyectos.

- Para micro servicios:
```bash
  npm run start
```

- Para frontend en React:
```bash
  npm run dev
```

Nota: Me hubiera gustado poder hacer todo este proceso de despliegue local con docker para ahorrar todos estos pasos, pero el tiempo no me alcanzó, y aún estoy en proceso de aprendizaje de la herramienta. Me disculpo por eso. 

## Probar toda la aplicación

#### Ingresar a la web

```http
  http://localhost:5173/
```

#### ¿Cómo comenzar en "To Do Tasks"?

Es necesario ir a "Sign Up" o "Registrarse" para crear una cuenta. Posteriormente iniciar sesión con la cuenta creada, y comenzar a realizar las acciones designadas para la aplicación.
