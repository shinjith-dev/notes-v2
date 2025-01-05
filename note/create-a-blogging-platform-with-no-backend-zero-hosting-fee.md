---
title: Create a Blogging Platform With No Backend (Zero Hosting Charge)
layout: layouts/note.njk
tags:
  - web
  - blog
  - git
  - cms
  - github
date: 2025-01-05T02:01:00.000Z
---
I recently received a **free tier limit alert** from AWS, two months after hosting my personal note-taking app on an EC2 instance. So I did some research on how to host a blogging website for free (or the cheapest way). As my research focused down, my final query was, *How to host this using github as my storage*!


There were many ways for doing this (thanks to redditors!). One of the best was **generating static website and utilizing a CMS that allows github syncing**. I went for [11ty](https://www.11ty.dev) (Eleventy) + [Decap CMS](https://decapcms.org) (formerly Netlify CMS) + [Netlify Identity](https://docs.netlify.com/security/secure-access-to-sites/identity) and I was able build something like this within couple of days:


- [notes.shinjith.dev](https://notes.shinjith.dev)


Probably I'm late to the party, but I'm sharing this hoping that someone could find this useful.


## Why 11ty or Decap?


Obviously, there are a dozen choices for generating static websites (efficiently and quickly), from the classic [Jekyll](https://jekyllrb.com) to the new [Next.js](https://nextjs.org). And you are good to go with any of them as long as your confident with it. I choose 11ty because:
- My requirements were simple and required little customization.
- From the users experience, 11ty was lightning fast (and it's TRUE)
- 11ty offers a wide variety of template languages, [check here](https://www.11ty.dev/docs/languages)


You might have reasons to not use it. some of them being:
- The resulting website is hard to customize (**hard but possible**)
- The documentation is a type of **DIY** thing, some might find hard to do (One of the reason I chose this!)


As for Decap CMS, I concluded that it is the best way to do this. There were couple of alternatives like [Keystatic](https://keystatic.com/), [Contentlayer](https://contentlayer.dev) (Not a complete CMS), etc... Also the only restriction is that it compels you to host it on Netlify and utilize Netlify Identity (Possible with Cloudflare and/or Github OAuth but with a complex process).


---


I'll share a brief walk-through on how I did this; assuming that you have fundamental knowledge on web development or did similar things before.


## 1. Create a 11ty Project


### Create a blank directory and initialize node project by creating a `package.json`


```sh
mkdir eleventy-decap && cd eleventy-decap
yarn init  # or npm init -y
```


Ideally, now you have a folder with only a `package.json` file in it.
> For the rest of this blog I'll be using **yarn**. You can use **npm** by replacing with equivalent command if you prefer.


### Install 11ty package to you project


```sh
yarn add @11ty/eleventy
```


### Add some contents
create an `index.html` and add some content to it


```html
<!-- /index.html -->

<!doctype html>
<title>First Page</title>

<p>
The world is moving so fast these days that the man who says it can't be done is generally interrupted by someone doing it. - Harry Emerson
</p>
```


### Add script to run eleventy in `package.json`


```json
{
  "name": "eleventy-decap",
  "version": "1.0.0",
  "main": "index.js",
  "author": "shinjith-dev",
  "license": "MIT",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  },
  "dependencies": {
    "@11ty/eleventy": "^3.0.0"
  }
}
```


### Run the project


```sh
yarn dev
```


You can see the website running in the address [http://localhost:8080](http://localhost:8080) (if not, check the terminal). That was literally the fastest (or the simplest) framework setup I've done so far!


- Checkout this [Getting Started](https://www.11ty.dev/docs) page of 11ty for detailed instruction


### Adding Blogs


Create a folder named `blogs` and store some files on it. You can see in the terminal that the files you're updating are reflected to the website in realtime. For example, create a file `/blogs/first.md` an add some content to it.


```md
# My First Blog in Eleventy + Decap

Etiam massa mauris, feugiat ut pharetra in, malesuada eu orci. Nullam aliquam elit sit amet urna posuere aliquet.
```


You can now open this content using url [http://localhost:8080/blogs/first](http://localhost:8080/blogs/first). As you might have noticed 11ty automatically generates page paths from path of the source file relative to the project root. You can also see the static web folder is generated under the folder name `/_site`.


### Hosting


Now, please do this step on your own as I don't want this blog to be a long & boring. It's pretty simple, upload to github and host it on Netlify. Please refer these blogs if you're not sure on how to do it:
- [Upload to Github](https://github.blog/developer-skills/github/beginners-guide-to-github-uploading-files-and-folders-to-github)
- [Hosting on Netlify](https://israelmitolu.hashnode.dev/how-to-easily-host-a-website-for-free-using-netlify)


On the final project configuration step, you can select eleventy template of Netlify to let it handle things for you. Use `yarn build` as build script (we have already added this script in the initial steps).


## 2. Integrate Decap CMS


Decap is like a *plug and play* part in your project. It is easy to setup and has lightweight CMS interface. The only hard part is adding Netlify Identity for authentication, it can be easily done as the docs are easy to understand and follow.


### Install Decap


Make a folder named `admin` in your project root (or use any other name if you're not welcoming intruders as it is an obvious path to look for admin interfaces).
Create an `index.html` and `config.yml` in it.


**/admin/index.html**


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```


**/admin/config.yml**


```yml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: create {{collection}}/{{slug}}
    update: update {{collection}}/{{slug}}
    delete: delete {{collection}}/{{slug}}
    uploadMedia: upload {{path}}
    deleteMedia: delete {{path}}
    openAuthoring: '{{message}}'


media_folder: "_site/assets/uploads"
public_folder: "/assets/uploads"


collections:
  - name: "blog"
    label: "Blog"
    folder: 'blogs'
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - label: "Tags"
        name: 'tags'
        widget: 'list'
        default: ['web']
        allow_add: true
        collapsed: false
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Body", name: "body", widget: "markdown" }


site_url: https://notes.shinjith.dev
```


This is a basic **config** for Decap, assuming that you hosted it on Netlify and use Netlify Identity for Authentication.
Set value of `site_url` to netlify url of your project.
- Refer [this](https://decapcms.org/docs/install-decap-cms) for alternative installation options and
- Check [this](https://decapcms.org/docs/configure-decap-cms) to learn how to configure decap as per your need.


**Decap and 11ty**


`.yml` files are not parsed by 11ty by default, therefore it will not get created in the output folder (`/_site/admin/`). Also you don't need 11ty to parse or compile the whole `/admin` folder as it is irrelevant to the content generation part. To complete the Decap installation, you need to convey eleventy about this, to achieve this create a `eleventy.config.mjs` file and add the following lines.


**/eleventy.config.mjs**


```js
export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
};
```


Now restart the project. To know more about the `eleventy.config.mjs` file, refer [11ty docs](https://www.11ty.dev/docs/config-shapes). You can find more about `addPassthroughCopy` function [here](https://www.11ty.dev/docs/copy).


### Add Netlify Identity


Netlify has a service called [Identity](https://docs.netlify.com/security/secure-access-to-sites/identity) that lets you add authentication to this project, including external auth providers like Google.


**Enable Netlify Identity**

Open your hosted project in Netlify Dashboard and follow below steps:

- **Identity > Netlify Identity - Enable**, click **Enable Identity**
- Go to **Configuration and usage**, under **Registration**, select **Open** or **Invite only**, Invite Only is enough for basic needs
- Add external providers for your auth under **External providers**
- Scroll down to **Services > Git Gateway**, and click **Enable Git Gateway**


**Add the Auth handler widget**


Add the netlify Identity widget to the admin landing page and preferably to the main landing page.


script tag:


```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```


Landing page files after adding the script,


**/index.html**


```html
<!doctype html>


<html>
<head>
  <title>First Page</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>


<body>
  <p>The world is moving so fast these days that the man who says it can't be done is generally interrupted by someone doing it. - Harry Emerson</p>
</body>
</html>
```


**/admin/index.html**


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```


Optionally you can redirect user to CMS after Netlify authenticates you by adding a script snippet, refer Decap documentation links below.


Now, you can push the changes to github. Wait a while for it to build, and go to `/admin` path of your hosted website to verify Decap setup.


After authentication you can easily manage your blogs here. Whenever you click **Publish**, the changes are committed to github right-away and after the build process, changes are reflected to the hosted website within about a minute.


I've already mentioned a *Quick Start* guide. For in-depth reasons and details, refer Decap CMS documention:


1. [Install Decap CMS](https://decapcms.org/docs/install-decap-cms/)
2. [Choosing a Backend](https://decapcms.org/docs/choosing-a-backend/)
3. [Configure Decap CMS](https://decapcms.org/docs/configure-decap-cms/)


## Final Glow Up


So far we've managed to create simple blog pages and integrate web based CMS into it. Now, nobody want to visit a website that is mere plain text without any layout or organizing.


Like I mentioned before, 11ty is little hard to customize according to your will, but on the contrary it is quite simple once you grasp the [idea of eleventy](https://www.11ty.dev/docs/glossary/) (how templates work, managing of layouts, etc...). 


### Template Languages


11ty offers a dozen languages to use for template (to generate pages). As for layouts or landing pages where you might want to list the blogs you have, some sort of scripts are necessary. In the 11ty world, after little searching, I found that [Liquid](https://www.11ty.dev/docs/languages/liquid/) and [Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) are two simple (yet powerful) choices. While **Liquid** is better for basic needs **Nunjucks** seems to be better for bit more complex operations; it is capable of running some of the JavaScript functions also. I've only used Nunjucks for my layouts and template that includes script so far.


[11ty - Template Languages](https://www.11ty.dev/docs/languages/)


### Layouts


You can create many layouts, and include them in your pages. Few points about layout worth noting are:
- Layouts can be [chained](https://www.11ty.dev/docs/layout-chaining/) (or nested)
- Layout can [cascade](https://www.11ty.dev/docs/data-cascade/) data: Layouts can have a set of data attributes called [Front Matter](https://www.11ty.dev/docs/data-frontmatter) (or simply metadata). Upon using a layout in a page or in another layout this data is passed down and merged with the page (or layout).


### Customizing


11ty is also capable of including [CSS, JavaScript or Custom Fonts](https://www.11ty.dev/docs/assets). You can also setup [tailwindcss](https://tailwindcss.com) for styling.


### Search


You can use [pagefind](https://pagefind.app/) to index your pages and implement simple search feature. If you need a demo on how it looks, the [11ty search](https://www.11ty.dev/docs/search/) is the best example!


---


I tried to keep the blog simple and short as possible. If you find any step missing or not mentioned properly drop a comment.


Checkout the source code of [my website](https://notes.shinjith.dev) if you need reference, [https://github.com/shinjith-dev/notes-v2](https://github.com/shinjith-dev/notes-v2)


Good day! 

