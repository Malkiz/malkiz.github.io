---
layout: post
title: "Blog Comments"
date: 2025-08-15
categories: [blog, comments, static, site, jekyll, google-sheets]
---

I added a comments section to my blog! Check it out below 😊

Here is a short recap of how I did it.

## Requirements

A comments section is not a novel idea for a blog. I don't think I need to convince you of why I wanted one.

That said, it turns out adding a comments section to a Jekyll website is not so simple.

A Jekyll site is a static site. That means that during the deployment process (which runs via Github Actions
every time I push a new commit to the repo - see [How Blog]({% post_url 2025-05-16-how-blog %}) for details) 
we create all the static files of the website and upload them to somewhere to be served statically.

This process doesn't really lend itself to having comments, because adding a comment is not a new commit,
which means it doesn't trigger a new deployment.

The website itself is hosted on Github Pages and doesn't have a backend. No server, no database.

So I needed to figure out 2 things:

1. Where to keep the comments - the data itself.
2. How to display comments on each post without having to redeploy the website for new comments to appear.

## Research

During my research I came across several solutions.

### Third-party services

There are several third-party services that offer a solution to this. A few popular ones: Disqus, Commento.

I didn't delve too deep into them, but from what I gather - you create an account, that account hosts
your comments data and serves it to the world. And you get a code snippet to include in your website that will:
1. Get the comments of the current page/blog post based on some post id that you provide.
2. Include an "add new comment" form.

I didn't go for any of these services because:
1. I don't like creating new accounts and adding new third-party dependencies to my projects.
2. I wasn't sure how well maintained they are. I would have to research each service to figure out if I can 
rely on them to be future proof. I didn't feel like doing that research.

### Github

So I thought - my blog is hosted on Github, wouldn't it be nice to also host the comments on Github?

I figured someone must have already figured out how to do it. Github Pages is regularly used for personal
websites and blogs, and Jekyll is the default framework for it, I can't be the first person to try adding
comments to it.

I came across 2 possible solutions:

1. Using GitHub Issues: There is a service called *utterances* which creates a new Github Issue for each blog
post. Then Github Users can comment on that issue, and a script would pull the data from the issue to display
it in the website.
It's an elegant solution, except it forces anyone who wants to comment to have a Github account, and also I
don't like that if you want to add a comment you need to leave my website and go to Github for it. Feels like
very bad UX.

2. Using Pull Requests: There is a service called *Staticman* which takes the comment data and automatically 
creates a pull request to add it to your website's static files. So each new comment would literally be pushed
to Github and trigger a deployment.
I guess you can call it elegant in its own way, but it also sounds like a bit of an overkill. Moreover,
apparently I have to host the Staticman server somewhere - that server would handle the logic of creating
the pull request. So again - not ideal.

### Google

Finally I landed on an acceptable compromise - host the comments in a Google Sheet.

True, it's a third-party service, the comments are not hosted in Github like I wanted.
But Google is a service I am already using (who doesn't?) and I can definitely rely on it being there tomorrow.

## The Solution

1. I created a Google Sheet to hold all the comments data.
2. I created a Google Apps Script that can add a new record to the sheet, and query data from the sheet based
on the blog post URL.
3. I added a comments section to my Jekyll site that calls the Google Apps Script.

And that's all!

After I made it work I made some improvements:

- Sanitize comment contents to prevent XSS
- Make sure that the Google Apps Script only has access to the comments sheet and nothing else in my account
- Filter the comments in the Google Apps Script (rather than in the browser)
- Make the comments section look nice
- Send myself an email notification when a comment is added

And done!

Feel free to leave a comment and let me know your thoughts 😊

## Final Thoughts

Stuff I like about this solution:

- It's simple
- It's free
- It's reliable
- I understand every part of it because I implemented it myself

Stuff I like a little less:

- It's not really scalable - the Google Apps Script essentially goes over all the comments and filters out
the relevant ones for the current post. That would probably break down at scale. But if this blog would ever
become popular enough to warrant a change - I would happily reconsider this solution.
