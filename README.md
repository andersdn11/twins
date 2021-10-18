![alt text](https://github.com/andersdn11/twins/blob/main/logo.png?raw=true)

Twins is a tiny (**~1kb**) but punchy reactive library to drop into your existing project.

In beta.


### Setup

Include script and create a container with an ID, that serves as a closed cosmos for your twins logic.

```html
<script src="path/to/twins.min.js"></script>

<section id="calculator">
	<input type="number" twins="mynumber">
	<p twins="mynumber">0 USD</p>
<section>

<script>
var calc = new twins('calculator')
calc.state = {
	mynumber: 0,
}
</script>
```
