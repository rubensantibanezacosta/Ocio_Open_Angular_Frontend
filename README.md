[View in English](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/English%20Readme.md)

# Ocio Open  *(Proyecto formativo)*

Repositorio de la App y el servidor de Ocio Open.

El proyecto es una red social básica, que permite, potencia y premia la organización de eventos sociales para los empleados de una empresa.



## Cliente
![image](https://user-images.githubusercontent.com/44450566/142890754-a330b388-f293-4a12-a665-47dc6995a3ca.png)

[Open Canarias SL](https://www.opencanarias.com/)


## Technologias utilizadas

- [Angular para el frontend](https://angular.io/)
- [Spring boot para el backend](https://spring.io/projects/spring-boot)
- [Maven como getor de paquetes de Java](https://maven.apache.org/)
- [MySQL para la Base de datos](https://www.mysql.com/)
- [Java Persistence Api como ORM](https://www.java.com/es/)
- [FIGMA para el diseño del prototipo](https://www.figma.com/)
- [HelpNDoc para el sistema de ayuda](https://www.helpndoc.com/es/)
- [IntelliJ Ultimate como IDE para Java](https://www.jetbrains.com/es-es/idea/)
- [Visual Studio Code como IDE para Angular](https://code.visualstudio.com/)
- [PhpMyAdmin como gestor de bases de datos](https://www.phpmyadmin.net/)
- [Git and Github como gestor de versiones](https://github.com/)
- [Ubuntu 20.04 como SO](https://ubuntu.com/download)
- [Linux Mint 20.03 como SO](https://linuxmint.com)
- [Wine como emulador de windows](https://www.winehq.org/)
- [Postman desktop para testear la API](https://www.postman.com/)

## Documentación del Proyecto

- [Informe de requisitos de la aplicación](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/requisitos.md)
- [Diagrama de casos de uso](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/Casos%20de%20Uso.png)
- [Diagrama Entidad Relación ](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/Captura%20de%20pantalla%20de%202021-12-03%2011-33-16.png)
- [Informe de llamadas API Rest en Postman](https://documenter.getpostman.com/view/17032586/UVC8E77j)
- [Prototipo diseñado con FIGMA](https://www.figma.com/proto/avUqIHB3yfnUUCIBHcHBDu/Open-Ocio?node-id=182%3A98&starting-point-node-id=182%3A98)
- [Aspectos de Usabilidad](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/Usabilidad.md)

## Comenzando

Links de descarga:

* Desde Github: https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend Frontend
* Desde Github: https://github.com/rubensantibanezacosta/Ocio_Open_Java_Backend Backend
* Desde Github: https://github.com/rubensantibanezacosta/Ocio_Open_Help Sistema de ayuda

## Prerequisitos

Necesitas un entorno de desarrollo con:
* [Git](https://git-scm.com) -  https://git-scm.com/downloads.
* [MySQL](https://www.mysql.com) -  https://www.mysql.com/downloads/.
* [Node.js](https://nodejs.org) -  https://nodejs.org/es/download/. Version LTS recomendada
* [JDK17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) -  https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html. 
* [Maven](https://maven.apache.org/download.cgi) -  https://maven.apache.org/download.cgi. 

## Instrucciones de instalación

Clone los repositorios:

```
git clone https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend
git clone https://github.com/rubensantibanezacosta/Ocio_Open_Java_Backend
git clone https://github.com/rubensantibanezacosta/Ocio_Open_Help
```

El proyecto consta de 4 partes diferenciadas:
* Frontend
* Backend
* Base de datos
* Sistema de ayuda


Una vez clonados, debe actualizar las dependencias.

```
cd Ocio_Open_Angular_Frontend/
npm install
```
```
cd Ocio_Open_Java_Backend/
mvn install
```
```
cd Ocio_Open_Help/
npm install
```


* Para el frontend, se utiliza la función de inicio de sesión de Google, debe crear un ID de cliente creando un nuevo proyecto en el sitio web de desarrolladores de Google: https://console.cloud.google.com/apis

En esta pagina deberá configurar un nuevo proyecto haciendo click en crear crendenciales y Obtener tu Google ClientId.

![Captura de pantalla de 2021-11-22 15-04-08](https://user-images.githubusercontent.com/44450566/142885020-f59c7e6d-2fb1-467b-9fa4-b66f516ff12d.png)

 En la sección de Credenciales debera rellenar el campo "URI *" con su dirección de host del frontend. En nuestro caso:
 
![Captura de pantalla de 2021-12-06 11-54-29](https://user-images.githubusercontent.com/44450566/144841712-ed985048-a395-4059-b449-84026d664d14.png)



Deberá crear el archivo frontend/src/app/config/config.ts y rellenarlo con sus credenciales utilizando el esquema del archivo frontend/src/app/config.ts.example

```
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  variables = {
    googleClientId: "google Client Id",
    googleClientSecret: "Google Client Secret",
    host: "Backend host ", (En nuestro caso 'http://localhost:4000')

  }


  getVariables() {
    return this.variables;
  }
}


```


* Para su backend:


1. Necesita un servidor MySQL funcionando.

2. Cree la base de datos, en su caso debe llamarse ``` ocio_open ```

3. Importe el archivo a su base de datos:  [Archivo SQL](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/ocio_open.sql)

4. Debera crear el archivo backend/application.properties y rellenarlo con sus credenciales utilizando eL esquema del archivo backend/application.properties.example. Recuerde introducir los valores en texto plano, sin comillas.




##### DRIVER MYSQL, EN NUESTRO CASO EL DEL EJEMPLO
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

##### UBICACION Y NOMBRE DE SU BASE DE DATOS, EN NUESTRO CASO EL DEL EJEMPLO
```
spring.datasource.url=jdbc:mysql://localhost:3306/ocio_open?useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
```

##### DIALECTO PARA EL ORM, EN NUESTRO CASO EL DEL EJEMPLO
```
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
```

##### USUARIO Y CONTRASEÑA DE ACCESO A SU SERVIDOR MYSQL
```
spring.datasource.username=
spring.datasource.password=
```

##### [opcional] IMPRIME EN SU CONSOLA LAS INSTRUCCIONES HECHAS EN LA BASE DE DATOS
```
#spring.jpa.show-sql = true
```

##### PUERTO DONDE SE LEVANTARÁ EL BACKEND, EN NUESTRO CASO EL 4000
```
server.port=4000
```

##### [opcional] CONTEXT PATH, SI LO DESEA
```
#server.servlet.context-path=......./app
```

##### VALORES


###### API KEYS DE ACCESO A LOS PERMISOS, RECOGIDAS EN LA BASE DE DATOS. (Instalación descrita debajo)
```
value.adminrolekey=
value.userrolekey=
```

##### SECRET PARA FIRMAR SU JSON WEB TOKEN
```
value.jwtsecret=
```

##### TIEMPO DE EXPIRACION DEL TOKEN EN MINUTOS
```
value.expirationTime=
```

##### DOMINIOS ACEPTADOS SEPARADOS POR COMAS, SIN ESPACIOS. EJEMPLO: gmail.com,hotmail.com 
```
value.accepted.domains=
```

##### URL PARA VALIDAR TOKENS DE GOOGLE (Dejarla por defecto)
```
value.google.url.tokenvalidation=https://oauth2.googleapis.com/tokeninfo?id_token=
```

##### CUENTA DE GMAIL PARA EL MAILING (Instalación descrita debajo).
```
value.google.mail=
value.google.mail.password=
```

##### FRONTEND HOST (En nuestro caso, la actual)
```
value.frontend.host=http://localhost:4200
```


### API KEYS Y SECRET

Para generar codigos seguros tanto para sus apikeys, como para su secret, le recomendamos que utilice generadores ramdom de contraseñas. Puede utilizar [esta](https://keygen.io/) web.

Para sus api keys, utilice los roles creados en la base de datos:
* Uno contendrá todos los permisos existentes en la aplicación
* El otro contendra los permisos iniciales que se le concederán a los nuevos usuarios (Serán modificables a traves del area de administración) 

Genere nuevas `api_key` para cada uno de ellos, y copie y pegue las contraseñas en los campos `value.adminrolekey` para todos los permisos, y `value.userrolekey` para los permisos de los nuevos usuarios.

![Captura de pantalla de 2022-03-01 10-05-21](https://user-images.githubusercontent.com/44450566/156148966-e3a31a90-f501-43f2-99ed-9b08b2b95001.png)

Para el secret utilizar como mínimo una clave WEP 256-bit Key. Generela, copiela y péguela en su campo `value.jwtsecret`.



### Mailing

Para el mailing, se ha utilizado una cuenta privada de Google. En su panel de configuración de su cuenta de google, acceda al apartado de *SEGURIDAD* y habilite la verificación en dos pasos.
![Captura de pantalla de 2021-12-09 18-20-44](https://user-images.githubusercontent.com/44450566/145453642-36cc4206-d6ae-4d00-a8af-144b5f55227b.png)

El siguiente paso es acceder al apartado de *CONTRASEÑAS DE APLICACIONES*, y generar una nueva contraseña.

![Captura de pantalla de 2021-12-09 18-22-45](https://user-images.githubusercontent.com/44450566/145453889-9eb9953b-cd20-4aaa-8683-3c4ffea87214.png)

Copie y pegue su dirección de correo electrónico y su clave generada en en archivo application.properties en los campos correspondientes.


Finalmente disfrute del proyecto:

Modo Desarrollador:
```
backend/
mvn springboot:run
```
```
frontend/
npm run start
```

```
Help/
npm run start
```


Si sigue las instrucciones debera tener arrancados cuatro servidores:
* Frontend (http://localhost:4200)
* Backend (http://localhost:4000)
* Mysql (Dirección seleccionada por usted en `DB_HOST`)
* Ayuda (http://localhost:4210)

Disfrute!!!


## Planificación  y seguimiento del proyecto

La planificación del proyecto se ha planteado y desarrollado utilizando un tablero kanban.
El portal utilizado ha sido [Trello](https://trello.com/).


![Captura de pantalla de 2022-03-01 15-51-42](https://user-images.githubusercontent.com/44450566/156202170-3ce759a8-a4f0-4592-b286-7fce99cdd8a6.png)


## Conclusiones, opiniones y reflexiones

Teniendo el cuenta el alcance del proyecto y su objetivo, que es el de acercar la formación de los alumnos a los posibles problemas reales a los que se podría enfrentar en la empresa, podría decir que el método elegido es una gran forma de mejorar a nivel técnico, de aprender a trabajar en equipo, y de aprender a ser autonónomo en cuanto a la formación se refiere.

Que nos guien para obtener una serie de conocimientos básicos, y nos pidan requisitos mas allá de ellos, nos da la oportunidad de profundizar y mejorar en muchos aspectos.

Ciertamente, se me hace corto el periodo de aprendizaje que te ofrece un Grado superior de desarrollo de aplicaciones, ya que el mundo de la programación es tan grande, que parece que aun habiendo obtenido numerosos conocimientos, da la sensación de que solo estamos rascando la superficie de lo que se podria lograr en el sector.


## Enlaces y referencias

* [Repositorios del docente Tiburcio Cruz](https://github.com/tcrurav)
* [Platzi, academia online](https://platzi.com/)
* [Tutorial de Luigi Code en Youtube](https://www.youtube.com/watch?v=gKzEFSnWnk4&ab_channel=LuigiCode)
* [Tutorial de La Tecnologia avanza en Youtube](https://www.youtube.com/watch?v=1uvSOObbJ3k&t=4012s&ab_channel=LaTecnolog%C3%ADaAvanza)
* [Documentación de SockJs](https://openbase.com/js/sockjs/documentation)
* [Documentacion de Spring](https://www.baeldung.com/)
* [Fork del frontend del proyecto anterior](https://github.com/rubensantibanezacosta/Ocio_Open)


