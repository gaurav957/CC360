Vue.component('qualification',{
    props:["JsonData"],
    data:function(){
        return {
            isInvalid:false
        }
    },
    template:`  <div class="assessment-intro">  
    <div class="cst-container">  
     <div class="survey-intro">
     <div class="introduction-title" v-html="JsonData.heading"></div>                       
     <div :style="[this.isInvalid==true ?{'visibility':'visible'}:{'visibility':'hidden'}]" class="validated-error"  v-html="JsonData.Error">There is an error</div>
     <div class="intro-panel"> 
         
             <div v-for="(input, index) in JsonData.inputFields" class="col-50">
                 <div class="qualification-inner">
                     <label class="lbl-control" :for="'qual_'+ index" v-html="input.label"></label>                                        

                     <input class="cst-form-control" v-if="input.inputType=='text'" :id="'qual_'+ index"
                      :value="input.inputVal" @input="handleInput(input.inputId,index, $event)" 
                     :placeholder="input.placeholder"/>

                     <select class="cst-form-control" v-if="input.inputType=='select'"  :id="'qual_'+ index"
                     @change="handleSelect(index,$event)" required>
                         <option v-html="input.placeholder" value="" disabled selected></option>
                         <option v-for="option in input.options" 
                         v-html="option.optionTxt" :value="option.optionId" :selected="input.selectedId==option.optionId">
                         </option>
                         </select>                     
                         
                        

                     </div>
                </div>
            </div>
        </div>
     <div class="survey-begin txt-center">
         <div class="btn-item frw" @click="handleForward" v-html="JsonData.frdBtnTxt"></div>
     </div>
     </div>
 </div>`,


    methods:{

        handleSelect:function(index,e){
            this.JsonData.inputFields[index].selectedId = e.target.value;
            document.querySelector("#"+e.target.value).click();
            
        },
        handleForward:function(){
            this.isInvalid = false;
            this.JsonData.inputFields.forEach(input=>{
                var val = input.inputType=="select"?input.selectedId : input.inputType=="text"? input.inputVal:"";
                  if(!val){
                    this.isInvalid=true;
                }
            });

            if(this.isInvalid == false){
                document.getElementById("forwardbutton").click();
            }
        },
        handleInput:function(id,index, e){
            if(!/^[1-9]+[0-9]*$/.test(e.target.value)){
                var valArr = e.target.value.split('');
                valArr.pop();
                e.target.value = valArr.join('');
            }
            document.getElementById(id).value = e.target.value;
            this.JsonData.inputFields[index].inputVal = e.target.value;
        }
    }
   
})