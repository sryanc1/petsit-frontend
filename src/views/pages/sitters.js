import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import moment from 'moment'
import HaircutAPI from '../../HaircutAPI'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

class SitterView {
  init(){
    console.log('SitterView.init')
    document.title = 'Sitter' 
    this.Sitter = null
    this.sitRequest = 0
    this.getSitter()
    this.render()
    Utils.pageIntroAnim()
  }
  
  async getSitter(){
    try{
      this.Sitter = await HaircutAPI.getSitterByID(Auth.sitter)
      this.render()   
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async newRequestSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    try{
      await HaircutAPI.newHaircut(formData)
      Toast.show('Request submitted')
      gotoRoute('/dash')
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Sitter" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
        <div class="page-content">
          <div class="three"> 
                 
          ${this.Sitter && this.Sitter.avatar ? html`
            <h1 class="calign" style="width: 100%"> ${this.Sitter.firstName} and ${this.Sitter.petName}</h1>
            <div class="one">
              <img src=${(this.Sitter && this.Sitter.avatar) ? `${App.apiBase}/images/${this.Sitter.avatar}` : ''}>
            </div>
          </div>
          `:html``}
            <div class="two">
              <h3> ${this.Sitter.firstName} and ${this.Sitter.petName}</h3>
              <p>${this.Sitter.location}</p>
              <p><b>Pet Type: &nbsp</b>${this.Sitter.petType}</p>
              <p><b>Breed: &nbsp</b>${this.Sitter.breed}</p>    
              <p><b>Spoil Rating: &nbsp</b>sl-rating class="rating-hearts" readonly value="${this.Sitter.spoilRating}" style="--symbol-color-active: #ff4136;"></sl-rating></p>
              <p><b>Special Requirements:</b></p>
              <p>${this.Sitter.specialRequirements}</p>
              <p>Updated: ${moment(this.Sitter.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
              <br>
          </div>
            <p style="width: 100%; display: inline-block;"><b>Favour Rating: &nbsp</b></p>
            <img style="width: 100%; max-height: 150px; display: inline-block;" src="${App.apiBase}/images/${this.Sitter.favourRating}">
            <div class="three" style="background-color: #c8e9f8; display: inline-block;"> 
              
              <sl-form @sl-submit=${this.newRequestSubmitHandler.bind(this)}>
                <h3 style="padding: 10px 0px; display: inline-block;">Request a pet sit:</h3>
                  <sl-input name="userID" value="${Auth.currentUser._id}" style="display: none;"></sl-input>
                  <sl-input name="sitterID" value="${this.Sitter._id}" style="display: none;"></sl-input>
                  <sl-input name="sitRequest" value="${this.sitRequest}" style="display: none;"></sl-input>
                  <sl-input name="petName" value="${Auth.currentUser.petName}" style="display: none;"></sl-input>              
                  <sl-button  style="float: right;" type="primary" class="submit-btn" submit><sl-icon name="emoji-heart-eyes-fill"></sl-icon></sl-button>
              </sl-form>
            </div>
            <p style="width: 100%; display: inline-block;"><b>Report abuse:</b></p>
        </div>
 
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new SitterView()