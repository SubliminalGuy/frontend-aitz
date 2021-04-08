<script>
import emailjs from 'emailjs-com';
import { createForm } from 'svelte-forms-lib'
import * as yup from 'yup'
import nativeToast from 'native-toast'

const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
        name: "",
        email: ""
    },
    validationSchema: yup.object().shape({
        name: yup.string().required().min(3),
        email: yup
                .string()
                .email()
                .required()

    }),

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
                
        nativeToast({
            message: `Danke, ${values.name}! \u{1F388} \u{1F381}`,
            position: 'center',
            timeout: 3500,
            type: 'success'
        })

        // Redirect

        const delay = 4000; // time in milliseconds

        setTimeout(function(){
        window.location = "/";
        },delay);
        
    }
})


</script>


<svelte:head>
        <title>Newsletter: Adults in the Zoom</title>
</svelte:head>

<h1>Deine wöchentliche Erinnerung!</h1>


<p>Wenn du bei <strong>Adults in the Zoom</strong> am Ball bleiben willst, dann kannst du dich hier 
    für den wöchentlichen eMail-Reminder anmelden.</p>

<form class="inputwrap" on:submit={handleSubmit}>
    <div class="input-container">
        <input id="name" name="name" placeholder="Dein Name" on:blur={handleChange} on:change={handleChange} bind:value={form.name} />
        {#if $errors.name}
        <small>Verrat uns doch deinen Namen &#x1F64F;</small>
        {/if}
    </div> 
    <div class="input-container">
        <input id="email" name="email" placeholder="eMail" on:blur={handleChange}  on:change={handleChange} bind:value={form.email} />
        {#if $errors.email}
        <small>Ist das wirklich ein eMail-Adresse? &#x1F48C;</small>
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
    width: 60%;
    height: 2rem;
    margin: 10px 10px 0 0;
    padding: 4px;
    font-size: 1rem;
    border: 1px black solid;
    }

small {
    margin-top: 0.5rem;
    font-size: 0.9rem
}

@media screen and (max-width: 800px) {
    input {
    width: 100%;
    }

    .inputwrap {
    width: 80vw;
}

}

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