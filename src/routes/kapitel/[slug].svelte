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
        let david = 12
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

        h4 {
                font-size: 1.2rem;
                margin-top: 1.5rem;
                font-weight: 600;
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
        .social-stuff {
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                align-items: flex-end;
                margin-top: 1rem;
                margin-bottom: 1rem;
        }
        .zero-margin {
                margin: 0;
        }
        .tweet-button {
                padding: 0.5rem 0.9rem;
                background-color: #1da1f2;
                color: white;
                text-decoration: none;
                font-weight: 600;
        }


</style>
<svelte:head>
        {#each post as post}
        <title>{post.Title} </title>
        {/each}
        <script defer src="https://cdn.commento.io/js/commento.js"></script>
</svelte:head>

{#each post as post}

        <h2>{post.Title}</h2>
        <h3>{moment().to(post.Published)} by Subliminal_Guy</h3>

        <div class='content'>
        {@html post.Body} </div>


        <div class="social-stuff">
                <h4 class="zero-margin">Eure Kommentare</h4>
                
                <a href="https://twitter.com/intent/tweet?hashtags=adultsinthezoom,diem25&text={post.Description}&url=http://adults-in-the-zoom.de/kapitel/{post.Slug}"
                        target="_blank"
                        class="tweet-button">
                        tweet me softly</a>
        </div>
{/each}


<div id="commento"></div>

<p>⇺<a href="kapitel">zur kapitelübersicht</a></p>
