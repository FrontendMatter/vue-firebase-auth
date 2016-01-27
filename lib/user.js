'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _firebaseStore = require('firebase-store');

var _firebaseStore2 = _interopRequireDefault(_firebaseStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Store) {
	_inherits(User, _Store);

	function User() {
		_classCallCheck(this, User);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(User).call(this));
	}

	/**
  * Authenticate with password.
  * @param  {Object} user 	A user object containing 'email' and 'password' keys.
  * @return {Promise}      	A promise which fulfils a Firebase authData object.
  */

	_createClass(User, [{
		key: 'login',
		value: function login(user) {
			var _this2 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				_this2.ref.authWithPassword(user, function (error, authData) {
					if (error) {
						_this2.emit('serviceError', error);
						return reject(error);
					}
					_this2.emit('serviceComplete');
					return resolve(authData);
				});
			});
		}

		/**
   * End current authentication session
   */

	}, {
		key: 'logout',
		value: function logout() {
			this.ref.unauth();
		}

		/**
   * Signup with password.
   * @param  {Object} user 	A user object containing 'email' and 'password' keys.
   * @return {Promise}      	A promise.
   */

	}, {
		key: 'signup',
		value: function signup(user) {
			var _this3 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				_this3.ref.createUser(user, function (error) {
					if (error) {
						_this3.emit('serviceError', error);
						return reject(error);
					}
					_this3.emit('serviceComplete');
					return resolve();
				});
			});
		}

		/**
   * Signup with password and then authenticate with password
   * @param  {Object} user 	A user object containing 'email' and 'password' keys.
   * @return {Promise}      	A promise which fulfils a Firebase authData object.
   */

	}, {
		key: 'signupAndLogin',
		value: function signupAndLogin(user) {
			var _this4 = this;

			return this.signup(user).then(function () {
				return _this4.login(user);
			});
		}

		/**
   * Get current authentication state
   * @return {Object|null}
   */

	}, {
		key: 'getAuth',
		value: function getAuth() {
			return this.ref.getAuth();
		}

		/**
   * Authenticate with 3rd party provider using a popup-based OAuth flow.
   * @param  {String} provider 	A valid Firebase authentication provider.
   * @param  {String} scope 		A valid provider scope. See https://www.firebase.com/docs/web/guide/user-auth.html#section-providers
   * @return {Promise}      		A promise which fulfils a Firebase authData object.
   */

	}, {
		key: 'authWithProvider',
		value: function authWithProvider(provider, scope) {
			var _this5 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				var options = { scope: scope };
				_this5.ref.authWithOAuthPopup(provider, function (error, authData) {
					if (error) {
						if (error.code === 'TRANSPORT_UNAVAILABLE') {
							return _this5.authWithProviderRedirect(provider, scope);
						}
						_this5.emit('serviceError', error);
						return reject(error);
					}
					_this5.emit('serviceComplete');
					return resolve(authData);
				}, options);
			});
		}

		/**
   * Authenticate with 3rd party provider using a redirect-based OAuth flow.
   * @param  {String} provider 	A valid Firebase authentication provider.
   * @param  {String} scope 		A valid provider scope. See https://www.firebase.com/docs/web/guide/user-auth.html#section-providers
   * @return {Promise}      		A promise used to handle errors only (see notes).
   */

	}, {
		key: 'authWithProviderRedirect',
		value: function authWithProviderRedirect(provider, scope) {
			var _this6 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				var options = { scope: scope };
				_this6.ref.authWithOAuthRedirect(provider, function (error) {
					if (error) {
						_this6.emit('serviceError', error);
						return reject(error);
					}
					// the promise will never get resolved
					// as the page redirects on success
				}, options);
			});
		}
	}]);

	return User;
}(_firebaseStore2.default);

exports.default = new User();