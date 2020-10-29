
document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
    //OverlayScrollbars(document.querySelectorAll('.result-info'), { });
  });

document.addEventListener("DOMContentLoaded", function() {
	//OverlayScrollbars(document.querySelectorAll('.scrollable,.side-nav-scroll'), { });
  });
  var eventInputvueObj = new Vue({
	el: "#main-wrapper",
	data: {
		alldata: {},
	  	headerdata: {},
		tablesdata: {},
		btnData:{}
	},
  	
	created: function () {
	  if (document.getElementById("jsonData")) {
		this.alldata = JSON.parse(document.getElementById("jsonData").innerText);
		this.headerdata = this.alldata.headerData;
		this.tablesdata = this.alldata.tablesData;
		this.btnData = this.alldata.btnData;
	  }
	},
  });
  