<div align="center">

# 🧠 Plataforma de Lógica de Programación con IA

> **Plataforma fullstack de aprendizaje interactivo** que usa Inteligencia Artificial para ayudar a los usuarios a desarrollar y mejorar su lógica de programación mediante retos, retroalimentación y seguimiento de progreso.

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📌 ¿Qué es este proyecto?

Esta plataforma es una aplicación web fullstack construida **desde cero**, diseñada para que estudiantes en formación practiquen lógica de programación de manera estructurada y asistida por IA.

El sistema presenta ejercicios progresivos al usuario, evalúa sus respuestas y utiliza un modelo de IA para generar retroalimentación personalizada.

---

## 📸 Capturas de pantalla

> 🔧 *Próximamente — se agregarán capturas de la interfaz y flujo de uso*

---

## ✨ Características principales

- 🤖 **IA integrada** — Retroalimentación personalizada generada por inteligencia artificial según la respuesta del usuario
- 📊 **Seguimiento de progreso** — El sistema registra el historial de ejercicios y rendimiento del usuario
- 🔐 **Autenticación segura** — Sistema de login/registro con manejo de sesiones
- 🧩 **Ejercicios por niveles** — Retos organizados por dificultad para aprendizaje progresivo
- 📱 **Interfaz responsiva** — UI construida con Angular, adaptada para distintos dispositivos
- 🐳 **Dockerizado** — Entorno de desarrollo y producción listo para levantar con un solo comando

---

## 🏗️ Arquitectura del sistema

```
plataforma-logica-de-programacion/
├── backend/          # API REST con Spring Boot + Java
│   ├── controllers/  # Endpoints de la API
│   ├── services/     # Lógica de negocio + integración con IA
│   ├── models/       # Entidades JPA
│   └── repositories/ # Capa de acceso a datos (MySQL)
│
├── frontend/         # SPA con Angular + TypeScript
│   ├── components/   # Componentes reutilizables
│   ├── services/     # Consumo de API REST
│   └── pages/        # Vistas principales
│
└── docker-compose.yml  # Orquestación de contenedores
```

---

## 🧰 Stack tecnológico

| Capa | Tecnología | Descripción |
|---|---|---|
| **Backend** | Java 17 + Spring Boot | API REST, lógica de negocio, integración con IA |
| **Frontend** | Angular + TypeScript | SPA con interfaz interactiva y responsiva |
| **Base de datos** | MySQL 8 | Persistencia de usuarios, ejercicios y progreso |
| **Infraestructura** | Docker + Docker Compose | Contenerización y orquestación de servicios |
| **Estilo** | CSS | Diseño propio, sin frameworks de UI externos |

---

## 🔗 Endpoints principales de la API

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de nuevo usuario |
| `POST` | `/api/auth/login` | Autenticación y generación de sesión |
| `GET` | `/api/ejercicios` | Obtener lista de ejercicios disponibles |
| `POST` | `/api/ejercicios/{id}/responder` | Enviar respuesta y recibir retroalimentación IA |
| `GET` | `/api/usuarios/{id}/progreso` | Consultar historial y progreso del usuario |

---

## 💡 Decisiones técnicas destacadas

- **Arquitectura en capas** en el backend (Controller → Service → Repository) para mantener separación de responsabilidades
- **Integración con IA** en la capa de servicios, desacoplada de la lógica de negocio principal para facilitar cambios de proveedor
- **Contenerización completa** con Docker Compose, incluyendo variables de entorno para configuración flexible
- **SPA en Angular** con servicios HTTP desacoplados de los componentes para mejor testabilidad

---


## 👨‍💻 Autor

**[urlcm](https://github.com/urlcm)**

> 💬 *Si tienes feedback o quieres colaborar, abre un Issue o contáctame directamente al siguiente correo: edwinuriel1122@gmail.com.*

---

<div align="center">

⭐ Si este proyecto te pareció interesante, dale una estrella al repositorio

</div>
