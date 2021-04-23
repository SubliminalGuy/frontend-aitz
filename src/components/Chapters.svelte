<script>
    import moment from 'moment';
    export let subchapters
</script>

<ul>
    {#each subchapters as post}
    <li>
            <a class="main-title" rel='prefetch' href='kapitel/{post.Slug}'>
            {post.Title}
            </a>
    </li>
    <p> 
    {moment().to(post.Published, "DD-MM-YYYY")} ago by Subliminal_Guy 
    </p>
    {/each}
</ul>

<style>
    .main-title {
            font-size: 25px;
        }

    ul, p {
            margin: 0 0 1em 0;
            line-height: 1.5;
    }
</style>