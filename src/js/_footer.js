
Vue.component("footer-panel", {
  props: ["footerData"],
  data: function () {
    return {
      nextEnable: true,
      prevEnable: true
    }
  },
  template: `<div class="footer clearfix">
  <div class="navigation-block clearfix">
	  <div class="right">
		   <div class="btn-item pre" :class="prevEnable == true?'':'disable'" v-html=footerData.prevTxt @click="prevEnable == true?PrevPage():''" ></div>
		   <div class="btn-item frw" :class="nextEnable == true?'':'disable'" v-html=footerData.forwardTxt @click="nextEnable == true?nextPage(footerData.forwardVal):''"></div>
	  </div>
  </div>
  <div class="copyright-block clearfix"><div class="footer-mck f-left"><img :src="footerData.footerLogo" alt="" title=""></div><div class="copy-rt r-right" v-html=footerData.copyrghtTxt></div></div>
</div>`,
  methods: {
    nextPage:function(){
      // document.getElementById("navText").value = forwardBtnVal;
      // document.getElementById("forwardbutton").click();
      this.$parent.NextPageBtnClckParent();//calling parent
    },
    PrevPage:function(){
      this.$parent.PrevPageBtnClckParent();//calling parent
    },
    disablePrev:function(){
      console.log("disable prev false");
      this.prevEnable = false;
    },
    disableNext:function(){
      console.log("disable next false");
      this.nextEnable = false;
    }
  }
});
