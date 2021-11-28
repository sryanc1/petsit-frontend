import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import HaircutAPI from '../../HaircutAPI'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Dash' 
    this.sitRequests = null 
    this.count = 1   
    Utils.pageIntroAnim()
    this.getSitterRequests()
  }

  async getSitterRequests(){
    try{
      this.sitRequests = await HaircutAPI.getSitterRequests()
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async moreInfoHandler(e){
    e.preventDefault()   
    const submitBtn = document.querySelector('.submit-btn')
    const formData = e.detail.formData
    Auth.sitter = formData.get('sitterID')
    const decision = formData.get('sitRequest')
    const requestId = formData.get('_id')
    submitBtn.setAttribute('loading', '')
    if(decision == null){
      gotoRoute('/sitters')
    } 
    try{
      await HaircutAPI.updateSitRequest(requestId, formData)
      Toast.show('Request updated')
      gotoRoute('/dash')
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

    console.log(Object.fromEntries(formData))
  }

  render(){
    const template = html`
      <va-app-header title="Dash" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
        <div class="page-content">
          <div class="three"> 
                 
          ${Auth.currentUser && Auth.currentUser.avatar ? html`
            <h1 class="calign" style="width: 100%">${Auth.currentUser.petName} and Me</h1>
            <div class="one">
              <img src=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}>
            </div>
          </div>
          `:html``}
            <div class="two">
              <h3>${Auth.currentUser.petName} and Me</h3>
              <p><b>Location: &nbsp</b>${Auth.currentUser.location}</p>
              <p><b>Pet Type: &nbsp</b>${Auth.currentUser.petType}</p>
              <p><b>Breed: &nbsp</b>${Auth.currentUser.breed}</p>    
              <p><b>Spoil Rating: &nbsp</b><sl-rating class="rating-hearts" readonly value="${Auth.currentUser.spoilRating}" style="--symbol-color-active: #ff4136;"></sl-rating></p>
              <p><b>Special Requirements:</b></p>
              <p>${Auth.currentUser.specialRequirements}</p>
              <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
              <br>
          </div>
            <p style="width: 100%; display: inline-block;"><b>Favour Rating: &nbsp</b></p>
            <img style="width: 80%; left: 8%; display: inline-block;" src="${App.apiBase}/images/${Auth.currentUser.favourRating}">
            <div class="three" style="background-color: #c8e9f8;"> 
              <h3>Pet Sit Requests for you:</h3>
                  ${this.sitRequests.map(sitRequest => html`
                    ${Auth.currentUser._id == sitRequest.sitterID && sitRequest.sitRequest == 0 ? html `
                    <div style="display: inline-block; width:100% ">
                        <sl-form @sl-submit=${this.moreInfoHandler.bind(this)}>
                          <sl-input name="sitterID" value="${sitRequest.userID}" style="display: none;"></sl-input>
                          <sl-input value="${this.count++}" style="display: none;"></sl-input>
                          <button  class="buttonAnch" submit>${sitRequest.petName}</button>   
                        </sl-form>
                        <sl-form @sl-submit=${this.moreInfoHandler.bind(this)}>
                          <sl-input name="_id" value="${sitRequest._id}" style="display: none;"></sl-input>
                          <sl-input name="sitterID" value="${sitRequest.userID}" style="display: none;"></sl-input>
                          <sl-input name="userID" value="${sitRequest.sitterID}" style="display: none;"></sl-input>
                          <sl-input name="petName" value="${sitRequest.petName}" style="display: none;"></sl-input>
                          <sl-button style="float: right; margin:2px 5px" type="warning" name="sitRequest" value="2" class="submit-btn"submit>Reject</sl-button>
                        </sl-form>
                        <sl-form @sl-submit=${this.moreInfoHandler.bind(this)}>
                          <sl-input name="_id" value="${sitRequest._id}" style="display: none;"></sl-input>
                          <sl-input name="sitterID" value="${sitRequest.userID}" style="display: none;"></sl-input>
                          <sl-input name="userID" value="${sitRequest.sitterID}" style="display: none;"></sl-input>
                          <sl-input name="petName" value="${sitRequest.petName}" style="display: none;"></sl-input>
                          <sl-button style="float: right; margin:2px 5px" type="primary" name="sitRequest" value="1" class="submit-btn"submit>Accept</sl-button>
                        </sl-form>
                      </div>
                   
                        <br>
                    
                    ` : html``} 
                       
                    
                      
                  `)}
                  ${this.count == 1 ? html`<p>None</p>` : html``}
              <h3>Requests by you:</h3>
              <p>None</p>
            </div>
        </div>
        
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()