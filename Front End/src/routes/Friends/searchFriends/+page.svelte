<script>
  import Navbar from "../../../lib/navbar.svelte";
  import { MyUser } from "../../../lib/store";
  import { db } from "../../../lib/firebase/firebase.client";
  import {
    getDocs,
    collection,
    getDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { converse } from "../../../lib/converse.js";

  let isSearched = false;
  let errorMessage = "";
  let searchTerm = "";
  let myFriends = [];
  let dbFriends = [];
  let isNotFriend = [];
  let myCurrentUser = "";

  MyUser.subscribe((value) => {
    myCurrentUser = value;
  });
  //checks Data upon Button Press
  async function changeData() {
    const querySnapshot = await getDocs(collection(db, "Profiles"));
    let ourUserDetails = await getDoc(doc(db, "Profiles", myCurrentUser));
    ourUserDetails = ourUserDetails.data();
    dbFriends = [];
    myFriends = [];
    isNotFriend = [];

    isSearched = true;
    querySnapshot.forEach((user) => {
      user = user.data();
      if (searchTerm.toLowerCase() === user.Username.toLowerCase()) {
        if (ourUserDetails.Friends.includes(user.Username)) {
          let myObject = {
            name: user.Username,
            isFriend: true,
            avatar: user.image,
          };
          myFriends.push(myObject);
          dbFriends.push(myObject);
        } else {
          let myObject = {
            name: user.Username,
            isFriend: true,
            avatar: user.image,
          };
          isNotFriend.push(myObject);
        }
      } else {
        if (ourUserDetails.Friends.includes(user.Username)) {
          let myObject = {
            name: user.Username,
            isFriend: false,
            avatar: user.image,
          };
          dbFriends.push(myObject);
        }
      }
    });
  }
  MyUser.subscribe((value) => {
    myCurrentUser = value;
  });

  function CheckUserNames(event) {
    event.preventDefault();
    changeData();
  }

  async function ConnectUser(user) {
    const myUserUpdate = doc(db, "Profiles", myCurrentUser);
    const mapArray = dbFriends.map((friend) => {
      return friend.name;
    });
    console.log(user);
    await updateDoc(myUserUpdate, {
      Friends: [user, ...mapArray],
    });
    changeData();
  }
</script>

<Navbar />
<div class="search-friends-container">
  <h1>Searching Users</h1>
  <form on:submit={CheckUserNames}>
    <label placeholder="Search Here" for="SearchForFriend"
      ><input
        on:change={(event) => {
          event.preventDefault();
          errorMessage = "";
        }}
        id="SearchForFriend"
        placeholder="Name"
        bind:value={searchTerm}
      />
    </label>
    <button>Search</button>
  </form>

  {#key dbFriends}
    <!-- <p>Current Friends....</p> -->
    {#if myFriends.length > 0 || isNotFriend.length > 0}
    <h2>Found {myFriends.length || isNotFriend.length} {myFriends.length > 1 || isNotFriend > 1 ? "users" : "user"}</h2>
      {#each myFriends as friend}
        <div class="searched-user-card">
          <h3>{friend.name}</h3>
          <img src={friend.avatar} alt={friend.name} />
          <button
            on:click={() =>
              converse({
                id: friend.name,
                name: friend.name,
                photoURL: friend.avatar,
              })}>Message Here</button
          >
        </div>
      {/each}
      {#each isNotFriend as user}
        <div class="searched-user-card">
          <h3>{user.name}</h3>
          <img src={user.avatar} alt={user.name} />
          <button value={user.name} on:click={ConnectUser(user.name)}
            >Add Friend</button
          >
        </div>
      {/each}
    {:else if isSearched}
      <p>Sorry unable to locate this username</p>
    {/if}
  {/key}
  <a href="/Friends"><button>Back</button></a>
</div>

<style>
  :root {
    --avatar-size: 5rem;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 15px;
    box-shadow: 4px 6px 15px black;
  }

  .search-friends-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search-friends-container button {
    margin: 20px ;
  }

  .searched-user-card {
    background-color: var(--pp-dark);
    border-radius: 10px;
    border: solid 1px var(--pp-main);
    border-top: 1px solid var(--pp-accent);
    border-right: 0.75px solid var(--pp-accent);
    width: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .searched-user-card button {
    width: 150px;
    font-size: 20px;
  }
</style>
