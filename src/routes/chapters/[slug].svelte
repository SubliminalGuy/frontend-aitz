<script context="module">
        import ApolloClient, { gql } from 'apollo-boost';  
        import moment from 'moment';

        const blogQuery = gql`
        query Blogs($Slug: String!) {
                blogs: blogs(where: { Slug: $Slug }) {
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
                        query: blogQuery,
                        variables: {"Slug" : params.slug} 
                })
                return {post: results.data.blogs}
        }
</script>

<script>
        export let post;
</script>

<style>

        .content {
                text-align: justify;
                line-height: 1.8rem;
                font-size: 1.2rem;
        }

        h2 {
                font-size: 2rem;
        }

        h3 {
                font-size: 1rem;
                margin-bottom: 2rem;
        }

        .content :global(h2) {
                font-size: 1.7em;
                font-weight: 500;
        }
        .content :global(pre) {
                background-color: #f9f9f9;
                box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
                padding: 0.5em;
                border-radius: 2px;
                overflow-x: auto;
        }
        .content :global(pre) :global(code) {
                background-color: transparent;
                padding: 0;
        }
        .content :global(ul) {
                line-height: 1.5;
        }
        .content :global(li) {
                margin: 0 0 0.5em 0;
        }


</style>
<svelte:head>
        <title>Adults in the Zoom</title>
</svelte:head>

{#each post as post}

        <h2>{post.Title}</h2>
        <h3>{moment().to(post.Published)} by Subliminal_Guy</h3>

        <div class='content'>
        {@html post.Body} </div>

{/each}

<p>⇺<a href="chapters"> back to chapters</a></p>
