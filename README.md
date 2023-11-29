# PLAYPAL - A Gamer Review & Connection App

## Project Background

This application was created with the objective of using new technologies and frameworks that we, the team, were not exposed to in the Northcoders bootcamp. We were given 8 days to design and develop a working application using the new technologies/framework that we selected. 

------
## Table Of Contents

[Project Description](#project-description)
 - [Purpose](#purpose)
 - [Features](#features)
 - [Technologies/Frameworks](#technologiesframeworks)
 - [Challenges](#challenges)
 - [Future considerations](#future-considerations)

[How to install & run the project](#how-to-install-and-run-the-project)

[How to use Playpal](#how-to-navigate-playpal)
 - [Home](#home-page)
 - [Search Game](#search-game)
 - [Profile](#profile)
 - [Calendar](#calendar)
 - [Games](#games)
 - [Friends](#friends)
 - [Messages](#messages)

[Credits](#credits)
 - [Acknowledgements](#acknowledgements)
 - [The Team](#project-team-members)

[Links](#links)


------
## Project Description

### Purpose
Playpal was created to connect video gamers with other video gamers with similar gaming interests while also being a gaming information resource.

### Features
Playpal allows a user to review a game. Upon submitting a review, Playpal will suggest other users with a similar rating to connect with. Once connected, Playpal allows the user to use the in-app messaging system to directly communicate with the other user. Additionally, Playpal contains a calendar feature that allows users to make meeting requests and coordinate playing/meet up schedules. 

### Technologies/Frameworks
Playpal was created using the following frameworks and plugins: Firebase for a non-relational back end solution and RAWG API [https://rawg.io/] for the gaming information.  TalkJS [https://talkjs.com/] was used for the messaging component and Calendar developed by Vladmir Kurko [https://github.com/vkurko/calendar].

<ul>
<li>Axios[^1]</li>
<li>Calendar by Valdmir Kurko</li>
<li>Firebase</li>
<li>Moment</li>
<li>Svelte</li>
<li>TalkJS</li>
</ul>

The game information used in Playpal is supplied by RAWG.io.

More information on the above can be found in our [Links](#links).


### Challenges
We faced a number of challenges during the course of this project. 
<ul>
<li>Github version control - first time working in a group with more than 2 people and figuring out how to create application features while minimising the number of merging conflicts.</li>
<li>Non-relational database implementation - we learned to use PostgreSQL in the bootcamp and initially approached Firebase in a similar manner. We quickly learned that this is not the intended utilisation of the tech and had to change our implementation of it.</li>
<li>Svelte - Having a React background from the bootcamp, we had to re-train ourselves to utilise the strengths of Svelte. We had to adjust our application's file structure, the utilisation of Svelte stores and how to trigger page/component re-renders</li>
<li>User authentication - While Firebase has this capability we decided not to incorporate it into our application as it is email-based - a feature our application does not use. Consequently, we encountered issues in maintaining and accessing a user info store across our application.</li>
<li>Documentation - we encountered the value of having well written documentation that allowed us to incorporate features quickly with a solid understanding of how it works.</li>
</ul>

### Future Considerations
Here are some features for future considerations:
<ul>
<li> Incorporate AI for game recommendations</li>
<li> Adding a user's game type interests to their profile to allow for a more sophisticated matching algorithm</li>
</ul>

## How to Install and Run the Project

To run tour application locally, you will need to clone our repo:

```
git clone https://github.com/matthew-1313/PlayPal-FrontEnd.git
```
Once cloned, navigate to the "Front End" folder inside the project folder and  install the necessary dependencies:


```
npm install
```

This should update your local repo with all the dependencies needed to run the application.

A possible error that you may encounter a peer dependency error.  To solve this enter the following:

```
npm install --legacy-peers-deps
```

You are now ready to move onto creating an .ENV file.  In case you are still missing dependencies, we have listed the individual ones below:

_Axios_
```
npm i axios
```

_Calendar_
```
npm install --save-dev @event-calendar/core
npm install --save-dev @event-calendar/time-grid
npm install --save-dev @event-calendar/day-grid
```

_Check Password Strength_
```
npm i check-password-strength --save
```

_Firebase_
```
npm install --save firebase
```

_Moment_
```
npm install moment --save
```

_Svelte_
```
npm i -D @sveltejs/adapter-node
npm install --save svelte-navigator
npm install svelte-spa-router
```

_TalkJS_
```
npm install talkjs --save
```
With the dependencies installed, you are now ready to create the .env file for your local application. Place this file in the first level of the Front End folder and copy the below text block into it. This will allow you to connect to the Firebase database and API for Playpal.

```
VITE_APIKEY=AIzaSyCJqSOlwwuLPMnvuJ9edAEXlE_bJlfWWbQ
VITE_AUTH_DOMAIN=playpal-723dd.firebaseapp.com
VITE_PROJECT_ID=playpal-723dd
VITE_STORAGE_BUCKET=playpal-723dd.appspot.com
VITE_MESSAGING_SENDER_ID=434887247433
VITE_APP_ID=1:434887247433:web:636503bb15e5009e51e198
```

Now to start the application, confirm that you have navigated in your terminal to the Front End folder. There you will enter the following prompt

```
npm run dev
```

Follow the prompts to view the application in a web browser.

## How to navigate Playpal
### Sign up / Log in
When first accessing Playpal, the user will be asked to Sign In or Sign Up via the buttons provided.

For a new user, the user will select Sign Up. On this screen, the user will need to provide a username and password.  Both of these have validation checks. Upon completion, the user will click on "Click Here to Proceed". Playpal will then redirect the user to the sign in page and the process will be the same as an existing user.

For a returning user, the user will select Sign In. On this screen the user will need to provide their username and password credentials and click on the Click Here to Proceed button.  From here, Playpal will navigate the user to the Home page.

### Home page
On the Home page the user will have the ability to navigate across the entire site using the navigation bar.  Additionally the user can search for a game title by clicking on the "Click hear to Search for any title" button. Below this is a List of Recommended Games with game title cards showing the following information:

<ul>
<li>Game name</li>
<li>Game image</li>
<li>Game genre(s)</li>
<li>Game metacritic rating</li>
<li>Game playpal rating</li>
</ul>

Each game card is clickable and will take the user to a page with more information and reviews for that game.

### Search Game

To look for a particular game, the user can enter the game title into the search bar and click "Submit". Playpal will return a list of games related to the title searched. The user can (as on the home page) click the game card to be taken to a page with more information about the game.

### Profile

This page will display the user's avatar, username and bio. There is an Update Profile section where the user can update their avatar (by supplying a link) and bio text. Below this is a section that will display all the reviews the user has submitted on to Playpal. Each of these review cards is clickable and will take the user to the specific game title page.

### Calendar
This page contains a calendar showing all the meeting/events for a user.  The user is able to add new events by clicking the "Add Event". The user will then be prompted to enter the following:

<ul>
<li>Start time</li>
<li>End time</li>
<li>Date</li>
<li>Game Title</li>
<li>Friend Name (optional)</li>
</ul>

Please note that if a Friend Name (other user's username) is provided, the event will show up on both the user's and the friend's calendars.

### Games
On this page, the user can browse game titles. To do this, a user can search for a particular game title, sort the showing game titles by using the drop down menu.

### Friends
On this page, the user will see a section listing all their current Friends (other Playpal users that the user has connected with) and another below listing all the Playpal users.  From this page, a user can add other users as friends, message friends and create group chats with multiple friends.

### Messages
On this page, the user can message their friends and any chat groups that the user is apart of.  The functionality is similar to most of chat applications like Whatsapp.  In addition to realtime chats, a user can send attachments, voice messages and react to messages via and emojis.

## Credits
### Acknowledgements
The team would like to express their gratitude and thanks to the mentors and leads at Northcoders whom provided their expertise and guidance over the course of this project.  

#### Northcoders Mentors (August 2023)
<ul>
<li>Alice Yang</li>
<li>Mitch Wyatt</li>
<li>Rayhann Ugharadar</li>
<li>Niamh Smith</li>
<li>Poonam Rajput</li>
<li>Kev Morel - Section Lead</li>
<li>David Bartlet - Cohort Lead</li>
<li>Liam Duncan - Cohort Lead</li>
<li>Rose Mullan - Cohort Lead</li>
<li>Jim Stevenson - Cohort Lead</li>
</ul>

### Project Team Members
<table>
<tr>
<td>Sam Woodall</td>
<td>https://github.com/swoody2527</td>
</tr>
<tr>
<td>Daniel Wong</td>
<td>https://github.com/s08Reild</td>
</tr>
<tr>
<td>Daniel Mohammadian</td>
<td>https://github.com/Danmoham</td>
</tr>
<tr>
<td>Matthew Mathieson</td>
<td>https://github.com/matthew-131</td>
</tr>
<tr>
<td>Emory Brock </td>
<td>https://github.com/EmoryBrock</td>
</tr>
</table>


## Links
<table>
<tr>
<td>Axios</td>
<td>https://axios-http.com/</td>
</tr>
<td>Calender</td>
<td>https://github.com/vkurko/calendar</td>
</tr>
<tr>
<td>Firebase</td>
<td>https://firebase.google.com/</td>
</tr>
<tr>
<td>Moment</td>
<td>https://momentjs.com</td>
</tr>
<tr>
<td>RAWG.io</td>
<td>https://rawg.io</td>
</tr>
<tr>
<td>Svelte</td>
<td>https://svelte.dev/</td>
</tr>
<tr>
<td>TalkJS</td>
<td>https://talkjs.com/</td>
</tr>
</table>



Readme version 1.0