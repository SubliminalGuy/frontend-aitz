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
<a class="link-hidden" rel="prefetch" href="kapitel/2.7.-wahlkampfmodus">13</a>

<h2 class="chapter-mark">3. Im Bundeskollektiv</h2>
<Chapters subchapters={threePosts} />
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/3.1.-ein-green-new-deal-fuer-europa">14</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/3.2.-versammlung-in-prag"
  >15</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/3.3.-persona-non-grata"
  >16</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/3.4.-bundeskollektiv-versus-varoufakis">17</a
>

<h2 class="chapter-mark">4. DiEM25 but better?</h2>
<Chapters subchapters={fourPosts} />
<a class="link-hidden" rel="prefetch" href="kapitel/4.1.-what-the-fuck-happened"
  >18</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/4.2.-die-bewegung-stehlen"
  >19</a
>

<h2 class="chapter-mark">5. Die Lokalgruppe</h2>
<Chapters subchapters={fivePosts} />
<a class="link-hidden" rel="prefetch" href="kapitel/5.1.-onboarding-mit-charme"
  >20</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/5.2.-das-1-zu-1-gespraech"
  >21</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/5.3.-das-aktivistinnen-treffen-teil-1">22</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/5.4.-das-aktivistinnen-treffen-teil-2">23</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/5.5.-mit-system-zum-konsens"
  >24</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/5.6.-die-sicherheit-der-gruppe">25</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/5.7.-digitale-selbstverteidigung">26</a
>

<h2 class="chapter-mark">6. Politische Ökosysteme</h2>
<Chapters subchapters={sixPosts} />
<a class="link-hidden" rel="prefetch" href="kapitel/6.1-politik-als-plattform"
  >27</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/6.2.-extinction-rebellion"
  >28</a
>
<a
  class="link-hidden"
  rel="prefetch"
  href="kapitel/6.3.-vertikal-oder-horizontal">29</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/6.4.-eine-liebeserklaerung"
  >30</a
>
<a class="link-hidden" rel="prefetch" href="kapitel/6.5.-vital-cells">31</a>

<style>
  .chapter-mark {
    color: rgb(240, 25, 45);
    margin-bottom: 1rem;
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
