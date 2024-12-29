HTML injection is a type of attack where malicious HTML code is inserted into a website.
This can lead to a variety of issues, from minor website defacement to serious data breaches.

Unlike other web vulnerabilities, HTML injection targets the markup language that forms the backbone of most websites.
This attack differs from other web vulnerabilities that exploit server or database weaknesses because it focuses on manipulating the structure and content of a web page.

## Input Sanitization
If a website fails to sanitise user input (filter any "malicious" text that a user inputs into a website), and that input is used on the page, an attacker can inject HTML code into a vulnerable website.
Input sanitization is very important in keeping a website secure, as information a user inputs into a website is often used in other frontend and backend functionality.
When a user has control of how their input is displayed, they can submit HTML (or JavaScript) code, and the browser will use it on the page, allowing the user to control the page's appearance and functionality.