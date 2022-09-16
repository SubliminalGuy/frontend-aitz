<script context="module">
  export async function preload({ params, query }) {
    return {
      post_slug: params.slug,
    };
  }
</script>

<script>
  import { supaBlogPosts } from "../../stores";
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import nativeToast from "native-toast";
  import { createClient } from "@supabase/supabase-js";
  import { beforeUpdate } from "svelte";
  import moment from "moment";

  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(
    "https://uibbkatwgyqootsrapta.supabase.co",
    supabaseKey
  );

  export let post_slug;

  let edit_post;
  let isDataComplete = false;

  const { errors, handleChange, handleSubmit } = createForm({
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
      console.log("Bla");
      const Slug = edit_post.Slug;
      const Published = edit_post.Published;
      const Author = edit_post.Author;

      const _id = edit_post._id;

      const updatedAt = moment(Date.now()).format("YYYY-MM-DD h:mm:ss");

      async function upsertBlogpost(
        _id,
        Author,
        Body,
        Description,
        Published,
        Slug,
        Title,
        updatedAt
      ) {
        const { data, error } = await supabase.from("Blogs").upsert([
          {
            _id,
            Author,
            Body,
            Description,
            Published,
            Slug,
            Title,
            updatedAt,
          },
        ]);
      }

      upsertBlogpost(
        _id,
        Author,
        values.Body,
        values.Description,
        Published,
        Slug,
        values.Title,
        updatedAt
      );

      // Throws out a Thank you Box!

      nativeToast({
        message: `Post wird upgedatet... \u{231B} `,
        position: "center",
        timeout: 3500,
        type: "success",
      });

      // Redirect

      const delay = 4000; // time in milliseconds

      setTimeout(function () {
        window.location = `/kapitel/${Slug}`;
      }, delay);
    },
  });

  beforeUpdate(async () => {
    let { data: posts, error } = await supabase.from("Blogs").select("*");
    supaBlogPosts.set(posts);
    supaBlogPosts.subscribe((value) => {
      edit_post = value.filter((el) => el.Slug == post_slug)[0];
      isDataComplete = true;
    });
  });
</script>

<svelte:head>
  <title>Login: Adults in the Zoom</title>
</svelte:head>

<h1>Update Post:</h1>
{#if isDataComplete}
  <form class="inputwrap" on:submit={handleSubmit}>
    <div class="input-container">
      <input
        id="Title"
        name="Title"
        value={edit_post.Title}
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
        value={edit_post.Body}
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
        value={edit_post.Description}
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
{/if}

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
    width: 70%;
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
