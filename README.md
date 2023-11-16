# PLAYPAL - A Gamer Review & Connection App

## Project Background

This application was created with the objective of using new technologies and frameworks that we, the team, were not exposed to in the Northcoders bootcamp. We were given 8 days to design and develop a working application using the new technologies/framework we selected. 

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

[Credits](#credits)
 - [Acknowledgements](#acknowledgements)
 - [The Team](#project-team-members)

[Links](#links)


------
## Project Description

### Purpose
This project was created to connect video gamers with other video gamers with similar gaming interests.

### Features
The app allows a user to review a game. Upon submitting a review, the app will suggest other app users with a similar rating to connect with. Once connected, the app allows the user to use the in-app messaging system to directly communicate with the other user. Additionally, the app contains a calendar feature that allows users to make meeting requests and coordinate playing/meet up schedules. 

### Technologies/Frameworks
The app was created using Svelte for the front end, Firebase for a non-relational back end solution and RAWG API [https://rawg.io/] for the gaming information.  TalkJS [https://talkjs.com/] was used for the messaging component and Calendar developed by Vladmir Kurko [https://github.com/vkurko/calendar].

Svelte (front end framework)
Moment (package time)
Axios (routing)
TalkJS (plugin)
Calender (plugin)
Firebase (back end framework)
Game API


### Challenges
We faced a number of challenges during the course of the is project. 
<ul>
<li>Coding pairs - getting used to work together while swapping our coding pairs</li>
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
With the dependencies installed, you are now ready to create the .ENV file for your local application. Place this file in the first level and copy the below text block into it. This will allow you to connect to the Firebase database for the application.

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

## Credits
### Acknowledgements
The team would like to express their gratitude and thanks to the mentors and leads at Northcoders whom provided their expertise and guidance over the course of this project.  

#### Northcoders Mentors (August 2023)
<ul>
<li>Alice Yang</li>
<li>Mitch Wyatt</li>
<li>Rayhann Ugharadar</li>
<li>Kev Morel - Section Lead</li>
<li>Niamh Smith</li>
<li>Jim Stevenson</li>
<li>David Bartlet - Cohort Lead</li>
<li>Rose Mullan - Cohort Lead</li>
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
<td>Svelte</td>
<td>https://svelte.dev/</td>
</tr>
<tr>
<td>Firebase</td>
<td>https://firebase.google.com/</td>
</tr>
<tr>
<td>RAWG API</td>
<td>https://rawg.io</td>
</tr>
<tr>
<td>Calender</td>
<td>https://github.com/vkurko/calendar</td>
</tr>
<tr>
<td>TalkJS</td>
<td>https://talkjs.com/</td>
</tr>
</table>



5. How to Use the Project

Provide instructions and examples so users/contributors can use the project. This will make it easy for them in case they encounter a problem – they will always have a place to reference what is expected.

You can also make use of visual aids by including materials like screenshots to show examples of the running project and also the structure and design principles used in your project.

Also if your project will require authentication like passwords or usernames, this is a good section to include the credentials.