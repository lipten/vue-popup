exports.install = function (Vue, options) {
  function each(arr,cb){
    for(var i = 0,len = arr.length;i<len; i++){
      cb(arr[i],i)
    }
  }

  // 控制执行流程
  var popupDefault = false;

  var Popup = function(opt){
    this.close = function(){
      var popupTip = document.getElementsByClassName('popup-tip')
      var popupBox = document.getElementsByClassName('popup-box')
      if(popupTip&&popupTip.length>0){
        each(popupTip,function(item,i){
          document.body.removeChild(item);
        })
      }
      if(popupBox&&popupBox.length>0){
        each(popupBox,function(item,i){
          document.body.removeChild(item);
        })
      }
    }

    this.stop = function(){
      popupDefault = true
    }

    this.goon = function(){
      popupDefault = false
    }
  }

  // 最简单的一句提示语，2秒消失
  Popup.prototype.tips = function(title,position){
      //position：top,middle(default),bottom
      position = position||'middle';
      var ele = document.createElement("div");
      ele.className = 'popup-tip '+position;
      ele.innerHTML = '<div class="title">'+title+'</div>';
      document.body.appendChild(ele);
      setTimeout(function(){
        document.body.removeChild(ele);
      },2000);
  }

  // 基础底层弹出框方法
  Popup.prototype.show = function(opt){
    var self = this
    var ele = document.createElement("div");
    ele.className = 'popup-box';
    // 输出标题
    var title = opt.title&&'<div class="title">'+opt.title+'</div>' || ''
    // 输出消息
    var msg = opt.msg&&'<div class="msg">'+opt.msg+'</div>' || ''
    // 输出按钮组
    var btn = '<div class="btn row">'
    for(var i = 0, len=opt.btn.length; i<len; i++){
      btn += '<a class="popup-btn col" data-index="'+i+'">'+opt.btn[i].name+'</a>'
    }
    btn += '</div>'
    ele.addEventListener('click',function(e){
      if(e.target && e.target.className.match('popup-btn')) {
        // 得到按钮的索引
        var index = e.target.getAttribute("data-index");
        // 初始化点击流程
        popupDefault = false;
        opt.btn[index].cb&&opt.btn[index].cb.call(self);
      }
    })
    ele.innerHTML = '<div class="box">'+
    '<div class="content">'+
      title+msg+
    '</div>'
    +btn+
    '</div>';
    document.body.appendChild(ele);

    return this
  }

  // 基于底层弹出框方法的单个按钮警告框
  Popup.prototype.alert = function(opt){
    this.show({
      title : opt.title||opt,
      msg : opt.msg,
      btn : [
        {
          name: opt.btnText||'确定',
          cb : function(){
            opt.btnCb&&opt.btnCb.call(this)
            if(!popupDefault){
              this.close()
            }
          }
        },
      ]
    })
    return this;
  }

  // 两个按钮确认框
  Popup.prototype.confirm = function(opt){
    this.show({
      title : opt.title,
      msg : opt.msg,
      btn : [
        {
          name: opt.cancelText||'取消',
          cb : function(){
            opt.cancelCb&&opt.cancelCb.call(this)
            if(!popupDefault){
              this.close()
            }
          }
        },
        {
          name: opt.okText||'确认',
          cb : function(){
            opt.okCb&&opt.okCb.call(this)
            if(!popupDefault){
              this.close()
            }
          }
        },
      ]

    })
    return this
  }




  Vue.popup = new Popup(options);

}
