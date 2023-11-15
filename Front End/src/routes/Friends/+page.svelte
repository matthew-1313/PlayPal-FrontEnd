<script>
  import Navbar from "../../lib/navbar.svelte";

  import { MyUser } from "../../lib/store";
  import { db } from "../../lib/firebase/firebase.client";
  import {
    getDocs,
    collection,
    getDoc,
    doc,
    updateDoc,
    onSnapshot,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { converse } from "../../lib/converse.js"
  import Talk from "talkjs";
  import { StoredUserInfo, currentChatSession } from "../../lib/store";
  import { get } from "svelte/store";

  let isSearching = false;
  let isLoading = false;
  let errorMessage = "";
  let myFriends = [];
  let isNotFriend = [];
  let myCurrentUser = "";
  MyUser.subscribe((value) => {
    myCurrentUser = value;
  });

  onMount(() => {
    loadUsers();
  });
  // let ourUser = []
  async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, "Profiles"));
    let ourUserDetails = await getDoc(doc(db, "Profiles", myCurrentUser));
    console.log(myCurrentUser);
    ourUserDetails = ourUserDetails.data();
    myFriends = [];
    isNotFriend = [];
    // const unsubscribe = onSnapshot(getDoc(doc(db,"Profiles","Jerry")),(ourUserDetails) =>{
    //   ourUser = ourUserDetails.docs.map((field) =>{
    //    return field.data()
    //   })
    // })

    querySnapshot.forEach((user) =>{
    user = user.data()
     if (ourUserDetails.Friends.includes(user.Username)){
     let myObject = {name : user.Username, isFriend : true, avatar_url: user.image}
     myFriends.push(myObject)
      } else if (user.Username === myCurrentUser) {
      } else{
        let myObject = {name : user.Username, isFriend : false, avatar_url: user.image}
        isNotFriend.push(myObject)
      }
  })
    }
  
  //patches selected user to Friends field of logged in user
  async function ConnectUser(user){
  const myUserUpdate = doc(db, "Profiles", myCurrentUser);
  const mapArray = myFriends.map((friend)=> {
      return friend.name
    })
    await updateDoc(myUserUpdate, {
      Friends: [user, ...mapArray]
    })
    loadUsers()
  }
  let popupEl;


</script>

<Navbar />
<h1>This is the Friends page</h1>
<p>Search Friends</p>
<button><a href="Friends/searchFriends">Search Here</a></button>
<p>{errorMessage}</p>
<p>Current Friends....</p>
<div  class="FriendsDiv">
{#each myFriends as friend}
<div>
  <h3>{friend.name}</h3>
  <img src={friend.avatar_url} alt={friend.name} />
  <button on:click={() => converse({ id: friend.name, name: friend.name, photoUrl: friend.avatar_url, role: "default" })} >Message Here</button>
</div>
{/each}
</div>
<br>
<p>Recommended Friends</p>
{#each isNotFriend as user}
<div class="FriendsDiv">
  <h3>{user.name}</h3>
  <img src={user.avatar_url} alt={user.name} />
  <button value={user.name} on:click={ConnectUser(user.name)}>Add Friend</button>
</div>
{/each}
<br>

<div bind:this={popupEl} />


<style>
  :root {
    --avatar-size: 5rem;
  }

  img {
    border-radius: 50%;
    height: auto;
    width: var(--avatar-size);
  }
</style>
