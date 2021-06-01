# @ez-pz/simple-camera

> :warning: **In active development!**: This library has yet to fulfill this promise and may change its API without warning, use with caution.

Use any device's camera (screenshot) capabilities from the browser with a single utility with a single API.

- Integrate on any frontend.
- Easily add to your project from the CDN.
- Written in Typescript, framework agnostic.

# Usage

## NPM

```
npm i --save @ez-pz/simple-camera
```

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

- Development: Typescript, Storybook
- Testing: Jest, testing-library
- Bundling: Rollup

# Running

1. Clone the repo

```
git clone https://github.com/jospablos/simple-camera.git
```

2. Install deps

```
npm i
```

3. Start test watching

```
npm run test:watch
```

4. Run Storybook

```
npm run storybook
```

# Contributing

If you want to contribute, Take a look a the V1 project kanban and pick any task :) https://github.com/jospablos/simple-camera/projects/1
