
Vue.component("header-panel", {
  props: ["headerData"],
  template: `<div class="header-wrapper cst-chart-hd">
				<div class="left-section">
					<div class="burger-wrapper" style="visibility:hidden">
						<div id="nav-icon3" :class="headerData.leftPanelOpen=='true' ?'open':''" >
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
});
