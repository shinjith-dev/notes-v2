IDOR stands for Insecure Direct Object Reference and is a type of access control vulnerability. 
This type of vulnerability can occur when a web server receives user-supplied input to retrieve objects (files, data, documents), too much trust has been placed on the input data, and it is not validated on the server-side to confirm the requested object belongs to the user requesting it.
IDOR vulnerabilities are often found in hashed/encoded IDs
One of the way to check IDOR is to create multiple accounts in the service, and check IDOR vulnerable endpoints swapping user info.
IDOR might not always be in addressbar URL, analyze API endpoints also.