A URL or Uniform Resource Locator is a **Unique identifier that is contained by all the resources available on the internet**.
It is also known as the web address.
A URL consists of different parts like protocol, domain name, etc. The users can access the URLs by simply typing them inside the address bar or by clicking any button or link web page.

## URL Structure
`<scheme>://<user>@<host>:<port>/<path>/?<query>#<fragment>`

### Scheme
This instructs on what **protocol to use** for accessing the resource such as HTTP, HTTPS, FTP (File Transfer Protocol).

### User
Some services require **authentication** to log in, you can put a username and password into the URL to log in.

### Host
The **domain name or IP address of the server** you wish to access.

### Port
The Port that you are going to connect to, *usually 80 for HTTP and 443 for HTTPS*, but this can be hosted on any port between 1 - 65535.

### Path
The **file name or location of the resource** you are trying to access.

### Query String
Extra bits of information that can be sent to the requested path.
For example, `/blog?id=1` would tell the blog path that you wish to receive the blog article with the id of 1.

### Fragment
This is a **reference to a location on the actual page requested**.
This is commonly used for pages with long content and can have a certain part of the page directly linked to it, so it is viewable to the user as soon as they access the page.

*Also read [HTTPS](/note/HTTPS), [HTTP](/note/HTTP)*