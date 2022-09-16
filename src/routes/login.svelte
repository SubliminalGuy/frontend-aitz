<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import nativeToast from "native-toast";
  import { createClient } from "@supabase/supabase-js";

  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(
    "https://uibbkatwgyqootsrapta.supabase.co",
    supabaseKey
  );

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      password: yup.string().required().min(5),
      email: yup.string().email().required(),
    }),

    onSubmit: async (values) => {
      const { user, session, error } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });

      // Throws out a Thank you Box!

      nativeToast({
        message: `Versuche User*in zu authentifizieren ... \u{231B} `,
        position: "center",
        timeout: 3500,
        type: "success",
      });

      // Redirect

      const delay = 2000; // time in milliseconds

      setTimeout(function () {
        window.location = "/dashboard";
      }, delay);
    },
  });
</script>

<svelte:head>
  <title>Login: Adults in the Zoom</title>
</svelte:head>

<h1>Admin Login</h1>

<form class="inputwrap" on:submit={handleSubmit}>
  <div class="input-container">
    <input
      id="email"
      name="email"
      placeholder="email"
      on:blur={handleChange}
      on:change={handleChange}
    />
    {#if $errors.email}
      <small>Ist das wirklich deine email-Adresse? &#x1F48C; </small>
    {/if}
  </div>
  <div class="input-container">
    <input
      id="password"
      name="password"
      placeholder="password"
      on:blur={handleChange}
      on:change={handleChange}
    />
    {#if $errors.password}
      <small>Ist das wirklich dein Password? &#x1F64F;</small>
    {/if}
  </div>
  <div class="button-container">
    <button class="tweet-button">Login</button>
  </div>
</form>

<!--
<div class="button-container">
    <button class="tweet-button" on:click={handleLogout}>SignOut</button>
</div>

-->
<style>
  .inputwrap {
    margin: 3rem auto;
    width: 60vw;
    display: flex;
    flex-wrap: wrap;
  }

  .input-container,
  .button-container {
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
    background-color: #d1d5db;
  }

  small {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    width: 100%;
  }
</style>
