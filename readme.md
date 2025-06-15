# ⛽️ Buscasofa Backend API

Este proyecto es el backend de **Buscasofa**, una aplicación que permite a los usuarios registrarse, iniciar sesión y dejar comentarios sobre estaciones de servicio. Está desarrollado con **Node.js**, **Express**, **SQLite** y cuenta con autenticación mediante JWT.

---

### Características

- Registro y login de usuarios
- Comentarios por estación
- Comentarios jerárquicos (respuestas)
- Autenticación con JSON Web Tokens (JWT)
- Base de datos persistente con SQLite
- Backend modular con controladores y lógica separada
- Tests unitarios y de integración con Jest

---

### Estructura del proyecto

```
buscasofa-server/
├── controllers/           # Controladores Express
├── services/              # Lógica de negocio desacoplada
├── tests/                 # Pruebas unitarias Jest
├── persistence/db.js      # Inicialización y conexión DB
├── index_dev.js           # Entrada principal del servidor
├── secret.js              # Clave secreta para JWT
└── README.md              # Este archivo 😄
```

---

### Instalación


1. Clonar el repositorio:
```bash
git clone https://github.com/eQuechen/buscasofa-server.git
```

2. Abrir el proyecto:
```bash
cd buscasofa-server
```

3. Instalar las dependencias:
```bash
npm install
```

4. Ejecutar el servidor:
```bash
npm run dev
```


---

### Ejecutar tests

```bash
npm test
```

> El proyecto cuenta con pruebas unitarias usando la técnica **TDD (Red → Green → Refactor)**.

---

### Endpoints disponibles

| Método | Ruta                       | Descripción                            |
|--------|----------------------------|----------------------------------------|
| POST   | `/api/register`           | Registrar nuevo usuario                |
| POST   | `/api/login`              | Iniciar sesión                         |
| POST   | `/api/comments`           | Guardar un comentario (requiere token) |
| GET    | `/api/comments/:station`  | Obtener comentarios de una estación    |
| PUT    | `/api/comments/:id`       | Editar comentario                      |
| DELETE | `/api/comments/:id`       | Eliminar comentario                    |
| GET    | `/api/profile/user`       | Obtener comentarios del usuario actual |

---

### Tecnologías utilizadas

- **Node.js + Express**
- **SQLite3**
- **JWT para autenticación**
- **bcryptjs para hash de contraseñas**
- **CORS**
- **Jest + Supertest** (pruebas unitarias)

---

### Autores y créditos

### 👨‍💻  [Anabel Díaz](https://github.com/rubiwan) y [Emilio Quechen](https://github.com/eQuechen) 🐢️

Desarrollado con cariño por estudiantes de **ISA - Ingenierá del Software Avanzado**.  
Incluye prácticas reales de diseño de software, modularización y pruebas automatizadas.

---

### Próximos pasos

- Integración continua (CI/CD)
- Migración a base de datos PostgreSQL
- Gestión de roles y permisos
- Versión en producción con Docker y Railway
