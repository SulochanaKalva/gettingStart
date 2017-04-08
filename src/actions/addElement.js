export const ADD_ELEMENT = "ADD_ELEMENT";
export const ADD_ELEMENT1 = "ADD_ELEMENT1";
export const LOAD_IMAGES = 'LOAD_IMAGES';

let nextTodoId = 0;

export function addTodo(text) {
  console.log(text);
   return {
      type: ADD_ELEMENT,
      id: nextTodoId++,
      text
   };
}
export function element(text) {
  console.log(text);
   return {
      type: ADD_ELEMENT1,
      id: nextTodoId++,
      text
   };
}

export function loadImages() {
  return {
    type: LOAD_IMAGES
  }
}
