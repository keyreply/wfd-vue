export default function(G6){
  G6.registerBehavior('hoverNodeActived', {
    getEvents() {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'anchor:mouseleave': 'onAnchorLeave',
      }
    },
    onAnchorLeave(e){
      let node = e.item.getContainer().getParent();
      if(node && !this.graph.get('onDragEdge')) {
        this.graph.setItemState(node.get('item'), 'show-anchor', false);
      }
    },
    onNodeEnter(e){
      if(!e.item) { return; }
      const clazz = e.item.getModel().clazz;
      if(clazz !== 'endEvent' && !this.graph.get('onDragEdge')){
        this.graph.setItemState(e.item, clazz == 'startKr' || clazz == 'endKr' ? 
        'show-anchor-red' : 'show-anchor', true);
      }
    },
    onNodeLeave(e){
      if(!e.item) { return; }
      const clazz = e.item.getModel().clazz
      if(e.target.type !== 'marker' && !this.graph.get('onDragEdge')) {
        this.graph.setItemState(e.item, clazz == 'startKr' || clazz == 'endKr' ? 
        'show-anchor-red' : 'show-anchor', false);
      }
    },
  });
}