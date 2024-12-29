*Refer after [[DNS]]*

DNS records (aka zone files) are **instructions that live in authoritative DNS servers and provide information about a domain including what IP address is associated with that domain and how to handle requests for that domain**.
These records consist of a series of text files written in what is known as DNS syntax.
**DNS syntax is just a string of characters used as commands that tell the DNS server what to do.**

All DNS records also have a **TTL, which stands for time-to-live, and indicates how often a DNS server will refresh that record**.

That listing will give you a bunch of useful information about a business such as their location, hours, services offered, etc.
All domains are required to have at least a few essential DNS records for a user to be able to access their website using a domain name, and there are several optional records that serve additional purposes.

## DNS Record Types
### A Record
These records **resolve to IPv4 addresses**, for example `104.26.10.229`

### AAAA Record
These records **resolve to IPv6 addresses**, for example `2606:4700:20::681a:be5`

### CNAME Record
These records **resolve to another domain name**.

### MX Record
These records **resolve to the address of the servers that handle the email for the domain you are querying**.

### TXT Record
TXT records are **free text fields where any text-based data can be stored**.
TXT records have multiple uses, but some common ones can be to list servers that have the authority to send an email on behalf of the domain.
They can also be used to verify ownership of the domain name when signing up for third party services.