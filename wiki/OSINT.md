# Google Dorking
Google's advanced search engine features, which allow you to pick out custom content.

## Operators

### `site:`
returns results only from the specified website address
*example*: `site:shinjith.dev`

### `inurl:`
returns results that have the specified word in the URL
*example*: `inurl:admin`

### `filetype:pdf`
returns results which are a particular file extension
*example*: `filetype:pdf`

### `intitle:`
returns results that contain the specified word in the title
*example*: `intitle:admin`

More operators: [GoogleHackingCheatSheet.pdf](https://cdn-cybersecurity.att.com/blog-content/GoogleHackingCheatSheet.pdf)

# SSL/TLS Certificates
When an SSL/TLS (Secure Sockets Layer/Transport Layer Security) certificate is created for a domain by a CA (Certificate Authority), CA's take part in what's called "Certificate Transparency (CT) logs".

The purpose of Certificate Transparency logs is to stop malicious and accidentally made certificates from being used.
We can use this service to our advantage to discover subdomains belonging to a domain, sites like [https://crt.sh](http://crt.sh/) and [https://ui.ctsearch.entrust.com/ui/ctsearchui](https://ui.ctsearch.entrust.com/ui/ctsearchui) offer a searchable database of certificates that shows current and historical results.
