Vue.component("left-panel", {
    props: ["LeftData"],
    template: `
              <div class='side-nav-wrapper'>
              <div class='side-nav-scroll'>
                <ul v-if="LeftData.links.length>0" class="menu-list">
                  <li v-for="(item,index) in LeftData.links" :key="item.menuVal">
                    <div class="nav-item" :data-menuval = item.menuVal :id='"menu_"+index' :class="{selected:LeftData.seltdParentVal == item.menuVal,open:LeftData.seltdParentVal == item.menuVal}"
                    v-on:click.stop="item.sublinks.length ? openBelow(index, $event):navClick(item.menuVal,'')">
                      <span>{{item.menuTxt}}</span>
                      <span class="rt-prgs">
                        <span v-if="item.initialQAnsd && item.totalQues">
                          {{item.initialQAnsd+""+item.intialUponTtl+""+item.totalQues}}
                        </span>
                        <span v-if="LeftData.seltdParentVal == item.menuVal && item.sublinks.length>0 " class="plus-icon"></span>
                        <span v-if="item.sublinks.length>0 && LeftData.seltdParentVal != item.menuVal" class="plus-icon"></span>
                      </span>
                    </div>
                    <ul v-if="item.sublinks.length>0" class="submenu-list menuAnimate">
                      <li v-for="sublink of item.sublinks" class="sub-links" 
                      @click="navClick(item.menuVal,sublink.sublinkVal)"
                      :class="{selected:LeftData.seltdChildVal == sublink.sublinkVal}"><div class="nav-item">
                      <span>{{sublink.sublinkTxt}}</span>
                      <span class="rt-prgs">
                        <span v-if="sublink.initialSubQAnsd && sublink.totalSubQues">
                        <span class='attemptQues' v-html="sublink.initialSubQAnsd"></span>{{sublink.intialUponTtl+""+sublink.totalSubQues}}
                        </span>
                      </span>
                      </div></li>
                    </ul>
                  </li>
                </ul>
                </div>
              </div>
    `,

    mounted:function(){
      for(let link of this.LeftData.links){
        if(this.LeftData.seltdParentVal == link.menuVal && link.sublinks.length>0){
          var el = document.querySelector("[data-menuVal='"+link.menuVal+"']").nextElementSibling;
          el.classList.add('open');
        }
      }

      document.getElementById("left-panel-menu-slctn").value = this.LeftData.seltdParentVal;      
      document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.seltdChildVal;

      let linksLen = this.LeftData.links.length;
      
      if(this.LeftData.links[0].sublinks.length == 0 && this.LeftData.seltdParentVal ==this.LeftData.links[0].menuVal ){
        
        this.$parent.disPrevParent();//calling parent
      }
      else if(this.LeftData.links[0].sublinks.length != 0 && this.LeftData.seltdParentVal ==this.LeftData.links[0].menuVal && this.LeftData.seltdChildVal ==this.LeftData.links[0].sublinks[0].sublinkVal ){
        
        this.$parent.disPrevParent();//calling parent
      }else if(this.LeftData.links[linksLen-1].sublinks.length == 0 && this.LeftData.seltdParentVal ==this.LeftData.links[linksLen-1].menuVal){
        
        this.$parent.disNextParent();//calling parent
      }else if(this.LeftData.links[linksLen-1].sublinks.length != 0 && this.LeftData.seltdParentVal ==this.LeftData.links[linksLen-1].menuVal){
        
        let subLinkLen = this.LeftData.links[linksLen-1].sublinks.length;
        if(this.LeftData.seltdChildVal ==this.LeftData.links[linksLen-1].sublinks[subLinkLen-1].sublinkVal){
          this.$parent.disNextParent();//calling parent
        }
      }

      this.checkSubmitBtn();
      
    },
    methods: {
        
      navClick: function(menuVal,sublinkVal){                
        document.getElementById("left-panel-menu-slctn").value = menuVal;      
        document.getElementById("left-panel-subMenu-slctn").value = sublinkVal;      
        document.getElementById("forwardbutton").click();
      },
      openBelow: function(index,e){
        var node = e.target;
        
        if(node.className.indexOf('nav-item') < 0){
          while ((node = node.parentNode) && node.className.indexOf('nav-item') < 0); 
        }

        if(node.classList.contains('open')){
          node.classList.remove("open");
        }else{
          node.classList.add("open");
        }
        var id = 'menu_'+index;
        var el = document.getElementById(id).nextElementSibling;
        if(el.classList.contains('open')){
          el.classList.remove("open");
        }else{
          el.classList.add("open");
        }
       
      },
      updateQuesAttempt:function(ttlAttempt){
        
        for(let link of this.LeftData.links){
          if(this.LeftData.seltdParentVal == link.menuVal){
            if(link.sublinks.length){
              for(let sublink of link.sublinks){
                if(sublink.sublinkVal == this.LeftData.seltdChildVal){
                  sublink.initialSubQAnsd = ttlAttempt
                }
              }

              let parentAttemp = 0
              for(let sublink of link.sublinks){
                parentAttemp += Number(sublink.initialSubQAnsd);
              }
              link.initialQAnsd =parentAttemp; 
            }else{
              link.initialQAnsd =ttlAttempt;
            }
          }
        }

        this.checkSubmitBtn();
      },
      checkSubmitBtn:function(){

        const mandQuesVal = this.LeftData.mandatoryQuesVal;

        let ttlManAttempt = 0;
        let ttlManQues = 0;

        for(let [linkIndex,link] of this.LeftData.links.entries()){
            if(link.sublinks.length != 0){

              for(let [subLinkIndex,sublink] of this.LeftData.links[linkIndex].sublinks.entries()){

                if(mandQuesVal.indexOf(sublink.sublinkVal) != -1){
                  ttlManAttempt += Number(sublink.initialSubQAnsd);
                  ttlManQues += Number(sublink.totalSubQues);
                }

              }

            }else{
              if(mandQuesVal.indexOf(link.menuVal) != -1){
                ttlManAttempt += Number(link.initialQAnsd);
                ttlManQues += Number(link.totalQues);
              }
            }
        }

        if(ttlManAttempt == ttlManQues){
          this.$parent.updatePrgsSubmit('enable');//calling parent
        }else{
          this.$parent.updatePrgsSubmit('disable');//calling parent
        }

      },
      PrevbtnClick:function(){
        for(let [linkIndex,link] of this.LeftData.links.entries()){
         
          if(this.LeftData.seltdParentVal == link.menuVal){
             if(link.sublinks.length){
              for(let [subIndex,sublink] of link.sublinks.entries()){
                if(sublink.sublinkVal == this.LeftData.seltdChildVal){

                  if(subIndex == 0){

                   if(this.LeftData.links[linkIndex-1].sublinks.length == 0){
                     
                      
                      document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex-1].menuVal;
                      document.getElementById("left-panel-subMenu-slctn").value = '';
                   }else{
                    
                     let sublinkLen = this.LeftData.links[linkIndex-1].sublinks.length;
                    
                     document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex-1].menuVal;
                      document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex-1].sublinks[sublinkLen-1].sublinkVal;
                   }

                  }else{
                    
                    
                    document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex].menuVal;
                      document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex].sublinks[subIndex-1].sublinkVal;
                  }
                    
                }
              }
            }else{
              if(this.LeftData.links[linkIndex-1].sublinks.length == 0){
                
                document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex-1].menuVal;
                document.getElementById("left-panel-subMenu-slctn").value = '';
             }else{
              
                let sublinkLen = this.LeftData.links[linkIndex-1].sublinks.length;
                document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex-1].menuVal;
                document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex-1].sublinks[sublinkLen-1].sublinkVal;
             }
            }
          }
        }
        //alert(document.getElementById("left-panel-menu-slctn").value);
        //alert(document.getElementById("left-panel-subMenu-slctn").value);
        document.getElementById("forwardbutton").click();
      },
      NextbtnClick:function(){
        for(let [linkIndex,link] of this.LeftData.links.entries()){
         
          if(this.LeftData.seltdParentVal == link.menuVal){
             if(link.sublinks.length){
              for(let [subIndex,sublink] of link.sublinks.entries()){
                if(sublink.sublinkVal == this.LeftData.seltdChildVal){

                  if(subIndex == link.sublinks.length-1){

                   if(this.LeftData.links[linkIndex+1].sublinks.length == 0){
                     
                      
                      document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex+1].menuVal;
                      document.getElementById("left-panel-subMenu-slctn").value = '';
                   }else{
                    

                    
                     document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex+1].menuVal;
                      document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex+1].sublinks[0].sublinkVal;
                   }

                  }else{
                    
                    
                    document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex].menuVal;
                      document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex].sublinks[subIndex+1].sublinkVal;
                  }
                    
                }
              }
            }else{
              if(this.LeftData.links[linkIndex+1].sublinks.length == 0){
                
                document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex+1].menuVal;
                document.getElementById("left-panel-subMenu-slctn").value = '';
             }else{
              
                document.getElementById("left-panel-menu-slctn").value = this.LeftData.links[linkIndex+1].menuVal;
                document.getElementById("left-panel-subMenu-slctn").value = this.LeftData.links[linkIndex+1].sublinks[0].sublinkVal;
             }
            }
          }
        }
        //alert(document.getElementById("left-panel-menu-slctn").value);
        //alert(document.getElementById("left-panel-subMenu-slctn").value);
        document.getElementById("forwardbutton").click();
      }
    },
  });
  
  
  