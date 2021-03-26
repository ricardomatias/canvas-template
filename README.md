# Interactive NFT Canvas Template

A template for creating a Canvas based interactive NFT on [hicetnunc](hicetnunc.xyz/)

## Usage

```bash
git clone git@github.com:ricardomatias/canvas-template.git
cd canvas-template
npm install
```

Create your artwork inside `sketch.js`. Here's how it works:

```javascript
// Only has the one option so far
export const settings = {
    // Calls the returned function continuously
    animate: true
};

export const sketch = ({ creator, viewer, width, height, context }) => {
    // RUNS ONCE
    return ({ context, seconds, width, height }) => {
        // RUNS CONTINUOUSLY
    };
}
```
This is the same pattern used by [`canvas-sketch`](https://github.com/mattdesl/canvas-sketch).

The **creator** and **viewer** parameters are exposed by hicetnunc and they reference the creator of the piece (you) and the viewer (possible buyer).

When you're done just run `npm run package` and check your **object** folder.

## Commands

* `npm start` to start a development server
* `npm run package` to create a zip file inside objekt folder ready to be minted
* `npm run thumbnail` to create a thumbnail for the NFT


