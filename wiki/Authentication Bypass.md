Different ways website authentication methods can be bypassed, defeated or broken.
These vulnerabilities can be some of the most critical as it often ends in leaks of customers personal data.

## Username Enumeration
A list of already existing users are collected and used for brute force
```sh
ffuf -w <wordlist> -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u <signup/register-url> -mr <existing-user-message>
```

## Bruteforce
Bruteforce with the valid usernames
```sh
ffuf -w <valid-usernames>:W1,<wordlist>:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u <login-url> -fc 200
```

## Logic Flaw
Sometimes authentication processes contain logic flaws. A logic flaw is when the typical logical path of an application is either bypassed, circumvented or manipulated by a hacker.
example:
```php
  if( url.substr(0,6) === '/admin') {
      # Code to check user is an admin
  } else {
      # View Page
  }
```
  
Above PHP code example uses three equals signs (===), it's looking for an exact match on the string, including the same letter casing.
The code presents a logic flaw because an unauthenticated user requesting `/adMin` will not have their privileges checked and have the page displayed to them, totally bypassing the authentication checks.

Some common logic flaws are found in reset-password flow

## Cookie Tampering
Examining and editing the cookies set by the web server during your online session can have multiple outcomes, such as unauthenticated access, access to another user's account, or elevated privileges.