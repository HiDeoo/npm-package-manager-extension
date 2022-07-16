import { getAppTarget } from '@/libs/svelte'
import Options from '@/options/Options.svelte'

export default new Options({ target: getAppTarget() })
