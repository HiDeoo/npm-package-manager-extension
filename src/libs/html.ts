export function hideElement(element: HTMLElement) {
  element.style.display = 'none'
}

export function showElement(element: HTMLElement) {
  element.style.display = ''
}

export function cloneElement(element: HTMLElement, deep = true) {
  // https://github.com/microsoft/TypeScript/issues/283
  return element.cloneNode(deep) as HTMLElement
}

export function stickElement(element: HTMLElement) {
  element.style.position = 'sticky'
  element.style.top = '0'
  element.style.alignSelf = 'flex-start'
}

export function unstickElement(element: HTMLElement) {
  element.style.position = ''
  element.style.top = ''
  element.style.alignSelf = ''
}
