---
layout: post
title: "Polarsteps Telegram Bot"
date: 2025-07-12
categories: [polarsteps, telegram, bot, ai, llm, gemini, zod, json, schema, typescript, scrape]
---

I made a cool thing, and now I am making it public!

In this post, I'll tell you about the project - why I made it, what it does, a bit of how it works, 
and most importantly - how you can use it for yourself 😊

Also - I used only free tools and services, so this thing runs **completely for free!**

In the future I might write another post with a deep dive into the code, how I made it,
stuff I learned along the way, what worked better and what didn't work, and so on.

### A bit of background

A year ago I got married, and together with my beautiful wife we decided to go on a 6 months long honeymoon 
trip to New England, New Zealand, and Australia.

The trip itself was absolutely incredible.

But while we were planning it we heard about a cool app called [Polarsteps](https://www.polarsteps.com/) -
which lets you document your trip while you travel, and also lets other people follow you along.
We really liked the look and feel of this app, and we figured it would be perfect for us - we can document
our adventure in real time, with the memories still fresh in our minds, and we can also use it to keep our
families posted about what we were doing and where we are, which is important when being away from home for 
so long.

So we used it ❤️ and we really loved it. This app is really great, I recommend you go check it out.

Anyway, when we got back home we felt like we miss our adventure. It was such an amazing time, and we didn't
want it to end. So I thought - you know how Google Photos sends you these random "memories"? It takes a bunch
of photos from some time in the past and reminds you about them. I always loved that feature. And I figured - 
why not make something like that, but for our Polarsteps trip?

### So what did I make?

I decided to make a bot that will once a day choose a random "step" from our Polarsteps trip, and send us
the memory to a Telegram group. The memory includes the text description of that day, a few random images 
and videos, and a link to that "step" in Polarsteps for further viewing.

I also added AI (because you can't not use AI nowadays) - I give Gemini the description and ask it to
craft a "did you know?" fun fact related to that memory, and also an interesting local news story.
These are both added to the Telegram message and enrich our memories with new information.

I really like the result ✨ it feels like we get to keep reliving our memories from the trip, and also the
memories themselves come alive with new information every day.

<img src="/images/polarsteps-telegram-bot/screenshot1.png" width="512">
<img src="/images/polarsteps-telegram-bot/screenshot2.png" width="512">

### How it works

The project is written in Typescript and runs on Node.js.

I trigger it once a day via Github Actions (which is free).

It starts by selecting a random "step" from the trip, formats a message and sends it via the Telegram Bot API.
It also selects some random photos and videos from that day and sends them as well.

Then it takes the step description and gives it to Gemini. I chose Gemini specifically because it has quite
a generous free tier. It lets you use an API key programmatically with a nice amount of free tokens per month.

I also use Google Custom Search API (also free) to get results from the web and feed them to Gemini.

So the AI looks at the step description, generates relevant search queries, gets the results back from the 
web, and then it chooses the most relevant information to craft its enrichment messages.

### How to use it for yourself

The repo is available here: [Polarsteps Telegram Bot](https://github.com/Malkiz/polarsteps-telegram-bot-public)

You will need to download a copy of your Polarsteps data and store it alongside the code.

If you want to run it for free with Github Actions, you can fork the repo and follow the instructions to 
set up all the required API keys in the config. The workflow is already there, you just need to use it 🚀

### How to contribute

If you think this is cool, I would love to hear from you 🌟

And if you want to contribute, feel free to reach out with ideas and pull requests.
