<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import nativeToast from "native-toast";
  import { createClient } from "@supabase/supabase-js";
  import moment from "moment";

  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(
    "https://uibbkatwgyqootsrapta.supabase.co",
    supabaseKey
  );

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      Title: "",
      Body: "",
      Description: "",
    },
    validationSchema: yup.object().shape({
      Title: yup.string().required().min(5),
      Body: yup.string().required().min(20),
      Description: yup.string().required().min(10),
    }),

    onSubmit: (values) => {
      // Creates a Slug for Browser Navigation
      const Slug = values.Title.toLowerCase().replace(" ", "-");
      // Creates a Published Data in Line with Format Requirements of the Databae
      const Published = moment(Date.now()).format("YYYY-MM-DD h:mm:ss");
      // Hardcode the Author for now
      const Author = "Subliminal_Guy";
      // Creates a pseudo UUID because database was imported from MongoDB and id field has to be generated manually
      const createId = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      const _id =
        createId() + createId() + createId() + createId() + createId();

      async function insertBlogpost(
        _id,
        Author,
        Body,
        Description,
        Published,
        Slug,
        Title
      ) {
        const { data, error } = await supabase.from("Blogs").insert([
          {
            _id,
            Author,
            Body,
            Description,
            Published,
            Slug,
            Title,
          },
        ]);
      }

      insertBlogpost(
        _id,
        Author,
        values.Body,
        values.Description,
        Published,
        Slug,
        values.Title
      );

      // Throws out a Thank you Box!

      nativeToast({
        message: `Post wird generiert... \u{231B} `,
        position: "center",
        timeout: 3500,
        type: "success",
      });

      // Redirect

      const delay = 4000; // time in milliseconds

      setTimeout(function () {
        window.location = "/kapitel";
      }, delay);
    },
  });
</script>

<svelte:head>
  <title>Login: Adults in the Zoom</title>
</svelte:head>

<h1>Create New Post</h1>

<form class="inputwrap" on:submit={handleSubmit}>
  <div class="input-container">
    <input
      id="Title"
      name="Title"
      placeholder="Post Title"
      on:blur={handleChange}
      on:change={handleChange}
    />
    {#if $errors.Title}
      <small>Ein Titel sollte mindestens 5 Zeichen haben! &#x1F48C; </small>
    {/if}
  </div>
  <div class="input-container">
    <textarea
      id="Body"
      name="Body"
      placeholder="Dein Post"
      rows="15"
      cols="70"
      on:blur={handleChange}
      on:change={handleChange}
    />
    {#if $errors.Body}
      <small>Der Body sollte mindestens 20 Zeichen haben! &#x1F64F;</small>
    {/if}
  </div>
  <div class="input-container">
    <input
      id="Description"
      name="Description"
      placeholder="Kurzbeschreibung"
      on:blur={handleChange}
      on:change={handleChange}
    />
    {#if $errors.Description}
      <small
        >Bitte schreibe eine kurze Zusammenfassung des Inhalts! &#x1F64F;</small
      >
    {/if}
  </div>
  <div class="button-container">
    <button class="tweet-button">Post</button>
  </div>
</form>

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
