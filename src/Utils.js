import gsap from 'gsap'

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }


  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, x: -12}, {opacity: 1, x: 0, ease: 'power2.out', duration: 1})
  }

  pageAnim(){
    const pageContent = document.querySelector('.page-content1')
    if(!pageContent) {
      console.log('im in here')
      return
    }
    gsap.to(".page-content1", {x: "120vw", duration: 4, ease: "power2.in"});
  }
}

export default new Utils()