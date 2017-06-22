---
title: Wolfswood Companion
tags:
  - iOS
  - App
  - Swift
learned:
  - Native App Development
  - Design
  - App Publishing
  - Marketing
technologies:
  - Swift
  - Cocoa
  - StoreKit
pattern: checker
background: rgb(40, 45, 49)
link: https://itunes.apple.com/us/app/wolfswood-companion/id1091989511?ls=1&mt=8
end: 2016
---

Wolfswood Companion is a planning utility for the console game Destiny. It helps players with planning the monthly Iron Banner event and achieving the maximum level in order to obtain all the rewards.

I've been interested in native application development for a long time, especially on iOS since most of my devices are from that ecosystem.

While playing Destiny's Iron Banner event I came up with the idea for this app, which fell into a uncovered category in the App Store. Admittedly, it is not a completely new idea as similar applications already exist on the web or on other platforms, but I set out to create something new with a focus on design.

<figure>
  <img src="/assets/img/wolfswood-companion/shaders.png">
  <figcaption data-marginalia="right">A selection of shaders, custom themes resembling Destiny-related subjects, which are available as <abbr title="In App Purchase">IAP</abbr> inside the application.</figcaption>
</figure>

From the beginning I wanted to create something that fit right into the iOS ecosystem, while still resembling the interface of Destiny. This meant thoroughly studying iOS interface guidelines and playing quite a bit of Destiny.

# Things I've learned

{% include tags.html tags = page.learned %}

This was an entirely new experience for me, developing a native application for the first time, so of course there was a lot I had to learn.

Getting into iOS development seems like an overwhelming task at the beginning, but there are lots of great tutorials and guides on the internet. I picked up pieces of information all around and tied them together to create a first working prototype, covering just the absolutely essential functionality. From there on I kept learning new things, using new frameworks, and including more and more functionality.

<figure>
  <img src="/assets/img/wolfswood-companion/interface.png">
  <figcaption data-marginalia="right">The application works regardless of platform, number of characters. Players can customise and make the application their own using various shaders.</figcaption>
</figure>

I wanted to make the application available for free and to include additional shaders — custom themes I created resembling Destiny-related subjects — as In App Purchases. This lead to some more difficulties, mainly setting up the iTunes Connect account correctly. In the end, however, I managed to include everything I wanted in the app and officially release it.

# Technologies I've used

{% include tags.html tags = page.technologies %}

The application is written using only Swift code, which I found a lot easier to understand than the traditional Objective-C code that was used up until recently. Swift was a great language to learn and write and I look forward to creating more applications in Swift.

Aside from the language I've used many features of Cocoa and UIKit, and of course StoreKit for the In App Purchase functionality.
