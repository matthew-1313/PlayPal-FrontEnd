<script>
  import Navbar from "../../lib/navbar.svelte";
  import { StoredUserInfo } from "../../lib/store";
  import { onMount } from "svelte";
  import Talk from 'talkjs'
  import './messages.css'


  let inboxElement;

  // onMount(async () => {
  //   let ourUserDetails = await getDoc(doc(db, "Profiles", $StoredUserInfo.username));
  //   myFriends = ourUserDetails.data().Friends
  // })

  onMount(async () => {
    await Talk.ready;
    const currentUser = new Talk.User({
      id: $StoredUserInfo.username,
      name: $StoredUserInfo.username,
      photoUrl: $StoredUserInfo.avatar_url,
    });

    const session = new Talk.Session({
      appId: "tkzuhGNe",
      me: currentUser,
    });
    const inbox = session.createInbox()

    inbox.mount(inboxElement)
  });
</script>

<Navbar />
<h1 class="msg-header">Messages</h1>

<div class="talkjs-container" bind:this={inboxElement}></div>


