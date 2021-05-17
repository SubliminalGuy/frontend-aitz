<script>
	import Nav from '../components/Nav.svelte';
	import { modalClicked } from '../stores'
	import { userComments } from '../stores'
	import { onMount } from 'svelte'
	import { createClient } from '@supabase/supabase-js'
	export let segment;

	let modalFired;
	
	
	const unsubscribe = modalClicked.subscribe(value => {
		modalFired = value;
	})

	const supabase = createClient(
			"https://uibbkatwgyqootsrapta.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTE4NjcxNSwiZXhwIjoxOTM2NzYyNzE1fQ.oL8U2Ak9a_51iJgjHk-9ZAXLsOJHoBnnMSdq0KxiDPI"
        );

	function switchModal() {
		setTimeout(function(){
			modalClicked.update(value => !value)
        },1000);
        
    }

	// Make a supabaserequest
	onMount( async function getComments() {
                let { data: comments, error } = await supabase
                        .from('Comments')
                        .select('*')
                        userComments.set(comments)
                } )
	

</script>

<style>
	
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.modal {
		width: 100%;
		height: 100%;
		background-color: black;
		margin: 0;
	}


	.b-link {
		margin: 0;
		clear: both;
		width: 100%;
		margin-bottom: 2rem;
		display: inline-block;
		text-align: center;
	}

	.b-link:first-of-type {
		margin-top: 5rem;
	}

	a {
		text-decoration: none;
		color: antiquewhite;
		font-size: 1.3rem;
	}

	a:hover {
		text-decoration: underline;
	}
</style>

<Nav {segment}/>
{#if !modalFired}
	<main>
		<slot></slot>
	</main>
	{:else}
	<div class="modal">
		<div class="b-link"><a on:click={switchModal} href="/">home</a></div>
		<div class="b-link"><a on:click={switchModal} href="/about">about</a></div>
		<div class="b-link"><a on:click={switchModal} href="/kapitel">kapitel</a></div>
		<div class="b-link"><a on:click={switchModal} href="/newsletter">newsletter</a></div>
		<div class="b-link"><a on:click={switchModal} href="/impressum">impressum</a></div>
		<div class="b-link" ><a on:click={switchModal} href="/datenschutz">datenschutz</a></div>
	</div>
	{/if}
