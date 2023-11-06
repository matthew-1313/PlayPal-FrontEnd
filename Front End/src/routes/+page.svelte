<script>
  import SignUp from "./SignUp/+page.svelte";
  import SignIn from "./SignIn/+page.svelte"
  import { Router, Route, Link } from "svelte-navigator";
  import Navbar from "../lib/navbar.svelte"
  
  export const informationArray = []
  let SignState = ""
</script>
<div>
  <Navbar />
<p>Please click one of the below to continue</p>
<a href="/SignUp"><button>Sign Up</button></a>
<a href="/SignIn"><button>Log In</button></a>
</div>



