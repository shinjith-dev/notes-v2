---
title: "TCP Connections in C: A Socket Programming Guide"
layout: layouts/note.njk
tags:
  - c
  - algorithms
  - networking
date: 2023-08-10T21:21:00.000Z
---
We are all aware that programming languages and frameworks are growing at a breakneck pace. It may appear irrelevant to learn C programs to build network connections. But wait, why don't we delve into the golden age of programming and build some simple programs to pique our interest in the under hood workings of our well-built tech setup?

My idea is simple; I just want to present a **short code snippet that shows how to establish up a TCP or UDP connection and transport data over it in C**.

## contents

1. Setup server
2. Setup client
3. Run server and client executable
4. Additional setups

---

## 1. Setup server

- Declare `client` and `server` structures variables and other necessary variables:

    ``` c
    struct sockaddr_in client, server;
    int lfd, n, confd;
    char r_buff[100] = "", s_buff[100] = "";
    ```

- Create a tcp socket using `socket()` and assign values to `server` structure:

    ``` c
    lfd = socket(AF_INET, SOCK_STREAM, 0);
    server.sin_family = AF_INET;
    server.sin_port = 2000;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    ```

    > Here `AF_INET` is the address family, `SOCK_STREAM` is the type and `0` is for  the default protocol.

- Bind the socket with address and server structure using `bind()` and listen for connection using `listen()`:

    ``` c
    bind(lfd, (struct sockaddr *)&server, sizeof server);
    listen(lfd, 1);
    ```

- Accept the connection from client using `accept()`:

    ``` c
    n = sizeof client;
    confd = accept(lfd, (struct sockaddr *)&client, &n);
    ```

- Receive message from client using `recv()`:

    ``` c
    recv(confd, r_buff, sizeof r_buff, 0);
    printf("\n[client] %s", r_buff);
    ```

- send message back to client using `send()`

    ``` c
    printf("\nserver: ");
    gets(s_buff);
    send(confd, s_buff, sizeof s_buff, 0);
    ```

- Stop socket and end connection using `close()`

    ``` c
    close(confd);
    close(lfd);
    ```
    
- Final code for `server.c`

    ``` c
    #include <arpa/inet.h>
    #include <netinet/in.h>
    #include <stdio.h>
    #include <string.h>
    #include <sys/socket.h>
    #include <sys/stat.h>
    #include <sys/types.h>

    int main() {
        struct sockaddr_in client, server;
        int lfd, n, confd;
        char r_buff[100] = "", s_buff[100] = "";

        lfd = socket(AF_INET, SOCK_STREAM, 0);
        server.sin_family = AF_INET;
        server.sin_port = 2000;
        server.sin_addr.s_addr = inet_addr("127.0.0.1");

        bind(lfd, (struct sockaddr *)&server, sizeof server);
        listen(lfd, 1);

        n = sizeof client;
        confd = accept(lfd, (struct sockaddr *)&client, &n);

        while (1) {
            recv(confd, r_buff, sizeof r_buff, 0);
            printf("\n[client] %s", r_buff);
            if (strcmp(r_buff, "exit") == 0)
                break;

            printf("\nserver: ");
            gets(s_buff);
            send(confd, s_buff, sizeof s_buff, 0);
            if (strcmp(s_buff, "exit") == 0)
                break;
            printf("\n");
        }

        close(confd);
        close(lfd);

        return 0;
    }
    ```

---

## 2. Setup client

- Declare `server` structure variable and neccessary variables:

    ``` c
    struct sockaddr_in server;
    int lfd;
    char r_buff[100] = "", s_buff[100] = "";
    ```

- Create a tcp socket using `socket()` and assign values to `server` structure:

    ``` c
    lfd = socket(AF_INET, SOCK_STREAM, 0);
    server.sin_family = AF_INET;
    server.sin_port = 2000;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    ```

- Connect to server using `connect()`:

    ``` c
    connect(lfd, (struct sockaddr *)&server, sizeof server);
    ```

- Send message to server using `send()`:

    ``` c
    printf("\nclient: ");
    gets(s_buff);
    send(lfd, s_buff, sizeof s_buff, 0);
    ```

- Receive back message from server using `recv()`:

    ``` c
    recv(lfd, r_buff, sizeof r_buff, 0);
    printf("[server] %s", r_buff);
    ```

- Stop socket and end connection using `close()`

    ``` c
    close(lfd);
    ```

- Final code for `client.c`
    ``` c
    #include <arpa/inet.h>
    #include <netinet/in.h>
    #include <stdio.h>
    #include <string.h>
    #include <sys/socket.h>
    #include <sys/stat.h>
    #include <sys/types.h>

    int main() {
    struct sockaddr_in server;
    int lfd;
    char r_buff[100] = "", s_buff[100] = "";

    lfd = socket(AF_INET, SOCK_STREAM, 0);
    server.sin_family = AF_INET;
    server.sin_port = 2000;
    server.sin_addr.s_addr = inet_addr("127.0.0.1");

    connect(lfd, (struct sockaddr *)&server, sizeof server);

    while (1) {
        printf("\nclient: ");
        gets(s_buff);
        send(lfd, s_buff, sizeof s_buff, 0);
        if (strcmp(s_buff, "end") == 0)
        break;

        recv(lfd, r_buff, sizeof r_buff, 0);
        printf("[server] %s", r_buff);
        if (strcmp(r_buff, "end") == 0)
        break;

        printf("\n");
    }

    close(lfd);

    return 0;
    }
    ```

> Note: The [system calls](https://svalaks.medium.com/linux-internals-system-calls-e90261860b54) `socket()`, `bind()`, `listen()`, `connect()`, `accept()`, `send()`, and `recv()` in the above programs are imported from libraries that may only operate in linux distributions (os); obviously, these programs cannot be executed in other operating systems such as *Windows*.

---

## 3. Run server and client executables

- Compile server and client code

    ``` bash
    gcc server.c -o server.out
    gcc client.c -o client.out
    ```
- Execute server and client (in the respective **order**)

    ``` bash
    # in terminal-1 or system-1
    ./server.out
    
    # in terminal-2 or system-2
    ./client.out
    ```

> Make sure to execute them in **different terminals**
> (or different systems if you are assigned a public IP address)

- If everything is fine, you can expect something like this.
    - client

        ![client](https://res.cloudinary.com/dqts6qgre/image/upload/v1691690847/Screenshot_from_2023-08-10_23-36-39_hvlbqi.png)

    - server

        ![server](https://res.cloudinary.com/dqts6qgre/image/upload/v1691690846/Screenshot_from_2023-08-10_23-36-45_sel6cp.png)

---

## 4. Additional setups

- logging requests into a file
    - Edit `server.c` and add,

        ``` c
        FILE *fp;
        fp = fopen("log.txt", "a");

        fputs(r_buff, fp);
        fputs("\t", fp);
        fputs(s_buff, fp);
        fputs("\n", fp);
        fclose(fp);
        ```

        > Make sure not to use only `fputs()` inside loops; in that case, you may need to use `fopen()` and `fclose()` within the loop body at the beginning and end, respectively.

- You can try adding functions like *prime number checker*, *palindrome checker*, etc to make this program more useful
