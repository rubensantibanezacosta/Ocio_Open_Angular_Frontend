[Ver en castellano](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend)

# Ocio Open  *(Training project)*

Repository of the App and the Ocio Open server.

The project is a basic social network that allows, enhances and rewards the organization of social events for company employees.



## Client
![image](https://user-images.githubusercontent.com/44450566/142890754-a330b388-f293-4a12-a665-47dc6995a3ca.png)

[Open Canarias SL](https://www.opencanarias.com/)

## Used Technologies

- [Angular for frontend](https://angular.io/)
- [Spring boot for backend](https://spring.io/projects/spring-boot)
- [Maven as Java package manager](https://maven.apache.org/)
- [MySQL for Database](https://www.mysql.com/)
- [Java Persistence Api as ORM](https://www.java.com/es/)
- [FIGMA to design the prototype](https://www.figma.com/)
- [HelpNDoc to develop Help system](https://www.helpndoc.com/es/)
- [IntelliJ Ultimate as Java IDE](https://www.jetbrains.com/es-es/idea/)
- [Visual Studio Code as Angular IDE](https://code.visualstudio.com/)
- [PhpMyAdmin as database manager](https://www.phpmyadmin.net/)
- [Git and Github to manage code versions](https://github.com/)
- [Ubuntu 20.04 as OS](https://ubuntu.com/download)
- [Linux Mint 20.03 as OS](https://linuxmint.com)
- [Wine as windows emulator](https://www.winehq.org/)
- [Postman desktop to test API](https://www.postman.com/)


## Project documentation

- [Application Requirements Report](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/requisites.md)
- [Use case diagram](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/Casos%20de%20Uso.png)
- [Entity Relationship Diagram](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/Captura%20de%20pantalla%20de%202021-12-03%2011-33-16.png)
- [Rest API request report in Postman](https://documenter.getpostman.com/view/17032586/UVC8E77j)
- [Prototype designed with FIGMA](https://www.figma.com/proto/avUqIHB3yfnUUCIBHcHBDu/Open-Ocio?node-id=182%3A98&starting-point-node-id=182%3A98)
- [Usability Aspects](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/Usability.md)

## Get started

Download links:

* From Github: https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend Frontend
* From Github: https://github.com/rubensantibanezacosta/Ocio_Open_Java_Backend Backend
* From Github: https://github.com/rubensantibanezacosta/Ocio_Open_Help Sistema de ayuda

## Prerequisites

Necesitas un entorno de desarrollo con:
* [Git](https://git-scm.com) -  https://git-scm.com/downloads.
* [MySQL](https://www.mysql.com) -  https://www.mysql.com/downloads/.
* [Node.js](https://nodejs.org) -  https://nodejs.org/es/download/. Version LTS recomended
* [JDK17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) -  https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html. 
* [Maven](https://maven.apache.org/download.cgi) -  https://maven.apache.org/download.cgi. 

## Setup

Clone  repositories:

```
git clone https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend
git clone https://github.com/rubensantibanezacosta/Ocio_Open_Java_Backend
git clone https://github.com/rubensantibanezacosta/Ocio_Open_Help
```

The project consists of 4 different parts:
* Frontend
* Backend
* Database
* Help system


Once cloned, you need to install dependencies.

```
cd Ocio_Open_Angular_Frontend/
npm install
```
```
cd Ocio_Open_Help/
npm install
```
```
cd Ocio_Open_Java_Backend/
mvn install
```


* For the frontend, the Google login feature is used, you need to create a client ID by creating a new project on the Google developer website: https://console.cloud.google.com/apis

On this page you will need to configure a new project by clicking on create credentials and Get your Google ClientId.

![Captura de pantalla de 2021-11-22 15-04-08](https://user-images.githubusercontent.com/44450566/142885020-f59c7e6d-2fb1-467b-9fa4-b66f516ff12d.png)

 In the Credentials section you must fill in the "URI *" field with your frontend host address. In our case:
 
![Captura de pantalla de 2021-12-06 11-54-29](https://user-images.githubusercontent.com/44450566/144841712-ed985048-a395-4059-b449-84026d664d14.png)



You will need to create the file frontend/src/app/config/config.ts and populate it with your credentials using the schema in the file frontend/src/app/config.ts.example

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


* For the backend:


1. You need a working MySQL server.

2. Create the database, in your case it should be called ``` ocio_open ```

3. Import the file to your database:  [SQL file](https://github.com/rubensantibanezacosta/Ocio_Open_Angular_Frontend/blob/main/docs/ocio_open.sql)

4. You will need to create the backend/application.properties file and fill it with your credentials using the schema from the backend/application.properties.example file. Remember to enter the values in plain text, without quotes.




##### DRIVER MYSQL, IN OUR CASE THE EXAMPLE
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

##### LOCATION AND NAME OF YOUR DATABASE, IN OUR CASE THE EXAMPLE
```
spring.datasource.url=jdbc:mysql://localhost:3306/ocio_open?useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
```

##### DIALECT FOR THE ORM, IN OUR CASE THE EXAMPLE
```
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
```

##### USER AND PASSWORD TO ACCESS YOUR MYSQL SERVER
```
spring.datasource.username=
spring.datasource.password=
```

##### [optional] PRINTS IN YOUR CONSOLE THE INSTRUCTIONS MADE IN THE DATABASE
```
#spring.jpa.show-sql = true
```

##### PORT WHERE THE BACKEND WILL BE RAISED, IN OUR CASE THE 4000
```
server.port=4000
```

##### [optional] CONTEXT PATH, IF YOU WISH
```
#server.servlet.context-path=......./app
```

##### VALORES


##### API KEYS FOR ACCESS TO PERMISSIONS, COLLECTED IN THE DATABASE. (Installation described below)
```
value.adminrolekey=
value.userrolekey=
```

##### SECRET TO SIGN YOUR JSON WEB TOKEN
```
value.jwtsecret=
```

##### TOKEN EXPIRATION TIME IN MINUTES
```
value.expirationTime=
```

##### ACCEPTED DOMAINS SEPARATED BY COMMAS, WITHOUT SPACES. EXAMPLE: gmail.com,hotmail.com
```
value.accepted.domains=
```

##### URL TO VALIDATE GOOGLE TOKENS (Leave it by default)
```
value.google.url.tokenvalidation=https://oauth2.googleapis.com/tokeninfo?id_token=
```

##### GMAIL ACCOUNT FOR MAILING (Installation described below).
```
value.google.mail=
value.google.mail.password=
```

##### FRONTEND HOST (In our case, the current one)
```
value.frontend.host=http://localhost:4200
```


### API KEYS AND SECRET

To generate secure codes for both your apikeys and your secret, we recommend that you use ramdom password generators. You can use [THIS](https://keygen.io/) web.

For your api keys, use the roles created in the database:
* One will contain all existing permissions in the app
* The other will contain the initial permissions that will be granted to new users (They will be modifiable through the administration area)

Generate new `api_key` for each of them, and copy and paste the passwords into the fields `value.adminrolekey` for all permissions, and `value.userrolekey` for new user permissions.

![Captura de pantalla de 2022-03-01 10-05-21](https://user-images.githubusercontent.com/44450566/156148966-e3a31a90-f501-43f2-99ed-9b08b2b95001.png)

For the secret use at least one WEP 256-bit Key. Generate it, copy it, and paste it into your `value.jwtsecret` field.



### Mailing

For mailing, a private Google account has been used. In your google account settings panel, go to the *SECURITY* section and enable two-step verification.

![Captura de pantalla de 2021-12-09 18-20-44](https://user-images.githubusercontent.com/44450566/145453642-36cc4206-d6ae-4d00-a8af-144b5f55227b.png)

The next step is to access the *APPLICATION PASSWORDS* section, and generate a new password.

![Captura de pantalla de 2021-12-09 18-22-45](https://user-images.githubusercontent.com/44450566/145453889-9eb9953b-cd20-4aaa-8683-3c4ffea87214.png)

Copy and paste your email address and your generated key in the application.properties file into the corresponding fields.


Finally RUN the project:

Development mode:
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


If you follow the instructions you should have four servers booted:
* Frontend (http://localhost:4200)
* Backend (http://localhost:4000)
* Mysql (Address selected by you in `DB_HOST`)
* Help (http://localhost:4210)

Enjoy!!!

## Project planning and monitoring

The project planning has been raised and developed using a kanban board.
The portal used has been [Trello](https://trello.com/).


![Captura de pantalla de 2022-03-01 15-51-42](https://user-images.githubusercontent.com/44450566/156202170-3ce759a8-a4f0-4592-b286-7fce99cdd8a6.png)


## Conclusions, opinions and reflections

Taking into account the scope of the project and its objective, which is to bring the training of students closer to the possible real problems that could be faced in the company, I could say that the chosen method is a great way to improve at a professional level, technical, to learn to work in a team, and to learn to be autonomous in terms of training.

That they guide us to obtain a series of basic knowledge, and ask us for requirements beyond them, gives us the opportunity to deepen and improve in many aspects.

Certainly, the learning period offered by a Higher Degree in application development seems short to me, since the world of programming is so large, that it seems that even having obtained much knowledge, it seems that we are only scratching the surface of what could be achieved in the sector.


## Links and references

* [Repositories of the teacher Tiburcio Cruz](https://github.com/tcrurav)
* [Platzi, online academy in spanish](https://platzi.com/)
* [Tutorial of Luigi Code in Youtube](https://www.youtube.com/watch?v=gKzEFSnWnk4&ab_channel=LuigiCode)
* [Tutorial of La Tecnologia avanza in Youtube](https://www.youtube.com/watch?v=1uvSOObbJ3k&t=4012s&ab_channel=LaTecnolog%C3%ADaAvanza)
* [SockJs Documentation](https://openbase.com/js/sockjs/documentation)
* [Spring Boot documentation](https://www.baeldung.com/)




