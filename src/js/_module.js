Vue.component('module', {
    props:['JsonData'],
    template:`
    <div class="assessment-intro">  
    <div class="cst-container">  
     <div class="survey-intro">
         <div class="introduction-title" v-html="JsonData.heading">
         </div>
         <div class="intro-panel module">  
            <div class="module-row m-thead">
                <div class="col" v-for="header in JsonData.headers">
                <div class="title-head"  v-html="header">  </div> 
                </div>                    
            </div>
            <div class="module-row catg-row" v-for="(module,moduleIndex) in JsonData.Modules">
                <div class="col-4">                   
                    <div class="title-module" v-html="module.cat">                         
                    </div>
                </div>
                 <div class="col-8 form-catg">
                  <div class="row-cst" v-for="(subCat,subCatIndex) in module.subCat">
                    <div class="col-3">
                         <div class="title-module" v-html="subCat.subCatTxt">                          
                         </div>
                    </div>
                    <div class="col-3 ctrl-sm">
                        <div class="input-module">
                            <input type="text" disabled="disabled" 
                            class="cst-form-control" :value="subCat.subCatValue">
                        </div>
                    </div>
                    <div class="col-3 ctrl-sm-chk">
                        <div class="catg-selection">
                            <div class="pure-checkbox">
                               <input :id="subCat.checkId+'_cus'" name="A6023" type="checkbox" 
                               :checked="subCat.isChecked" :disabled="!subCat.isCheckable"
                               value="3" class="radio" />                               
                               <label :for="subCat.checkId+'__cus'" @click="subCat.isCheckable==true? handleSelect(moduleIndex,subCatIndex,subCat.checkId):''"></label>
                             </div>
                          </div> 
                       </div>
                    </div>
                 </div>
              </div>
          </div>
       </div>
     <div class="survey-begin txt-center">
         <div class="btn-item frw" @click="handleForward" v-html="JsonData.frdBtnTxt"></div>
     </div>
     </div>
 </div>
    `,

    methods:{
        handleSelect:function(moduleIndex,subCatIndex,id){

            this.JsonData.Modules[moduleIndex].subCat[subCatIndex].isChecked = !this.JsonData.Modules[moduleIndex].subCat[subCatIndex].isChecked;
            
            if(document.getElementById(id)){
                document.getElementById(id).click();
            }
        },
        handleForward:function(){
            document.getElementById('forwardbutton').click();
        }
    }
    
})