<template>
  <div class="app-container"/>
</template>

<script>
import { getBizFormConfig, fetchFormData } from '@/api/bizform'

export default {
  name: 'BizForm',
  components: { },
  data() {
    return {
      id: undefined,
      bizConfig: null,
      listLoading: true,
      dataUrl: null
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getConfig()
  },
  methods: {
    getConfig() {
      getBizFormConfig(this.id).then(response => {
        this.bizConfig = response.data.config
        this.dataUrl = this.bizConfig.dataUrl
        this.dataColumns = this.bizConfig.columns
        this.listLoading = false
        // console.log('bizConfig: ' + JSON.stringify(this.bizConfig))
        if (this.dataUrl) {
          this.getFormData()
        }
      })
    },
    getFormData() {
      fetchFormData(this.bizConfig.dataUrl, this.queryParams).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        // console.log('bizData: ' + JSON.stringify(this.list))
      })
    }

  }
}
</script>
