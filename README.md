# Simple Overlay

A simple responsive overlay. Requires jQuery 1.7+.

Disclaimers: **This plugin has not been thoroughly tested**. Currently, this plugin only works for images. Captions are not supported yet.

## Setup

Include jQuery (1.7+) and the Simple Overlay plugin files.

```html
<!-- Simple Overlay Stylesheet -->
<link rel="stylesheet" href="simple-overlay/simple-overlay.css">

<!-- Simple Overlay jQuery Plugin -->
<script src="simple-overlay/simple-overlay.js"></script>
```

Call the plugin with jQuery on links that should fire the overlay.

In the following example, links with the class `launch-overlay` will open their `href` in an overlay.

```javascript
$( '.launch-overlay' ).simpleOverlay();
```

## Grouping

To group items so that direct navigation between overlays becomes available, attach a `data-group` attribute with a common value to the links you want to group.

```html
<a class="launch-overlay" data-group="gallery-1" href="img/image-1.jpg">First Overlay in Group</a>
<a class="launch-overlay" data-group="gallery-1" href="img/image-2.gif">Second Overlay in Group</a>
```