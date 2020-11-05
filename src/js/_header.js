Vue.component("header-panel", {
  props: ["headerData"],
  template: `<div class="header-wrapper">
				<div class="left-section">
					<div class="burger-wrapper">
						<div id="nav-icon3" :class="headerData.leftPanelOpen=='true' ?'open':''" @click=toggle>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						</div>
					</div>
					<div class="logo-wrapper">
						<img width=150 height=48 :src="headerData.logo" />
					</div>
				</div>
				<div class="right-section">
					<div><h3 v-html="headerData.headerTitle">Contact Center Walkthrough</h3></div>
				</div>
			</div>`,
  methods: {
    toggle: function () {
      if (this.headerData.leftPanelOpen == "false") {
        this.headerData.leftPanelOpen = "true";
        document.getElementById("main-wrapper").classList.add("toggled");
      } else {
        this.headerData.leftPanelOpen = "false";
        document.getElementById("main-wrapper").classList.remove("toggled");
      }
      document.querySelector(
        ".left-panel-open"
      ).value = this.headerData.leftPanelOpen;
      // setTimeout(()=>{this.$parent.updateRightHeight();},300);//calling parent
    },
  },
  mounted: function () {
    //console.log(this.headerData.leftPanelOpen == 'true')
    if (this.headerData.leftPanelOpen == "true") {
      document.getElementById("main-wrapper").classList.add("toggled");
    } else {
      document.getElementById("main-wrapper").classList.remove("toggled");
    }

    document.querySelector(
      ".left-panel-open"
    ).value = this.headerData.leftPanelOpen;
  },
});
