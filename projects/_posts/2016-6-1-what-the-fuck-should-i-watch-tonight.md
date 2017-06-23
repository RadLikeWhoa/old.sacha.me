---
title: What The Fuck Should I Watch Tonight
tags:
  - Web
  - App
  - React
learned:
  - Idea Finding
  - Design
  - Development
  - Build Processes
  - Componentisation
  - Immutability
  - REST
technologies:
  - ES6
  - React
  - Sass
  - PHP
pattern: argyle
background: rgb(86, 137, 194)
repo: https://github.com/RadLikeWhoa/whatthefuckshouldiwatchtonight
end: 2016
team: 3
---

What The Fuck Should I Watch Tonight is an app for spontaneously finding a movie to watch. It is based on the concept of selecting a movie that will make you feel a certain way, instead of combing through endless lists of movies sorted by arbitrary ratings.

As part of the Web Engineering course at the UAS we were tasked with creating a web application that offers a REST API coupled to a database, while also using a third-party API. The exercise's goal was to strengthen our skills in HTML, CSS, JavaScript, and PHP, while also giving us an opportunity to brainstorm for an appropriate idea.

<figure>
  <img src="/assets/img/what-the-fuck-should-i-watch-tonight/emotions.png">
  <figcaption data-marginalia="right">Concept art showing all of the available emotions which are the core of the experience.</figcaption>
</figure>

My team and I came up with this idea after some others failed to meet the requirements of the exercise. We wanted to tackle a problem that all of us know and experience on a regular basis.

Picking the right movie for the right situation can sometimes be an overwhelming task due to the sheer abundance of options. Because of this we wanted to come up with a solution that makes this process a lot easier, by focusing more on the emotional aspect of watching a movie, rather than assessing the movie's quality.

We went on to collect a list of basic emotions that a movie might make you feel. These six emotions — amused, sad, excited, scared, inspired, weird — were to be the core of the experience. A user visits the site and is presented with these emotions. They then select one option and can view a list of movies that match this emotion. This list can then be sorted by various criteria, such as release date, percentage of match or when they were added to the database.

<figure>
  <img src="/assets/img/what-the-fuck-should-i-watch-tonight/search.png">
  <figcaption data-marginalia="right">Search functionality is using <abbr title="The Movie Database">TMDB</abbr> data. Movies are only added to our own database if they are not already present.</figcaption>
</figure>

All movies are added by the users. They can search for a movie by its name and then save a rating for it. If the movie is already present in the database only the rating is saved, otherwise all the necessary details for the movie are saved as well. All data is pulled from The Movie Database.

# Things I've learned

{% include tags.html tags = page.learned %}

I decided to use this as an opportunity to finally learn more about React by using it in a real world project. Setting up the project was a bit of a chore, but it did not take too long for me to fully appreciate React and all its core principles.

<figure>
  <img src="/assets/img/what-the-fuck-should-i-watch-tonight/react.png">
  <figcaption data-marginalia="right">A slide I used in the review presentation at the end of the semester showing my appreciation of React and its concepts.</figcaption>
</figure>

Things like JSX, components, states and props, and immutability quickly went from confusing new terminologies to helpful tools to increase efficiency during programming, but also of the application itself. I plan on working with React a lot more in the future.

# Technologies I've used

{% include tags.html tags = page.technologies %}

All React code — all JavaScript code, that is — was coded in ECMAScript 6. The ability to rely on classes and things like spread operators to help with immutability were invaluable when creating an application such as this one. Using tools like Gulp or Browserify it was quite easy to get started with all the new language features.

Aside from React the project used Sass for styling purposes and PHP, along with the SLIM framework, for the REST API. The whole technology stack was easy to maintain and set up, which made working on the project very comfortable.
