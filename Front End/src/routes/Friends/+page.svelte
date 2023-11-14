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

    querySnapshot.forEach((user) => {
      user = user.data();
      console.log(ourUserDetails);
      if (ourUserDetails.Friends.includes(user.Username)) {
        let myObject = { name: user.Username, isFriend: true, avatar_url: user.image };
        myFriends.push(myObject);
      } else {
        let myObject = { name: user.Username, isFriend: false, avatar_url: user.image };
        isNotFriend.push(myObject);
      }
      console.log(myFriends, "friends");
    });
    // console.log(user, "returned user data")
    // return () => unsubscribe()
  }

  async function ConnectUser(user) {
    console.log(user);
    const myUserUpdate = doc(db, "Profiles", myCurrentUser);
    await updateDoc(myUserUpdate, {
      Friends: [...myFriends, { name: user.Username, isFriend: true, avatar_url: user.image }],
    });
    loadUsers();
  }

  let popupEl;

  async function converse(otherUser) {
    const chatSession = get(currentChatSession);

    if (Object.keys(chatSession).length) {
      console.log(chatSession);
      chatSession.destroy();
    }

    await Talk.ready;

    const currentUser = new Talk.User({
      id: $StoredUserInfo.username,
      name: $StoredUserInfo.username,
      avatar_url: $StoredUserInfo.avatar_url,
      role: "default"
    });

    const userTwo = new Talk.User(otherUser);

    const session = new Talk.Session({
      appId: "tkzuhGNe",
      me: currentUser,
    });

    currentChatSession.set(session);

    const conversation = session.getOrCreateConversation(
      Talk.oneOnOneId(currentUser, userTwo)
    );

    conversation.setParticipant(currentUser);
    conversation.setParticipant(userTwo);

    const popup = session.createPopup();
    popup.select(conversation);
    popup.mount(popupEl);
    popup.show();
  }

  

 
</script>

<Navbar />
<h1>This is the Friends page</h1>
<p>{errorMessage}</p>
<p>Current Friends....</p>
{#each myFriends as friend}

  <div>
    <h3>{friend.name}</h3>
    <p>{friend.avatar_url}</p>
    <button on:click={() => converse({ id: friend.name, name: friend.name, photoUrl: friend.avatar_url, role: "default" })}
      >Message Here</button
    >
  </div>
{/each}
<br />
<p>Add Friends</p>
{#each isNotFriend as user}
  <div>
    <h3>{user.name}</h3>
    <button value={user.name} on:click={ConnectUser(user.name)}>Add Friend</button>
  </div>
{/each}
<br />
<button><a href="Friends/searchFriends">Search Here</a></button>

<p>Recommended Friends</p>

<div bind:this={popupEl} />
