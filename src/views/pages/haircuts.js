import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import HaircutAPI from '../../HaircutAPI'
import Toast from '../../Toast'

class HaircutsView {
  init(){
    document.title = 'Search Sitters'   
    this.sitters = null 
    this.render()    
    Utils.pageIntroAnim()
    this.getSitters()
  }

  async getSitters(){
    try{
      this.sitters = await HaircutAPI.getHaircuts()
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  

  //
  render(){
    const template = html`
      <va-app-header user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">    
        
          ${this.sitters == null ? html`
            <sl-spinner></sl-spinner>
            ` : html`
              ${this.sitters.map(sitter => html`
                ${sitter._id != Auth.currentUser._id ? html`
                  <va-haircut 
                    id="${JSON.stringify(sitter._id)}"
                    image="${sitter.avatar}"
                    location="${sitter.location}"
                    petType="${sitter.petType}">
                  </va-haircut>
                ` : html``}
            `)}
          `}
      
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new HaircutsView()