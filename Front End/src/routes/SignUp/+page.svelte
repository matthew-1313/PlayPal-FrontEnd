<script>
    import { passwordStrength } from 'check-password-strength'
    import {data} from '../../lib/store'
    let show_password = false
    $: type = show_password ? 'text' : 'password'
    const addToArray = () => {
		$data = [...$data, { username : username, password : password}];
    }
    let username = ""
    let password = ""
    let checkPassword = ""
    let errorMessage = ""
    let correctMessage = ""
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
            correctMessage = "this has now been added to the DB"
            addToArray()
        }
    }
</script>
<h2>Sign Up Below:</h2>
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
<a href="/SignIn"><button>Click to Log in</button></a>
<p>{errorMessage}</p>
<p>{correctMessage}</p>