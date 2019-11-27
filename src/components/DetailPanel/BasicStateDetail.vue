<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['userTask']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>{{i18n['basicState.triggerType.title']}}：</div>
                <el-select style="width:90%; font-size: 12px"
                           :placeholder="i18n['basicState.triggerType.placeholder']"
                           :value="model.assignType"
                           :disabled="readOnly"
                           @change="(e) => { onChange('assignValue', []);onChange('assignType', e) }">
                    <el-option key="automatic" value="automatic" :label="i18n['userTask.assignType.automatic']"/>
                    <el-option key="button" value="button" :label="i18n['userTask.assignType.button']"/>
                    <el-option key="custom" value="custom" :label="i18n['userTask.assignType.custom']"/>
                </el-select>
            </div>
            <div v-if="model.assignType === 'button'" class="panelRow">
                <div>{{i18n['basicState.triggerType.button.title']}}：</div>
               <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.assignValue"
                          @input="(value) => {onChange('conditionExpression', value)}" />
            </div>
            <div v-else-if="model.assignType === 'persongroup'" class="panelRow">
                <div>{{i18n['userTask.assignType.persongroup.title']}}：</div>
                <el-select style="width:90%; font-size:12px"
                           :placeholder="i18n['userTask.assignType.persongroup.placeholder']"
                           :value="model.assignValue"
                           :disabled="readOnly"
                           :multiple="true"
                           :filterable="true"
                           :filter-method="(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0"
                           @change="(e) => onChange('assignValue', e)">
                    <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id" />
                </el-select>
            </div>
            <div v-else-if="model.assignType === 'custom'" class="panelRow">
                <div>{{i18n['userTask.assignType.custom.title']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :value="model.javaClass"
                          :disabled="readOnly"
                          @input="(e) => onChange('javaClass', e.target.value)" />
            </div>
        </div>
    </div>
</template>
<script>
  import DefaultDetail from "./DefaultDetail";
  export default {
    inject: ['i18n'],
    components: {
      DefaultDetail
    },
    props: {
      model: {
        type:Object,
        default: ()=>({}),
      },
      users: {
        type: Array,
        default: ()=>([]),
      },
      groups: {
        type: Array,
        default: ()=>([]),
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
