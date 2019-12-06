<template>
  <div id="app">
    <el-button size="small" style="float:right;margin-top:6px;margin-right:6px;" @click="()=>{this.$refs['wfd'].graph.saveXML()}">Save JSON</el-button>
    <el-button size="small" style="float:right;margin-top:6px;margin-right:6px;" @click="()=>{this.modalVisible=true}">View Flowchart</el-button>
    <wfd-vue ref="wfd" :data="keyReplyData" :height="600" :export="exportData" :users="candidateUsers" :groups="candidateGroups" :lang="lang" :onNodeConnected="onNodeConnected" />
    <el-dialog title="" :visible.sync="modalVisible" width="60%">
        <wfd-vue ref="wfd" :data="keyReplyData" :height="300" isView />
    </el-dialog>
  </div>
</template>

<script>
import WfdVue from '../src/components/Wfd'
export default {
  name: 'app',
  components:{
    WfdVue
  },
  data () {
    return {
      modalVisible:false,
      lang: "en",
      keyReplyData: {
        nodes: [
          { id: 'startNode1', x: 200, y: 100, label: 'Start conversation flow from this node', clazz: 'startKr' },
          { id: 'state1', x: 600, y: 100, label: 'ask_location', clazz: 'basicStateKr', type: 'buttons', buttons: [{
            label: 'Main Menu'
          }, {
            label: 'Help & Support'
          }] },
          { id: 'state2', x: 200, y: 350, label: 'serve_menu', clazz: 'basicStateKr', type: 'buttons', buttons: [{
            label: '-Display Restaurant Menu-'
          }] },
          { id: 'endNode', x: 600, y: 350, label: 'End of conversation flow', clazz: 'endKr' }
        ],
        edges: [
          { source: 'startNode1', target: 'state1', sourceAnchor:0, targetAnchor:0, clazz: 'flow' },
          { source: 'state1', target: 'state2', sourceAnchor:1, targetAnchor:0, clazz: 'flow' },
          { source: 'state2', target: 'endNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' }
        ]
      },
      demoData: {
        nodes: [{ id: 'startNode1', x: 100, y: 100, label: '', clazz: 'startKr' },
          { id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart', },
          { id: 'taskNode1', x: 200, y: 200, label: 'heyehy', clazz: 'userTask',  },
          { id: 'taskNode2', x: 400, y: 200, label: '经理审批', clazz: 'scriptTask',  },
          { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', clazz: 'inclusiveGateway',  },
          { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', clazz: 'receiveTask', },
          { id: 'catchNode1', x: 600, y: 200, label: '等待结束', clazz: 'signalCatch', },
          { id: 'endNode', x: 600, y: 320, label: '', clazz: 'end', }],
        edges: [{ source: 'startNode1', target: 'taskNode1', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
          { source: 'startNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
          { source: 'taskNode1', target: 'catchNode1', sourceAnchor:0, targetAnchor:0, clazz: 'flow' },
          { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
          { source: 'taskNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' },
          { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2, clazz: 'flow' },
          { source: 'gatewayNode', target: 'taskNode3', sourceAnchor:2, targetAnchor:0, clazz: 'flow' },
          { source: 'gatewayNode', target: 'endNode', sourceAnchor:1, targetAnchor:2, clazz: 'flow'},
          { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1, clazz: 'flow' },
          { source: 'catchNode1', target: 'endNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' }]
      },
      demoData1:{
        nodes: [{ id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start', },
          { id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart', },
          { id: 'taskNode1', x: 200, y: 200, label: '主任审批', clazz: 'userTask',  },
          { id: 'taskNode2', x: 400, y: 200, label: '经理审批', clazz: 'scriptTask', active:true },
          { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', clazz: 'gateway',  },
          { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', clazz: 'receiveTask', },
          { id: 'catchNode1', x: 600, y: 200, label: '等待结束', clazz: 'signalCatch', },
          { id: 'endNode', x: 600, y: 320, label: '', clazz: 'end', }],
        edges: [{ source: 'startNode1', target: 'taskNode1', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
          { source: 'startNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
          { source: 'taskNode1', target: 'catchNode1', sourceAnchor:0, targetAnchor:0, clazz: 'flow' },
          { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3, clazz: 'flow' },
          { source: 'taskNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' },
          { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2, clazz: 'flow' },
          { source: 'gatewayNode', target: 'taskNode3', sourceAnchor:2, targetAnchor:0, clazz: 'flow' },
          { source: 'gatewayNode', target: 'endNode', sourceAnchor:1, targetAnchor:2, clazz: 'flow'},
          { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1, clazz: 'flow' },
          { source: 'catchNode1', target: 'endNode', sourceAnchor:1, targetAnchor:0, clazz: 'flow' }]
      },
      candidateUsers: [{id:'1',name:'Tom'},{id:'2',name:'Steven'},{id:'3',name:'Andy'}],
      candidateGroups: [{id:'1',name:'Manager'},{id:'2',name:'Security'},{id:'3',name:'OA'}],
      exportData: (jsonData) => {
        console.warn('export data', jsonData);
      }
    }
  },
  mounted() {
  },
  methods: {
    onNodeConnected(item) {
      console.warn('connected', item)
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
