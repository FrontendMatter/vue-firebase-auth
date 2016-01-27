<template>
	<div class="login-with-provider">
		<h4 class="page-header" v-if="heading">{{ heading }}</h4>
		<button 
			class="btn btn-default" 
			v-for="provider in providers"
			@click.prevent="authWithProvider(provider)">
			<i class="fa fa-fw fa-{{ provider }}"></i> 
			{{ provider | capitalize }}
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			providers: {},
			heading: {
				type: String
			}
		},
		methods: {
			authWithProvider (provider) {
				this.$parent.authWithProvider(provider)
			}
		}
	}
</script>