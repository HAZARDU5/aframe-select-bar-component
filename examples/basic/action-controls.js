/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Game logic for controlling a-frame actions such as teleport and save
 */
AFRAME.registerComponent('action-controls', {
  schema: {
    menuID: {type: "string", default: "menu"}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Add event listeners.
   */
  addEventListeners: function () {
    // get menu element associated with these controls
    var menuEl = document.getElementById(this.data.menuID);
    menuEl.addEventListener('menuChanged', this.onActionChange.bind(this));
    menuEl.addEventListener('menuSelected', this.onActionSelect.bind(this));
  },

  /**
   * Remove event listeners.
   */
  removeEventListeners: function () {
    var menuEl = document.getElementById(this.data.menuID);
    menuEl.removeEventListener('menuChanged', this.onActionChange);
    // menuEl.removeEventListener('menuSelected', this.onPlaceObject);
  },

  init: function () {
    var menuEl = document.getElementById(this.data.menuID);

    console.log("action-controls: INIT; menu element: " + menuEl);
    // get currently selected action
    var optionValue = menuEl.components['select-bar'].selectedOptionValue;
    console.log("action-controls: optionValue:" + optionValue);
//    console.log(optionValue);

    // do the thing associated with the action
    this.handleActionStart(optionValue);
  },

  onActionSelect: function () {
    // what is the action
    var menuEl = document.getElementById(this.data.menuID);

    // get currently selected action
    var optionValue = menuEl.components['select-bar'].selectedOptionValue;
    console.log("action-controls: onActionSelect triggered; current optionValue:" + optionValue);
//    console.log(optionValue);
    // call the thing that does it
  },

  onActionChange: function () {
    // undo old one
    this.handleActionEnd(this.previousAction);

    var menuEl = document.getElementById(this.data.menuID);
    // get currently selected action
    var optionValue = menuEl.components['select-bar'].selectedOptionValue;
    console.log("action-controls: new optionValue: " + optionValue);
//    console.log(optionValue);
    // do new one
    this.handleActionStart(optionValue);
  },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () {
    this.addEventListeners();
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () {
    this.removeEventListeners();
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    this.removeEventListeners();
  },

  handleActionStart: function(optionValue) {
    this.previousAction = optionValue;

    // for given optionValue, do something
    switch (optionValue) {
      case "teleport":        // add teleport component to the control element that is the parent of this menu
        console.log("action-controls: teleportStart");
        // controlEl = this.el;
        // console.log("controlEl:");
        // console.log(controlEl);
        // // Add attribute from this html: teleport-controls="button: trigger; collisionEntities: #ground"
        // controlEl.setAttribute("teleport-controls", "button: trigger; collisionEntities: #ground");
        return; // without this return the other cases are fired - weird!
      case "save":
        console.log("action-controls: saveStart");
        return;
      case "saveAs":
        console.log("action-controls: saveAsStart");
        return;
      case "new":
        console.log("action-controls: newStart");
        return;
    }
  },

  handleActionEnd: function(optionValue) {
    // for given optionValue, do something
    switch (optionValue) {
      case "teleport":        // add teleport component to the control element that is the parent of this menu
        console.log("action-controls: teleportEnd");
        // controlEl = this.el;
        // console.log("controlEl:");
        // console.log(controlEl);
        // // Add attribute from this html: teleport-controls="button: trigger; collisionEntities: #ground"
        // controlEl.removeAttribute("teleport-controls");
        return; // without this return the other cases are fired - weird!
      case "save":
        console.log("action-controls: saveStartEnd");
        return;
      case "saveAs":
        console.log("action-controls: saveAsStartEnd");
        return;
      case "new":
        console.log("action-controls: newStartEnd");
        return;
    }
  }
});
