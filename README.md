![alt text](https://github.com/andersdn11/twins/blob/main/twins.png?raw=true)

Twins is a tiny (**~2kb**) but punchy reactive library to drop into your existing project.

**V1.0**

CDN link: https://cdn.jsdelivr.net/gh/andersdn11/twins@main/twins.min.js

## Setup and basic demo

Include script and create a container with an ID, that serves as a closed cosmos for your twins logic.

```html
<section id="calculator">
	<input type="number" twins="mynumber">
	<p twins="mynumber">0 USD</p>
<section>
```
```javascript
<script src="https://cdn.jsdelivr.net/gh/andersdn11/twins@main/twins.min.js"></script>
<script>
const calc = new twins('calculator')
calc.state = {
	mynumber: 0,
}
calc.init()
</script>
```

**That's it. Your input is now twins with your p tag!**

## Filters
Filters let's you apply text or number formatting to your output.
```html
<section id="calculator">
	<input type="number" twins="money">
	<p twins="money" twins-filter="currency">0 USD</p>
<section>
```
```javascript
var vm = new twins('calculator')
vm.state = {
	mynumber: 0,
	money: 0,
}

vm.filters = {
	currency: (val) => {
		return Number(val).toLocaleString() + ' USD'
	}
}
vm.init()
```

## Computed properties
Computed properties gives you more freedom to create complex logic, that is not possible in a state value alone.
```html
<section id="calculator">
	<input type="number" twins="width">
	<input type="number" twins="height">
	<p twins="size">0 USD</p>
<section>
```
```javascript
var vm = new twins('calculator')
vm.state = {
	width: 0,
	height: 0,
}

vm.computed = {
	size: () => {
		return vm.state.width * vm.state.height
	}
}
vm.init()
```

You can even reference one computed inside another computed

```javascript
vm.computed = {
	size: () => {
		return vm.state.width * vm.state.height
	},
	depth: () => {
		return vm.computed.size() + 10
	}
}
vm.init()
```

## Logic - If else
Very simple if statements included out of the box. 
! (NOT) operator supported, which is also the way to make else statements.
```html
<section id="calculator">
	<input type="checkbox" twins="bigFontSize">
	<p twins-if="!bigFontSize">I'm a small boi.</p>
	<h1 twins-if="bigFontSize">I'm a big boi.</h1>
<section>
```
```javascript
var vm = new twins('calculator')
vm.state = {
	bigFontSize: 0,
}
vm.init()
```

twins-if works with computed properties aswell, allowing you to make more complex if statements. Only needs to return a bool.
```html
<section id="calculator">
	<input type="number" twins="width">
	<input type="number" twins="height">
	
	<p twins-if="is_square">Square</p>
	<p twins-if="!is_square">Rectangle</p>
<section>
```
```javascript
var vm = new twins('calculator')
vm.state = {
	height: 0,
	width: 0,
}
vm.computed = {
	is_square: () => {
		if( vm.state.height === vm.state.width ) {
			return true
		}
		return false
	}
}
vm.init()
```
