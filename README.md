## Workflow Designer for Vue

[![NPM Version](http://img.shields.io/npm/v/wfd-vue.svg?style=flat)](https://www.npmjs.org/package/wfd-vue)
[![NPM Downloads](https://img.shields.io/npm/dm/wfd-vue.svg?style=flat)](https://www.npmjs.org/package/wfd-vue)
![](https://img.shields.io/badge/license-MIT-000000.svg)

![image](https://github.com/keyreply/wfd-vue/raw/feature/flow-test/example/snapshots/1.png)

## Online Demo
https://guozhaolong.github.io/wfd-vue/

## Usage
```
<template>
  <div id="app">
    <wfd-vue ref="wfd" :data="demoData" :height="600" :users="candidateUsers" :groups="candidateGroups" :lang="lang" />
  </div>
</template>

<script>
import WfdVue from 'wfd-vue'
export default {
  name: 'app',
  components:{
    WfdVue
  },
  data () {
    return {
      lang: "en",
      data: {...},
      export: () => { ... }
    }
  }
}
</script>
```

## API
###### Attributes
* data: initial data
* height: canvas height
* mode: view/edit
* lang: en
* isView: whether it is preview mode (hide the toolbar and property bar)

###### Methods
* export(): export to JSON data, including nodes, edges, and groups


### Run Example
```
npm run serve
```
