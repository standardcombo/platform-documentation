---
id: networking
name: Networking and Contexts in Core
title: Networking and Contexts in Core
tags:
    - Reference
---

# Networking and Contexts in Core

In general, what the server thinks matters. It spits out information, and if it is different from the client, the client quietly updates to match it.

A script that tries to move something every single frame won't work, because of the mismatch between server and client.

## Contexts

### Client

server doesn't need to think about this
e.g. Client UI and graphics

### Server

only show sup on the server
not sent to clients
e.g. a script that handles scores and rounds
player position is server-side

### Static

client side, but they can affect server information
e.g. procedural generation of terrain

## Networking

### Networked Objects

Objects can be networked if an interaction with them on the client side needs to be passed through the server to the other clients.

### Replicated Properties

By default, Core sends whole objects back and forth
To decrease the unnecessary information being sent back and forth, we can use replicated properties to specify information that the server should be copying to clients.

### Predictive Magic

Some methods create smoother-looking performance, by allowing client-side performance with the assumption that it will match up with the server at a certain time.
e.g. MoveTo and RotateTo
Projectiles also work that way
