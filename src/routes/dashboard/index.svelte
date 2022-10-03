<script>
  import { supaBlogPosts } from "../../stores";
  import EditChapters from "../../components/EditChapters.svelte";
  import { isAuthenticated } from "../../stores";
  import { onMount } from "svelte";
  export let supa_blog_posts;
  let isAuth;

  supaBlogPosts.subscribe((value) => {
    supa_blog_posts = value;
  });
  onMount(() => {
    isAuthenticated.subscribe((value) => (isAuth = value));
  });
</script>

<svelte:head>
  <title>Login: Adults in the Zoom</title>
</svelte:head>
{#if isAuth}
  <h1>Dashboard</h1>
  <div class="link-container">
    <a class="chapter-mark" rel="prefetch" href="create_post">Create New Post</a
    >
    <p class="chapter-mark">Update Existing Post:</p>
    <EditChapters subchapters={supa_blog_posts} />
  </div>
{/if}
{#if !isAuth}
  <h1 class="message">
    You must be <a rel="prefetch" href="login">logged in</a> to see this side!
  </h1>
{/if}

<style>
  .chapter-mark {
    color: rgb(240, 25, 45);
    margin-bottom: 1rem;
    margin-left: 2rem;
  }
  a {
    font-size: 1.4rem;
  }
  .message {
    font-size: 1.6rem;
    text-align: center;
  }
  p {
    font-size: 1.4rem;
  }
  .link-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }
</style>
