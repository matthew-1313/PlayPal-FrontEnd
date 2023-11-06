<script>
    import { passwordStrength } from 'check-password-strength'
    let show_password = false
    $: type = show_password ? 'text' : 'password'
    let username = ""
    let password = ""
    let checkPassword = ""
    let errorMessage = ""
    $:if (username.length > 0) {
		errorMessage = ""
	}
    const submitChecker = (event) =>{
        let myPassword = passwordStrength(password)
        event.preventDefault()
        if (username.length < 1){
            errorMessage = "the username is blank, please try again"
        }else if (password !== checkPassword){
            errorMessage = `The passwords do not match! Please try again`
        }else if (myPassword.id < 2){
            errorMessage = `Your password strength is currently ${myPassword.value}! Please make this stronger by adding more numbers or special characters`
        }else{
            errorMessage = ""
        }
    }
</script>
<h2>Fill in the details below</h2>
<form on:submit={submitChecker} id="fillForm">
    <label for="username">Please enter username here     
        <input on:change={(event) =>{
            username = event.target.value
        }} id="username" value={username} placeholder="Enter username here">
    </label>
    <label for="password">Please enter password
        <input on:change={(event) =>{
            password = event.target.value
        }} id="password" value={password} { type } placeholder="Enter password here">
    </label>
    <label for="checkPassword">Please re-enter your password to confirm this
        <input id="checkPassword" value={checkPassword} { type } placeholder="Re-enter password" on:change={(event) =>{
            event.preventDefault()
            checkPassword=event.target.value
        }}>
    </label>
    <button type="button" on:click="{ () => show_password = !show_password }">{show_password ? 'Hide passwords' : 'Show passwords'}</button>
    <button>Click here to proceed</button>
</form>
<a href="/SignIn">Click to Log in</a>
<p>{errorMessage}</p>