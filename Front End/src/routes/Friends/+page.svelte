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
  import { converse } from "../../lib/converse.js";
  import Talk from "talkjs";
  import { StoredUserInfo, currentChatSession } from "../../lib/store";
  import { get } from "svelte/store";
  import "./friends.css";

  let isSearching = false;
  let isLoading = false;
  let errorMessage = "";
  let myFriends = [];
  let isNotFriend = [];
  let myCurrentUser = "";
  let friendsToAdd = [];
  let isAddingFriendsToGroup = false;

  MyUser.subscribe((value) => {
    myCurrentUser = value;
  });

  onMount(() => {
    loadUsers();
  });

  function stageFriend(friend) {
    friendsToAdd = [...friendsToAdd, friend];
  }

  function unstageFriend(friend) {
    friendsToAdd = friendsToAdd.filter(
      (friendToAdd) => friendToAdd.name !== friend.name
    );
  }

  function createGroupChat() {
    const chatSession = get(currentChatSession);
    const loggedInUser = get(StoredUserInfo);

    if (Object.keys(chatSession).length) {
      chatSession.destroy();
    }

    const currentUser = new Talk.User({
      id: loggedInUser.username,
      name: loggedInUser.username,
      avatar_url: loggedInUser.avatar_url,
      role: "default",
    });

    const session = new Talk.Session({
      appId: "tkzuhGNe",
      me: currentUser,
    });

    currentChatSession.set(session);

    let friendNames = "";
    friendsToAdd.forEach((friend) => {
      friendNames += friend.name;
    });

    const conversation = session.getOrCreateConversation(friendNames);
    conversation.setParticipant(currentUser);

    friendsToAdd.forEach((friend) => {
      conversation.setParticipant(new Talk.User(friend));
    });

    const popup = session.createPopup();
    popup.select(conversation);
    popup.mount(popupEl);
    popup.show();

    friendsToAdd = [];
    isAddingFriendsToGroup = false;
  }

  // let ourUser = []
  async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, "Profiles"));
    let ourUserDetails = await getDoc(doc(db, "Profiles", myCurrentUser));
    ourUserDetails = ourUserDetails.data();
    myFriends = [];
    isNotFriend = [];

    // const unsubscribe = onSnapshot(getDoc(doc(db,"Profiles","Jerry")),(ourUserDetails) =>{
    //   ourUser = ourUserDetails.docs.map((field) =>{
    //    return field.data()
    //   })
    // })

    querySnapshot.forEach((user) => {
      user = user.data();
      if (ourUserDetails.Friends.includes(user.Username)) {
        let myObject = {
          name: user.Username,
          isFriend: true,
          avatar_url: user.image,
        };
        myFriends.push(myObject);
      } else if (user.Username === myCurrentUser) {
      } else {
        let myObject = {
          name: user.Username,
          isFriend: false,
          avatar_url: user.image,
        };
        isNotFriend.push(myObject);
      }
    });
  }

  //patches selected user to Friends field of logged in user
  async function ConnectUser(user) {
    const myUserUpdate = doc(db, "Profiles", myCurrentUser);
    const mapArray = myFriends.map((friend) => {
      return friend.name;
    });
    await updateDoc(myUserUpdate, {
      Friends: [user, ...mapArray],
    });
    loadUsers();
  }
  let popupEl;
</script>

<Navbar />
<h1>Friends</h1>
<p>{errorMessage}</p>

<section class="current-friends-container">
  <h2 class="current-friends-header">Current Friends</h2>
  <div class="current-friends-card-container">
  {#each myFriends as friend}
    <div class="current-friend-card">
      <img class="avatar-img" src={friend.avatar_url} alt={friend.name} />
      <div class="friend-name-container">
        <p class="friend-name">{friend.name}</p>
      </div>
      {#if !isAddingFriendsToGroup}
        <button class="message-button"
          on:click={() =>
            converse({
              id: friend.name,
              name: friend.name,
              photoUrl: friend.avatar_url,
              role: "default",
            })}>Send Message</button
        >
      {:else if friendsToAdd
        .map((friendToAdd) => friendToAdd.name)
        .includes(friend.name)}
        <p>Friend Added</p>
        <button
          on:click={unstageFriend({
            id: friend.name,
            name: friend.name,
            photoUrl: friend.avatar_url,
          })}>Remove</button
        >
      {:else}
        <button
          on:click={() =>
            stageFriend({
              id: friend.name,
              name: friend.name,
              photoUrl: friend.avatar_url,
            })}>Add</button
        >
      {/if}
    </div>
  {/each}
</div>
</section>
<br />

<div class="groupchat-container">
  {#if !isAddingFriendsToGroup}
    <button on:click={() => (isAddingFriendsToGroup = true)}>Start Group</button
    >
  {:else}
    <button on:click={() => (isAddingFriendsToGroup = false)}
      >Stop Group</button
    >
  {/if}
  {#if friendsToAdd.length < 2}
    <button
      title="Groups must have at least 3 participants"
      style="background-color: gray; color: black;"
      disabled="true">Create Group</button
    >
  {:else}
    <button on:click={() => createGroupChat()}>Create Group</button>
  {/if}
</div>
<br />
<div class="search-friends-container">
  <button><a href="Friends/searchFriends">Search Friends</a></button>
</div>

<div class="recommended-friends-container">
<p>Recommended Friends</p>
<div class="recommended-friends-card-container">
{#each isNotFriend as user}
  <div class="recommended-friends-card">
    <h3>{user.name}</h3>
    <img class="avatar-img" src={user.avatar_url} alt={user.name} />
    <button value={user.name} on:click={ConnectUser(user.name)}
      >Add Friend</button
    >
  </div>
{/each}
</div>
<br />
</div>

<div bind:this={popupEl} />

<style>

</style>
