<script>
  import Navbar from "../../lib/navbar.svelte";
  import Calendar from '@event-calendar/core';
  import DayGrid from '@event-calendar/day-grid';
  import { db } from "../../lib/firebase/firebase.client";
  import { MyUser } from "../../lib/store";
  import { getDoc } from "firebase/firestore";
  import moment from 'moment';


  let data = ""
  let isAdding = false
  let startTime = ""
  let eventDate = ""
  let endTime = ""
  let gameTitle = ""
  let errorMessage = ""
  let addToCalendar = {start: `${eventDate} ${startTime}`, end: `${eventDate} ${endTime}`, title: `${gameTitle}`}

  MyUser.subscribe((value) => {
  data = value
  })

    let ec;
    let plugins = [DayGrid];
    let options = {
        view: 'dayGridMonth',
        eventSources: [{events: function() {
            return [];
        }}]
    };

    function invokeMethod() {
        ec.addEvent({start: `${eventDate} ${startTime}`, end: `${eventDate} ${endTime}`, title: `${gameTitle}`});
    }

  async function getDocument (coll, id) {
  const snap = await getDoc(doc(db, coll, id))
  if (snap.exists()){
    console.log(snap.data())
    return snap.data()
   } else{
    return Promise.reject(Error(`No such document: ${coll}.${id}`))
   }
}

function isValidDate() {
  return !isNaN(Date.parse(eventDate))
}

function isValidTime() {
  return ((moment(startTime, 'HH:mm', true).isValid()) && (moment(endTime, 'HH:mm', true).isValid()))
}

function timeStampChecker(event){
  event.preventDefault()
  if (!isValidDate()){
    errorMessage = "Please enter a valid date in the format DD-MM-YY"
  } else if (!isValidTime()){
    errorMessage = "Please enter valid times in the format HH:MM"
  } else if (gameTitle.split(" ").join("").length === 0) {
    errorMessage = "Please enter a game title"
  } else {
    errorMessage = ""
    console.log("this is correct")
  }
}

console.log(getDocument("Profiles"))

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
}} id="EventDate" value={eventDate} placeholder="DD-MM-YYYY">
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
  <button on:click={invokeMethod}>hello</button>
  <p>{errorMessage}</p>
{/if}

<Calendar bind:this={ec} {plugins} {options} />


