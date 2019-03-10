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
              <router-link v-if="action.type === 'edit' && action.hidden === false" :to="'edit/'+scope.row.id">
                <el-button size="small" icon="el-icon-edit">{{ action.label }}</el-button>
              </router-link>
              <router-link v-if="action.type === 'delete' && action.hidden === false" :to="'delete/'+scope.row.id">
                <el-button size="small" icon="el-icon-delete">{{ action.label }}</el-button>
              </router-link>
              <router-link v-if="action.type === 'view' && action.hidden === false" :to="'view/'+scope.row.id">
                <el-button size="small" icon="el-icon-view">{{ action.label }}</el-button>
              </router-link>
              <router-link v-if="action.type === 'print' && action.hidden === false" :to="'print/'+scope.row.id">
                <el-button size="small" icon="el-icon-print">{{ action.label }}</el-button>
              </router-link>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getBizQueryConfig, fetchDataList } from '@/api/bizquery'
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
      id: undefined,
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
    this.id = this.$route.params && this.$route.params.id
    this.getConfig()
  },
  methods: {
    getConfig() {
      getBizQueryConfig(this.id).then(response => {
        this.bizConfig = response.data.config
        this.dataUrl = this.bizConfig.dataUrl
        this.dataColumns = this.bizConfig.columns
        this.listLoading = false
        // console.log('bizConfig: ' + JSON.stringify(this.bizConfig))
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
    }

  }
}
</script>
