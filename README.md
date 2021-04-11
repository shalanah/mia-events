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
- Some mobile/responsive capabilities have been added (not complete)

## Areas of future improvement

- Hook up to a db for persistance. All of the data is local for now and only held in your session.
- Mobile / responsive adjustments especially on form
- Tweaks to form visuals especially upload image area
- Show live view of event then allow to edit
- Handle times not just dates (in UI but haven't hooked up yet)
- Warn user before deleting or leaving an unsaved modal
- Form validations + warnings ie: empty field


## Video / Screenshots

TBD