This content could be, for example, pages or portals intended for staff usage, older versions of the website, backup files, configuration files, administration panels, etc.
There are three main ways of discovering content on a website. Manually, Automated and OSINT (Open-Source Intelligence).

# Flow
## check `/robots.txt`
Restricted directories or resources which are not allowed for search engine indexing(/crawling)

## Identify favicon
Sometimes when frameworks are used to build a website, a favicon that is part of the installation gets leftover, and if the website developer doesn't replace this with a custom one, this can give us a clue on what framework is in use.
[OWASP Favicon Database](https://wiki.owasp.org/index.php/OWASP_favicon_database)

```sh
curl url-to-favicon | md5sum
```

## Check `/sitemap.xml`
The sitemap.xml file gives a list of every file the website owner wishes to be listed on a search engine. These can sometimes contain areas of the website that are a bit more difficult to navigate to or even list some old webpages that the current site no longer uses but are still working behind the scenes.

## Check HTTP Response Headers
When we make requests to the web server, the server returns various HTTP headers.
These headers can sometimes contain useful information such as the webserver software and possibly the programming/scripting language in use.

## Framework and its Version
Analyzing framework and its version helps to know vulnerability in the web page

## Google Dorking

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

## Use OSINT Tools
### Wappalyzer
[Wappalyzer]([https://www.wappalyzer.com/](https://www.wappalyzer.com/)) is an online tool and browser extension that helps identify what technologies a website uses, such as frameworks, Content Management Systems (CMS), payment processors and much more, and it can even find version numbers as well.

### Wayback Machine
The [Wayback Machine](https://archive.org/web/) is a historical archive of websites that dates back to the late 90s.
You can search a domain name, and it will show you all the times the service scraped the web page and saved the contents.
This service can help uncover old pages that may still be active on the current website.

### Github
Repositories can either be set to public or private and have various access controls.
You can use GitHub's search feature to look for company names or website names to try and locate repositories belonging to your target.

### S3 Bucket
The owner of the files can set access permissions to either make files public, private and even writable.
Sometimes these access permissions are incorrectly set and inadvertently allow access to files that shouldn't be available to the public.
```txt
http(s)://org-name.s3.amazonaws.com
```

## Fuzzing
Using fuzzing tools like [ffuf](https://github.com/ffuf/ffuf) to discover hidden web-contents
```sh
ffuf -w wordlist -u target/FUZZ
```