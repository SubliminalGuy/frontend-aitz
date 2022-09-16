<script>
  export let subchapters;
</script>

<ul>
  {#each subchapters as post}
    <li>
      <p class="main-title" rel="prefetch">
        {post.Title}
      </p>
    </li>
    <a rel="prefetch" href="dashboard/{post.Slug}">Edit this post</a>
  {/each}
</ul>

<style>
  .main-title {
    font-size: 1.6em;
    margin: 0;
  }

  a {
    margin: 0;
  }

  ul,
  p {
    line-height: 1.5;
  }
  @media (max-width: 600px) {
    .main-title {
      font-size: 1.4em;
    }
  }
</style>
