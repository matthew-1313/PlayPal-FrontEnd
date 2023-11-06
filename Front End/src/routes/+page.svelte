<script>
  import SignUp from "./SignUp/+page.svelte";
  import SignIn from "./SignIn/+page.svelte"
  import { Router, Route, Link } from "svelte-navigator";
  export const informationArray = []
  let SignState = ""
</script>
<div>
<p>Please click one of the below to continue</p>
<a href="/SignUp"><button>Sign Up</button></a>
<a href="/SignIn"><button>Log In</button></a>
</div>



