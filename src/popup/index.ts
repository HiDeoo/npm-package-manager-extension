import { getAppTarget } from '@/libs/svelte'
import Popup from '@/popup/Popup.svelte'

import '@/popup/global.css'

export default new Popup({ target: getAppTarget() })
