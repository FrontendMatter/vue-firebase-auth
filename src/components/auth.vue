<template>
	
	<!-- Multiple -->
	<div class="row" v-if="emailView && providers.length">
		<div class="col-md-6">
			<partial v-if="hasErrors" name="errors"></partial>
			<component :is="emailView" :signup="signup" keep-alive></component>
		</div>
		<div class="col-md-6 text-center">
			<partial name="login-providers"></partial>
		</div>
	</div>

	<!-- Single -->
	<template v-else>
		<template v-if="emailView">
			<partial v-if="hasErrors" name="errors"></partial>
			<component :is="emailView" :signup="signup" keep-alive></component>
		</template>
		<partial v-if="providers.length" name="login-providers"></partial>
	</template>
</template>

<script>
	import user from 'vue-firebase-auth/src/lib/user'
	import Login from './login'
	import Signup from './signup'
	import LoginProviders from './login-providers'

	export default {
		partials: {
			loginProviders: `
				<component 
					is="login-providers" 
					:heading="loginProvidersHeading | capitalize" 
					:providers="providers"
					keep-alive>
				</component>
			`,
			errors: `
				<div class="alert alert-danger">
					<ul>
						<li v-for="error in errors">{{ error }}</li>
					</ul>
				</div>
			`
		},
		data () {
			return {
				providers: [],
				scopes: {},
				userAuthenticated: false,
				auth: {},
				errors: {}
			}
		},
		props: {
			firebase: {
				type: String,
				required: true
			},
			facebook: {}, 
			google: {}, 
			github: {}, 
			twitter: {},
			signup: {
				type: Boolean,
				default: true
			},
			emailView: {
				type: String,
				default: 'login'
			},
			loginProvidersHeading: {
				default () {
					return this.emailView || 'Login' + ' with provider'
				}
			}
		},
		computed: {
			hasErrors () {
				const errors = this.errors
				let hasErrors = false

				Object.keys(errors).forEach((error) => {
					hasErrors = errors.hasOwnProperty(error)
				})

				return hasErrors
			}
		},
		methods: {
			user (value) {
				if (value) {
					this.$root.$user = value
				}
				return this.$root.$user
			},
			onAuth (authData) {
				if (authData) {
					this.auth = authData
					this.userAuthenticated = true
					this.user().getRef('users').child(authData.uid).set(authData)
				}
				else {
					this.auth = {}
					this.userAuthenticated = false
				}
			},
			onAuthError (error) {
				let errorObj = {}
				errorObj[error.code] = error.message
				this.errors = Object.assign({}, this.errors, errorObj)
				return true
			},
			authWithProvider (provider) {
				const scope = this.scopes[provider] || ''
				this.user().authWithProvider(provider, scope).catch(this.onAuthError)
			},
			onSignup () {
				this.emailView = 'login'
				return true
			}
		},
		compiled () {
			if (!this.firebase) {
				return
			}

			user.setRef(this.firebase)
			this.user(user)
			const providers = ['facebook', 'google', 'twitter', 'github']

			providers.forEach((provider) => {
				if (this[provider] !== undefined && this.provider !== false) {
					this.providers.push(provider)
					if (typeof this[provider] === 'string') {
						this.scopes[provider] = this[provider]
					}
				}
			})
		},
		ready () {
			this.user().ref.onAuth(this.onAuth)
		},
		destroyed () {
			this.user().ref.offAuth()
		},
		watch: {
			emailView () {
				this.errors = {}
			},
			userAuthenticated (isAuthenticated) {
				this.errors = {}
				if (isAuthenticated) {
					this.$root.$broadcast('auth.login', this.auth)
				} 
				else {
					this.$root.$broadcast('auth.logout')
				}
			}
		},
		events: {
			'auth.error': 'onAuthError',
			'auth.signup': 'onSignup'
		},
		components: {
			Login,
			Signup,
			LoginProviders
		}
	}
</script>

<style lang="sass">
	.login-with-provider {
		padding: 20px;
	}
</style>