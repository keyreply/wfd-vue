const deepMix = require('@antv/util/lib/deep-mix');
import editorStyle, { red, red2, white, blue, lightGrey, lightGreyBg } from "../util/defaultStyle";

function testWhite(x) {
  var white = new RegExp(/^\s$/);
  return white.test(x.charAt(0));
};

function wordWrap(str, maxWidth) {
  var newLineStr = "\n"; 
  var done = false; 
  var res = '';
  while (str.length > maxWidth) {                 
      var found = false;
      // Inserts new line at first whitespace of the line
      for (var i = maxWidth - 1; i >= 0; i--) {
          if (testWhite(str.charAt(i))) {
              res = res + [str.slice(0, i), newLineStr].join('');
              str = str.slice(i + 1);
              found = true;
              break;
          }
      }
      // Inserts new line at maxWidth position, the word is too long to wrap
      if (!found) {
          res += [str.slice(0, maxWidth), newLineStr].join('');
          str = str.slice(maxWidth);
      }

  }
  return res + str;
}

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
    lineWidth: 0.5
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
      opacity: 0
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
    stroke: lightGrey,
    cursor: 'default',
    lineWidth: 0.5,
    width: 300,
    height: 150
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
      fontSize: 12,
      x: -65,
      y: 50,
      textAlign: 'left',
      width: 50
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
      group.addShape('rect', {
        attrs: {
          x: -70,
          y: 30,
          fill: '#eee',
          width: 270,
          height: 40,
          radius: 5
        }
      });
      group.addShape('text', {
        attrs: {
          x: -70,
          y: 0,
          fill: '#fff',
          text: 'conversation_start',
          textBaseline: 'left',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12,
          fontWeight: 600
        }
      });
      group.addShape('rect', {
        attrs: {
          x: -85,
          y: -25,
          fill: lightGreyBg,
          width: 300,
          height: 40
        }
      });
      group.addShape('text', {
        attrs: {
          x: -70,
          y: 0,
          fill: '#fff',
          text: 'conversation_start',
          textBaseline: 'left',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12,
          fontWeight: 600
        }
      });
      group.addShape('text', {
        attrs: {
          x: -60,
          y: 57,
          fill: '#333',
          text: cfg.label,
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12
        }
      });
    },
    options: {
      ...deepMix({},startDefaultOptions)
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
      group.addShape('rect', {
        attrs: {
          x: -85,
          y: -25,
          fill: lightGreyBg,
          width: 300,
          height: 40
        }
      });
      group.addShape('rect', {
        attrs: {
          x: -70,
          y: 30,
          fill: '#eee',
          width: 270,
          height: 40,
          radius: 5
        }
      });
      group.addShape('text', {
        attrs: {
          x: -70,
          y: 0,
          fill: '#fff',
          text: 'conversation_end',
          textBaseline: 'center',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12,
          fontWeight: 600
        }
      });
      group.addShape('text', {
        attrs: {
          x: -60,
          y: 57,
          fill: '#333',
          text: cfg.label,
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12
        }
      });
    },
    options: {
      ...deepMix({},startDefaultOptions)
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
    options: deepMix({},taskDefaultOptions),
    afterDraw(cfg, group) {
      group.addShape('rect', {
        attrs: {
          x: -85,
          y: -25,
          fill: lightGreyBg,
          width: 300,
          height: 40
        }
      });

      // print text
      let textLines = 1;
      let text = '';
      if(Array.isArray(cfg.text)) {
        _.forEach(cfg.text, singleText => {
          const wrapped = wordWrap(singleText, 38)
          textLines += ((wrapped.match(/\n/g)) || []).length
          text +=  wrapped + "\n"
        })
      } else {
        text = wordWrap(cfg.text, 38);
        textLines = ((text.match(/\n/g)) || []).length
      }
    
      group.addShape('rect', {
        attrs: {
          x: -70,
          y: 30,
          fill: '#eee',
          width: 270,
          height: 40 + (15 * (textLines)),
          radius: 5
        }
      });
      group.addShape('text', {
        attrs: {
          x: -60,
          y: 45,
          fill: '#333',
          text: text,
          textBaseline: 'top',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12
        }
      });


      if (cfg.type === 'buttons') {
        let y = 40 + (15 * (textLines + 2));
        // print buttons
        _.forEach(cfg.buttons, (button) => {
          let label = button.label;
          if(label) { label = `${label.slice(0,25)}${label.length > 25 ? '...' : ''}` }

          group.addShape('rect', {
            attrs: {
              x: -70,
              y,
              fill: white,
              stroke: lightGrey,
              lineWidth: 0.5,
              height: 45, 
              width: 270
            }
          });
          group.addShape('text', {
            attrs: {
              x: -55,
              y: y + 27,
              fill: blue,
              text: label,
              textBaseline: 'left',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: 12,
              fontWeight: 600
            }
          });
          y += 45
        })
      }

      //print big label
      let buttonLabel = cfg.label;
      if(buttonLabel) { buttonLabel = `${buttonLabel.slice(0,28)}${buttonLabel.length > 28 ? '...' : ''}` }
      group.addShape('text', {
        attrs: {
          x: -70,
          y: 0,
          fill: '#fff',
          text: buttonLabel,
          textBaseline: 'left',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 12,
          fontWeight: 600
        }
      });
    },
    getAnchorPoints() {
      return [
        [0, 0.5], // left
        [1, 0.5] // right
      ]
    },
    getShapeStyle(cfg) {
      let nodeHeight = 175;
      const buttons = _.get(cfg, 'buttons', [])
     // print text
     let textLines = 1;
     if(Array.isArray(cfg.text)) {
       _.forEach(cfg.text, text => {
         const wrapped = wordWrap(text, 38)
         textLines += ((wrapped.match(/\n/g)) || []).length
       })
     } else {
      const wrapped = wordWrap(cfg.text, 38)
       textLines = ((wrapped.match(/\n/g)) || []).length
     }
      // calculate height based on buttons and text length
      if(buttons.length > 1){
        nodeHeight = nodeHeight + (45 * (buttons.length - 1)) + (15 * textLines)
      }

      cfg.size = [300, nodeHeight];
      const width = cfg.size[0];
      const height = cfg.size[1];
      const style = {
        x: -85,
        y: -25,
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
