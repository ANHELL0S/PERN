# Proyecto PERN

Este proyecto es una aplicación que utiliza la arquitectura **PERN** (PostgreSQL, Express, React, Node.js).

## Tecnologías Utilizadas

### Frontend

El frontend está desarrollado con **React** y se gestiona con **Vite**. Utiliza varias librerías para mejorar la experiencia del desarrollo y la interacción con el backend:

### **Vite**

Herramienta de desarrollo rápida para la construcción de aplicaciones en React.

### **React**

Librería de JavaScript para la construcción de interfaces de usuario.

### **Tailwind CSS**

Framework de CSS para un diseño rápido y personalizable.

### **React Router**

Librería para la gestión de rutas en una aplicación React.

### **Framer Motion**

Librería de animaciones para React.

### **Axios**

Cliente HTTP para hacer solicitudes desde el frontend.

### **React Hook Form**

Librería para manejar formularios en React de forma sencilla.

### **Zod**

Librería para la validación de esquemas y formularios.

### **Sonner**

Notificaciones de tipo toast.

### **React Icons**

Iconos para ser usados en la interfaz de usuario.

---

### Backend

El backend está desarrollado con **Node.js** y utiliza **Express** para la creación de APIs. Las tecnologías clave incluyen:

### **Body-parser**

Body-parser es un middleware que permite analizar los cuerpos de las solicitudes HTTP. Es utilizado principalmente para procesar datos `JSON`, `urlencoded`, y otros tipos de datos dentro de las solicitudes entrantes.

### **Chalk**

Chalk es una librería para aplicar estilos y colores a las salidas de la consola. Es útil para crear logs más legibles y visualmente atractivos durante el desarrollo y la depuración del backend.

### **Compression**

Compression es un middleware para comprimir las respuestas HTTP. Ayuda a mejorar el rendimiento de la aplicación al reducir el tamaño de los datos enviados desde el servidor al cliente, lo que resulta en tiempos de carga más rápidos.

### **Express-rate-limit**

Esta librería se utiliza para proteger la API contra ataques de denegación de servicio (DoS) y sobrecarga del servidor, limitando la cantidad de solicitudes que un cliente puede realizar en un determinado período de tiempo.

### **Helmet**

Helmet es un conjunto de middleware para Express que ayuda a asegurar las cabeceras HTTP de las respuestas. Esto mejora la seguridad de la aplicación al prevenir varios tipos de ataques web, como ataques de inyección de contenido.

### **Morgan**

Morgan es un middleware para el registro de solicitudes HTTP en la consola. Es útil para auditar y depurar las solicitudes que recibe el servidor, proporcionando detalles como la URL solicitada, el código de estado HTTP y el tiempo de respuesta.

### **Nodemailer**

Nodemailer es una librería para enviar correos electrónicos desde el backend. Se usa comúnmente para enviar correos electrónicos de notificación, confirmación, o para recuperar contraseñas.

### **P-Queue**

P-Queue es una librería que proporciona una cola para ejecutar promesas de manera controlada. Es útil para limitar la concurrencia de las operaciones asíncronas, especialmente en sistemas que realizan muchas tareas en paralelo y necesitan gestionar la cantidad de recursos utilizados.

## Instalación

Para instalar y configurar el proyecto, sigue los siguientes pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ANHELL0S/PERN.git
   ```

2. Instala las dependencias para el frontend:

   ```bash
   cd client
   npm i
   ```

3. Instala las dependencias para el backend:

   ```bash
   cd server
   npm i
   ```

4. Crea un archivo `.env` en el directorio raíz de ambos proyectos y configura las variables de entorno necesarias.

-- Client

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

-- Server

```bash
MAIN_DB_HOST=
MAIN_DB_PORT=
MAIN_DB_NAME=
MAIN_DB_USER=
MAIN_DB_PASSWORD=

PORT=3000

URL_API=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

URL_MAIN=http://localhost:5173

JWT_EXPIRED=
JWT_REFRESH=
JWT_SECRET=

NODE_ENV=production

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
DEFAULT_FROM_EMAIL=

```

---

## Scripts de Desarrollo

### Frontend

- `npm run dev`: Inicia el servidor de desarrollo con Vite.
- `npm run build`: Construye la aplicación para producción.
- `lint`: Ejecuta ESLint para revisar la calidad del código.
- `preview`: Muestra la vista previa de la aplicación construida.
- `format`: Formatea el código con Prettier.

### Backend

- `npm run start`: Inicia el servidor de producción.
- `npm run dev`: Inicia el servidor de desarrollo con Nodemon.
