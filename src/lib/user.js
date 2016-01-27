import Store from 'firebase-store'

class User extends Store {

	constructor () {
		super()
	}

	/**
	 * Authenticate with password.
	 * @param  {Object} user 	A user object containing 'email' and 'password' keys.
	 * @return {Promise}      	A promise which fulfils a Firebase authData object.
	 */
	login (user) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			this.ref.authWithPassword(user, (error, authData) => {
				if (error) {
					this.emit('serviceError', error)
					return reject(error)
				}
				this.emit('serviceComplete')
				return resolve(authData)
			})
		})
	}

	/**
	 * End current authentication session
	 */
	logout () {
		this.ref.unauth()
	}

	/**
	 * Signup with password.
	 * @param  {Object} user 	A user object containing 'email' and 'password' keys.
	 * @return {Promise}      	A promise.
	 */
	signup (user) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			this.ref.createUser(user, (error) => {
				if (error) {
					this.emit('serviceError', error)
					return reject(error)
				}
				this.emit('serviceComplete')
				return resolve()
			})
		})
	}

	/**
	 * Signup with password and then authenticate with password
	 * @param  {Object} user 	A user object containing 'email' and 'password' keys.
	 * @return {Promise}      	A promise which fulfils a Firebase authData object.
	 */
	signupAndLogin (user) {
		return this.signup(user).then(() => {
			return this.login(user)
		})
	}

	/**
	 * Get current authentication state
	 * @return {Object|null}
	 */
	getAuth () {
		return this.ref.getAuth()
	}

	/**
	 * Authenticate with 3rd party provider using a popup-based OAuth flow.
	 * @param  {String} provider 	A valid Firebase authentication provider.
	 * @param  {String} scope 		A valid provider scope. See https://www.firebase.com/docs/web/guide/user-auth.html#section-providers
	 * @return {Promise}      		A promise which fulfils a Firebase authData object.
	 */
	authWithProvider (provider, scope) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			const options = { scope }
			this.ref.authWithOAuthPopup(provider, (error, authData) => {
				if (error) {
					if (error.code === 'TRANSPORT_UNAVAILABLE') {
						return this.authWithProviderRedirect(provider, scope)
					}
					this.emit('serviceError', error)
					return reject(error)
				}
				this.emit('serviceComplete')
				return resolve(authData)
			}, options)
		})
	}

	/**
	 * Authenticate with 3rd party provider using a redirect-based OAuth flow.
	 * @param  {String} provider 	A valid Firebase authentication provider.
	 * @param  {String} scope 		A valid provider scope. See https://www.firebase.com/docs/web/guide/user-auth.html#section-providers
	 * @return {Promise}      		A promise used to handle errors only (see notes).
	 */
	authWithProviderRedirect (provider, scope) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			const options = { scope }
			this.ref.authWithOAuthRedirect(provider, (error) => {
				if (error) {
					this.emit('serviceError', error)
					return reject(error)
				}
				// the promise will never get resolved
				// as the page redirects on success
			}, options)
		})
	}

}

export default new User()