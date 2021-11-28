import App from './../../App'
import {html, render } from 'lit-html'
import Utils from '../../Utils'

class FourOFourView{
  init(){
    console.log('FourOFourView.init')    
    document.title = '404 File not found'    
    this.render()
    Utils.pageAnim()
  }

  render(){
    const template = html` 
 <div class="page-content1" style="top: 0">        
        <div class="one">
          <div class="calign">
            <h1>Opps!</h1>
            <p>Sorry, we couldn't find that.</p>
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

export default new FourOFourView()