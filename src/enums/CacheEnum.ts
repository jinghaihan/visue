import { toUpper } from 'lodash-es'
import { prefixCls } from '@/settings/designSetting'

const CACHE_PREFIX = toUpper(prefixCls)

export const WEB_IDE_CFG_KEY = `${CACHE_PREFIX}__WEB__IDE__CFG`

export const MARKDOWN_EDITOR_CFG_KEY = `${CACHE_PREFIX}__MARKDOWN__EDITOR__CFG`
