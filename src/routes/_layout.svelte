<script>
	import Nav from '../components/Nav.svelte';
	import { modalClicked } from '../stores'

	export let segment;

	let modalFired;
	
	const unsubscribe = modalClicked.subscribe(value => {
		modalFired = value;
	})

	function switchModal() {
		setTimeout(function(){
			modalClicked.update(value => !value)
        },1000);
        
    }



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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.link-list {
		margin: 0;
		list-style: none;
	}

	li {
		margin: 0;
		clear: both;
		width: 100%;
		margin-bottom: 2rem;
		text-align: center;
	}

	li:first-of-type {
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
		<ul class="link-list">
			<li><a on:click={switchModal} href="/">home</a></li>
			<li><a on:click={switchModal} href="/about">about</a></li>
			<li><a on:click={switchModal} href="/kapitel">kapitel</a></li>
			<li><a on:click={switchModal} href="/newsletter">newsletter</a></li>
			<li><a on:click={switchModal} href="/impressum">impressum</a></li>
			<li><a on:click={switchModal} href="/datenschutz">datenschutz</a></li>
		</ul>
	</div>
	{/if}
