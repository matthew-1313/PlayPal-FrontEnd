<script>
  import { data } from "../../lib/store";
  import { MyUser } from "../../lib/store";
  import { getDocs, collection } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client.js";
  import { goto } from "$app/navigation";
  import { StoredUserInfo } from "../../lib/store";
  let username = "";
  let password = "";
  let errorMessage = "";
  let dataValue;
  let show_password = false;
  $: type = show_password ? "text" : "password";
  async function CheckWithFireBase() {
    const querySnapshot = await getDocs(collection(db, "Profiles"));
    errorMessage = "";
    let isHere = false;
    querySnapshot.forEach((user) => {
      const myUser = user.data();
      if (username === myUser.Username && password === myUser.Password) {
        isHere = true;
        errorMessage = "";
        $MyUser = myUser.Username;
        StoredUserInfo.set({
          username: myUser.Username,
          avatar_url: myUser.image,
        });
        goto("/Home");
      }
      if (!isHere) {
        errorMessage = "Incorrect Details given";
      }
    });
  }
</script>

<div class="backImage">
  <img
    src="https://wallpapercave.com/wp/wp7924760.jpg"
    alt="collection of gamecards"
  />
  <div class="blackbox" />
  <div class="scalable">
    <h2 class="signInHead">.</h2>
    <form class="signInBlock" on:submit={CheckWithFireBase}>
      <div class="signInInner">
        <label for="username">Username: </label>
        <input
          value={username}
          placeholder="Enter Username here"
          id="username"
          on:change={(event) => {
            event.preventDefault();
            username = event.target.value;
          }}
        />
        <br />
        <label placeholder="Enter password here" for="password"
          >Password :</label
        >
        <input
          {type}
          value={password}
          placeholder="Enter Password Here"
          id="password"
          on:change={(event) => {
            event.preventDefault();
            password = event.target.value;
          }}
        />
        <button type="button" on:click={() => (show_password = !show_password)}
          >{show_password ? "Hide" : "Show"}</button
        >
      </div>
      <br />
      <br />
      <button class="signInButton">Sign In</button>
    </form>
    <br />
    <br />
    <br />
    <div class="notAMember">
      <div class="notAMemberInner">
        <p>Not a member yet?</p>
        <a href="/SignUp"><button class="notAMemberbutton">Sign Up</button></a>
      </div>
    </div>
  </div>
</div>
{#if errorMessage}
  <p>{errorMessage}</p>
{/if}

<style>
  .signInHead {
    position: relative;
    text-align: center;
    color: black;
  }
  .signInBlock {
    display: flex;
    position: relative;
    padding: 0;
    width: 100vw;
    /* scale: 90%; */
    align-content: center;
  }
  .signInInner {
    display: block;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    padding: auto;
  }
  .signInBlock input {
    width: 40%;
    margin: 10px;
    height: 40px;
    width: 300px;
    font-size: 30px;
  }

  .signInBlock label {
    font-size: 25px;
  }
  .signInButton {
    margin-top: 0;
    font-size: 30px;
    position: absolute;
    top: 125%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .notAMember {
    font-size: 50px;
    display: flex;
    position: relative;
    align-items: center;
    color: white;
    text-shadow: 20px 20px 20px 15px #000000;
  }
  .notAMemberInner {
    padding: auto;
    margin-left: auto;
    margin-right: auto;
    display: block;
    position: relative;
  }
  .notAMemberbutton {
    font-size: 30px;
    margin-top: 20px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
  }

  .backImage {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .backImage img {
    position: absolute;
    display: block;
    width: 100%;
  }
  .blackbox {
    position: absolute;
    width: 75%;
    height: 80%;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000000;
    font-size: 3vmin;
    text-align: center;
    opacity: 0.2;
  }


  .scalable {
    scale: 80%;
  }
</style>
