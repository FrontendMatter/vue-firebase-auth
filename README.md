# vue-firebase-auth

Vue.js Authentication with Firebase.

#### Includes

- Authentication via email address and password (Login / Signup)
- Authentication via 3rd party providers (Google, Facebook, Twitter, Github)

#### Demos

> Coming soon!

## Install

```bash
npm install vue-firebase-auth
```

--

## Basic usage

> vue-firebase-auth exports a few components (Auth, Login and Signup), but unless we want to completely change the UI, we'll only interact with the Auth component.

### Template

```html
<auth firebase="https://<FIREBASE APP>.firebaseio.com"></auth>
```

> To disable only the signup view:

```html
<auth firebase="..." :signup="false"></auth>
```

> To change the default email view to signup:

```html
<auth firebase="..." email-view="signup"></auth>
```

> To disable authentication with email and password (Login & Signup):

```html
<auth firebase="..." :email-view="false"></auth>
```

> Enable authentication with 3rd party providers:

```html
<auth 
	firebase="..." 
	google 
	facebook 
	twitter
	github>
</auth>
```

### JavaScript (ES6)

#### Dependencies

```js
// load Vue library
import Vue from 'vue'

// load vue-firebase-auth
import VueFirebaseAuth from 'vue-firebase-auth'

// Setup dependencies
Vue.use(VueFirebaseAuth)
```

#### Using Auth

```js
// load styling
import 'vue-firebase-auth/dist/vue-firebase-auth.css'

// load Auth component
import { Auth } from 'vue-firebase-auth'

// create Vue root instance
new Vue({
	el: 'body',
	replace: false,
	methods: {
		onLogin (authData) {
			// user is authenticated
		}
	},
	events: {
		'auth.login': 'onLogin'
	},
	components: {
		Auth
	}
})
```

--

## Build

> You can easily build vue-firebase-auth yourself.

### Prerequisites

Our build tool of choice is Webpack. You should have webpack installed globally:

	npm install -g webpack

And the build dependencies:

	npm install
	
### Build

> Any of the following will create the files dist/vue-firebase-auth.js and dist/vue-firebase-auth.css.

#### Production build

Includes minification and several optimizations:

	npm run build

#### Development build

A faster build suited for development, with no optimizations and without minification:

	npm run build-dev
	
### Watch

Start an initial development build and then FAST continuous incremental builds:

	npm run dev
	
## Documentation

> **Work in progress!**