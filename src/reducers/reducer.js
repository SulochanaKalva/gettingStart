import { combineReducers } from 'redux'
import { ADD_ELEMENT,ADD_ELEMENT1 } from './../actions/addElement'



function todos(state = [], action) {
   switch (action.type) {

      case ADD_ELEMENT:
         return [
            ...state,
             {
               id: action.id,
               text: action.text,
            }
         ]
        case 'IMAGES_LOADED' :
          console.log(action);
          return [...state]

      default:
      return state
   }
}
function doing(state = [], action) {
   switch (action.type) {

      case ADD_ELEMENT1:
         return [
            ...state,
             {
               id: action.id,
               text: action.text,
            }
         ]

      default:
      return state
   }
}

const todoApp = combineReducers({
   elemts : todos,
   newElements:doing
})

export default todoApp
