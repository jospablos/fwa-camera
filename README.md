# @ez-pz/simple-camera

# How to use

## CDN - UNPKG

Include the script and styles in your html:

```
<script src="https://unpkg.com/@ez-pz/simple-camera/dist/simple-camera.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@ez-pz/simple-camera/dist/simple-camera.css"></link>
```

and then start the camera with

```
<script>
    var target = document.getElementById("target");
    window["ez-pz-simple-camera"].startCamera(target);
</script>
```

# Demo

See https://codesandbox.io/s/simple-camera-no-framework-demo-0qbuv

# Tech in this project

- Jest
- Testing-library
- Typescript
- Rollup
