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


        const chapterQuery = gql`
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
                        uri: 'https://bookend-aitz.herokuapp.com/graphql',
                        fetch: this.fetch
                        });
                const results = await client.query({
                        query: chapterQuery,
                        variables: {"Slug" : params.slug} 
                })
                const resultsBlog = await client.query({
                        query: blogQuery,
                })
                return {post: results.data.blogs, posts: resultsBlog.data.blogs, slug: params.slug }
        }

        
        
</script>

<script>
        import { userComments } from '../../stores'
        import { createClient } from '@supabase/supabase-js'
        import nativeToast from 'native-toast'
        import emailjs from 'emailjs-com';
        //import { isTypeSystemDefinitionNode } from 'graphql';


        export let post;
        let user_comments;
        let username = "";
        let userText = ""


        export let posts;
        export let slug;
        $: slugIndex = posts.findIndex(item => item.Slug == slug)
        $: previousSlug = posts[slugIndex-1] ? posts[slugIndex-1].Slug : "nada"
        $: nextSlug = posts[slugIndex+1] ? posts[slugIndex+1].Slug : "nada"
        //let site_comments = user_comments 

        function sendText() {
                
                insertComment(post[0].Slug, username, userText)
                //getComments()

                // emailjs Integration //

                let templateParams = {
                        name: username,
                        message: userText,
                        slug: post[0].Slug
                };

                emailjs.init('user_XLGdRxnG7S4GCsE5MnYZN');

                emailjs.send('posteo.de','template_186mnbe', templateParams)
                        .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text)
                        }, function(err) {
                        console.log('FAILED...', err);
                        });


                nativeToast({
                        message: `Danke, ${username}! \u{1F388} \u{1F381}`,
                        position: 'center',
                        timeout: 3500,
                        type: 'success'
                
                })

                // Redirect
                const delay = 4000; // time in milliseconds

                setTimeout(function(){
                window.location = `/kapitel/${post[0].Slug}`;
                },delay);
        }

        const supabase = createClient(
			"https://uibbkatwgyqootsrapta.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTE4NjcxNSwiZXhwIjoxOTM2NzYyNzE1fQ.oL8U2Ak9a_51iJgjHk-9ZAXLsOJHoBnnMSdq0KxiDPI"
        );
        

        const unsubscribe = userComments.subscribe(value => {
                        user_comments = value.filter(el => el.url == post[0].Slug);
                });
        
        

        async function insertComment(url, user_name, markdown) {
                const { data, error } = await supabase
                        .from('Comments')
                        .insert([
                        { 
                        url, 
                        user_name,
                        markdown}
                        ])
        }
/*
        async function getComments() {
                let { data: comments, error } = await supabase
                        .from('Comments')
                        .select('*')
                        userComments.set(comments)
        } 
*/
</script>


<svelte:head>
        {#each post as post}
        <title>{post.Title} </title>
        {/each}
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


<div class="comment-section">
        {#each user_comments as comment}
        <div class="commenter_field">
                <img src={`https://avatars.dicebear.com/api/human/${comment.user_name}.svg`} alt={comment.user_name} />
                <h4>{comment.user_name}</h4>
                <h4>{moment().to(comment.creationDate)}</h4>
        </div>
        <p class="markdown">{comment.markdown}</p>
        
{/each}


        <textarea name="comment" bind:value={userText} placeholder="Dein Kommentar ..."></textarea> 
        <form on:submit|preventDefault={sendText} >
                <input type="text" id="usrname" bind:value={username} placeholder="Dein Name"  >
                <button class="tweet-button" type="submit">go go commento</button>
        </form>

</div>
<div class="navi">
{#if previousSlug != "nada"}
        <p class="redish left">←<a rel="prefetch" href='kapitel/{previousSlug}'>Vorheriges Kapitel</a></p> 
{/if}
{#if nextSlug != "nada"}
        <p class="redish right"><a rel='prefetch' href='kapitel/{nextSlug}'>Nächstes Kapitel</a> →</p> 
{/if}
</div>
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
                margin-right: 1rem;
        }

        .commenter_field {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-top: 10px;
                
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
                font-size: 1.4rem
        }
        .tweet-button {
                padding: 0.5rem 0.9rem;
                background-color: #1da1f2;
                color: white;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
        }

        button {
                border: none;
                margin-left: 15px;
        }

        img {
                width: 50px;
                height: 50px;
                border-radius: 50px; 
                margin-right: 20px
        }


        .markdown {
                font-size: 1.1rem;
                text-align: justify;
                margin-left: 2rem;
                margin-right: 2rem;
        }

        textarea {
                width: 100%;
                height: 20vh;
                font-size: 1.1rem;
                text-align: justify;
                padding: 10px;
        }

        form {
                width: 100%;
                margin-top: 10px;
        }

        #usrname {
                height: 5vh;
                width: 40%;
                font-size: 1.1rem;
                padding: 5px;
                padding-left: 15px;
        }

        .navi {
	display: flex;
	flex-wrap: wrap;
        justify-content: space-between;
        }

        

</style>