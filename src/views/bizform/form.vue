<template>
  <div class="createPost-container">
    <el-form ref="mainForm" :model="mainForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+ mainForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="submitForm">草稿</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="mainForm.title" :maxlength="100" name="name" required>
                标题1
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="mainForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">
                    <el-rate
                      v-model="mainForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

      </div>
    </el-form>

  </div>
</template>

<script>
import { getBizFormConfig, getAction } from '@/api/bizform'
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
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
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
    }
    return {
      mainForm: Object.assign({}, defaultForm),
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      loading: false,
      formName: null,
      rowId: undefined,
      bizConfig: null,
      listLoading: true,
      restUrl: null
    }
  },
  created() {
    // debugger
    this.formName = this.$route.params && this.$route.params.formname
    this.rowId = this.$route.params && this.$route.params.rowid
    this.getConfig()
  },
  methods: {
    getConfig() {
      getBizFormConfig(this.formName).then(response => {
        this.bizConfig = response.data.config
        this.restUrl = this.bizConfig.restUrl
        this.formFields = this.bizConfig.formFields
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
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
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
.createPost-container {
  position: relative;
  .createPost-main-container {
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

