Vue.component("right-panel", {
  props: ["rightData", "progressData", "leftData"],
  template: `
  <div class="right-panel-wrapper">
  <div class="right-panel clearfix">
    <progress-panel ref="prsPanel" :progress-data="progressData"></progress-panel>
    <div class="survey-wrapper"> 
      <div class="scrollable">
      <div class="questions-inner" v-for="qType of rightData" v-if="qType.catType ===1">
          <h2 class="ques-heading" v-html='qType.heading'></h2>
          <div class="question-type1">
            <h4 class="sub-heading" v-html='qType.subheading'></h4>
            <p class="question-line" v-html='qType.categoryHeading'></p>
            <div class="question-row" v-for="(question,quesIndex) of qType.questions">
              <div class="question-group" v-if="question.type=='dd'">
                <div class="text-label"><span v-html='question.optionName'></span> 
                  <span class="tooltips">
                      <div class="tooltip">
                        <span class="custom-infoicon"  @click="toltiptoggle"></span>
                        <span class="tooltiptext" v-html="question.description"></span>
                      </div>
                  </span>
                </div>
                <div class="input-box">
                
                  <select class="cst-form-control" @change="handleSelect(qType.catType, quesIndex, null, $event)" >
                    <option  disabled  v-html="question.placeholder" :selected="question.selectedId==''" ></option>
                    <option v-for="option of question.options" v-html="option.ddName" :value="option.ddId" :selected="option.ddId==question.selectedId">                   
                    </option>
                  </select>
                </div>
              </div>

              <div class="question-group" v-if="question.type=='txt' || question.type=='num'">
                <div class="text-label"><span v-html="question.optionName"></span>
                  <span class="tooltips">
                    <div class="tooltip">
                      <span class="custom-infoicon"  @click="toltiptoggle"></span>
                      <span class="tooltiptext" v-html="question.description"></span>
                    </div>
                  </span>
                </div>
                <div class="input-box">
                  <input type="text" class="cst-form-control" :placeholder="question.placeholder" @input="handleInput(question,qType.catType,quesIndex,null ,$event)" :value="question.selectedText" />
                </div>
                <div v-html="question.afterText" class="after-text"></div>
              </div>
            </div>            
          
          </div>          
        </div>
   
        <div class="questions-inner" v-for="qType of rightData" v-if="qType.catType ===2">
          <h2 class="ques-heading" v-html='qType.heading'></h2>
          <div class="question-type2" >
            <h4 class="sub-heading" v-html='qType.subheading'></h4>           
            <div class="question-row" v-for="(question,quesIndex) of qType.questions" :class="{'wide': question.quesLength>1 }">                          

            <div class="question-line" v-html='question.questionHeading'></div>
              <div class="question-group" v-for="(option,optionIndex) of question.options">
                <div class="text-label"><span v-html='option.optionName'></span>
                  <span class="tooltips">
                      <div class="tooltip">
                        <span class="custom-infoicon"  @click="toltiptoggle"></span>
                        <span class="tooltiptext" v-html="option.description"></span>
                      </div>
                  </span>
                </div>
                <div class="input-box">
          
                  <input v-if="option.type=='num' || option.type=='txt'" type="text" :placeholder="option.placeholder"
                  class="cst-form-control"  :value="option.selectedText" @input="handleInput(option,qType.catType, quesIndex,optionIndex ,$event)">
                  <div  v-if="option.type=='num' || option.type=='txt'" type="text" v-html="option.afterText" class="after-text"></div>


                  <select v-if="option.type=='dd' " class="cst-form-control" @change="handleSelect(qType.catType, quesIndex,optionIndex,$event)" >
                      <option disabled v-html="option.placeholder" :selected="option.selectedId==''"></option>
                      <option v-for="quesOption of option.options" v-html="quesOption.ddName" :value="quesOption.ddId" :selected="option.selectedId==quesOption.ddId"></option>
                    </select>
                </div>
              </div>
            </div>
            
          </div>          
        </div> 

      </div>
    </div>
  </div>

</div>
  `,
  mounted: function () {
    // this.setHeight();
    // window.addEventListener("resize", this.setHeight);
    document.addEventListener("DOMContentLoaded", () => {
      //The first argument are the elements to which the plugin shall be initialized
      //The second argument has to be at least a empty object or a object with your desired options
      // OverlayScrollbars(document.querySelector('.side-nav-scroll'), { });

      var instance = OverlayScrollbars(
        document.querySelector(".scrollable"),
        {}
      );
      // instance.scroll({ el: document.getElementById('hellomoto'), block : "center"}, 100);
      let scrollHeight = this.rightData[0].scrollPosition;
      console.log(this.rightData);
      if (scrollHeight == "") {
        scrollHeight = 0;
      }
      instance.scroll({ x: 0, y: scrollHeight }, 100);
      // setTimeout(function(){console.log(instance.scroll().position.y)},1000);
    });
    document.addEventListener("click", () => {
      document
        .querySelectorAll(".tooltip-show")
        .forEach((elem) => elem.classList.remove("tooltip-show"));
    });

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

    handleSelect: function (catType, quesIndex, optionIndex, e) {
      //dropdown
      if (catType == 1) {
        this.rightData.forEach((category) => {
          if (category.catType == 1) {
            category.questions[quesIndex].selectedId = e.target.value;
          }
        });
      }
      if (catType == 2) {
        this.rightData.forEach((category) => {
          if (category.catType == 2) {
            category.questions[quesIndex].options[optionIndex].selectedId =
              e.target.value;
          }
        });
      }
      this.updateProgressData();
      document.getElementById(e.target.value).click();
    },
    
    handleInput: function (question, catType, quesIndex, optionIndex, e) {
      
      console.log(question.maxRange, question.minRange);
      let { type, maxLength, selectedId } = question;
      let val, valArr;

      if (type == "num") {
        val = e.target.value.trim();
        valArr = val.split("");
        if (isNaN(val)) {
          valArr = valArr.filter((ch) => !isNaN(ch));
        }
      }

      if (type == "txt") {
        val = e.target.value;
        valArr = val.split("");
        for (let i = 0; i < valArr.length; i++) {
          const ch = valArr[i];
          if(ch==' '){
            valArr.splice(i,1);
            console.log(valArr)
          }else{
            break;
          }
        }
        
          valArr = valArr.filter((ch) => /^[a-zA-Z\s]*$/.test(ch));
        
      }

      if (Number(valArr.join("")) > question.maxRange) {
        valArr.pop();
      }
      if (valArr.length > maxLength) {
        if (valArr[valArr.length - 1] == " ") {
          valArr = valArr.join("").trim().split("");
        } else {
          valArr.pop();
        }
      }

      val = valArr.join("");

      if (catType == 1) {
        this.rightData.forEach((category) => {
          if (category.catType == 1) {
            category.questions[quesIndex].selectedText = val;
          }
        });
      }
      if (catType == 2) {
        this.rightData.forEach((category) => {
          if (category.catType == 2) {
            category.questions[quesIndex].options[
              optionIndex
            ].selectedText = val;
          }
        });
      }
      this.updateProgressData();
      e.target.value = val;

      document.getElementById(selectedId).value = val;
    },

    updateProgressData: function () {
      let totalAttempted = 0;

      this.rightData.forEach((data) => {
        if (data.catType == 1) {
          data.questions.forEach((question) => {
            if (question.type == "dd") {
              if (question.selectedId !== "") {
                totalAttempted++;
              }
            }
            if (question.type == "txt" || question.type == "num") {
              if (question.selectedText !== "") {
                totalAttempted++;
              }
            }
          });
        }

        if (data.catType == 2) {
          data.questions.forEach((question) => {
            question.options.forEach((option) => {
              if (option.type == "dd") {
                if (option.selectedId !== "") {
                  totalAttempted++;
                }
              }
              if (option.type == "txt" || option.type == "num") {
                if (option.selectedText !== "") {
                  totalAttempted++;
                }
              }
            });
          });
        }
      });
      // this.progressData.answrdQues = totalAttempted;
      // this.progressData.percentge = parseInt(
      //   (totalAttempted / Number(this.progressData.totalQues)) * 100
      // );

      this.$parent.updateLeftQuestionAttempt(totalAttempted); //calling parent
      this.$parent.getTotalQuestions(); //calling parent
      this.$refs.prsPanel.updateProgresbar(totalAttempted); //calling child component
    },

    // handleKeyDown: function (catIn, subCatIn, quesInd, ques_id, e) {
    //   this.rightData.categories[catIn].subCategories[subCatIn].questions[
    //     quesInd
    //   ].detailVal = e.target.value;
    //   if (document.getElementById(ques_id)) {
    //     document.getElementById(ques_id).value = e.target.value;
    //   }
    // },
    // handleAnswerSelect: function (dataId, catIn, subCatIn, quesInd) {
    //   this.rightData.categories[catIn].subCategories[subCatIn].questions[
    //     quesInd
    //   ].selected = dataId;
    //   if (document.getElementById(dataId)) {
    //     document.getElementById(dataId).click();
    //   }

    //   let ttlAttempt = 0;
    //   for (let category of this.rightData.categories) {
    //     for (let subCat of category.subCategories) {
    //       for (let question of subCat.questions) {
    //         if (question.selected != "") {
    //           ttlAttempt++;
    //         }
    //       }
    //     }
    //   }

    //   this.$parent.updateLeftQuestionAttempt(ttlAttempt); //calling parent
    //   this.$refs.prsPanel.updateProgresbar(ttlAttempt); //calling child component
    // },
    // setHeight: function () {
    //   var surRows = document.getElementsByClassName("survey-row");
    //   for (let surRow of surRows) {
    //     var headHght = 0;
    //     var bodyHght = 0;
    //     for (let rowChild of surRow.children) {
    //       let srvyCard = rowChild.children[0];
    //       srvyCard.children[0].setAttribute("style", "height:auto");
    //       srvyCard.children[1].setAttribute("style", "height:auto");

    //       let sCradHeaderHght = srvyCard.children[0].offsetHeight;
    //       let sCradBodyHght = srvyCard.children[1].offsetHeight;
    //       if (headHght < sCradHeaderHght) {
    //         headHght = sCradHeaderHght;
    //       }

    //       if (bodyHght < sCradBodyHght) {
    //         bodyHght = sCradBodyHght;
    //       }
    //       //srvyCard.children[0].setAttribute("style","height:"+headHght+"px");
    //       //srvyCard.children[1].setAttribute("style","height:"+bodyHght+"px");
    //     }

    //     let rowHeaders = surRow.getElementsByClassName("s-crad-header");
    //     let rowBodies = surRow.getElementsByClassName("s-crad-body");
    //     let rowHeadersArr = [...rowHeaders];
    //     let rowBodiesArr = [...rowBodies];
    //     rowHeadersArr.map((el) => {
    //       el.setAttribute("style", "height:" + headHght + "px");
    //     });
    //     rowBodiesArr.map((el) => {
    //       el.setAttribute("style", "height:" + bodyHght + "px");
    //     });
    //   }
    // },
    enabDisSubmit: function (endis) {
      this.$refs.prsPanel.enabDisSubmit(endis); //calling child component
    },
    toltiptoggle: (e) => {
      let isClass = false;
      if (e.target.parentNode.classList.contains("tooltip-show")) {
        isClass = true;
      }

      document
        .querySelectorAll(".tooltip-show")
        .forEach((elem) => elem.classList.remove("tooltip-show"));
      const list = e.target.parentNode.classList;
      if (isClass) {
        e.target.parentNode.classList.remove("tooltip-show");
      } else {
        setTimeout(() => {
          e.target.parentNode.classList.add("tooltip-show");
        }, 0);
      }
    },
    setScrollHeight: () => {
      let instance = OverlayScrollbars(
        document.querySelector(".scrollable"),
        {}
      );
      let scrollHeight = instance.scroll().position.y;
      document.getElementById("scroll-value").value = scrollHeight;
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
                    <span>(</span><span v-html='progressData.percentge'>12</span><span>%</span><span>)</span>
                </div>
                <div class='progress-bar'>
                    <div id="myProgress">
                        <div id="myBar" :style="{ width: progressData.percentge+'%'}"></div>
                    </div>
                </div>
            </div>
            <div class='btn-outer'>
                    <div class='btn-item save' v-html='progressData.saveTxt' @click=savePage()>Save</div>
                    <div class='btn-item submit' :class="this.submitStatus == false?'disable':''" @click=checkSubmitStatus(this.submitStatus) v-html='progressData.submitTxt' >Submit</div>
            </div>
        </div>
    
    </div>`,

  mounted: function () {
    document.querySelector("#ttl-attmpt").value = this.progressData.answrdQues;
    document.querySelector("#cur-prcntge").value = this.progressData.percentge;
  },
  methods: {
    nextPage: function (forwardBtnVal) {
      console.log("called");
      document.getElementById("left-panel-menu-slctn").value = forwardBtnVal;
      document.getElementById("forwardbutton").click();
    },
    savePage: function () {
      this.$parent.setScrollHeight(); //calling parent
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
    checkSubmitStatus: function (submitStatus) {
      //v-on="this.submitStatus == false ? {} : {click:()=>nextPage(progressData.submitVal)}"
      if (submitStatus != false) {
        this.nextPage(this.progressData.submitVal);
      }
    },
  }

});

{
  /* <input v-for="option of question.options" type="radio" :name="qType+'_'+quesIndex" :id="option.ddId" /> */
}
