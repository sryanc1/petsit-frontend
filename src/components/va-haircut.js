import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-haircut', class Haircut extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      user:{
        type: Object
      },
      image: {
        type: String
      },  
      location: {
        type: String
      },  
      petType: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    Auth.sitter = this.id.replace(/['"]+/g, '')
    gotoRoute('/sitters')
  }
  
  render(){    
    return html`
    <style>
      .card-image {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
        margin-top: 0.5em;
        padding: 1em;
        background-color: rgb(248, 245, 230);
      }
      h3{
          font-size: 0.9em;
          opacity: 0.5;
      }
      .wrap {
        display: inline-block;
      }
      .gender span,
      .length span {
        text-transform: uppercase;
        font-weight: bold;
      }

    </style>

    <div class="wrap">
      <sl-card class="card-image">
        <img slot="image" src="${App.apiBase}/images/${this.image}">
        <h2>${this.firstName}</h2>
        <h3 class="length">Location: <span>${this.location}</span></h3>
        <h3 class="length">Pet type: <span>${this.petType}</span></h3>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More info</sl-button>
      </sl-card>

      <style>
        .card-image {
          max-width: 300px;
        }
      </style>       
    </div>    
    `
  }
  
})
