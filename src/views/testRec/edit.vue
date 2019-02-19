<template>
  <testRec-detail :is-edit="true"/>
</template>

<script>
import TestRecDetail from './components/TestRecDetail'

export default {
  name: 'EditForm',
  components: { TestRecDetail }
}
</script>

