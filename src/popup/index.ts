import { getAppTarget } from '@/libs/svelte'
import Popup from '@/popup/Popup.svelte'

export default new Popup({ target: getAppTarget() })
