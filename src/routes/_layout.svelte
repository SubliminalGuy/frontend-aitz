<script>
  import Nav from "../components/Nav.svelte";
  import { modalClicked, isAuthenticated } from "../stores";
  import { userComments, supaBlogPosts } from "../stores";
  import { onMount, beforeUpdate } from "svelte";
  import { createClient } from "@supabase/supabase-js";

  export let segment;

  let modalFired;
  let isAuth;

  const supabaseKey = process.env.SUPABASE_KEY;

  const unsubscribe = modalClicked.subscribe((value) => {
    modalFired = value;
  });

  const supabase = createClient(
    "https://uibbkatwgyqootsrapta.supabase.co",
    supabaseKey
  );

  function turnOnAuth() {
    isAuthenticated.update((value) => true);
  }

  function switchModal() {
    setTimeout(function () {
      modalClicked.update((value) => !value);
    }, 1000);
  }

  function turnOffAuth() {
    isAuthenticated.update((value) => false);
  }

  const handleLogout = async () => {
    turnOffAuth();
    const { error } = await supabase.auth.signOut();
  };

  //Make a supabaserequest
  onMount(async function getComments() {
    let { data: comments, error } = await supabase.from("Comments").select("*");
    userComments.set(comments);
  });

  // Make a supabaserequest for blog-posts
  onMount(async function getBlogPosts() {
    let { data: posts, error } = await supabase.from("Blogs").select("*");
    supaBlogPosts.set(posts);
  });

  // Set store variable isAuthenticated to true when supabase token is in local storage
  beforeUpdate(() => {
    if (localStorage.getItem("supabase.auth.token") !== null) {
      //console.log("User Authenticated!");
      turnOnAuth();
    } else {
      turnOffAuth();
    }
  });

  // Loads the isAuthenticated state from store when component mounts
  onMount(() => {
    isAuthenticated.subscribe((value) => (isAuth = value));
  });
</script>

<Nav {segment} />
{#if !modalFired}
  <main>
    <slot />
  </main>
{:else}
  <div class="modal">
    <div class="b-link"><a on:click={switchModal} href="/">home</a></div>
    <div class="b-link"><a on:click={switchModal} href="/about">about</a></div>
    <div class="b-link">
      <a on:click={switchModal} href="/kapitel">kapitel</a>
    </div>
    <div class="b-link">
      <a on:click={switchModal} href="/newsletter">newsletter</a>
    </div>
    <div class="b-link">
      <a on:click={switchModal} href="/impressum">impressum</a>
    </div>
    <div class="b-link">
      <a on:click={switchModal} href="/datenschutz">datenschutz</a>
    </div>
    {#if isAuth}
      <div class="b-link">
        <a on:click={switchModal} href="/dashboard">dashboard</a>
      </div>
    {/if}
    {#if !isAuth}
      <div class="b-link">
        <a on:click={switchModal} href="/login">login</a>
      </div>
    {/if}
    {#if isAuth}
      <div class="b-link">
        <a on:click={switchModal} on:click={handleLogout} href="/">logout</a>
      </div>
    {/if}
  </div>
{/if}

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .modal {
    width: 100%;
    height: 100%;
    background-color: black;
    margin: 0;
  }

  .b-link {
    margin: 0;
    clear: both;
    width: 100%;
    margin-bottom: 2rem;
    display: inline-block;
    text-align: center;
  }

  .b-link:first-of-type {
    margin-top: 5rem;
  }

  a {
    text-decoration: none;
    color: antiquewhite;
    font-size: 1.3rem;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
