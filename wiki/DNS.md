The Domain Name System (DNS) is the *phonebook of the Internet*.
Web browsers interact through Internet Protocol (IP) addresses.
**DNS translates domain names to IP addresses** so browsers can load Internet resources.
*Each device connected to the Internet has a unique IP address* which other machines use to find the device.

DNS servers eliminate the need for humans to memorize IP addresses such as `192.168.1.1` (in IPv4), or more complex newer alphanumeric IP addresses such as `2400:cb00:2048:1::c629:d7a2` (in IPv6).

## TLD (Top-Level Domain)

A TLD is the *most righthand part* of a domain name. There are two types of TLD, **gTLD (Generic Top Level)** and **ccTLD (Country Code Top Level Domain)**.

Historically a gTLD was meant to tell the user the domain name's purpose; for example, a .com would be for commercial purposes, .org for an organisation, .edu for education and .gov for government.
 
And a ccTLD was used for geographical purposes, for example, .ca for sites based in Canada, .co.uk for sites based in the United Kingdom and so on.

## Second-Level Domain
Taking tryhackme.com as an example, the .com part is the TLD, and tryhackme is the Second Level Domain.
When registering a domain name, the **second-level domain is limited to 63 characters + the TLD and can only use a-z 0-9 and hyphens (cannot start or end with hyphens or have consecutive hyphens)**.

## Subdomain
A subdomain sits on the *left-hand side of the Second-Level Domain* using a period to separate it.
A subdomain name has the same creation restrictions as a Second-Level Domain, being **limited to 63 characters and can only use a-z 0-9 and hyphens (cannot start or end with hyphens or have consecutive hyphens)**.

You can *use multiple subdomains split with periods to create longer names*, such as jupiter.servers.tryhackme.com.
 But the **total length must be kept to 253 characters or less**. *There is no limit to the number of subdomains you can create for your domain name.*

## DNS Request
1. When you request a domain name, your computer first checks its local cache to see if you've previously looked up the address recently; if not, a request to your **Recursive DNS Server** will be made.

2. A *Recursive DNS Server is usually provided by your ISP, but you can also choose your own*.
This server also has a local cache of recently looked up domain names. If a result is found locally, this is sent back to your computer, and your request ends here.
If the request cannot be found locally, a journey begins to find the correct answer, starting with the internet's root DNS servers.

3. The root servers act as the DNS backbone of the internet; their job is to redirect you to the correct Top Level Domain Server, depending on your request.

4. The **TLD server holds records for where to find the authoritative server to answer the DNS request**.
The authoritative server is often also known as the **nameserver** for the domain.
You'll *often find multiple nameservers for a domain name* to act as a backup in case one goes down.

5. An **authoritative DNS server is the server that is responsible for storing the DNS records for a particular domain name and where any updates to your domain name DNS records would be made**.
Depending on the record type, the [DNS Record](/note/DNS%20Record) is then sent back to the Recursive DNS Server, where a local copy will be cached for future requests and then relayed back to the original client that made the request.
**DNS records all come with a TTL (Time To Live) value.This value is a number represented in seconds that the response should be saved for locally until you have to look it up again**.
Caching saves on having to make a DNS request every time you communicate with a server.
 
*Also read [DNS Record](/note/DNS%20Record)*