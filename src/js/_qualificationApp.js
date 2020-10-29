document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
    OverlayScrollbars(document.querySelectorAll('.survey-intro'), { });
  });
new Vue({
    el:'#main-wrapper',
    data:{
        jsondata:{}
    },
    methods:{},

    created:function(){
        var dataHtml = document.getElementById("jsonData");
        if(dataHtml){
            this.jsondata = JSON.parse(dataHtml.innerText);
        }
      
    }
})