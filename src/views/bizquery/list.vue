<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="column in dataColumns" :key="column.name" :align="column.align || 'center'" :label="column.label" :width="column.width || 90" :mini-width="column.mini_width || 20" >
        <template slot-scope="scope">
          <span v-if="column.type === undefined">{{ scope.row[column.name] }}</span>
          <span v-if="column.type === 'datetime'">{{ scope.row[column.name] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          <span v-if="column.type === 'date'">{{ scope.row[column.name] | parseTime('{y}-{m}-{d}') }}</span>
          <span v-if="column.type === 'time'">{{ scope.row[column.name] | parseTime('{h}:{i}') }}</span>
          <span v-if="column.type === 'number'">{{ scope.row[column.name] }}</span>
          <span v-if="column.type === 'int'">{{ scope.row[column.name] }}</span>
          <span v-if="column.type === 'amount'">{{ scope.row[column.name] }}</span>
          <span v-if="column.type === 'actions' || column.name === 'actions'">
            <span v-for="action in column.buttons" :key="action.name">
              <el-button v-if="action.hidden === false" :icon="action.icon || ''" size="small" @click="execCmd(action, scope.row, $event)">
                {{ action.label }}
              </el-button>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getBizQueryConfig, fetchDataList, sendAction } from '@/api/bizquery'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'BizQuery',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      name: undefined,
      idColumn: 'id',
      bizConfig: null,
      list: null,
      total: 0,
      listLoading: true,
      dataUrl: null,
      dataColumns: [],
      queryParams: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.name = this.$route.params && this.$route.params.name
    this.getConfig()
  },
  methods: {
    getConfig() {
      getBizQueryConfig(this.name).then(response => {
        this.bizConfig = response.data.config
        this.idColumn = this.bizConfig.idColumn || 'id'
        this.dataUrl = this.bizConfig.dataUrl
        this.dataColumns = this.bizConfig.columns
        this.listLoading = false
        // console.log('bizQueryConfig: ' + JSON.stringify(this.bizConfig))
        if (this.dataUrl) {
          this.getList()
        }
      })
    },
    getList() {
      fetchDataList(this.bizConfig.dataUrl, this.queryParams).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        // console.log('bizData: ' + JSON.stringify(this.list))
      })
    },

    // 执行预定义命令
    execCmd(action, row, event) {
      const url = action.actionUrl || this.bizConfig.detailUrl

      if (action.script) {
        const cmdFunc = new Function('action', 'row', action.script)
        const result = cmdFunc(action, row)
        if (result != null) {
          console.log(result)
          if (result && result.toUrl) {
            this.$router.push({ path: result.toUrl })
          }
        }
      } else if (action.type === 'edit') {
        this.$router.push({ 'path': url + '/edit/' + row[this.idColumn] })
      } else if (action.type === 'view') {
        this.$router.push({ 'path': url + '/view/' + row[this.idColumn] })
      } else if (action.type === 'delete') {
        const yn = confirm('是否删除？')
        if (yn) {
          sendAction(url + '/' + row[this.idColumn], 'delete', null)
          console.log('已删除')
        }
      }

      return false
    }

  }
}
</script>
