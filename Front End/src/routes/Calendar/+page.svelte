<script>
  import Navbar from "../../lib/navbar.svelte";
  import Calendar from "@event-calendar/core";
  import DayGrid from "@event-calendar/day-grid";
  import { db } from "../../lib/firebase/firebase.client";
  import { MyUser, getDocument } from "../../lib/store";
  import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
  import "./Calendar.css";
  import moment from "moment";
  import { deepEqual } from "../../lib/store";
  import { onMount } from "svelte";
  let currentUser = "";
  let isAdding = false;
  let startTime = "";
  let eventDate = "";
  let endTime = "";
  let gameTitle = "";
  let friendName = ""
  let errorMessage = "";
  let fullCalendar = [];
  let addToCalendar = {};
  let friendAddToCalendar = {};
  $:render = false;
  MyUser.subscribe((value) => {
    currentUser = value;
  });
  let ec;
  let plugins = [DayGrid];
  let options = {
    view: "dayGridMonth",
    eventSources: [
      {
        events: function () {
          return [];
        },
      },
    ],
    datesSet: (event) => {
      addAllEvents(fullCalendar);
    },
  };
  const myUserUpdate = doc(db, "Profiles", currentUser);

  function addAllEvents(allCalendarEvents) {
    allCalendarEvents.forEach((eachItem) => {
      ec.addEvent({
        start: `${eachItem.start}`,
        end: `${eachItem.end}`,
        title: `${eachItem.title}`,
      });
    });
 
  }
  function addSpecificEvent(Events) {
    const FinalEvent = Events[Events.length - 1];
    ec.addEvent({
      start: `${FinalEvent.start}`,
      end: `${FinalEvent.end}`,
      title: `${FinalEvent.title}`,
    });
    errorMessage="Your Entry has been succesfully Added!"
  }

  onMount(async () => {
    await getDocument("Profiles", currentUser).then((data) => {
      fullCalendar = data.Calendar;
      addAllEvents(fullCalendar);
    });
  });

  function isValidDate() {
    return !isNaN(Date.parse(eventDate));
  }

  function isValidTime() {
    return (
      moment(startTime, "HH:mm", true).isValid() &&
      moment(endTime, "HH:mm", true).isValid()
    );
  }

  async function checkUserHasFriend(userFriend){
       return await getDocument('Profiles',currentUser)
        .then((data) =>{
          return (data.Friends.includes(userFriend))
        })


  }

  async function timeStampChecker(event) {
    event.preventDefault();
    const myFriendChecker = await checkUserHasFriend(friendName)
    if (!isValidDate()) {
      errorMessage = "Please enter a valid date in the format DD-MM-YY";
    } else if (!isValidTime()) {
      errorMessage = "Please enter valid times in the format HH:MM";
    } else if (gameTitle.split(" ").join("").length === 0) {
      errorMessage = "Please enter a game title";
    }else if (friendName.split(" ").join("").length === 0){
      errorMessage = "";
      addToCalendar = {
        start: `${eventDate} ${startTime}`,
        end: `${eventDate} ${endTime}`,
        title: `${gameTitle}`,
      };
      await getDocument("Profiles", currentUser)
        .then((data) => {
          fullCalendar = [...data.Calendar, addToCalendar];
        })
        .then(() => {
          updateDoc(myUserUpdate, {
            Calendar: fullCalendar,
          });
        });
      addSpecificEvent(fullCalendar);
      friendName =""
        startTime=""
        endTime=""
        eventDate=""
        gameTitle=""
    } else if (myFriendChecker){
      errorMessage = "";
      addToCalendar = {
        start: `${eventDate} ${startTime}`,
        end: `${eventDate} ${endTime}`,
        title: `${gameTitle} with ${friendName}`,
      };
      await getDocument("Profiles", currentUser)
        .then((data) => {
          fullCalendar = [...data.Calendar, addToCalendar];
        })
        .then(() => {
          updateDoc(myUserUpdate, {
            Calendar: fullCalendar,
          });
        });
        addSpecificEvent(fullCalendar);
        const myFriendUpdate = doc(db, "Profiles", friendName);
        errorMessage = "";
        addToCalendar = {
        start: `${eventDate} ${startTime}`,
        end: `${eventDate} ${endTime}`,
        title: `${gameTitle} with ${currentUser}`,
        
      };
      await getDocument("Profiles", friendName)
        .then((data) => {
          fullCalendar = [...data.Calendar, addToCalendar];
        })
        .then(() => {
          updateDoc(myFriendUpdate, {
            Calendar: fullCalendar,
          });
        });
        friendName =""
        startTime=""
        endTime=""
        eventDate=""
        gameTitle=""
        errorMessage = "Entry added on yours and your friends Calendar!"
    }else{
      errorMessage ="The name you have typed is not a current friend! Go to the friends tab and search to add as a friend!" 
    }
  }
</script>

<Navbar />
<h1>This is the Calendar page</h1>

{#if !isAdding}
  <button
    on:click={(event) => {
      event.preventDefault();
      isAdding = true;
    }}>Add Event</button
  >
{:else}
  <form on:submit={timeStampChecker}>
    <label for="StartTime"
      >Start Time
      <input
        on:change={(event) => {
          startTime = event.target.value;
          errorMessage=""
        }}
        id="StartTime"
        bind:value={startTime}
        placeholder="HH:MM*"
      />
    </label>
    <label for="EndTime"
      >End Time
      <input
        on:change={(event) => {
          endTime = event.target.value;
          errorMessage=""
        }}
        id="EndTime"
        bind:value={endTime}
        placeholder="HH:MM*"
      />
    </label>
    <label for="EventDate"
      >Date
      <input
        on:change={(event) => {
          eventDate = event.target.value;
          errorMessage=""
        }}
        id="EventDate"
        bind:value={eventDate}
        placeholder="YYYY-MM-DD*"
      />
    </label>
    <label for="GameTitle"
      >Game Title
      <input
        on:change={(event) => {
          gameTitle = event.target.value;
          errorMessage=""
        }}
        id="GameTitle"
        bind:value={gameTitle}
        placeholder="Enter game here*"
      />
    </label>
    <label for="friendName">Friend Name<input on:change={(event) =>{
      friendName = event.target.value
      errorMessage=""
    }}
    id="friendName"
    bind:value={friendName}
    placeholder="Enter Friend Name if applicable"
    ></label>
    <button>Submit</button>
  </form>

  <button
    on:click={(event) => {
      event.preventDefault();
      isAdding = false;
    }}>Close Event</button
  >
  <p>{errorMessage}</p>
{/if}
<button on:click={addAllEvents(fullCalendar)}>Fetch events</button>
<Calendar bind:this={ec} {plugins} {options} />
