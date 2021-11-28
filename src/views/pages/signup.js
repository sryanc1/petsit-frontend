import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
      <div class="page-content1" style="top: 2%;">        
        <div class="one">
          <div class="signinup-box">
        <img class="signinup-logo" src="/images/petsit.svg">
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div> 
            <div class="input-group">
              <input name="accessLevel" type="hidden" value="1">
              <sl-input type="hidden" name="petName" value="Not complete"></sl-input>
              <sl-input type="hidden" name="location" value="Not complete"></sl-input>
              <sl-input type="hidden" name="petType" value="1"></sl-input>
              <sl-input type="hidden" name="breed" value="Not complete"></sl-input>
              <sl-input type="hidden" name="specialRequirements" value="None"></sl-input>
              <sl-input type="hidden" name="spoilRating" value="1"></sl-input>
              <sl-input type="hidden" name="avatar" value="/images/avatar-blank.jpeg"></sl-input>              
            </div>           
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Sign Up</sl-button>
          </sl-form>
          <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
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
        
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()