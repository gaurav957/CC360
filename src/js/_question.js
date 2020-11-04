Vue.component("right-panel", {
  props: ["rightData", "progressData", "leftData"],

  mounted: function () {
    this.setHeight();
    window.addEventListener("resize", this.setHeight);
  },
  methods: {
    openAccordion: function (e) {
      e.stopPropagation();

      if (e.target.className.split(" ").indexOf("active") == -1) {
        e.target.className += " active";
        e.target.nextElementSibling.style.maxHeight =
          e.target.nextElementSibling.scrollHeight + "px";
      } else {
        e.target.className = e.target.className.replace(" active", "");
        e.target.nextElementSibling.style.maxHeight = null;
      }
    },

    handleInput: function (id, length, type, e) {
      let val = e.target.value.trim();
      let valArr = val.split("");

      if (type == "num") {
        if (isNaN(val)) {
          val = valArr.filter((ch) => !isNaN(ch)).join("");
        }
        console.log(val);
        const elem = document.getElementById(id);
        if (val.split("").length <= length) {
          elem.value = val;
        } else {
          valArr.pop();
          elem.value = val;
          e.target.value = val;
        }
      } else {
        // let valArr = val.split("");
        // const elem = document.getElementById(id);
        // if (valArr.length <= length) {
        //   console.log(e.target.value, id, length);
        //   elem.value = e.target.value;
        // } else {
        //   valArr.pop();
        //   elem.value = valArr.join("");
        //   e.target.value = valArr.join("");
        // }
      }
    },

    handleKeyDown: function (catIn, subCatIn, quesInd, ques_id, e) {
      this.rightData.categories[catIn].subCategories[subCatIn].questions[
        quesInd
      ].detailVal = e.target.value;
      if (document.getElementById(ques_id)) {
        document.getElementById(ques_id).value = e.target.value;
      }
    },
    handleAnswerSelect: function (dataId, catIn, subCatIn, quesInd) {
      this.rightData.categories[catIn].subCategories[subCatIn].questions[
        quesInd
      ].selected = dataId;
      if (document.getElementById(dataId)) {
        document.getElementById(dataId).click();
      }

      let ttlAttempt = 0;
      for (let category of this.rightData.categories) {
        for (let subCat of category.subCategories) {
          for (let question of subCat.questions) {
            if (question.selected != "") {
              ttlAttempt++;
            }
          }
        }
      }

      this.$parent.updateLeftQuestionAttempt(ttlAttempt); //calling parent
      this.$refs.prsPanel.updateProgresbar(ttlAttempt); //calling child component
    },
    setHeight: function () {
      var surRows = document.getElementsByClassName("survey-row");
      for (let surRow of surRows) {
        var headHght = 0;
        var bodyHght = 0;
        for (let rowChild of surRow.children) {
          let srvyCard = rowChild.children[0];
          srvyCard.children[0].setAttribute("style", "height:auto");
          srvyCard.children[1].setAttribute("style", "height:auto");

          let sCradHeaderHght = srvyCard.children[0].offsetHeight;
          let sCradBodyHght = srvyCard.children[1].offsetHeight;
          if (headHght < sCradHeaderHght) {
            headHght = sCradHeaderHght;
          }

          if (bodyHght < sCradBodyHght) {
            bodyHght = sCradBodyHght;
          }
          //srvyCard.children[0].setAttribute("style","height:"+headHght+"px");
          //srvyCard.children[1].setAttribute("style","height:"+bodyHght+"px");
        }

        let rowHeaders = surRow.getElementsByClassName("s-crad-header");
        let rowBodies = surRow.getElementsByClassName("s-crad-body");
        let rowHeadersArr = [...rowHeaders];
        let rowBodiesArr = [...rowBodies];
        rowHeadersArr.map((el) => {
          el.setAttribute("style", "height:" + headHght + "px");
        });
        rowBodiesArr.map((el) => {
          el.setAttribute("style", "height:" + bodyHght + "px");
        });
      }
    },
    enabDisSubmit: function (endis) {
      this.$refs.prsPanel.enabDisSubmit(endis); //calling child component
    },
    toltiptoggle: (e) => {
      //e.preventDefault();
      if (e.target.parentNode.classList.contains("tooltip-show")) {
        e.target.parentNode.classList.remove("tooltip-show");
      } else {
        e.target.parentNode.classList.add("tooltip-show");
      }
    },
  },
});

Vue.component("progress-panel", {
  props: ["progressData"],
  data: function () {
    return {
      submitStatus: false,
    };
  },
  template: `<div class='progress-panel'>
    
        <div class='progress-panel-inner'>
            <div class='progress'>
                <div class='perc-data'>
                    <span v-html='progressData.answerTxt'>Answered</span>
                    <span v-html='progressData.answrdQues'>1</span>
                    <span v-html='progressData.of'>of</span>
                    <span v-html='progressData.totalQues'>12</span>
                    <span>(</span>
                    <span v-html='progressData.percentge'>12</span>
                    <span>%</span>
                    <span>)</span>
                </div>
                <div class='progress-bar'>
                    <div id="myProgress">
                        <div id="myBar" :style="{ width: progressData.percentge+'%'}"></div>
                    </div>
                </div>
            </div>
            <div class='btn-outer'>
                    <div class='btn-item save' v-html='progressData.saveTxt' @click=savePage>Save</div>
                    <div class='btn-item submit' :class="this.submitStatus == false?'disable':''" v-on="this.submitStatus == false ? {} : {click:()=>nextPage(progressData.submitVal)}" v-html='progressData.submitTxt' >Submit</div>
            </div>
        </div>
    
    </div>`,

  mounted: function () {
    document.querySelector("#ttl-attmpt").value = this.progressData.answrdQues;
    document.querySelector("#cur-prcntge").value = this.progressData.percentge;
  },
  methods: {
    nextPage: function (forwardBtnVal) {
      document.getElementById("left-panel-menu-slctn").value = forwardBtnVal;
      document.getElementById("left-panel-subMenu-slctn").value = forwardBtnVal;
      document.getElementById("forwardbutton").click();
    },
    savePage: function () {
      document.getElementById("forwardbutton").click();
    },
    updateProgresbar: function (ttlAttempt) {
      this.progressData.answrdQues = ttlAttempt;
      var percentage = parseInt(
        (ttlAttempt / Number(this.progressData.totalQues)) * 100
      );
      this.progressData.percentge = percentage;

      document.querySelector("#ttl-attmpt").value = ttlAttempt;
      document.querySelector("#cur-prcntge").value = percentage;
    },
    enabDisSubmit: function (endis) {
      if (endis == "enable") {
        this.submitStatus = true;
      } else {
        this.submitStatus = false;
      }
    },
  },
});
