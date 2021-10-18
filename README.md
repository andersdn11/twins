![alt text](https://github.com/andersdn11/twins/blob/main/twins.png?raw=true)

Twins is a tiny (**~1kb**) but punchy reactive library to drop into your existing project.

**V0.5**


## Setup and basic demo

Include script and create a container with an ID, that serves as a closed cosmos for your twins logic.

```html
<section id="calculator">
	<input type="number" twins="mynumber">
	<p twins="mynumber">0 USD</p>
<section>
```
```javascript
<script src="path/to/twins.min.js"></script>
<script>
var calc = new twins('calculator')
calc.state = {
	mynumber: 0,
}
</script>
```

**That's it. Your input is now twins with your p tag!**

## Filters

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
```

## Computed properties

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
```
