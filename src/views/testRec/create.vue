<template>
  <testrec-detail :is-edit="false"/>
</template>

<script>
import TestrecDetail from './components/TestRecDetail'

export default {
  name: 'CreateForm',
  components: { TestrecDetail }
}
</script>

