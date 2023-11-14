<script>
  import Navbar from "../../lib/navbar.svelte";
  import Calendar from '@event-calendar/core';
  import DayGrid from '@event-calendar/day-grid';
  import { db } from "../../lib/firebase/firebase.client";
  import { MyUser,getDocument } from "../../lib/store";
  import { getDoc,doc,updateDoc,onSnapshot } from "firebase/firestore";
  import '@event-calendar/core/index.css';
  import moment from 'moment';
  import { deepEqual } from "../../lib/store";
  import { onMount } from "svelte";
  let currentUser = ""
  let isAdding = false
  let startTime = ""
  let eventDate = ""
  let endTime = ""
  let gameTitle = ""
  let errorMessage = ""
  let fullCalendar = []
  let addToCalendar = {}
  $: render = false
  MyUser.subscribe((value) => {
  currentUser = value
  })
  let ec;
  let plugins = [DayGrid];
  let options = {
        view: 'dayGridMonth',
        eventSources: [{events: function() {
            return []
        }}
      ],
      datesSet : ((event) =>{
         addAllEvents(fullCalendar)

        })
    };

    function addAllEvents(allCalendarEvents) {
      allCalendarEvents.forEach(eachItem => {
        ec.addEvent({start: `${eachItem.start}`, end: `${eachItem.end}`, title: `${eachItem.title}`});
      });
    }
    function addSpecificEvent(Events){
      const FinalEvent = Events[Events.length-1]
      ec.addEvent({start: `${FinalEvent.start}`, end: `${FinalEvent.end}`, title: `${FinalEvent.title}`})
    }

   onMount(async () => {
   await getDocument('Profiles',currentUser).then((data) =>{
    fullCalendar = data.Calendar
    addAllEvents(fullCalendar)
   })
   }) 


function isValidDate() {
  return !isNaN(Date.parse(eventDate))
}

function isValidTime() {
  return ((moment(startTime, 'HH:mm', true).isValid()) && (moment(endTime, 'HH:mm', true).isValid()))
}

async function timeStampChecker(event){
  event.preventDefault()
  if (!isValidDate()){
    errorMessage = "Please enter a valid date in the format DD-MM-YY"
  } else if (!isValidTime()){
    errorMessage = "Please enter valid times in the format HH:MM"
  } else if (gameTitle.split(" ").join("").length === 0) {
    errorMessage = "Please enter a game title"
  } else {
    errorMessage = ""
    addToCalendar = {start: `${eventDate} ${startTime}`, end: `${eventDate} ${endTime}`, title: `${gameTitle}`}
    const myUserUpdate = doc(db,"Profiles",currentUser)
    await getDocument('Profiles',currentUser).then((data) =>{
      fullCalendar = [...data.Calendar,addToCalendar]
    }).then(() =>{
       updateDoc(myUserUpdate,{
      Calendar : fullCalendar
    })
    })
    addSpecificEvent(fullCalendar)
  }
}

</script>
<Navbar />
<h1>This is the Calendar page</h1>

{#if !isAdding}
<button on:click={((event) => {event.preventDefault()
isAdding = true})}>Add Event</button>
{:else}
<form on:submit={timeStampChecker}>
  <label for="StartTime">Start Time
    <input on:change={(event) =>{
      startTime = event.target.value
  }} id="StartTime" value={startTime} placeholder="HH:MM">
</label>
<label for="EndTime">End Time
  <input on:change={(event) =>{
    endTime = event.target.value
}} id="EndTime" value={endTime} placeholder="HH:MM">
</label>
<label for="EventDate">Date
  <input on:change={(event) =>{
    eventDate = event.target.value
}} id="EventDate" value={eventDate} placeholder="YYYY-MM-DD">
</label>
<label for="GameTitle">Game Title
  <input on:change={(event) =>{
    gameTitle = event.target.value
}} id="GameTitle" value={gameTitle} placeholder="Enter game here">
</label>
<button>Submit</button>
</form>

<button on:click={((event) => {event.preventDefault()
  isAdding = false
  })}>Close Event</button>
  <p>{errorMessage}</p>
{/if}
<button on:click={addAllEvents(fullCalendar)}>Fetch events</button>
<Calendar bind:this={ec} plugins={plugins} options={options}/>



