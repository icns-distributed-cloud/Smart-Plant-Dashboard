<template>
  <div class="toolbar">
    <div class="shape clearfix" v-for="s in shape" v-bind:key="s.id">
        <div class="shape-header">{{s.header}}</div>
        <ul class="shape-wrapper">
            <li draggable="true"  @dragstart="dragstart($event,item)" v-for="item in s.icon" v-bind:key="item.command" :class="'iconfont '+item.iconName">
              <div v-html="item.path" :title="item.text"></div>
            </li>
        </ul>
    </div>
    
    <div class="shape clearfix shape-image" v-if="customize.length">
          <div class="shape-header clearfix">
            My Images
          </div>

          <ul class="clearfix">
             <li draggable="true" v-for="(item,index) in precustomize" v-bind:key="index"  @dragstart="dragstart($event,item)"><img draggable="false" :src="item.image" alt=""></li>
          </ul>

          <div class="shape-header clearfix" v-if="customize.length>=15" @click.stop="showAllImage=!showAllImage" style="text-align:center;font-size:12px;">
              More Images
          </div>

          <ul class="all-image clearfix"  v-if="showAllImage">
              <li draggable="true" v-for="(item,index) in customize" v-bind:key="index"  @dragstart="dragstart($event,item)"><img draggable="false" :src="item.image" alt=""></li>
          </ul>
    </div>

    <div class="customize-win" v-if="showCustomize">
        <div class="customize-win-header">
           <span>添加自定义图片</span>
           <div @click.stop="showCustomize=false" class="close iconfont icon-guanbi"></div>
        </div>

        <div class="customize-image">
            <ul>
             <li draggable="true" v-for="(item,index) in customize" v-bind:key="index">
               <span @click.stop="removeImage(item)" class="iconfont icon-guanbi"></span>
               <img draggable="false" :src="item.image" alt="">
            </li>

             <li @click.stop="showUpload=!showUpload"><span class="iconfont icon-add" style="color:#666;font-size:48px;line-height:44px;text-align:center;cursor:pointer"></span></li>
           </ul>
        </div>
    </div>

    <div class="upload-win" v-if="showUpload">
         <div class="customize-win-header">
           <div @click.stop="showUpload=false" class="close iconfont icon-guanbi"></div>
         </div>
         <div class="upload-win-content">
           <span>图片链接</span>
            <!-- <input type="file" @change.stop="uploadImage"/>  -->
            <input class="image-url" placeholder="请输入图片链接" type="text" v-model="imageUrl"/>
            <ul>
               <li>图床选择
                   <ul>
                     <li><a href="https://postimages.org/"  target="_blank">postimages</a></li>
                     <li><a href="https://sm.ms/" target="_blank">sm.ms</a></li>
                   </ul>
               </li>
               
            </ul>
         </div>
         <div class="upload-win-footer">
            <button @click="addImage">确定</button>
         </div>
    </div> 

  </div>
</template>
<script>
export default {
  name: 'Toolbar',
  data(){
     return{
        showCustomize:false,
        showUpload:false,
        showAllImage:false,
        imageUrl:'',
        shape:[
          {
            id:'flowChart',
            header:'센서 추가하기',
            icon:[
              
              {
                path:'<svg style="left: 1px; top: 1px; width: 32px; height: 30px; display: block; position: relative; overflow: hidden;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.98" cy="14.96" rx="13.600000000000001" ry="13.600000000000001" fill="white" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g></svg>',
                iconName:'circle',

                command:'circular'
              },
              
              
            ]
          }
        ],
        customize:[]
     }
  },
  computed:{
     precustomize(){
        return this.customize.slice().splice(0,15);
     }
  },
  mounted(){
    var str=localStorage.getItem('customize-icon');
    try{
      if(str){
         var data=JSON.parse(str);
         this.customize=data;
      }
    }catch(e){
       window.console.log(e);
    }
  },
  methods:{
    addImage(){
      if(this.imageUrl&&this.imageUrl.startsWith('http')){
         var obj={
           image:this.imageUrl
         };
         this.customize.push(obj);
         this.store();
         this.showUpload=false;
         this.imageUrl='';
      }
    },
    store(){
      localStorage.setItem('customize-icon',JSON.stringify(this.customize));
    },
    removeImage(item){
      var index=this.customize.indexOf(item);
      if(index>-1){
         this.customize.splice(index,1);
         this.store();
      }
    },
    dragstart(e,item){
       e.dataTransfer.setData("addShape",JSON.stringify(item));
    },
    uploadImage(e){
      var file=e.target.files[0];
      if(file){
       var type=file.type;
       var formData=new FormData();
       formData.append('smfile',file);
       if(['image/jpeg','image/png'].indexOf(type)>-1){
           this.ajax({
             method:'POST',
             url:'https://sm.ms//api/v2/upload',
             body:formData,
             succseeFn(res){
               window.console.log(res);
             },
             failFn(xhr){
               window.console.log(xhr);
             }

           })
       }
      }
    },
    ajax :function(options){
          //给参数一个选项
          let method = options.method
          let url = options.url
          let body = options.body
          let succseeFn = options.succseeFn
          let failFn = options.failFn

          let request = new XMLHttpRequest();
          //初始化请求
          request.open(method, url,true);
          request.setRequestHeader("Content-type","multipart/form-data");
          request.setRequestHeader('Authorization','');
          request.onreadystatechange = () => {
              if (request.readyState === 4) {
                  if (request.status >= 200 && request.status < 300) {
                      succseeFn.call(undefined, request.responseText)
                  } else if (request.status >= 400) {
                      failFn.call(undefined, request)
                  }
              }
          }
          request.send(body);
   }
 }

}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 4px;
}
a {
  color: #42b983;
}
.toolbar{
  left:0;
  bottom:0;
  top:40px;
  padding-top:15px;
  padding-bottom:10px;
  user-select: none;
  background: #1a233a;
}
.toolbar ul{
  text-align: center;
}
.toolbar ul li{
  width:38px;
  height:38px;
  font-size:30px;
  line-height: 38px;
  cursor: pointer;
  float: left;
  box-sizing: border-box;
  padding-left: 1px;
  padding-top: 2px;
  border-radius: 3px;
}
.toolbar ul li:hover{
  background: #e5e5e5;
}
li{
  display: inline-block;
  width:40px;
  height:auto;
}
li img{
  width:100%;
}
.shape-header{
  height:30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
  text-indent: 4px;
  padding: 0px 10px;
  color: #727e8c;
  font-size: 20px;
  font-weight: bold;
}

