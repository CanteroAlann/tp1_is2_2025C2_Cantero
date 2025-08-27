# TPI Cantero Alan

---

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Lo más desafiante](#lo-más-desafiante)
3. [Pre-requisitos](#pre-requisitos)
4. [Guía de Testing](#guía-de-testing)
5. [Docker](#docker)
   - [Construir la imagen](#construir-la-imagen)
   - [Correr la base de datos](#correr-la-base-de-datos)
   - [Correr el servicio](#correr-el-servicio)
6. [Licencia](#licencia)

---

## Introducción

**La aplicacion de este repositorio fue desarrollada en node usando mongoDB como base de datos. Elegi las mismas porque ya tenia un conocimiento basico y queria aprovechar el tp para seguir profundizando en ellas.Se trato de generar una estructura de proyecto donde cada archivo tuviera en lo posible una funcion con una unica responsabilidad con pocas lineas de codigo para mejorar la legibilidad. Un caso de esto es el uso de middlewares para el manejo de errores junto a herencia para evitar codigo repetido y ganar mantenibilidad a la hora de futuros cambios. El uso de mongoDB fue puramente personal, pensando en la escalabilidad del proyecto ya que al tratarse de una aplicacion que puede tener una gran cantidad de usuarios lo mejor segun mi criterio seria usar una base de datos distribuida. Como los esquemas no presentaban una estructura que debia ser rigida opte por usar una base de datos no relacional para garantizar mas flexibilidad en caso de futuros cambios a los esquemas**.

---

## Lo más desafiante

Lo mas desafiante no fue tanto lo tecnico sino entre tantas fuentes de informacion seleccionar aquellas que proporcionaran las mejores practicas sobre el uso correcto de las herramientas para poder desarrollar la aplicacion en tiempo y forma cumpliendo con lo pedido en la consigna.

---

## Pre-requisitos

Para levantar el entorno de desarrollo es necesario contar con:

- **Node v22.18.0**:
- **Npm 10.9.3**:
- **Ubuntu 24.04**:
- **Docker 28.2.2**:
- **Docker Compose version v2.36.2**:

---

## 🧪 Guía de Testing

Se utilizó la librería **Jest** para los tests.  
documentación oficial aquí: [User Guide](https://jestjs.io/docs/getting-started)

---

## Docker

### Construir la imagen

```bash
docker build -t nombre-imagen .
```

### Correr la aplicacion

```bash
docker compose up nombre-imagen
```

---

### Github Actions

🔹 **Cómo funciona**

services: mongodb:
MongoDB como servicio interno para el job de GitHub Actions.Health check incluido para esté listo antes de correr tests.

env:
Variables necesarias para que Node se conecte a la base de datos de tests.Se usa localhost dentro del runner porque el servicio mongodb expone su puerto al job.

Pasos principales:
checkout → Trae el repo.<br>
setup-node → Instala Node 18.<br>
npm ci → Instala dependencias de forma limpia.<br>
Wait for MongoDB → Evita que los tests fallen porque Mongo aún no arrancó.<br>
npm test → Ejecuta tus tests como definiste en package.json.<br>

---

## Correr tests fuera de github Actions

Para correr tests una vez instalado el proyecto en tu computadora

1. construir la imagen usando:

```bash
docker build -t nombre-imagen .
```

2. reemplazar la variable de entorno dentro del .env

```mongo_uri_test_git
MONGO_URI_TEST=mongodb://admin:secret@mongodb:27017/miapp_test?authSource=admin
```

por lo siguiente

```mongo_uri_test_local
MONGO_URI_TEST=mongodb://admin:secret@localhost:27017/miapp_test?authSource=admin
```

3. correr solo el servicio de la db

```bash
docker compose up mongodb.
```

4. dentro del directorio del proyecto ejecutar

```bash
npm test
```

### Licencia

MIT License

Copyright (c) 2025 Cantero Alan

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para utilizar
el Software sin restricción, incluyendo sin limitación los derechos de usar, copiar,
modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software,
y permitir a las personas a las que se les proporcione el Software a hacer lo mismo,
sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas
las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO,
EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE
COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR E
INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT
SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD,
YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRA FORMA,
QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS
EN EL SOFTWARE.
