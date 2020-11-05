Vue.component("footer-panel", {
  props: ["footerData"],
  data: function () {
    return {
      nextEnable: true,
      prevEnable: true,
      intialQuestions: 0,
      totalQuestions: 0,
    };
  },
  template: `<div class="footer clearfix">
  <div class="navigation-block clearfix">
    <div class="right question-footer">
      <span class="tt-ans"><span v-html="footerData.ttlCnt"></span> <span v-html="this.intialQuestions"></span>/<span v-html="this.totalQuestions"></span></span>
		   <div class="btn-item pre" :class="prevEnable == true?'':'disable'" v-html=footerData.prevTxt @click="prevEnable == true?PrevPage():''" ></div>
		   <div class="btn-item frw" :class="nextEnable == true?'':'disable'" v-html=footerData.forwardTxt @click="nextEnable == true?nextPage(footerData.forwardVal):''"></div>
	  </div>
  </div>
  <div class="copyright-block clearfix"><div class="footer-mck f-left"><img :src="footerData.footerLogo" alt="" title=""></div><div class="copy-rt r-right" v-html=footerData.copyrghtTxt></div></div>
</div>`,
  methods: {
    nextPage: function () {
      this.$parent.NextPageBtnClckParent(); //calling parent
    },
    PrevPage: function () {
      this.$parent.PrevPageBtnClckParent(); //calling parent
    },
    disablePrev: function () {
      this.prevEnable = false;
    },
    disableNext: function () {
      this.nextEnable = false;
    },
    setAllQuestions: function (totalAnswered, totalQuestions) {
      this.intialQuestions = totalAnswered;
      this.totalQuestions = totalQuestions;
    },
  },
});
