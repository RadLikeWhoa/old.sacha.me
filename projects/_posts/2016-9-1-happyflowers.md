---
title: happyflowers
tags:
  - Web
  - App
  - React
  - Haskell
learned:
  - Design
  - Development
  - Functional Programming
  - Immutability
  - Automation
  - Authentication
  - Hardware Programming
  - Real-Time Communication
technologies:
  - JavaScript
  - CSS
  - React
  - Redux
  - ImmutableJS
  - Haskell
  - Cabal
  - Raspberry Pi
  - sqlite
  - Highcharts
  - Web Sockets
  - I2C
  - GPIO
pattern: dots
background: rgb(130, 145, 154)
client: Insititue of Mobile and Distributed Systems
repo: https://github.com/RadLikeWhoa/happyflowers
link: https://sacha.me/happyflowers/
end: 2017
team: 2
---

happyflowers solves the problem of dried out household plants. A Raspberry Pi monitors a plant's moisture and automatically waters it, should it be needed. An elegant dashboard provides insights into the plant's health and helps owners get to know their plants better.

The idea for this project came from the Institute of Mobile and Distributed Systems at the [University of Applied Sciences](http://fhnw.ch). They keep a number of plants in their offices and, true to every cliché, regularly forget to water the plants properly. In order to solve this problem, an automated solution had to be created.

This solution was to be built around a Raspberry Pi that is connected to a moisture sensor and a water pump. The Pi then runs some code (written in Haskell) to monitor the plant and activate the pump whenever it is needed. All the data should be presented in a dashboard (built with React) that was accessible to everyone in the office.

<figure>
  <img src="/assets/img/happyflowers/flower.png">
  <figcaption data-marginalia="right">An innocent test subject with the connected sensor.</figcaption>
</figure>

One goal of this project was to showcase the real-world applications of Haskell in order to prove its usefulness outside of a scholarly context. In addition to this, the application was to be used as part of a lecture on functional programming and Haskell, thus the codebase needed to be kept simple enough for learners to understand.

Creating the project along with thorough documentation in a team of two over the course of a single semester was not an easy feat, but certainly very rewarding. The learnings and the feeling of success were far greater than in previous projects at this university.

# Things I've learned

{% include tags.html tags = page.learned %}

The clear focus on functional programming allowed me to gain more knowledge on a topic I was only somewhat familiar with. This was helped by the fact that we could rely on shared concepts between the React and Haskell codebase as both sides are built on similar ideas.

Also, this was the first project where I worked with a Raspberry Pi. I knew what the device was capable of and I'd seen lots of interesting projects built around it, but I never had the chance to work on a project of my own. So I was understandably excited to start working with the little computer. The fear of breaking all the intricate parts whenever we plugged in a new peripheral or connected one of the sensors was constantly looming over our heads, but in the end we made it work and got to know many aspects of computers much better.

<figure>
  <img src="/assets/img/happyflowers/hardware.png">
  <figcaption data-marginalia="right">Making sense of all the wires and where they were going was not always the easiest task.</figcaption>
</figure>

What was especially interesting during this project was the reliance on real-time communication. We needed to make sure that the water pump could only ever be activated by one person. In addition to that, there had to be a limit on activations so that the flower could not be flooded unnecessarily. A combination of Haskell concurrency in the backend and state management on the dashboard allowed us to handle most cases where concurrent access could lead to problems. Testing this functionality was some of the most time-consuming work throughout this project.

# Technologies I've used

{% include tags.html tags = page.technologies %}

My previous experience with Haskell was limited to the exercises during the lecture I mentioned above; other than that, Haskell was a completely new environment for me. This was especially obvious while setting up the project. Getting to know Cabal as the dependency manager, finding new libraries on Hackage and then sorting out issues with Cabal took quite some time. Stack would have been the much better alternative for dependency management, however, getting a somewhat current version of Haskell to run on the Raspberry Pi was hard enough already, so setting one up that was also compatible with Stack was something we did not want to tackle.

We decided to use Haskell only for the backend and the hardware communication. This was possible thanks to libraries like HPi, sqlite-simple, scotty, and websockets. Combining these tools was a very efficient way of creating a powerful application with few lines of code that were easy to document and understand.

The dashboard was created using React and Redux, enhanced with ImmutableJS data structures. This was not the first React project I'd worked on, but certainly the first where I used Redux properly. As with [other projects](/projects/what-the-fuck-should-i-watch-tonight/), developing a React app proved to be a very pleasant experience with only a handful of issues along the way.
