# MIA Code Challenge

## Prompt

React Event Calendar:
Create a calendar page that when you input a date and time it organizes the events into three classes: featured, upcoming and past.

Write a reusable function to organize the objects from newest to oldest within Featured and Upcoming and a function that organizes the objects from newest to oldest for past events.

- Featured Events: any that will be within the next 30 days
- Upcoming Events: any date more than 30 days out
- Past Events: 1 day older or more

## Demo

https://mia-events.netlify.app

## Running Locally

- `npm i` or `yarn install`
- `npm start` or `yarn start`

## Capabilities

- Add events
  - Title, Date(s), Description, Image
- Edit events
- Duplicate / alter events
- Remove events
- Sort events into 3 buckets and display with counts
- Some mobile/responsive capabilities but WIP

## Areas of future improvement

- Browser testing / fallbacks - would suggest using Chrome or Firefox. Used a lot of modern CSS (for fun). Especially fallbacks for unsupported `gap` flexbox feature in Safari.
- Handle times not just dates. Added to UI but haven't hooked up yet.
- Add a db for persistance. All of the data is held in your session for now.
- More mobile / responsive adjustments
- Tweaks to form especially upload image area, adding validation, and adding warnings before leaving unsaved or deleting.
- Show live view of event then allow to edit.

## Video / Screenshots

TBD