// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import dashView from './views/pages/dash'
import editProfileView from './views/pages/editProfile'
import guideView from './views/pages/guide'
import sittersView from './views/pages/sitters'
import browseView from './views/pages/browse'
import haircuts from './views/pages/haircuts'
import test from './views/pages/test'

// define routes
const routes = {
	'/': dashView,	
	'404' : fourOFourView,
	'/sitters': sittersView,
	'/browse': browseView,
	'/guide': guideView,
	'/signin': signinView,
	'/signup': signupView,
	'/dash': dashView,
	'/editProfile': editProfileView,
	'/haircuts': haircuts,
	'/test' : test
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	

	gotoRoute(pathname, user){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
		console.log(user)
	}
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
