# Microservices implementation with Node and React

## To try it on your local machine

Clone this repo into your machine

```sh
  git clone https://github.com/Joker-Bat/simple-blog-microservices.git
```

and run

```sh
  npm run install-deps
```

The above command will install dependency in all services and client.

### To run all the services <b> i recommend you to run each service in new tab of terminal so that you can see the each logs clearly how the flow going.</b>

<br />

or if you just want to run and see the result

```sh
  npm run rul-all
```

It will run all services and services as well.

### Features on Frontend

- Create post
- Create comment for a post
- List all posts with comment in UI

### Services on Backend

- Posts
- Comments
- Query
- EventBus
- Moderation

> Posts

To create and send posts

> Comments

To create and send comments

> Query

This is a service which is listening for a events emitted by Posts and Comments and make a seperate structure to store data to reduce the number of request from UI.

> EventBus

This is a service which is like a bridge between all services, to get events emitted from other services and store that service to simulate the events sync (a little bit) and pass that events to all other services.

> Moderation

This is like a filteration process for handling the content in a comment added, if its take time to verify the content of comment, till that time we can maintain that comment as pending status to handle it in UI likethat.

<br />

## Its not the production level architecture for microservices but it will give the basic structure and flow of microservices
