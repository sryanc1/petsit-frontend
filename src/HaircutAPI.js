import App from './App'
import Auth from './Auth'
import { gotoRoute } from './Router'
import Toast from './Toast'
import sitters from './views/pages/sitters'

class HaircutAPI {


  async newHaircut(formData){
    // send fetch request
    const response = await fetch(`${App.apiBase}/haircut`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })

    // if response not ok
    if(!response.ok){ 
      let message = 'Problem adding sit request'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error('Problem creating sit request')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

   async updateSitRequest(requestId, requestData, dataType = 'form'){
    // validate
    if(!requestId || !requestData) return
    console.log("ID = "+requestId)
    let responseHeader
    
    // form data
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
        body: requestData
      }
      
    // json data
    }else if(dataType == 'json'){
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json"},
        body: JSON.stringify(requestData)
      }
    }

    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/haircut/${requestId}`, responseHeader)

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }

    // convert response payload into json - store as data
    const data = await response.json()
    // return data
    return data
  }

  async getSitterByID(sitterID){
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/sitter/${sitterID}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},     
    })
    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting this sitter')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    // return data
    return data
  }

  async getHaircuts(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/haircut`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting sitters')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()

    // return data
    return data
  }

  async getSitterRequests(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/haircut/sitRequest`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting sitter request')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()

    // return data
    return data
  }
}

export default new HaircutAPI()

