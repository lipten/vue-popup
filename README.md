>基于Vue.js的浮层插件，全局调用，高性能自动插入和销毁，可同时出现多个。


## Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## Usage

引入插件

``` 
var Vue = require('vue');
var popup = require('./vue-popup');
Vue.use(popup);
window.Vue = Vue

```

全局调用

```
Vue.popup.tips('弹出tips框')

Vue.popup.alert('简单alert')

```



## Methods
包含以下popup方法：

* [`tips` 气泡提示语](#tips)
* [`alert` 警告框](#alert)
* [`confirm` 确认框](#confirm)
* [`show` 底层popup方法](#show)

##tips

···
Vue.popup.tips('弹出tips框')
···


###Vue.popup.tips(msg,position)
| 参数  | 说明                    |
| ------------ | ---------------------------------------- |
| msg [string] | 提示语              |
| postion [string]      | 显示位置 `'top'`,`'down'` ,默认中间                                  |

##alert

```
Vue.popup.alert('简单alert')

Vue.popup.alert({
	title: '自定义标题',
	msg: '自定义描述',
	btnText: '确认', //默认确认
	btnCb: function(){
		Vue.popup.tips('按钮回调')
	}
});

```


###Vue.popup.alert(option)
| 参数  | 说明                    |
| ------------ | ---------------------------------------- |
| option [string \| object] |  当参数为字符串时作为title显示简单alert框,当参数类型为对象时请看下面解释            |

###option
| 键名  | 键值                    |
| ------------ | ---------------------------------------- |
| title [string] |  标题            |
| msg [string] |  描述            |
| btnText [string] |   按钮文字    |
| btnCb [function] |  确认按钮回调            |


##confirm
```
Vue.popup.confirm({
	title: '自定义标题',
	msg: '自定义描述',
	cancelText: '取消', // 默认取消
	cancelCb: function(){
		Vue.popup.tips('左边按钮回调，默认关闭弹框')
		
	},
	okText: '确认', // 默认确认
	okCb: function(){
		// 禁用默认行为
        this.stop()
		Vue.popup.tips('禁用默认行为')
	}
});

```

###Vue.popup.confirm(option)
| 参数  | 说明                    |
| ------------ | ---------------------------------------- |
| option [object] |  参数类型为对象请看下面解释            |

###option
| 键名  | 键值                    |
| ------------ | ---------------------------------------- |
| title [string] |  标题            |
| msg [string] |  描述            |
| cancelText [string] |   左边按钮文字    |
| cancelCb [function] |  左边按钮回调  |
| okText [string] |   右边按钮文字    |
| okCb [function] |  右边按钮回调  |


###show
>以上的alert和confirm方法都是基于这个show方法封装的。

```
Vue.popup.show({
	title: '自定义标题',
	msg: '自定义描述'+
	'<button onclick="Vue.popup.tips(&#39;弹出提示语&#39;)">弹出tips</button>'+
	'<button onclick="Vue.popup.tips(&#39;顶部提示语&#39;,&#39;top&#39;)">弹出顶部tips</button>'+
	'<button onclick="Vue.popup.tips(&#39;底部提示语&#39;,&#39;bottom&#39;)">弹出底部tips</button>',
	btn : [
        {
          name: '自定义按钮',
          cb : function(){
            
          }
        },
        {
          name: '关闭弹框',
          cb : function(){
            this.close()
          }
        },
      ]
})
```

###Vue.popup.show(option)
| 参数  | 说明                    |
| ------------ | ---------------------------------------- |
| option [object] |  参数类型为对象请看下面解释            |

###option [object]
| 键名  | 键值                    |
| ------------ | ---------------------------------------- |
| title [string] |  标题            |
| msg [string] |  描述            |
| btn [array] |   按钮数组，数组每个元素为一个对象，每个对象定义一个按钮，定义见下表    |


###btn [array][item]

| 键名  | 键值                    |
| ------------ | ---------------------------------------- |
| name [string] |  按钮文字            |
| cb [string] |  按钮点击回调            |



###Vue.popup.stop()
无参数，通常放在按钮回调里以阻止按钮默认关闭的动作。

###Vue.popup.close()
无参数，手动关闭所有浮层。

### 回调this指针
每个按钮回调都可以调用回调返回的方法，如下实例

···
Vue.popup.confirm({
	okCb: function(){
		// 禁用默认行为
        this.stop()
		Vue.popup.tips('禁用默认行为')
	}
});

···

回调里的this相当于Vue.popup对象,所以也可以用Vue.popup.stop()



