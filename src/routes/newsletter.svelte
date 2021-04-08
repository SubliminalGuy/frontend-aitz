<script>
import { from } from 'apollo-link';

import emailjs from 'emailjs-com';
import { createForm } from 'svelte-forms-lib'

const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
        name: "",
        email: ""
    },
    validate: values => {
    let errs = {};
    if (values.name == "") {
        errs["name"] = "Verrat mir doch deinen Namen oder Spitznamen \u{1F607}";
    }
    if (values.email == "") {
        errs["email"] = "Was ist ein Newsletter ohne gültige eMail? \u{1F48C}"
    }
    return errs;
    },

    onSubmit: values => {
        //console.log(values)
        let templateParams = {
            name: values.name,
            email: values.email
            };

        // emailjs Integration //

        emailjs.init('user_XLGdRxnG7S4GCsE5MnYZN');
                    
        emailjs.send('posteo.de','contact_form', templateParams)
                .then(function(response) {
                console.log('SUCCESS!', response.status, response.text)
                }, function(err) {
                console.log('FAILED...', err);
                });
                
    }
})


</script>


<svelte:head>
        <title>Newsletter: Adults in the Zoom</title>
</svelte:head>

<h1>Deine wöchentliche Erinnerung!</h1>


<p>Wenn du bei Adults in the <strong>Zoom</strong> am Ball bleiben willst, dann kannst du dich hier 
    für den wöchentlichen eMail-Reminder anmelden.</p>

<form class="inputwrap" on:submit={handleSubmit}>
    <div class="input-container">
        <input id="name" name="name" placeholder="Dein Name" on:change={handleChange} bind:value={form.name} />
        {#if $errors.name}
        <small>{$errors.name}</small>
        {/if}
    </div> 
    <div class="input-container">
        <input id="email" name="email" placeholder="eMail" on:change={handleChange} bind:value={form.email} />
        {#if $errors.email}
        <small>{$errors.email}</small>
        {/if}
    </div> 
    <div class="button-container">
    <button class="tweet-button">Submit</button>
    </div>
</form>


<style>

        
p {
    text-align: justify;
    line-height: 1.8rem;
    font-size: 1.2rem;
}

strong {
    text-align: justify;
    line-height: 1.8rem;
    font-size: 1.2rem;
}

.inputwrap {
    margin: 3rem auto;
    width: 60vw;
    display: flex;
    flex-wrap: wrap;
}

.input-container, .button-container {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
}

input {
    width: 90%;
    height: 2rem;
    margin: 10px 10px 0 0;
    padding: 4px;
    font-size: 1rem;
    border: 1px black solid;
    }

small {
    margin-top: 0.5rem;
}

/*
.badinput {
    border: 2px black solid;
}

.ok {
    border: 2px #34D399 solid;
}
*/
.tweet-button {
    padding: 0.5rem 0.9rem;
    background-color: #1da1f2;
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    align-self: flex-end;
}

.tweet-button:disabled {
    background-color: #D1D5DB;
}

</style>