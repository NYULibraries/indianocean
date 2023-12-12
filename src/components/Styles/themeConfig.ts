import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  components: {
    Pagination: {
      colorPrimary: '#ffffff',
      itemActiveBg: '#013951',
    },
    Spin: {
      colorPrimary: '#014765',
      motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
      motionDurationSlow: '.1s'
    }
  }
}

export default theme
