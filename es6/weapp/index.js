import findMethods from './definitions'
import factory from './factory'
import Http from './http'
import {shortcutRequest, requireAuth} from './enhancements'

const wrapMethods = (dest, src, methods) => {
  for(let i = 0; i < methods.length; i++){
    let {name, wrapper, ...rest} = methods[i]
    dest[name] = factory[wrapper](src, name, rest)
  }
}

function wxWrapper(x){
  const weapp = {
    VERSION: process.env.VERSION,
    API_VERSION: process.env.API_VERSION
  }

  const methods = findMethods()
  wrapMethods(weapp, x, methods)
  shortcutRequest(weapp.request)
  weapp.requireAuth = requireAuth(weapp.login, weapp.getUserInfo)
  weapp.Http = Http(weapp.request)

  return weapp
}

export default wxWrapper
