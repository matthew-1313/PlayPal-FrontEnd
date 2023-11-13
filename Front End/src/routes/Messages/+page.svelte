<script>
  import Navbar from "../../lib/navbar.svelte";
  import { StoredUserInfo } from "../../lib/store";
  import { onMount } from "svelte";
  import Talk from 'talkjs'
  import './messages.css'

  let inboxElement;

  onMount(async () => {
    await Talk.ready;

    const currentUser = new Talk.User({
      id: $StoredUserInfo.username,
      name: $StoredUserInfo.username,
      photoUrl: $StoredUserInfo.avatar_url,
    });

    const otherUser = new Talk.User({
      id: "Mike",
      name: "Mike",
      photoUrl:
        "https://img.freepik.com/premium-vector/man-headphones-mascot-logo-gaming-vector-illustration_382438-453.jpg",
    });

    const session = new Talk.Session({
      appId: "tkzuhGNe",
      me: currentUser,
    });
    const conversationID = Talk.oneOnOneId(currentUser, otherUser);
    const conversation = session.getOrCreateConversation(conversationID);
    conversation.setParticipant(currentUser);
    conversation.setParticipant(otherUser);
    const inbox = session.createInbox()

    inbox.select(conversation)
    inbox.mount(inboxElement)



    

  
  });
</script>

<Navbar />
<h1 class="msg-header">Messages</h1>

<div class="talkjs-container" bind:this={inboxElement}></div>
