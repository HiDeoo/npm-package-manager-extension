export function getAppTarget() {
  let target: Element | null = document.querySelector('#app')

  if (!target) {
    target = document.createElement('div')
    document.body.append(target)
  }

  return target
}
