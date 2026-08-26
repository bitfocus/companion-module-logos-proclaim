import { InstanceStatus } from '@companion-module/base'
import { got } from 'got'
import { fetch } from 'undici'

// Handle the interaction with Proclaim
export class ProclaimAPI {
	// Create a new ProclaimAPI object, storing a reference back to our module instance, and setting
	// up our state variables
	constructor(instance) {
		this.instance = instance

		this.ip = ''
		this.password = ''

		this.on_air = false // Is Proclaim "On Air"?
		this.on_air_session_id = '' // Proclaim On Air Session ID
		this.on_air_successful = false // Were we able to connect to check Proclaim's On Air status?
		this.onair_poll_interval = undefined // The interval ID for polling On Air status
		this.proclaim_auth_required = false // Does Proclaim require authentication for App Commands?
		this.proclaim_auth_successful = false // Were we able to authenticate to Proclaim?
		this.proclaim_auth_token = '' // Proclaim authentication token
	}

	// Called when a new module configuration is supplied. Stash the ip and password, and
	// initialise on-air polling
	configure() {
		this.ip = this.instance.config.ip
		this.password = this.instance.secrets.password

		// Initialise on-air polling
		if (this.onair_poll_interval !== undefined) {
			clearInterval(this.onair_poll_interval)
		}
		this.init_onair_poll()

		// Does Proclaim require authentication?
		this.proclaim_auth_required = this.ip !== '127.0.0.1'
		if (this.proclaim_auth_required) {
			// Ask for an auth token
			this.getAuthToken()
		}
	}

	// When destroying, clear the interval for polling
	destroy() {
		if (this.onair_poll_interval !== undefined) {
			clearInterval(this.onair_poll_interval)
		}
	}

	// Look at the various status flags and determine the overall module connection status
	setModuleStatus() {
		if (!this.ip) {
			this.instance.updateStatus(InstanceStatus.BadConfig, 'IP not specified')
			return
		}

		if (!this.on_air_successful) {
			this.instance.updateStatus(InstanceStatus.Disconnected, 'Could not connect to Proclaim')
			return
		}

		if (this.proclaim_auth_required && !this.proclaim_auth_successful) {
			this.instance.updateStatus(InstanceStatus.AuthenticationFailure, 'Proclaim authentication unsuccessful')
			return
		}

		this.instance.updateStatus(InstanceStatus.Ok, 'Connected to Proclaim')
	}

	// Set up the regular polling of on-air status
	init_onair_poll() {
		this.onair_poll_interval = setInterval(() => {
			this.onair_poll()
		}, 1000)
		this.onair_poll()
	}

	// Poll for on-air status
	async onair_poll() {
		if (!this.ip) {
			this.setModuleStatus()
			return
		}

		const url = `http://${this.ip}:52195/onair/session`
		const on_air_previously_successful = this.on_air_successful

		try {
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'text/plain',
				},
			}).then((response) => response.text())
			this.on_air_successful = true

			// If we got a session ID back, we're on air! If we got blank, we're off air
			if (data.length > 0) {
				this.on_air = true
				this.on_air_session_id = data
				this.instance.setVariableValues({
					on_air: true,
				})
			} else {
				this.on_air = false
				this.on_air_session_id = ''
				this.instance.setVariableValues({
					on_air: false,
				})
			}
			this.instance.checkFeedbacks('on_air')
			this.setModuleStatus()

			// If Proclaim is now responding and wasn't previously, try to authenticate
			if (this.on_air_successful && !on_air_previously_successful && this.proclaim_auth_required) {
				this.getAuthToken()
			}
		} catch (error) {
			// Something went wrong obtaining on-air status - can't connect to Proclaim
			this.instance.log('warn', `On Air status error: ${error.message}`)
			this.on_air_successful = false
			this.on_air = false
			this.on_air_session_id = ''
			this.instance.setVariableValues({
				on_air: false,
			})
			this.instance.checkFeedbacks('on_air')
			this.setModuleStatus()
		}
	}

	// Get an authentication token from Proclaim
	async getAuthToken() {
		const url = `http://${this.ip}:52195/appCommand/authenticate`
		var data
		try {
			data = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					Password: this.password,
				}),
			}).then((response) => response.json())
			this.proclaim_auth_successful = true
			this.proclaim_auth_token = data.proclaimAuthToken
			this.setModuleStatus()
		} catch (error) {
			this.instance.log('warn', `Authentication error in getAuthToken(): ${error.message}`)
			if (this.proclaim_auth_required) {
				this.proclaim_auth_successful = false
				this.setModuleStatus()
			}
		}
	}

	// Send any app command to Proclaim
	async sendAppCommand(command, index) {
		let url = `http://${this.ip}:52195/appCommand/perform?appCommandName=${command}`
		if (index !== undefined) {
			url = `${url}&index=${index}`
		}

		const options = {
			timeout: {
				request: 1000,
			},
			retry: {
				limit: 0,
			},
		}

		if (this.proclaim_auth_required) {
			if (!this.proclaim_auth_successful) {
				return
			}

			options.headers = {
				ProclaimAuthToken: this.proclaim_auth_token,
			}

			// This shouldn't be necessary... but it is, for now.
			// Proclaim requires the ProclaimAuthToken header name to be CamelCase, though
			// the HTTP spec says header names are case-insensitive.
			options.hooks = {
				beforeRequest: [
					(options) => {
						options.headers['ProclaimAuthToken'] = options.headers['proclaimauthtoken']
					},
				],
			}
		}

		try {
			const data = (await got(url, options).text()).replace(/^\uFEFF/, '')
			if (data !== 'success') {
				this.instance.log('debug', `Unexpected response from Proclaim: ${data}`)
			}
		} catch (error) {
			this.instance.log('warn', `Command failed in sendAppCommand(): ${error.message}`)
			if ((error.response?.statusCode == 401 || error.response?.statusCode == 403) && this.proclaim_auth_required) {
				this.proclaim_auth_successful = false
				this.proclaim_auth_token = ''
				this.setModuleStatus()
			}
		}
	}
}
