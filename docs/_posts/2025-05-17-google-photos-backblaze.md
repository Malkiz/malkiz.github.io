---
layout: post
title: "Backup From Google Photos to Backblaze"
date: 2025-05-17
categories: [backup, gphotos, backblaze, cloud, storage]
---

### Back Story

My wife and I just got back from our honeymoon 🎉🤩

We had a blast - it was a 6 months trip around the world. More on that later 😎

Anyway, we took a ton of photos. 

During our trip, they were continuously backed up to Google Photos.
But now that we are back and have some time to organize, we want a better backup.
Specifically - we want our photos to be backed up to more than 1 place.

On that note - here is an interesting article on the subject: [The 3-2-1 Backup Strategy](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/)

So I was looking into ways to do that.

### Someone must have solved this already

First idea - use another app on my phone, like Microsoft OneDrive for example, to also back up the photos.
This is not good enough:
- It doesn't work properly (doesn't sync everything, sometimes deleting an image in the cloud also deletes it from my phone, etc).
- Also, the trip was so long that we had to clear the phone storage multiple times of photos that were already
  backed up to Google Photos, so that won't work for all the photos that aren't on the phone anymore.

So I need a cloud-to-cloud sync solution.

I was looking for apps or services that sync from cloud to cloud, and landed on MultCloud as the best looking option.
This is a paid service that lets you connect multiple cloud accounts, and lets you define sync jobs between them.
Sounds like exactly what I need.

After consulting with ChatGPT, I set up a Backblaze account, as it seems like a cheap and easy way to store 
files in the cloud. And it works with MultCloud.

However - MultCloud didn't work. To make a long story short:
- Turns out I have too many files, and MultCloud is hitting the rate limit of the cloud provider.
  Unfortunately they don't have a graceful way of handling this situation (e.g. "continue where I left off").

### Resorting to a manual approach

Next I tried to use Google Takeout to download all the photos to my machine, with the intention of uploading
them manually to another cloud. But for some reason the zip I got from Google Takeout did not contain all of my files.

So I decided to go back to basics - good old scripting. No app. No SaaS. Just a script on my machine.

- I used the `gphotos-sync` cli tool to download albums from my Google Photos account to my local machine.
  - This creates a `photos` directory with all the actual photos, and an `albums` directory with symlinks 
    to those photos.
- Then I used another script to create a `real-albums` directory, that contains the actual photos instead of symlinks.
- Then I used the `b2` cli tool (by Backblaze) to sync this directory to a Backblaze B2 bucket.
- Then I used another script to download the photos back from Backblaze to my machine, just to make sure that
  the backup works and I can restore it when I need to.
  - I found out that Backblaze stores the file's metadata separately from the actual file, so I had to
    piece them back together after downloading the files, in order to have the correct "modified date" of
    each file.

I used ChatGPT to write all of these scripts for me. I am not a `bash` "wizard", 
and I also don't like reading docs if I don't have to 😅

And that's it - this worked perfectly.

### My takeaway

I spent too much time on trying to find an app or a service that does what I want,
and trying to figure out why the service failed when it did, talking with their support etc...
I also ended up paying a good amount of money for a service that failed to deliver on its promise.

Finally writing the scripts took a lot less time, and was also free.
So maybe next time when I need to do something not too hard, rather than looking for an existing solution, 
I'll reach for scripting sooner. Just maybe 🙃

### Code

Here is [the code](https://github.com/Malkiz/google-photos-backblaze) for anyone interested.
