Vue.component("left-panel", {
  props: ["LeftData"],
  template: `
              <div class='side-nav-wrapper'>
              <div class='side-nav-scroll'>
                <ul v-if="LeftData.links.length>0" class="menu-list">
                  <li v-for="(item,index) in LeftData.links" :key="item.menuVal">
                    <div class="nav-item" :data-menuval = item.menuVal :id='"menu_"+index' :class="{selected:LeftData.seltdVal == item.menuVal,open:LeftData.seltdVal == item.menuVal}"
                    v-on:click.stop="navClick(item.menuVal,'')">
                      <span>{{item.menuTxt}}</span>
                      <span class="rt-prgs">
                        <span v-if="item.initialQAnsd && item.totalQues">
                          {{item.initialQAnsd+""+item.intialUponTtl+""+item.totalQues}}
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
                </div>
              </div>
    `,

  mounted: function () {
    document.getElementById(
      "left-panel-menu-slctn"
    ).value = this.LeftData.seltdVal;

    let linksLen = this.LeftData.links.length;

    if (this.LeftData.links[0].menuVal == this.LeftData.seltdVal) {
      this.$parent.disPrevParent(); //calling parent
    }
    if (this.LeftData.links[linksLen - 1].menuVal == this.LeftData.seltdVal) {
      this.$parent.disNextParent(); //calling parent
    }

    this.checkSubmitBtn();
    this.updatteAllQuestions();

    document.addEventListener("DOMContentLoaded", function () {
      //The first argument are the elements to which the plugin shall be initialized
      //The second argument has to be at least a empty object or a object with your desired options
      OverlayScrollbars(document.querySelector(".side-nav-scroll"), {});
    });
  },
  methods: {
    navClick: function (menuVal, sublinkVal) {
      document.getElementById("left-panel-menu-slctn").value = menuVal;
      // document.getElementById("left-panel-subMenu-slctn").value = sublinkVal;
      document.getElementById("forwardbutton").click();
    },
    openBelow: function (index, e) {
      // var node = e.target;
      // if(node.className.indexOf('nav-item') < 0){
      //   while ((node = node.parentNode) && node.className.indexOf('nav-item') < 0);
      // }
      // if(node.classList.contains('open')){
      //   node.classList.remove("open");
      // }else{
      //   node.classList.add("open");
      // }
      // var id = 'menu_'+index;
      // var el = document.getElementById(id).nextElementSibling;
      // if(el.classList.contains('open')){
      //   el.classList.remove("open");
      // }else{
      //   el.classList.add("open");
      // }
    },
    updateQuesAttempt: function (ttlAttempt) {
      for (let link of this.LeftData.links) {
        if (this.LeftData.seltdVal == link.menuVal) {
          link.initialQAnsd = ttlAttempt;
        }
      }

      this.checkSubmitBtn();
    },
    checkSubmitBtn: function () {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
          while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

          return resArray;
        };
      }

      const mandQuesVal = this.LeftData.mandatoryQuesVal;

      let ttlManAttempt = 0;
      let ttlManQues = 0;

      for (let [linkIndex, link] of Object.entries(this.LeftData.links)) {
        linkIndex = Number(linkIndex);
        if (mandQuesVal.indexOf(link.menuVal) != -1) {
          ttlManAttempt += Number(link.initialQAnsd);
          ttlManQues += Number(link.totalQues);
        }
      }

      if (ttlManAttempt == ttlManQues) {
        this.$parent.updatePrgsSubmit("enable"); //calling parent
      } else {
        this.$parent.updatePrgsSubmit("disable"); //calling parent
      }
    },
    PrevbtnClick: function () {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
          while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

          return resArray;
        };
      }

      for (let [linkIndex, link] of Object.entries(this.LeftData.links)) {
        linkIndex = Number(linkIndex);

        if (this.LeftData.seltdVal == link.menuVal) {
          document.getElementById(
            "left-panel-menu-slctn"
          ).value = this.LeftData.links[linkIndex - 1].menuVal;
        }
      }
      document.getElementById("forwardbutton").click();
    },
    NextbtnClick: function () {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
          while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

          return resArray;
        };
      }

      for (let [linkIndex, link] of Object.entries(this.LeftData.links)) {
        linkIndex = Number(linkIndex);

        if (this.LeftData.seltdVal == link.menuVal) {
          document.getElementById(
            "left-panel-menu-slctn"
          ).value = this.LeftData.links[linkIndex + 1].menuVal;
        }
      }
      document.getElementById("forwardbutton").click();
    },
    updatteAllQuestions: function () {
      if (!Object.entries) {
        Object.entries = function (obj) {
          var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
          while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

          return resArray;
        };
      }

      var totalQuestions = 0;
      var totalAnswered = 0;

      for (let [linkIndex, link] of Object.entries(this.LeftData.links)) {
        linkIndex = Number(linkIndex);
        totalQuestions += Number(link.totalQues);
        totalAnswered += Number(link.initialQAnsd);
      }

      this.$parent.setTotalQuestions(totalAnswered, totalQuestions); //calling parent
    },
  },
});
