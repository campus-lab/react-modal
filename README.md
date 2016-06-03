# REACT MODAL

MODAL React Component

+ easy to use
+ responsive



## TABLE OF CONTENTS

+ [example](#example)
+ [installation](#installation)
+ [how it works](#how-it-works)
+ [usage](#usage)



## EXAMPLE

[Checkout the example](https://alexandreneves.github.io/react-modal) (Redux).
If requested I can provide an Alt example.



## INSTALLATION

```sh
$ npm i @aneves/react-modal
```



## HOW IT WORKS

react-modal was developed alongside react-flyout so it shares most of its structure

+ **Modal**
    + stateless component
    + handles everything related to how the modal looks and behaves when opened
+ **ModalWrapper**
    + stateless component
    + renders the Modal when prop.open === true
    + executes prop.onWindowClick when a window click event gets fired
+ **modal.css**
    + CSS


### Why not dumb?

The problem with these kind of componentes (dropdowns, modals, ...) is the need to handle window/body clicks in order to close. Why is this a problem? The lack of state (in this case) and the immutability of the props make it "impossible" to close itself.

That's why I provide the **ModalWrapper** which adds and removes the window click eventListener when needed and accepts a method through the props that gets executed by the handler. This method can in turn close the flyout by updating the props sent to the wrapper.

Keep in mind that the **ModalWrapper** is optional, you can import the **Modal** directly and deal with its renderization by yourself.



## USAGE

The usage will depend on your projects architecture but will be something along these lines:


```html
<button onClick={e => {dispatch(modalToggle('modal-foobar'))}}>ModalToggle</button>
<Modal id="modal-foobar" title="foobar">
    <div>(...)</div>
</Modal>
```

### Props

+ **id**: (string, required) modal id
+ **open**: (bool) opens the modal if true
+ **title**: (string) sets a title
+ **onModalClose**: (func) called only when the modal is closed by typing ESC, clicking 'X', or clicking the backdrop
+ **onModalUnmount**: (func) called on componentWillUnmount
