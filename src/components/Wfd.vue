<template>
  <div class="root">
    <ToolbarPanel ref="toolbar" />
    <div style="display: flex; flex-direction: row; justify-content: flex-start;">
      <ItemPanel ref="addItemPanel" :height="height"/>
      <div class="canvas-container" :style="{'height':height+'px','border-bottom':isView?0:null}">
        <div ref="canvas" class="canvasPanel" :style="{'height':height+'px','width': '100%'}"></div>
      </div>     
      <DetailPanel ref="detailPanel"
                   v-if="!isView"
                   :height="height"
                   :model="selectedModel"
                   :readOnly="mode !== 'edit'"
                   :signalDefs="processModel.signalDefs"
                   :messageDefs="processModel.messageDefs"
                   :onChange="(key,val)=>{onItemCfgChange(key,val)}" />
    </div>
  </div>
</template>
<script>
  import G6 from '@antv/g6/src';
  import { getShapeName } from '../util/clazz'
  import { red } from '../util/defaultStyle'
  import Command from '../plugins/command'
  import Toolbar from '../plugins/toolbar'
  import AddItemPanel from '../plugins/addItemPanel'
  import CanvasPanel from '../plugins/canvasPanel'
  import ToolbarPanel from '../components/ToolbarPanel'
  import ItemPanel from '../components/ItemPanel'
  import DetailPanel from '../components/DetailPanel'
  import i18n from '../locales'
  import {exportXML} from "../util/bpmn"
  import registerShape from '../shape'
  import registerBehavior from '../behavior'
  registerShape(G6);
  registerBehavior(G6);
  export default {
    name: "wfd-vue",
    components: {
      ToolbarPanel,
      ItemPanel,
      DetailPanel
    },
    provide() {
      return {
        i18n: i18n[this.lang]
      }
    },
    props: {
      onNodeClick: {
        type: Function,
        default: () => {}
      },
      isView: {
        type: Boolean,
        default: true,
      },
      mode: {
        type: String,
        default: "edit"
      },
      height: {
        type: Number,
        default: 800,
      },
      lang: {
        type: String,
        default: "en"
      },
      data: {
        type: Object,
        default: () => ({nodes:[],edges:[]})
      },
      export: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        resizeFunc: ()=>{},
        selectedModel: {},
        processModel: {
          id: '',
          name: '',
          clazz: 'process',
          dataObjs: [],
          signalDefs: [],
          messageDefs: [],
        },
        graph:null,
        cmdPlugin: null,
      };
    },
    watch:{
      data(oldData,newData){
        if(oldData !== newData) {
          if (this.graph) {
            this.graph.changeData(this.initShape(newData));
            this.graph.setMode(this.mode);
            this.graph.emit('canvas:click');
            if (this.cmdPlugin) {
              this.cmdPlugin.initPlugin(this.graph);
            }
            if (this.isView) {
              this.graph.fitView(5)
            }
          }
        }
      },
    },
    methods: {
      initShape(data){
        if(data && data.nodes){
          return {
            nodes: data.nodes.map(node => {
              return {
                shape: getShapeName(node.clazz),
                ...node,
              }
            }),
            edges: data.edges
          }
        }
        return data;
      },
      initEvents(){
        this.graph.on('afteritemselected',(items)=>{
          if(items && items.length > 0) {
            const item = this.graph.findById(items[0]);
            const model = item.getModel();
            this.selectedModel = {...model};
            this.onNodeClick(model);
          } else {
            this.selectedModel = this.processModel;
            this.onNodeClick(null);
          }
        });
        const page = this.$refs['canvas'];
        const graph = this.graph;
        const height = this.height-1;
        this.resizeFunc = ()=>{
          graph.changeSize(page.offsetWidth,height);
        };
        window.addEventListener("resize", this.resizeFunc);
      },
      onItemCfgChange(key,value){
        const items = this.graph.get('selectedItems');
        if(items && items.length > 0){
          const item = this.graph.findById(items[0]);
          if(this.graph.executeCommand) {
            this.graph.executeCommand('update', {
              itemId: items[0],
              updateModel: {[key]: value}
            });
          }else {
            this.graph.updateItem(item, {[key]: value});
          }
          this.selectedModel = {...item.getModel()};
        } else {
          const canvasModel = { ...this.processModel, [key]: value};
          this.selectedModel = canvasModel;
          this.processModel = canvasModel;
        }
      }
    },
    destroyed(){
      window.removeEventListener("resize", this.resizeFunc);
      this.graph.getNodes().forEach(node => {
        node.getKeyShape().stopAnimate();
      });
    },
    mounted() {
      let plugins = [];
      if(!this.isView){
        this.cmdPlugin = new Command();
        const toolbar = new Toolbar({container:this.$refs['toolbar'].$el});
        const addItemPanel = new AddItemPanel({container:this.$refs['addItemPanel'].$el});
        const canvasPanel = new CanvasPanel({container:this.$refs['canvas']});
        plugins = [ this.cmdPlugin,toolbar,addItemPanel,canvasPanel ];
      }
      const width = this.$refs['canvas'].offsetWidth;
      this.graph = new G6.Graph({
        plugins: plugins,
        container: this.$refs['canvas'],
        height: 4000,
        width: 4000,
        modes: {
          default: ['drag-canvas', 'clickSelected'],
          view: [ ],
          edit: ['drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
            'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign'],
        },
        defaultEdge: {
          shape: 'flow-polyline-round'
        }
      });
      this.graph.saveXML = (createFile = true) => {
       this.export(this.graph.save());
      }
      this.graph.setMode(this.mode);
      this.graph.data(this.initShape(this.data));
      this.graph.render();
      // if(this.isView && this.data && this.data.nodes){
      //   this.graph.fitView(5)
      // }
      this.initEvents();
    }
  };
</script>
<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
    html, body{
      font-family: 'Open Sans', sans-serif !important;
      font-size: 14px !important;
      font-weight: 400 !important;
    }
    button{
      font-family: 'Open Sans', sans-serif !important;
      font-size: 12px !important;
      font-weight: 600 !important;
    }
    .root{
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: block;
    }
    .canvas-container{
        background-color: #fff;
        border-bottom: 1px solid #E9E9E9;
        width: 90%;
        overflow: auto;
    }
    .canvasPanel {
        flex: 0 0 auto;
        width: 4000px !important;
        height: 4000px !important;
    }
</style>
