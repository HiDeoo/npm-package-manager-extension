import { getAppTarget } from 'src/libs/svelte'
import Popup from 'src/popup/Popup.svelte'

export default new Popup({ target: getAppTarget() })
