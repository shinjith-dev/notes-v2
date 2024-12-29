Subdomain enumeration is the **process of identifying all subdomains** for a given domain.
This can be useful for a variety of purposes, such as identifying potential targets for an attack, or simply for organizational purposes.
Subdomain enumeration methods:
- Brute Force,
- [[OSINT]] and
- Virtual Host.

## OSINT: SSL/TLS Certificates
When an SSL/TLS (Secure Sockets Layer/Transport Layer Security) certificate is created for a domain by a CA (Certificate Authority), CA's take part in what's called "Certificate Transparency (CT) logs".

The purpose of Certificate Transparency logs is to stop malicious and accidentally made certificates from being used.
We can use this service to our advantage to discover subdomains belonging to a domain, sites like https://crt.sh and https://ui.ctsearch.entrust.com/ui/ctsearchui offer a searchable database of certificates that shows current and historical results.

## Google Dorking
 `site:*.tryhackme.com -site:www.tryhackme.com`
Gives all subdomains except the `www.tryhackme.com`

## DNS Bruteforce
Bruteforce DNS enumeration is the method of trying millions of different possible subdomains from a pre-defined list of commonly used subdomains.
Use tools like [sublist3r](https://github.com/aboul3la/Sublist3r). dnsresolve for this.
Some subdomains aren't always hosted in publically accessible DNS results, such as development versions of a web application or administration portals. Instead, the DNS record could be kept on a private DNS server or recorded on the developer's machines in their `/etc/hosts` file which maps domain names to IP addresses. In this cases fuzzing the subdomain might work

```sh
ffuf -w wordlist -H "Host: FUZZ.domain" -u taget -fs filter-size
```
Above fuzzing often gives positive response for most queries, as a not-found template (with [status code 200](logseq://graph/logseq?block-id=674b7bac-5b70-4d4e-a8e7-5bab91860a3a), filter out these result by using their Content-Length of the response