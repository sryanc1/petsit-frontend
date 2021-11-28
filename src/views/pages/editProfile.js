import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.getUser()
    this.render()    
    Utils.pageAnim()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
        <div class="page-content1" >
        <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`
        <div class="one"> 
          <sl-form class="page-form" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>
            <div class="input-group">
              <sl-input label="First Name" type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input label="Last Name" type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input label="Whats your pets name?" type="text" name="petName" value="${this.user.petName}" placeholder="Pet Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input label="Where do you live?" type="text" name="location" value="${this.user.location}" placeholder="City"></sl-input>
            </div>
            <div class="input-group">
              <sl-input label="Update Email" type="text" name="email" value="${this.user.email}" placeholder="Email Address"></sl-input>
            </div> 
            <div class="input-group">
              <sl-select label="Select your pet type" name="petType" placeholder="Dog" >
                <sl-menu-item value="Dog">Dog</sl-menu-item>
                <sl-menu-item value="Cat">Cat</sl-menu-item>
                <sl-menu-item value="Other">Other</sl-menu-item>
              </sl-select>            
            </div> 
            <div class="input-group">
              <sl-input label="Describe the breed" type="text" name="breed" value="${this.user.breed}"></sl-input>
            </div>
            <div class="input-group">
              <sl-select label="How much do you spoil your pet?" name="spoilRating">
                <sl-menu-item value="1"><sl-icon name="suit-heart-fill"></sl-icon></sl-menu-item>
                <sl-menu-item value="2"><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon></sl-menu-item>
                <sl-menu-item value="3"><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon></sl-menu-item>
                <sl-menu-item value="4"><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon></sl-menu-item>
                <sl-menu-item value="5"><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon><sl-icon name="suit-heart-fill"></sl-icon></sl-menu-item>
              </sl-select> 
            </div>
            <div class="input-group">
              <sl-input label="Any special requirements? (ie: medical or dietary)" type="text" name="specialRequirements" value="${this.user.specialRequirements}" placeholder="Not applicable"></sl-input>
            </div>
            <div class="">
              <label>Choose a profile pic that includes you and your pet</label><br>          
              ${(this.user.avatar) ? html`
                <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>
                <input type="file" name="avatar" />
              `: html`
                <input type="file" name="avatar" />
              `}
            </div>
            <br>  
            <sl-button type="primary" class="submit-btn" submit>Update Profile</sl-button>
          </sl-form>
        </div>

          <div class="two">                  
          <div class="🐕">
            <div class="torso">
              <div class="fur">
                <div class="spot"></div>
              </div>
              <div class="neck">
                <div class="fur"></div>
                <div class="head">
                  <div class="fur">
                    <div class="snout"></div>          
                  </div>
                  <div class="ears">
                    <div class="ear">
                      <div class="fur"></div>
                    </div>
                    <div class="ear">
                      <div class="fur"></div>
                    </div>
                  </div>
                  <div class="eye"></div>
                </div>
                <div class="collar">
                  
                </div>
              </div>
              <div class="legs">
                <div class="leg">
                  <div class="fur"></div>
                  <div class="leg-inner">
                    <div class="fur"></div>
                  </div>
                </div>
                <div class="leg">
                  <div class="fur"></div>
                  <div class="leg-inner">
                    <div class="fur"></div>
                  </div>
                </div>
                <div class="leg">
                  <div class="fur"></div>
                  <div class="leg-inner">
                    <div class="fur"></div>
                  </div>
                </div>
                <div class="leg">
                  <div class="fur"></div>
                  <div class="leg-inner">
                    <div class="fur"></div>
                  </div>
                </div>
              </div>
              <div class="tail">
                <div class="tail">
                  <div class="tail">
                    <div class="tail -end">
                      <div class="tail">
                        <div class="tail">
                          <div class="tail">
                            <div class="tail"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()