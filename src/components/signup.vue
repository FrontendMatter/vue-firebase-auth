<template>
	<validator name="validation">
		<form @submit.prevent="signup">
			<div class="page-header">
				<h2>Signup</h2>
				<h4>Create an account using your email address and a password.</h4>
			</div>
			<div class="form-group" :class="{ 'has-error': hasValidationError('email') }">
				<label for="email">Email address</label>
				<input type="email" 
					class="form-control" 
					id="email" 
					placeholder="E-mail address" 
					v-model="email"
					v-validate:email="{ required: { rule: true, message: 'The email address is required.' } }" />
				<p class="help-block" v-for="msg in validationMessages('email')">{{ msg }}</p>
			</div>
			<div class="form-group" :class="{ 'has-error': hasValidationError('password') }">
				<label for="password">Password</label>
				<input 
					type="password" 
					class="form-control" 
					id="password" 
					placeholder="Password" 
					v-model="password"
					v-validate:password="{ required: { rule: true, message: 'The password is required.' } }" />
					<p class="help-block" v-for="msg in validationMessages('password')">{{ msg }}</p>
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary">Signup</button>
				<button type="button" class="btn btn-default" @click.stop="authEmailView('login')">Login</button>
			</div>
		</form>
	</validator>
</template>

<script>
	import User from 'vue-firebase-auth/src/mixins/user'
	import VueValidatorUtil from 'vue-validator-util'

	export default {
		mixins: [
			VueValidatorUtil,
			User
		]
	}
</script>