(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76b26f07"],{"7f7f":function(t,e,n){var r=n("86cc").f,a=Function.prototype,c=/^\s*function ([^ (]*)/,i="name";i in a||n("9e1e")&&r(a,i,{configurable:!0,get:function(){try{return(""+this).match(c)[1]}catch(t){return""}}})},dddd:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-table",{staticStyle:{width:"800px"},attrs:{data:t.items}},[n("el-table-column",{attrs:{label:"账号",prop:"name"}}),n("el-table-column",{attrs:{label:"密码",prop:"password"}}),n("el-table-column",{attrs:{align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"el-icon-edit",attrs:{type:"primary",size:"medium"},on:{click:function(n){return t.$router.push("/admin/edit-admin_user/"+e.row._id)}}}),n("el-button",{staticClass:"el-icon-delete",attrs:{type:"danger",size:"medium"},on:{click:function(n){return t.del(e.row)}}})]}}])})],1)],1)},a=[],c=(n("7f7f"),n("96cf"),n("3b8d")),i={name:"tag_list",data:function(){return{items:[]}},methods:{fetch:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("admin/common/admin_users");case 2:e=t.sent,this.items=e.data;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),del:function(t){var e=this;this.$confirm('确定删除标签 "'.concat(t.name,'" ?'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(c["a"])(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.delete("admin/common/admin_users/".concat(t._id));case 2:e.$message({type:"success",message:"删除成功!"}),e.fetch();case 4:case"end":return n.stop()}},n)})))}},created:function(){this.fetch()}},s=i,u=n("2877"),o=Object(u["a"])(s,r,a,!1,null,"00a06c38",null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-76b26f07.5d628b96.js.map