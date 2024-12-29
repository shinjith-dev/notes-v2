An HTTP status code is a message a website's server sends to the browser to indicate whether or not that request can be fulfilled.

## 100-199 - Information Response
These are sent to tell the client the first part of their request has been accepted and they should continue sending the rest of their request. These codes are no longer very common.

## 200-299 - Success
This range of status codes is used to tell the client their request was successful.

**200 - OK**: The request was completed successfully.

**201 - Created**: A resource has been created.

## 300-399 - Redirection
These are used to redirect the client's request to another resource. This can be either to a different web page or a different website altogether.

**301 - Moved Permanently**: This redirects the client's browser to a new webpage or tells search engines that the page has moved somewhere else and to look there instead.

**302 - Found**: Similar to the above permanent redirect, but as the name suggests, this is only a temporary change and it may change again in the near future.

## 400-499 - Client Errors
Used to inform the client that there was an error with their request.

**400 - Bad Request**: This tells the browser that something was either wrong or missing in their request. This could sometimes be used if the web server resource that is being requested expected a certain parameter that the client didn't send.

**401 - Not Authorized**: You are not currently allowed to view this resource until you have authorized with the web application, most commonly with a username and password.

**403 - Forbidden**: You do not have permission to view this resource whether you are logged in or not.

**405 - Method Not Allowed**: The resource does not allow this method request, for example, you send a GET request to the resource /create-account when it was expecting a POST request instead.

**404 - Page Not Found**: The page/resource you requested does not exist.

## 500-599 - Server Errors
This is reserved for errors happening on the server-side and usually indicate quite a major problem with the server handling the request.

**500 - Internal Service Error**: The server has encountered some kind of error with your request that it doesn't know how to handle properly.

**503 - Service Unavailable**: This server cannot handle your request as it's either overloaded or down for maintenance.