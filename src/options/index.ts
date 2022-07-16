import { getAppTarget } from 'src/libs/svelte'
import Options from 'src/options/Options.svelte'

export default new Options({ target: getAppTarget() })
