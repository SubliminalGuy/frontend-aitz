<script context="module">
    import ApolloClient, { gql } from 'apollo-boost';  
    import moment from 'moment';

    const blogQuery = gql`
    query Blogs {  
            blogs {
                    id
                    Title
                    Description
                    Published
                    Body
                    Slug
            }
    }
    `;
    export async function preload({params, query}) {
            const client = new ApolloClient({ 
                    uri: 'http://bookend-aitz.herokuapp.com/graphql',
                    fetch: this.fetch
                     });
            const results = await client.query({
                    query: blogQuery
            })
            return {posts: results.data.blogs}
    }
</script>

<script>
    export let posts;
</script>

<style>
    ul, p {
            margin: 0 0 1em 0;
            line-height: 1.5;
    }
    .main-title {
            font-size: 25px;
    }
</style>

<svelte:head>
    <title>Kapitel: Adults in the Zoom</title>
</svelte:head>

<h1>Kapitelübersicht</h1>

<ul>
{#each posts as post}
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
