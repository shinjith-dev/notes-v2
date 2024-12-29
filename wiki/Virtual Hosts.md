A virtual host is a configuration entity that enables a single host machine to resemble multiple host machines.
It maintains a list of Multipurpose Internet Mail Extensions (MIME) types that it processes.
You can associate a virtual host to one or more web modules, but you can associate each web module with one and only one virtual host.
Resources associated with one virtual host cannot share data with resources associated with another virtual host, even if the virtual hosts share the same physical machine.
Virtual Hosts can have their root directory mapped to different locations on the hard drive.
For example, one.com being mapped to `/var/www/website_one`, and two.com being mapped to `/var/www/website_two`
There's no limit to the number of different websites you can host on a web server.