function twins(target) {

	this.target = document.getElementById(target);

	this.state = {}
	this.filters = {} // Manipule string e.g 100 => 100 USD
	this.computed = {} // Manipulated state

	//-----------------------------------------------
	// Initiate eventlisternes and getters/setters..

	this.init = function() {

		var that = this

		// Loop through state and make reactive.
		for (let key in this.state ) {
			if (this.state.hasOwnProperty(key)) {
			this.makeReactive(this.state, key)
			}
		}

		// Add eventlisternes
		var reactives = this.target.querySelectorAll('[twins]')

		reactives.forEach( (elm) => {

			if( elm.type !== undefined) { // Only issue a notification on inputs

				switch (elm.type) {
					case 'checkbox':
						elm.addEventListener('change', callback)
						break;
					case 'select-one':
						elm.addEventListener('change', callback)
						break;
					case 'select-multiple':
						elm.addEventListener('change', callback)
						break;
					default:
						elm.addEventListener('keyup', callback)
						break;
				}

				function callback() {
					that.updateState(elm)
				}

			}

		});

	}

	//-----------------------------------------------
	// Define getters and setters

	this.makeReactive = (state, key) => {

		var that = this
		let val = state[key]

		Object.defineProperty(state, key, {
		  get () {
			return val // Return the cached value
		  },
		  set (newVal) {
			val = newVal // Save the newVal
			that.notify(state, key) // Notify recievers of changes.
		  }
		})
	}

	//-----------------------------------------------
	// Update State object

	this.updateState = (elm) => {
		let refstate = elm.getAttribute('twins')

		let value = elm.value
		if( elm.type == "checkbox") value = elm.checked;

		this.state[refstate] = value;
	}

	//-----------------------------------------------
	// Notify and update all dependent DOM values.

	this.notify = (state, key) => {

		var recievers = this.target.querySelectorAll('[twins="'+key+'"]')
		recievers.forEach( (elm) => {

			if( elm.type == undefined) { // Only update elements that are not inputs

				if( elm.getAttribute('twins-filter') !== null ) { // Run past filter if exist.

					let filterName 		= elm.getAttribute('twins-filter')
					var filtered_val 	= this.filters[filterName](state[key])
					elm.innerHTML 		= filtered_val

				} else { // Else just update value.

					elm.innerHTML = state[key]

				}
			}
		});

		this.runComputed()
	}

	//-----------------------------------------------
	// Run computed functions and update their twin dom reference

	this.runComputed = () => {

		if( Object.keys(this.computed).length > 0 ) {

			// get each computed function
			for (let func in this.computed ) {
				if (this.computed.hasOwnProperty(func)) {

					var computed_val = this.computed[func]() // Store returned value

					var computed_dom_refs = this.target.querySelectorAll('[twins="'+func+'"]') // get refs
					computed_dom_refs.forEach( (elm) => {

						if( elm.getAttribute('twins-filter') !== null ) { // Run past filter if exist.

							let filterName 		= elm.getAttribute('twins-filter')
							var filtered_val 	= this.filters[filterName](computed_val)
							elm.innerHTML 		= filtered_val
						} else {
							elm.innerHTML = computed_val // Update refs
						}

					});

				}
			}

		}
	}


	//-----------------------------------------------

	this.destroy = () => {
		// Detach all event handlers.
	}

} // TWINS
