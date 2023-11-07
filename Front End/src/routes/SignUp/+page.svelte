<script>
    import { passwordStrength } from 'check-password-strength'
    import {data} from '../../lib/store'
    import ToProfile from './ToProfile.svelte';
    let show_password = false
    let dataValue;
    let StartProfile = false
    data.subscribe((value) =>{
        dataValue = value
    })
    $: type = show_password ? 'text' : 'password'
    const addToArray = () => {
		$data = [...$data, { username : username, password : password}];
    }
    const checkUsers = (myUserName) =>{
            const userNames = dataValue.map((user) =>{
                return user.username
            })
            return userNames.filter((user)  =>{
                return user === myUserName
            })
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
        }else if ((checkUsers(username).length > 0)){
            errorMessage = `This Username has been taken, please try again.`
        }else{
            errorMessage = ""
            correctMessage = "this has now been added to the DB"
            StartProfile = true
            addToArray()
        }
    }
</script>
<h2>Sign Up Below:</h2>
<form on:submit={submitChecker} id="fillForm">
    <label for="username">Please enter username here     
        <input on:change={(event) =>{
            StartProfile = false
            username = event.target.value
        }} id="username" value={username} placeholder="Enter username here">
    </label>
    <label for="password">Please enter password
        <input on:change={(event) =>{
            StartProfile = false
            password = event.target.value
        }} id="password" value={password} { type } placeholder="Enter password here">
    </label>
    <label for="checkPassword">Please re-enter your password to confirm this
        <input id="checkPassword" value={checkPassword} { type } placeholder="Re-enter password" on:change={(event) =>{
            event.preventDefault()
            StartProfile = false
            checkPassword=event.target.value
        }}>
    </label>
    <button type="button" on:click="{ () => show_password = !show_password }">{show_password ? 'Hide passwords' : 'Show passwords'}</button>
    <button>Click here to proceed</button>
</form>
<a href="/SignIn"><button>Click to Log in</button></a>
<p>{errorMessage}</p>
{#if (StartProfile)}
<p>{correctMessage}</p>
<ToProfile/>

{/if}