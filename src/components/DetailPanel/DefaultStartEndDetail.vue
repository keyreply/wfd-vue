<template>
    <div>
        <div class="panelRow">
            <el-checkbox @change="(value) => onChange('hideIcon', value)"
                         :disabled="readOnly"
                         :value="!!model.hideIcon">{{i18n['hideIcon']}}</el-checkbox>
        </div>
    </div>
</template>
<script>
  export default {
    inject: ['i18n'],
    props: {
      model: {
        type:Object,
        default: ()=>({}),
      },
      onChange: {
        type: Function,
        default: ()=>{}
      },
      readOnly:{
        type: Boolean,
        default: false,
      }
    },
  }
</script>
