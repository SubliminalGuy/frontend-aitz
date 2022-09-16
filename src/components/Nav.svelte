<script>
  import { modalClicked, isAuthenticated } from "../stores";
  import { createClient } from "@supabase/supabase-js";
  import { onMount } from "svelte";

  export let segment;

  let isAuth;

  function switchModal() {
    modalClicked.update((value) => !value);
  }

  function turnOffModal() {
    setTimeout(function () {
      modalClicked.update((value) => false);
    }, 600);
  }

  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(
    "https://uibbkatwgyqootsrapta.supabase.co",
    supabaseKey
  );

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  // Loads the isAuthenticated State when component mounts
  onMount(() => {
    isAuthenticated.subscribe((value) => (isAuth = value));
  });
</script>

<nav>
  <ul class="large-screen">
    <li>
      <a
        on:click={turnOffModal}
        aria-current={segment === undefined ? "page" : undefined}
        href="/">home</a
      >
    </li>
    <li>
      <a
        on:click={turnOffModal}
        aria-current={segment === "about" ? "page" : undefined}
        href="/about">about</a
      >
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        on:click={turnOffModal}
        rel="prefetch"
        aria-current={segment === "kapitel" ? "page" : undefined}
        href="/kapitel">kapitel</a
      >
    </li>
    <li>
      <a
        on:click={turnOffModal}
        aria-current={segment === "newsletter" ? "page" : undefined}
        href="/newsletter">newsletter</a
      >
    </li>
    <li>
      <a
        on:click={turnOffModal}
        aria-current={segment === "impressum" ? "page" : undefined}
        href="/impressum">impressum</a
      >
    </li>
    <li>
      <a
        on:click={turnOffModal}
        aria-current={segment === "datenschutz" ? "page" : undefined}
        href="/datenschutz">datenschutz</a
      >
    </li>
    {#if !isAuth}
      <li>
        <a
          on:click={turnOffModal}
          aria-current={segment === "login" ? "page" : undefined}
          href="/login">login</a
        >
      </li>
    {/if}
    {#if isAuth}
      <li>
        <a
          on:click={turnOffModal}
          on:click={handleLogout}
          aria-current={segment === "logout" ? "page" : undefined}
          href="/">logout</a
        >
      </li>
    {/if}
  </ul>
  <ul class="small-screen">
    <svg
      on:click={switchModal}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h8m-8 6h16"
      /></svg
    >
  </ul>
</nav>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .large-screen {
    display: block;
  }

  .small-screen {
    display: none;
  }

  svg {
    width: 2rem;
    padding: 1em 0.5em;
  }

  @media (max-width: 600px) {
    .large-screen {
      display: none;
    }

    .small-screen {
      display: block;
    }
  }
</style>
