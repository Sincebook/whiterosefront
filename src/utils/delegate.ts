export function delegate(element: string, target: string, el) {
  while (el.nodeName.toLowerCase() != element) {
    if (el.nodeName.toLowerCase() == target) {
      return [true, el]
    }
    el = el.parentNode
  }
  return [false, undefined]
}
