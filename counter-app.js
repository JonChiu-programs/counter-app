/**
 * Copyright 2026 JonChiu-programs
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = "0";
    this.min = "0";
    this.max = "0";
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: {type : Number, reflect: true},
      min: {type : Number},
      max: {type : Number},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        height: 570px;
        width: 800px;
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-beaverBlue);
        font-family: var(--ddd-font-navigation);
      }

      :host([count = "18"]) h3{
        color: var(--ddd-theme-default-roarGolden);
      }

      :host([count = "21"]) h3{
        color: var(--ddd-theme-default-keystoneYellow);
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }

      .number{
        margin-left: 265px;
        font-size: 200px;
      }

      .addButton{
        height: 100px;
        width: 200px;
        font-size: 65px;
        text-align: center;
        padding-bottom: 10px;
      }

      .addButton:focus{
        background-color: var(--ddd-theme-default-creekTeal);
      }

      .addButton:hover{
        background-color: var(--ddd-theme-default-creekTeal);
      }

      .minusButton{
        margin-left: 340px;
        height: 100px;
        width: 200px;
        font-size: 65px;
        text-align: center;
        padding-bottom: 10px;
      }

      .minusButton:focus{
        background-color: red;
      }

      .minusButton:hover{
        background-color: red;
      }
    `];
  }


  // Lit render the HTML
  render() {
    return html`
    <confetti-container id="confetti">
      <div class="wrapper">
        <h3 class="number">${this.count}</h3>
        <button class="addButton" @click="${this.increment}" ?disabled="${this.max === this.counter}">+</button>
        <button class = "minusButton" @click="${this.decrement}" ?disabled="${this.min === this.counter}">-</button>
        <slot></slot>
      </div>
    </confetti-container>`;
  }

  increment(){
    if(this.max != this.count){
      this.count++;
    }
    else{
      minusButton.disabled = true;
    }
  }

  decrement(){
    if(this.min != this.count){
      this.count--;
    }
    else{
      minusButton.disabled = true;
    }
  }


updated(changedProperties) {
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('count')) {
    const check = changedProperties.get('count');
      if(check == 21){
          this.makeItRain();
      }
    // do your testing of the value and make it rain by calling makeItRain
  }
}

makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);