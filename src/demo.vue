<template>
<article id="demo">
	<div class="item">
		<button class="button" @click="fnPopup('tips')">点击弹出tips框</button>
	</div>
	
	<div class="item">
		<button class="button" @click="fnPopup('alert')">简单alert框</button>
	</div>

	<div class="item">
		<button class="button" @click="fnPopup('alert-pro')">高级alert框</button>
	</div>

	<div class="item">
		<button class="button" @click="fnPopup('confirm')">confirm框</button>
	</div>

	<div class="item">
		<button class="button" @click="fnPopup('show')">底层高级写法</button>
	</div>
</article>
</template>

<script>




module.exports= {
	methods: {
		fnPopup: function(type){
			switch(type){
				case 'tips':
					Vue.popup.tips('弹出tips框')
					break;
				case 'alert':
					Vue.popup.alert('简单alert')
					break;
				case 'alert-pro':
					Vue.popup.alert({
						title: '自定义标题',
						msg: '自定义描述',
						btnText: '确认', //默认确认
						btnCb: function(){
							Vue.popup.tips('按钮回调')
						}
					});
					break;
				case 'confirm': 
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
							this.tips('禁用默认行为')
						}
					});
					break;
				case 'show': 
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
					break;
			}
			
		}
	}
}
</script>

<style lang='less'>
@import "./css/common";
@import "./css/grid";
@import "./css/popup";
#demo{
	
	padding: 20px;
	.item{
		margin-bottom: 20px;
		text-align: center;
	}
	.button{
		display: inline-block;
		border: 1px solid @line;
		.border-radius(4px);
		padding: 10px 20px;

		&:active{
			background: #f5f5f5;
		}
	}
}
</style>
