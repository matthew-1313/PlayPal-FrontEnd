<script>
    import Navbar from "../../lib/navbar.svelte";
  import { MyUser } from "../../lib/store";
  let user;
  MyUser.subscribe((value) =>{
        user = value
    })

</script>
<h1>Hi {user}</h1>
<Navbar/>
