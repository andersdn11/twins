function twins(target) {

	this.target = document.getElementById(target);

	this.state = {}
	this.filters = {} // Manipule string e.g 100 => 100 USD
	this.computed = {} // Manipulated state

	//-----------------------------------------------
	// Initiate eventlisternes and getters/setters..

	this.init = function() {

		if( this.target == null) {
			console.error('TWINS: Target ID not found.')
			return false;
		}

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
						elm.addEventListener('change', this.eavesdrop, false)
						break;
					case 'select-one':
						elm.addEventListener('change', this.eavesdrop, false)
						break;
					case 'select-multiple':
						elm.addEventListener('change', this.eavesdrop, false)
						break;
					case 'radio':
						elm.addEventListener('change', this.eavesdrop, false)
						break;
					default:
						elm.addEventListener('keyup', this.eavesdrop, false)
						break;
				}

				// function eavesdrop() {
				// 	that.updateState(elm)
				// }

			}

		});

		this.runComputed()
		this.runConditionals()

		this.target.removeAttribute('twins-cloak')

	}


	this.eavesdrop = (e) => {
		var elm = e.srcElement;
		this.updateState(elm)
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
		if( elm.type == "checkbox" ) value = elm.checked;
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
		this.runConditionals()
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

	this.runConditionals = () => {
		var ifs = document.querySelectorAll('[twins-if]')

		if( ifs == null ) return false;
		ifs.forEach( (elm) => {
			var conditionalState = elm.getAttribute('twins-if')
			var is_reverse_bool = false

			// If conditional has a ! as first char, then we look for the opposite.
			if(  conditionalState && conditionalState.indexOf('!') == 0) {
				conditionalState = conditionalState.substring(1); // Remove !
				is_reverse_bool = true
			}

			var bool = this.state[conditionalState] // Pull value from state.

			// Check if value is in state otherwise check if its from computed function
			if( bool === undefined && this.computed[conditionalState] !== undefined ) {
				bool = this.computed[conditionalState]() // Get computed value.
			}

			// Flip bool
			if( is_reverse_bool ) {
				bool = !bool
			}

			// Toggle visibility
			if( bool ) {
				elm.style.display = 'block'
			} else {
				elm.style.display = 'none'
			}

		})

	}


	//-----------------------------------------------

	this.destroy = () => {

		// Remove eventlisternes
		var reactives = this.target.querySelectorAll('[twins]')

		reactives.forEach( (elm) => {

			if( elm.type !== undefined) {
				switch (elm.type) {
					case 'checkbox':
						elm.removeEventListener('change', this.eavesdrop, false)
						break;
					case 'select-one':
						elm.removeEventListener('change', this.eavesdrop, false)
						break;
					case 'select-multiple':
						elm.removeEventListener('change', this.eavesdrop, false)
						break;
					case 'radio':
						elm.removeEventListener('change', this.eavesdrop, false)
						break;
					default:
						elm.removeEventListener('keyup', this.eavesdrop, false)
						break;
				}

			}

		});
	}

} // TWINS
