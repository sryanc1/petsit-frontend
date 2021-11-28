import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import HaircutAPI from '../../HaircutAPI'
import Toast from '../../Toast'

class BrowseView {
  init(){
    document.title = 'Browse' 
    this.haircuts = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getHaircuts()
  }

  async getHaircuts(){
    try{
      this.haircuts = await HaircutAPI.getHaircuts()
      console.log(this.haircuts)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Browse" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Page title</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new BrowseView()