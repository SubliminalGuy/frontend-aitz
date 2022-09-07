<script context="module">
  import Chapters from "../../components/Chapters.svelte";
  import { supaBlogPosts } from "../../stores";
</script>

<script>
  //import { isTypeSystemDefinitionNode } from 'graphql';
  //export let posts;
  export let supa_blog_posts;

  supaBlogPosts.subscribe((value) => {
    supa_blog_posts = value;
  });

  $: zeroPosts = supa_blog_posts.slice(0, 2);
  $: onePosts = supa_blog_posts.slice(2, 6);
  $: twoPosts = supa_blog_posts.slice(6, 13);
  $: threePosts = supa_blog_posts.slice(13, 17);
  $: fourPosts = supa_blog_posts.slice(17, 19);
  $: fivePosts = supa_blog_posts.slice(19, 26);
  $: sixPosts = supa_blog_posts.slice(26);
</script>

<svelte:head>
  <title>Kapitel: Adults in the Zoom</title>
</svelte:head>

<h1>Kapitelübersicht</h1>

<h2 class="chapter-mark">0. Prolog</h2>
<Chapters subchapters={zeroPosts} />
<a class="link-hidden" rel="prefetch" href="kapitel/0.1-inauguration">1</a>
<a class="link-hidden" rel="prefetch" href="kapitel/0.2-d-wie-in-demokratie"
  >2</a
>

<h2 class="chapter-mark">1. DiEM25 für Anfänger*innen</h2>
<Chapters subchapters={onePosts} />
<a class="link-hidden" rel="prefetch" href="kapitel/1.1-erstkontakt">3</a>
<a class="link-hidden" rel="prefetch" href="kapitel/1.2.-dsc-berlin">4</a>
<a class="link-hidden" rel="prefetch" href="kapitel/1.3.-european-new-deal">5</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/1.4.-happy-birthday">6</a>

<h2 class="chapter-mark">2. Europäischer Frühling</h2>
<Chapters subchapters={twoPosts} />
<a class="link-hidden" rel="prefetch" href="kapitel/2.1.-demokratie-in-europa"
  >7</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/2.2.-im-vorstand">8</a>
<a class="link-hidden" rel="prefetch" href="kapitel/2.3.-demokratie-in-bewegung"
  >9</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/2.4.-mit-varoufakis-in-der-bar">10</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/2.5.-konstruktionsfehler"
  >11</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/2.6.-der-spitzenkandidat"
  >12</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/1.4.-happy-birthday">13</a>

<h2 class="chapter-mark">3. Im Bundeskollektiv</h2>
<Chapters subchapters={threePosts} />

<h2 class="chapter-mark">4. DiEM25 but better?</h2>
<Chapters subchapters={fourPosts} />

<h2 class="chapter-mark">5. Die Lokalgruppe</h2>
<Chapters subchapters={fivePosts} />

<h2 class="chapter-mark">6. Politische Ökosysteme</h2>
<Chapters subchapters={sixPosts} />

<style>
  .chapter-mark {
    color: rgb(240, 25, 45);
    margin: 1em;
  }

  .link-hidden {
    visibility: hidden;
    margin: 0;
  }

  h2 {
    font-size: 1.8rem;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 1.6em;
    }
  }
</style>
