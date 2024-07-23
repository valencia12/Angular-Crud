
# Angular Crud- README

## Autor: Jorge Gustavo Miranda Valencia

# Proyecto Angular

Este documento proporciona una guía para configurar y ejecutar el proyecto Angular, así como las versiones necesarias de las herramientas.

## Requisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes versiones de herramientas:

- **Node.js:** 16.x (o una versión compatible)
- **Angular CLI:** 16.x (o una versión compatible)

Para verificar las versiones instaladas, usa los siguientes comandos:

```bash

node --version

```
```bash

ng --version

```
## Configuracion inicial
- Instalar dependencias
```bash
npm install
```
- Iniciar proyecto
```bash
ng serve
```
- Correr pruebas unitarias
```bash
ng test
```

## Configuracion Docker

- Descargar proyecto

```bash
docker pull gustavomva/prueba:test
```

- Correr proyecto

```bash
docker run -d -p 80:8080 gustavomva/prueba:test
```
# Preguntas teoricas
- https://docs.google.com/document/d/1HAKeIbXi-HXkq39ak6OdfLfc5pOXt-y8tVzFXfUieHI/edit?usp=sharing