.shape-wrapper {
  position: relative;
  left: 10px;
  top: 5px;
}

.shape-image{
  margin-top:10px;
}
.shape-image ul li{
  padding:4px;
  margin-top:2px;
}
.toolbar-btn{
   height:30px;
   border-top:1px solid #f5f5f5;
   line-height: 30px;
   text-align: center;
   font-size: 12px;
   position: absolute;
   bottom:0;
   left:0;
   right:0;
   cursor: pointer;
}
.customize-win{
  width:600px;
  height:400px;
  border-radius:3px;
  position: fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  z-index: 300;
  border:1px solid #f5f5f5;
  background: #fff;
}
.close{
  position: absolute;
  right:0;
  top:0;
  width:30px;
  height:30px;
  color:red;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  font-size: 18px;
}
.customize-image{
  width:100%;
  height:100%;
  overflow-x:hidden;
  overflow-y:auto;
}
.customize-win-header{
  height:30px;
  line-height: 30px;
  text-indent: 6px;
  font-size: 12px;
  background: #f9f9f9;
  margin-bottom:10px;
}

.customize-image ul li{
  width:60px;
  height:60px;
  padding: 6px;
  border:1px solid #f5f5f5;
  position: relative;
}
.customize-image ul li span.icon-guanbi{
  position: absolute;
  left:0px;
  top:-10px;
}
.customize-image ul li img{
  vertical-align: middle;
}

.upload-win{
    width:600px;
    height:400px;
    border-radius:3px;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index: 300;
    border:1px solid #f5f5f5;
    background: #fff;
}

.upload-win-content{
  height: calc(100% - 30px);
  overflow-x:hidden;
  overflow-y:auto;
  padding: 0 10px;
  font-size: 12px;
}
.upload-win-footer{
   position: absolute;
   left:0;
   height:40px;
   right:0;
   bottom:0;
   text-align: right;
}
.upload-win-footer button{
  width:80px;
  height:30px;
  border-radius:3px;
  text-align: center;
  color:#fff;
  background: #42b983;
  border:1px solid #42b983;
  margin-right:10px;
}

.image-url{
  width:400px;
  height:30px;
  line-height: 30px;
  border-radius:2px;
  font-size: 12px;
  border:1px solid #ccc;
  margin-left:6px;
  text-indent: 6px;
  margin-right:6px;
}

.upload-win-content>ul{
  float: right;
}

.upload-win-content ul li{
  width:auto;
  font-size: 12px;
  width:100px;
  line-height: 24px;
  height:24px;
  padding: 0;
  margin: 0;
  text-indent: 2px;
}

.upload-win-content ul li:first-child{
  line-height: 32px;
  height:32px;
  text-indent:0;
}

.upload-win-content>ul:hover ul{
  display: block;
}

.upload-win-content>ul ul{
  display: none;
}

.all-image{
  position: absolute;
  left:141px;
  top:0px;
  width:200px;
  background: #f5f5f5;
  bottom:0;
  overflow-y:auto;
  z-index:200;
  border-right:1px solid #e6e9ed;
  border-bottom:1px solid #e6e9ed;
}

</style>
