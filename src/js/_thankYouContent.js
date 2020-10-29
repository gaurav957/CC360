Vue.component('thankyou-content', {
    props:["JsonData"],
    template:`<div class="assessment-intro">  
               <div class="cst-container">  
                    <div class="survey-intro">
                        <div class="thankyou-banner">
                            <div class="img"></div>
                            <div v-html="JsonData.content" class="thankyou-content"></div>
                        </div>
                    </div>
                    <div class="survey-begin txt-center">
                        <div class="btn-item frw" @click="handleForward" v-html="JsonData.frdBtnTxt"></div>
                    </div>
                </div>
            </div>    
    `,
    methods:{
        handleForward:function(){
            document.getElementById('forwardbutton').click();
        }
    }
}) 