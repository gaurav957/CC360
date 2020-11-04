
document.addEventListener("DOMContentLoaded", function() {
  //The first argument are the elements to which the plugin shall be initialized
  //The second argument has to be at least a empty object or a object with your desired options
  OverlayScrollbars(document.querySelectorAll('.scrollable,.side-nav-scroll'), { });
});
var eventInputvueObj = new Vue({
  el: "#main-wrapper",
  data: {
    alldata: {},
    alldata2: {},
    headerdata: {},
    leftdata: {},
    rightdata: {},
    progressdata:{},
    footerdata:{}
  },

  methods:{
    handleSelect:function(){
      var count = 0;
      this.rightdata.categories.forEach(cat => {
        cat.subCategories.forEach(subCat=>{
          subCat.questions.forEach(ques=>{
            if(ques.selected!=""){ 
              count++;                 
            }
          })
        })
      });
      this.progressdata.answrdQues = count;
      var percentage = (count/Number(this.progressdata.totalQues))*100;
      this.progressdata.percentge = percentage;
      document.getElementById("myBar").style.width=percentage+"%";     
    },

    updateLeftQuestionAttempt:function(ttlAttempt){
      this.$refs.leftPanel.updateQuesAttempt(ttlAttempt);
    },

    PrevPageBtnClckParent:function(){
      this.$refs.leftPanel.PrevbtnClick();
    },
    NextPageBtnClckParent:function(){
      this.$refs.leftPanel.NextbtnClick();
    },
    disPrevParent:function(){
      this.$refs.footerPanel.disablePrev();
    },
    disNextParent:function(){
      this.$refs.footerPanel.disableNext();
    },
    updatePrgsSubmit:function(endis){
      this.$refs.rightPanel.enabDisSubmit(endis);
    },
    updateRightHeight:function(){
      this.$refs.rightPanel.setHeight();
    }

  },
  
  created: function () {
    //let a = JSON.parse(document.getElementById("jsonData").innerHTML);
    //console.log(a.headerData);
    //console.log(JSON.parse(document.getElementById("jsonData").innerHTML))
    if (document.getElementById("jsonData")) {
      this.alldata = JSON.parse(document.getElementById("jsonData").innerText);
      this.alldata2 = JSON.parse(document.getElementById("jsonData2").innerText);
      this.headerdata = this.alldata.headerData;
      this.leftdata = this.alldata.leftData;
      // this.rightdata = this.alldata.rightData;
      // this.progressdata = this.alldata.progressData;      
      this.rightdata = this.alldata2.rightData;
      this.progressdata = this.alldata2.progressData;      
      this.footerdata = this.alldata.footerData;
    }

    //console.log(this.alldata)
    console.log(this.alldata2)

    //alert(JSON.stringify(this.alldata));
    //alert(JSON.stringify(this.leftdata));
    //alert(JSON.stringify(this.rightdata));
    //alert(JSON.stringify(this.footerdata))
  },
});
