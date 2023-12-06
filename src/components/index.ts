import type { App } from 'vue'
import Antd from 'ant-design-vue'
import * as AntdIcon from '@ant-design/icons-vue'

import Icon from './Application/Icon/index.vue'
import Action from './Application/Action/index.vue'

import { importAllSvg } from './Application/Icon'

import { withInstall } from '@/utils'

/**
 * register all global component
 * @param app
 */
export function registerGlobalComponent(app: App): void {
  app.use(Antd).use(withInstall(Icon)).use(withInstall(Action))

  for (const icon in AntdIcon) {
    app.component(icon, AntdIcon[icon])
  }
}

/**
 * setup assets & globalComponent
 * @param app
 */
export function setupComponent(app: App): void {
  importAllSvg()
  registerGlobalComponent(app)
}
