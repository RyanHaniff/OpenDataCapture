# Server

Our REST API is built using [NestJS](https://nestjs.com/), a framework for building efficient and scalable server-side applications. For a quick introduction to NestJS, we recommend [this video](https://www.youtube.com/watch?v=0M8AYU_hPas).

## Dependency Injection

In order to understand Nest, and therefore our server-side architecture, it is first necessary to understand dependency injection (DI). If you already understand DI, you can skip this section.

The main advantage of DI is that is decreases the coupling between classes and their dependencies. By removing a client's knowledge of how its dependencies are implemented, programs become more reusable, testable and maintainable.

In Nest, when a class is decorated with the `@Injectable()` decorator, it is eligible to be injected as a dependency. These classes are typically services or providers that encapsulate specific functionality of the application. The classes that depend on these services or providers, such as controllers or pipes, can then have them injected into their constructors.

When the application is bootstrapped, Nest scans for all the classes decorated with `@Injectable()` and creates instances of them. These instances are then stored in a container, which is responsible for managing the lifecycle of the instances and providing them when they are needed by other parts of the application.

## Modular Structure

In Nest, modules are used to organize the application into smaller, manageable pieces. This makes it easier to maintain and test the application. Each module contains a group of related controllers, services, pipes, guards, and filters that all work together to perform a specific function or set of functions.

Controllers handle the incoming HTTP requests, and are responsible for handling the request, validating the inputs, and returning a response. They are decorated with the @Controller decorator, and the routes are defined using the `@Get`, `@Post`, `@Put`, etc decorators.

Services are used to encapsulate the business logic of the application, and can be used by multiple controllers. They are decorated with the `@Injectable()` decorator and are typically injected into controllers via the constructor.

## Security

The API uses JSON Web Tokens (JWTs) to identify and authorize users. When a user attempts to
log in to the system, their password is compared to a hashed and salted version stored in
our database. If the password is valid, a JWT is created with a payload that encodes various
data about the user, including any relevant permissions or roles.

This payload is then signed using a private key, which is a secret value known only to the
server. The signed payload is returned to the client in the form of a JWT. On requests to
protected endpoints within the API, the client must present the JWT as proof of their identity.
The server then verifies the integrity of the payload by checking the signature against the
private key. If the signature is valid, the server can trust that the payload has not been
tampered with and can use the data contained within it to determine whether the now authenticated
user is authorized to perform certain actions.

For security reasons, the JWT is only valid for a limited time. This time limit, known as the
"expiration time," is set by the server that issues the JWT and should be set to a relatively
short time frame to reduce the risk of the token being compromised (e.g., by malware). Of course,
the user may be using the client application for longer than 15 minutes, and it would be annoying for
the user to interrupt the instrument they, or a subject, is completing to reauthenticate.

Therefore, in order to maintain a seamless user experience, the client (i.e., the application
or device using the JWT) can request a new JWT before it expires using both the current JWT and a
refresh token. The refresh token is a special token that is issued along with the JWT, and is stored
in our database (as a hashed value for security purposes). When the client sends a request for a
new JWT using the refresh token, the server can verify the authenticity of the request and issue
a new JWT without requiring the user to re-enter their password.

This process allows for a secure and convenient user experience, as it allows the client to
continuously authenticate the user without requiring them to constantly enter their password.
At the same time, it also helps to maintain the security of the system, as the server can
verify the authenticity of the refresh token before issuing a new JWT.

## Modules

### App Module

The app module is the root module of the application. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies.

#### ConfigModule

Within the app module, the default `ConfigModule` is imported and registered as a global module. This validates that the required environment variables are set. Please refer to the environment variables section of the development setup page for more information.

#### ExceptionFilter

The app uses a custom `ExceptionFilter` class, which is implemented to handle any exceptions that may occur during the request-response cycle. This currently doesn't do anything special, but it can be used to improve exception handling later (e.g., if an `InternalServerErrorException` is raised, perform a special action to alert us).

#### ValidationPipe

The app uses the `ValidationPipe` provided by Nest to validate and transform incoming data. A pipe is a class that implements the `PipeTransform` interface, which defines a single method, `transform`. This method takes in the data to be validated and the current request object, and returns the validated data or throws an error. This data is validated and transformed according to the decorators added to the DTO classes within each module.

### Auth Module

When a user sends a `POST` request to `/api/auth/login` with their username and password, their password is compared to a hashed and salted version stored in our database. If the password is valid, an `AuthTokens` object is returned to the client, which includes both an access token and refresh token.

In our application the `AccessTokenGuard` class is used as a global guard. It is responsible for determining whether a given request will be handled by the route handler or not. This involves first determining whether the JWT is valid, then determining whether the user, who is now authenticated, is authorized to access the protected endpoint. The permissions of a route are defined using the `@Auth` decorator, which is parsed by the `AccessTokenGuard`. By default, all routes are accessible only by admin users.

### Instruments Module

Instruments are tasks that may be completed by users, or delegated by users to other persons
(e.g., surveys, questionnaires, symptom scales). Individuals with user-level permissions are
authorized to view and submit instruments that they are authorized to access. They may also
request all the instruments they are authorized to use. There is also functionality to add new
instruments and store them in the database. However, at present, this functionality is reserved
for administrators.

## Database

The database is accessed using Mongoose, an Object Data Modeling (ODM) library for MongoDB.

Database schemas are defined using strict mode, which means that any properties not defined in the schema will not be allowed to be saved in the database. This helps to ensure that the data in the database is consistent and in the expected format.

## OpenAPI

NestJS swagger is a module that allows for the integration of the OpenAPI specification (formerly known as Swagger) into a NestJS application. This allows for the automatic generation of an API documentation in the form of an `openapi.json` file.

In this application, NestJS swagger is used to generate an openapi spec, but instead of the default swagger interface, the application is using redoc. Redoc is an open-source tool that allows for the creation of beautiful and interactive API documentation. This is implemented in the docs module using the NestJS serve static module, which allows for the serving of static files from a given folder. This way the redoc interface can be accessed by visiting the default endpoint on the server (e.g., localhost 5500)
