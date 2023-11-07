<script>
   import {data} from '../../lib/store'
   import { navigate } from 'svelte-routing'; 
   import { MyUser } from '../../lib/store';
    let username=""
    let password=""
    let signedIn = ""
    let errorMessage=""
    let dataValue;
    data.subscribe((value) =>{
        dataValue = value
    })
    let show_password = false
    $: type = show_password ? 'text' : 'password'
    function CheckWithArray(){
        errorMessage=""
        let isHere = false
        for (let i = 0; i < dataValue.length;i++){
            if (username === dataValue[i].username && password === dataValue[i].password){
                signedIn = username
                isHere = true
                $MyUser = dataValue[i].username
                navigate('/Home')
            }
        }
        if (!isHere){
            errorMessage="Incorrect Details given"
        }

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
