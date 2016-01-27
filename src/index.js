// Load components
import Auth from './components/auth'
import Login from './components/login'
import Signup from './components/signup'

let VueFirebaseAuth = {
	Auth,
	Login,
	Signup
}

// Dependencies
import VueValidator from 'vue-validator'

// Setup
VueFirebaseAuth.install = function (Vue) {
	Vue.use(VueValidator)
}

// auto install in browser
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueFirebaseAuth)
}

// ES6
export default VueFirebaseAuth

// CommonJS
module.exports = exports.default