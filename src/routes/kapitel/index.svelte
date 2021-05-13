<script context="module">
        import ApolloClient, { gql } from 'apollo-boost';  
        import Chapters from '../../components/Chapters.svelte';

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
                        uri: 'https://bookend-aitz.herokuapp.com/graphql',
                        fetch: this.fetch
                        });
                const results = await client.query({
                        query: blogQuery
                })
                return {posts: results.data.blogs}
        }

        
</script>

<script>
        
//import { isTypeSystemDefinitionNode } from 'graphql';

        export let posts;
        $: zeroPosts = posts.slice(0,2)
        $: onePosts = posts.slice(2,6)
        $: twoPosts = posts.slice(6)
</script>



<svelte:head>
        <title>Kapitel: Adults in the Zoom</title>
</svelte:head>

<h1>Kapitelübersicht</h1>

<h2 class="chapter-mark">0. Prolog</h2>
        <Chapters subchapters={zeroPosts}/>

<h2 class="chapter-mark">1. DiEM25 für Anfänger*innen</h2>
        <Chapters subchapters={onePosts}/>

<h2 class="chapter-mark">2. Europäischer Frühling</h2>
        <Chapters subchapters={twoPosts}/>

<h2 class="next">Das nächste Kapitel wird am 20. Mai 2021 veröffentlicht.</h2>



<style>      
        .next {
                margin-top: 2rem;
                font-size: 1.6rem
        }

        .chapter-mark {
                color: rgb(240,25,45);
                margin: 1em
        }

        h2 {
                font-size: 1.8rem;
        }

        @media (max-width: 600px) {
		h2 {
		        font-size: 1.6em;
		}
                .next {
                        font-size: 1.2rem  
                }
	}
</style>