const deepMix = require('@antv/util/lib/deep-mix');
import editorStyle, { red, red2, white, grey, lightGrey } from "../util/defaultStyle";

const taskDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 15,
    top: 14
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: white,
    stroke: lightGrey,
    cursor: 'default',
    lineWidth: 2,
    radius: 10,
    width: 300,
    height: 200
  },
  stateStyles: {
    selected: {
      fill: red2,
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  },
  labelCfg: {
    style: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 14,
      fontWeight: 600
    }
  }
};

const gatewayDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 20,
    height: 20,
    left: 2,
    top: 2,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#E8FEFA',
    stroke:'#13C2C2',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#8CE8DE',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const startDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 20,
    top: 15,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: white,
    stroke: red,
    cursor: 'default',
    radius: 10,
    lineWidth: 2,
    width: 300,
    height: 200
  },
  stateStyles: {
    selected: {
      fill: red2,
      stroke: red2
    },
    hover: {
      fill: red2,
      cursor: editorStyle.cursor.hoverNode,
    }
  },
  labelCfg: {
    style: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 14,
      fontWeight: 600
    }
  }
};

const endDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 18,
    height: 18,
    left: 20,
    top: 15,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: white,
    stroke: red,
    cursor: 'default',
    radius: 25,
    lineWidth: 2
  },
  stateStyles: {
    selected: {
      fill: white,
      stroke: red2
    },
    hover: {
      fill: red2,
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

const catchDefaultOptions = {
  icon: null,
  iconStyle: {
    width: 20,
    height: 20,
    left: -10,
    top: -8,
  },
  style:{
    ...editorStyle.nodeStyle,
    fill: '#FEF7E8',
    stroke:'#FA8C16',
    cursor: 'default',
  },
  stateStyles: {
    selected: {
      fill: '#FCD49A',
    },
    hover: {
      cursor: editorStyle.cursor.hoverNode,
    }
  }
};

export default function(G6) {
  // keyreply nodes and configs
  G6.registerNode('start-node-kr', {
    shapeType: 'rect',
    afterDraw(cfg, group) {
      group.addShape('text', {
        attrs: {
          x: -35,
          y: 4,
          fill: '#333',
          text: 'conversation_start',
          textBaseline: 'left',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 14,
          fontWeight: 600
        }
      });
    },
    options: {
      ...deepMix({},startDefaultOptions,{icon: require('../assets/icons/flow/start.png')})
    },
    getShapeStyle(cfg) {
      cfg.size = [170, 50];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...this.options.style,
      };
      return style;
    },
    getAnchorPoints() {
      return [
        [1, 0.5], // right
      ]
    }
  }, 'base-node');

  G6.registerNode('end-node-kr', {
    shapeType: 'rect',
    afterDraw(cfg, group) {
      group.addShape('text', {
        attrs: {
          x: -35,
          y: 4,
          fill: '#333',
          text: 'conversation_end',
          textBaseline: 'center',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 14,
          fontWeight: 600
        }
      });
    },
    options: {
      ...deepMix({},startDefaultOptions,{icon: require('../assets/icons/flow/end.png')})
    },
    getShapeStyle(cfg) {
      cfg.size = [170, 50];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...this.options.style,
      };
      return style;
    },
    getAnchorPoints() {
      return [
        [0, 0.5], // left
      ]
    }
  }, 'base-node');

  G6.registerNode('basic-state-kr', {
    shapeType: 'rect',
    options: deepMix({},taskDefaultOptions,{
      icon: require('../assets/icons/flow/task.png')
    }),
    afterDraw(cfg, group) {
      console.warn(cfg)
    },
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5] // right
      ]
    },
    getShapeStyle(cfg) {
      cfg.size = [170, 50];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...this.options.style,
      };
      return style;
    }
  }, 'base-node');


  G6.registerNode('task-node', {
    shapeType: 'rect',
    options:{
      ...taskDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [170, 50];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        ...this.options.style,
      };
      return style;
    }
  }, 'base-node');
  G6.registerNode('gateway-node', {
    shapeType: 'path',
    labelPosition: 'bottom',
    options:{
      ...gatewayDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [40, 40];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const gap = 4;
      const style = {
        path: [
          ['M', 0 - gap, 0 - height / 2 + gap],
          ['Q', 0, 0 - height / 2, gap, 0 - height / 2 + gap],
          ['L', width / 2 - gap, 0 - gap],
          ['Q', width / 2, 0, width / 2 - gap, gap],
          ['L', gap, height / 2 - gap],
          ['Q', 0, height / 2, 0 - gap, height / 2 - gap],
          ['L', -width / 2 + gap, gap],
          ['Q', -width / 2, 0, -width / 2 + gap, 0 - gap],
          ['Z']
        ],
        ...this.options.style,
      };
      return style;
    },
  }, 'base-node');
  G6.registerNode('exclusive-gateway-node', {
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -8, -8],
            ['L', 8, 8],
            ['Z'],
            ['M', 8, -8],
            ['L', -8, 8],
            ['Z']
          ],
          lineWidth: 2,
          stroke: this.options.style.stroke,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'gateway-node');
  G6.registerNode('parallel-gateway-node', {
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', 0, -10],
            ['L', 0, 10],
            ['Z'],
            ['M', -10, 0],
            ['L', 10, 0],
            ['Z']
          ],
          lineWidth: 2,
          stroke: this.options.style.stroke,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'gateway-node');
  G6.registerNode('inclusive-gateway-node', {
    afterDraw(cfg, group) {
      group.icon = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 10,
          lineWidth: 2,
          stroke: this.options.style.stroke,
        }
      });
      this.runAnimate(cfg,group);
    },
  }, 'gateway-node');
  G6.registerNode('start-node', {
    shapeType: 'circle',
    labelPosition: 'bottom',
    options: {
      ...startDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [30, 30];
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...this.options.style,
      };
      return style;
    },
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -6],
            ['L', 6, 0],
            ['L', -4, 6],
            ['Z'] // close
          ],
          fill: this.options.style.stroke,
          stroke: this.options.style.stroke,
        }
      });
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
      ]
    }
  }, 'base-node');
  G6.registerNode('end-node', {
    shapeType: 'circle',
    labelPosition: 'bottom',
    options: {
      ...endDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [30, 30];
      const width = cfg.size[0];
      const style = {
        x: 0,
        y: 0,
        r: width / 2,
        ...this.options.style,
      };
      return style;
    },
    afterDraw(cfg, group) {
      group.icon = group.addShape('path', {
        attrs: {
          path: [
            ['M', -4 , -4],
            ['L', 4, -4],
            ['L', 4, 4],
            ['L', -4, 4],
            ['Z'] // close
          ],
          fill: this.options.style.stroke,
          stroke: this.options.style.stroke,
        }
      });
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [0.5, 1], // bottom
        [0, 0.5], // left
      ]
    }
  }, 'base-node');
  G6.registerNode('catch-node', {
    shapeType: 'path',
    labelPosition: 'bottom',
    options: {
      ...catchDefaultOptions
    },
    getShapeStyle(cfg) {
      cfg.size = [50, 30];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        path: [
          ['M', 0 , -height/3],
          ['L', width/2, -height/3],
          ['L', 0, height/3*2],
          ['L', -width/2, -height/3],
          ['Z'] // close
        ],
        ...this.options.style,
      };
      return style;
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [0.8, 0.38], // right
        [0.5, 1], // bottom
        [0.2, 0.38], // left
      ]
    }
  }, 'base-node');
  G6.registerNode('user-task-node', {
    options: deepMix({},taskDefaultOptions,{
      icon: require('../assets/icons/flow/icon_user.svg'),
      style: {
        fill: '#E7F7FE',
        stroke: '#1890FF',
      },
      stateStyles: {
        selected: {
          fill: '#95D6FB',
        },
      }
    }),
  }, 'task-node');
  G6.registerNode('script-task-node', {
    options: deepMix({},taskDefaultOptions,{
      icon: require('../assets/icons/flow/icon_script.svg'),
      style: {
        fill: '#FFF7E6',
        stroke: '#FFA940',
      },
      stateStyles: {
        selected: {
          fill: '#FFE7BA',
        },
      }
    }),
  }, 'task-node');
  G6.registerNode('java-task-node', {
    options: deepMix({},taskDefaultOptions,{
      icon: require('../assets/icons/flow/icon_java.svg'),
      style: {
        fill: '#FFF1F0',
        stroke: '#FF4D4F',
      },
      stateStyles: {
        selected: {
          fill: '#FFCCC7',
        },
      }
    }),
  }, 'task-node');
  G6.registerNode('mail-task-node', {
    options: deepMix({},taskDefaultOptions,{
      icon: require('../assets/icons/flow/icon_mail.svg'),
      style: {
        fill: '#F6FFED',
        stroke: '#73D13D',
      },
      stateStyles: {
        selected: {
          fill: '#D9F7BE',
        },
      }
    }),
  }, 'task-node');
  G6.registerNode('receive-task-node', {
    options: deepMix({},taskDefaultOptions,{
      icon: require('../assets/icons/flow/icon_receive.svg'),
      style: {
        fill: '#FFF0F6',
        stroke: '#FF85C0',
      },
      stateStyles: {
        selected: {
          fill: '#FFD6E7',
        },
      }
    }),
  }, 'task-node');
  G6.registerNode('timer-start-node', {
    options: deepMix({},startDefaultOptions,{icon: require('../assets/icons/flow/icon_timer.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('message-start-node', {
    options: deepMix({},startDefaultOptions,{icon: require('../assets/icons/flow/icon_message.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('signal-start-node', {
    options: deepMix({},startDefaultOptions,{icon: require('../assets/icons/flow/icon_signal.svg')}),
    afterDraw(cfg, group) { this.runAnimate(cfg,group) },
  }, 'start-node');
  G6.registerNode('timer-catch-node', {
    options: deepMix({},catchDefaultOptions,{icon: require('../assets/icons/flow/icon_timer.svg')}),
  }, 'catch-node');
  G6.registerNode('signal-catch-node', {
    options: deepMix({},catchDefaultOptions,{icon: require('../assets/icons/flow/icon_signal.svg')}),
  }, 'catch-node');
  G6.registerNode('message-catch-node', {
    options: deepMix({},catchDefaultOptions,{icon: require('../assets/icons/flow/icon_message.svg')}),
  }, 'catch-node');
}
