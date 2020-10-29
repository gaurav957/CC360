document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
    OverlayScrollbars(document.querySelectorAll('.survey-intro'), { });
  });
new Vue({
    el: "#main-wrapper",
    data:{
        jsonData:{}
    },

    method:{},

    created: function(){
        var jsonHtml = document.getElementById("jsonData");
        if(jsonHtml){
            this.jsonData = JSON.parse(jsonHtml.innerText);
        }
        console.log(this.jsonData);
    }
})