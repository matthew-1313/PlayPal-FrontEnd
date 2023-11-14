import { get } from "svelte/store";
import { currentChatSession, StoredUserInfo } from "./store";

let popupEl;

export async function converse(otherUser) {
    const chatSession = get(currentChatSession);
    const loggedInUser = get(StoredUserInfo)

    if (Object.keys(chatSession).length) {
      console.log(chatSession);
      chatSession.destroy();
    }

    await Talk.ready;

    const currentUser = new Talk.User({
      id: loggedInUser.username,
      name: loggedInUser.username,
      avatar_url: loggedInUser.avatar_url,
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