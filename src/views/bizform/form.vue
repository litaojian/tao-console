<template>
  <div class="bizForm-container">
    <el-form ref="bizForm" :model="bizForm" :rules="rules" :inline="true" class="form-container">

      <sticky :class-name="'sub-navbar '+ bizForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">提交
        </el-button>
      </sticky>

      <div class="bizForm-main-container">
        <el-row v-for="(layoutRow,rowIndex) in formLayout" :key="rowIndex">
          <el-col v-for="(field,columnIndex) in layoutRow" :key="columnIndex" :span="field.colspan || 12" >
            <el-form-item :prop="field.name" :label="field.label">
              <el-input v-if="(field.type === null || field.type === 'string')" v-model="bizForm[field.name]" :maxlength="field.maxlength || 10" :name="field.name" :required="field.required"/>
              <el-input v-if="field.type === 'number'" v-model="bizForm[field.name]" :maxlength="field.maxlength || 10" :name="field.name" :required="field.required" type="number"/>
              <el-date-picker v-if="field.type === 'datetime'" v-model="bizForm[field.name]" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
              <el-date-picker v-if="field.type === 'date'" v-model="bizForm[field.name]" type="date" format="yyyy-MM-dd" placeholder="选择日期"/>
              <el-select v-if="field.type === 'select'" v-model="bizForm[field.name]" :placeholder="field.placeholder || '请选择'">
                <el-option v-for="item in field.options" :label="item.label" :key="item.value" :value="item.value"/>
              </el-select>
              <el-radio-group v-if="field.type === 'radio'" v-model="bizForm[field.name]">
                <el-radio v-for="(item,index) in field.options" :label="item.label" :key="index" :value="item.value"/>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

      </div>
    </el-form>

  </div>
</template>

<script>
import { getBizFormConfig, getAction, postAction } from '@/api/bizform'
import { validateURL } from '@/utils/validate'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'BizForm',
  components: { MDinput, Sticky },
  data() {
    return {
      bizForm: Object.assign({}, defaultForm),
      rules: {},
      tempRoute: {},
      loading: false,
      formName: null,
      formLayout: [],
      rowId: undefined,
      bizConfig: null,
      listLoading: true,
      restUrl: null,
      options: [{ 'lable': 'T1', 'value': 1 }, { 'lable': 'T2', 'value': 2 }, { 'lable': '草稿', 'value': 'draft' }]
    }
  },
  created() {
    // debugger
    this.formName = this.$route.params && this.$route.params.formname
    this.rowId = this.$route.params && this.$route.params.rowid
    this.getConfig()
  },
  methods: {
    validateSourceUri(rule, value, callback) {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确1',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    },
    validateRequire(rule, value, callback) {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    },
    getConfig() {
      getBizFormConfig(this.formName).then(response => {
        this.bizConfig = response.data.config
        this.restUrl = this.bizConfig.restUrl
        this.rules = this.bizConfig.rules
        this.formLayout = this.bizConfig.formLayout
        this.listLoading = false
        // console.log('bizFormConfig: ' + JSON.stringify(this.bizConfig))
        if (this.actionUrl) {
          this.getFormData()
        }
      })
    },
    getFormData() {
      getAction(this.restUrl + '/' + this.rowId, this.queryParams).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        // console.log('bizData: ' + JSON.stringify(this.list))
      })
    },
    submitForm() {
      console.log('Form Data:' + JSON.stringify(this.bizForm))
      this.$refs.bizForm.validate(valid => {
        if (valid) {
          this.loading = true
          postAction(this.restUrl, this.bizForm).then(response => {
            console.log(this.restUrl + ' POST result :' + response)
            if (response.errcode === 0) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '保存失败',
                type: 'warn',
                duration: 2000
              })
            }
          })

          // this.bizForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.bizForm-container {
  position: relative;
  .bizForm-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>

