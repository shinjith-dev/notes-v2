---
layout: layouts/wiki.njk
title: Command Injection
date: 2025-01-04T03:35:00.000Z
---
Command injection is the abuse of an application's behavior to execute commands on the operating system, using the same privileges that the application on a device is running with.

Command injection is also often known as “Remote Code Execution” ([[RCE]]) because of the ability to remotely execute code within an application. These vulnerabilities are often the most lucrative to an attacker because it means that the attacker can directly interact with the vulnerable system. For example, an attacker may read system or user files, data, and things of that nature.

For example, being able to abuse an application to perform the command `whoami` to list what user account the application is running will be an example of command injection.

Applications that use user input to populate system commands with data can often be combined in unintended behavior. For example, the shell operators `;`, `&` and `&&` will combine two (or more) system commands and execute them both. 

Command Injection can be detected in mostly one of two ways:
- Blind command injection
- Verbose command injection

## Blind Command Injection

This type of injection is where there is no direct output from the application when testing payloads. You will have to investigate the behaviors of the application to determine whether or not your payload was successful.

Blind command injection is when command injection occurs; however, there is no output visible, so it is not immediately noticeable. For example, a command is executed, but the web application outputs no message.

For this type of command injection, we will need to use payloads that will cause some time delay. For example, the `ping` and `sleep` commands are significant payloads to test with.

Another method of detecting blind command injection is by forcing some output. This can be done by using redirection operators such as `>`. For example, we can tell the web application to execute commands such as whoami and redirect that to a file. We can then use a command such as `cat` to read this newly created file’s contents.

Testing command injection this way is often complicated and requires quite a bit of experimentation, significantly as the syntax for commands varies between Linux and Windows.

The curl command is a great way to test for command injection. This is because you are able to use curl to deliver data to and from an application in your payload.

## Verbose Command Injection	

Detecting command injection this way is arguably the easiest method of the two. Verbose command injection is when the application gives you feedback or output as to what is happening or being executed.

For example, the output of commands such as `ping` or `whoami` is directly displayed on the web application.

### Useful Payloads

- Unix
    - whoami
    - ls
    - ping
    - sleep
    - nc
- Windows
    - whoami
    - dir
    - ping
    - timeout
