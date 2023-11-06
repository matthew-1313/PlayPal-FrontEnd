<script>
    let username=""
    let password=""
    let show_password = false
    $: type = show_password ? 'text' : 'password'

</script>

<h2>Sign In</h2>
<form>
<label for="username">Username: </label>
<input value={username} placeholder="Enter Username here" id="username" on:change={(event) =>{
    event.preventDefault()
    username = event.target.value
}}>
<label placeholder="Enter password here" for="password">Password :</label>
<input {type} value={password} placeholder="Enter Password Here" id="password" on:change={(event) =>{
    event.preventDefault()
password = event.target.value
}}>
<button type="button" on:click="{ () => show_password = !show_password }">{show_password ? 'Hide passwords' : 'Show passwords'}</button>
</form>
<a href="/"><button>Click here to go Back</button></a>