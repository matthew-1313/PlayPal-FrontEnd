<script>
  import Navbar from "../../lib/navbar.svelte";
  let isSearching = false
  let isLoading = false
  let errorMessage = ""
  let myFriends = []
  let isNotFriend = []
  let myCurrentUser = ""
  import { MyUser } from "../../lib/store";
  import { db } from "../../lib/firebase/firebase.client";
  import { getDocs,collection,getDoc,doc, updateDoc, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";
  MyUser.subscribe((value) =>{
    myCurrentUser = value
  })

  onMount(() =>{
  loadUsers()
  })

  //fetch All Users and Current Logged-in profiles from firebase to display page
  async function loadUsers(){
    const querySnapshot = await getDocs(collection(db,"Profiles"))
    let ourUserDetails = await getDoc(doc(db,"Profiles",myCurrentUser))
    ourUserDetails = ourUserDetails.data()
    myFriends=[]
    isNotFriend=[]

    querySnapshot.forEach((user) =>{
    user = user.data()
     if (ourUserDetails.Friends.includes(user.Username)){
     let myObject = {name : user.Username, isFriend : true, avatar: user.image}
     myFriends.push(myObject)
      } else if (user.Username === myCurrentUser) {
      } else{
        let myObject = {name : user.Username, isFriend : false, avatar: user.image}
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

</script>

<Navbar />
<h1>This is the Friends page</h1>
<p>Search Friends</p>
<button><a href="Friends/searchFriends">Search Here</a></button>
<p>{errorMessage}</p>
<p>Current Friends....</p>
{#each myFriends as friend}
<div>
  <h3>{friend.name}</h3>
  <img src={friend.avatar} alt={friend.name} />
  <button>Message Here</button>
</div>
{/each}
<br>
<p>Recommended Friends</p>
{#each isNotFriend as user}
<div>
  <h3>{user.name}</h3>
  <img src={user.avatar} alt={user.name} />
  <button value={user.name} on:click={ConnectUser(user.name)}>Add Friend</button>
</div>
{/each}
<br>

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