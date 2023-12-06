export const basicRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'home-outlined',
    },
    children: [],
  },
  {
    path: '/visual-editor',
    name: 'VisualEditor',
    component: () => import('@/views/visualEditor/index.vue'),
    meta: {
      title: '大屏编辑器',
      icon: 'desktop-outlined',
    },
    children: [],
  },
  {
    path: '/draw-flow',
    name: 'DrawFlow',
    component: () => import('@/views/drawFlow/index.vue'),
    meta: {
      title: '流程图',
      icon: 'node-index-outlined',
    },
    children: [],
  },
  {
    path: '/form-generator',
    name: 'FormGenerator',
    component: () => import('@/views/formGenerator/index.vue'),
    meta: {
      title: '表单生成器',
      icon: 'profile-outlined',
    },
    children: [],
  },
  {
    path: '/webIDE',
    name: 'WebIDE',
    component: () => import('@/views/webIDE/index.vue'),
    meta: {
      title: '在线IDE',
      icon: 'code-outlined',
    },
    children: [],
  },
  {
    path: '/markdown',
    name: 'Markdown',
    component: () => import('@/views/markdown/index.vue'),
    meta: {
      title: 'markdown编辑器',
      icon: 'file-markdown-outlined',
    },
    children: [],
  },
  {
    path: '/json-format',
    name: 'JsonFormat',
    component: () => import('@/views/jsonFormat/index.vue'),
    meta: {
      title: 'JSON可视化',
      icon: 'field-string-outlined',
    },
    children: [],
  },
  {
    path: '/chatGPT',
    name: 'ChatGPT',
    component: () => import('@/views/chatGPT/index.vue'),
    meta: {
      title: '聊天机器人',
      icon: 'robot-outlined',
    },
    children: [],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home',
  },
]
