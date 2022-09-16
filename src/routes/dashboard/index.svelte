<script>
  import { supaBlogPosts } from "../../stores";
  import EditChapters from "../../components/EditChapters.svelte";
  export let supa_blog_posts;

  supaBlogPosts.subscribe((value) => {
    supa_blog_posts = value;
  });
</script>

<svelte:head>
  <title>Login: Adults in the Zoom</title>
</svelte:head>

<h1>Dashboard</h1>
<div class="link-container">
  <a class="chapter-mark" rel="prefetch" href="create_post">Create New Post</a>
  <p class="chapter-mark">Update Existing Post:</p>
  <EditChapters subchapters={supa_blog_posts} />
</div>

<style>
  .chapter-mark {
    color: rgb(240, 25, 45);
    margin-bottom: 1rem;
    margin-left: 2rem;
  }
  a {
    font-size: 1.4rem;
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
