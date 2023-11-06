<script>

  import { MyUser } from "../../lib/store";
  let user;
  MyUser.subscribe((value) =>{
        user = value
    })

</script>
<h1>here {user}</h1>