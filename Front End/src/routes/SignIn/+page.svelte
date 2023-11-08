<script>
  import { data } from "../../lib/store";
  import { navigate } from "svelte-routing";
  import { MyUser } from "../../lib/store";
  import { getDocs, collection } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client.js";
  let username = "";
  let password = "";
  let errorMessage = "";
  let dataValue;
  data.subscribe((value) => {
    dataValue = value;
  });
  let show_password = false;
  $: type = show_password ? "text" : "password";
  async function CheckWithArray() {
    const querySnapshot = await getDocs(collection(db, "Profiles"));
    errorMessage = "";

    let isHere = false;
    querySnapshot.forEach((user) => {
      const myUser = user.data();
      if (username === myUser.Username && password === myUser.Password) {
        isHere = true;
        $MyUser = myUser.Username;
        navigate("/Home");
      }
      if (!isHere) {
        errorMessage = "Incorrect Details given";
      }
    });
  }
</script>

<h2>Sign In</h2>
<form on:submit={CheckWithArray}>
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
  <label placeholder="Enter password here" for="password">Password :</label>
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
    >{show_password ? "Hide password" : "Show password"}</button
  >
  <button>Click here to proceed</button>
</form>

<a href="/SignUp"><button>Click here to SignUp </button></a>
<p>{errorMessage}</p>
