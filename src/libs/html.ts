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
