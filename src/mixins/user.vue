<script>
	export default {
		data () {
			return {
				email: null,
				password: null,
				didSubmit: false
			}
		},
		computed: {
			auth () {
				return this.$parent
			},
			user () {
				return this.$root.$user
			}
		},
		methods: {
			authEmailView (name) {
				this.auth.emailView = name
			},
			submit () {
				this.auth.errors = {}
				this.didSubmit = true
			},
			login () {
				this.submit()
				if (this.$validation.valid) {
					this.user.login({
						email: this.email,
						password: this.password
					})
					.then((authData) => {
						this.auth.errors = {}
						this.$dispatch('auth.login', authData)
					})
					.catch((error) => {
						this.$dispatch('auth.error', error)
					})
				}
			},
			signup () {
				this.submit()
				if (this.$validation.valid) {
					this.user.signup({
						email: this.email,
						password: this.password
					})
					.then(() => {
						this.auth.errors = {}
						this.$dispatch('auth.signup')
					})
					.catch((error) => {
						this.$dispatch('auth.error', error)
					})
				}
			}
		}
	}
</script>