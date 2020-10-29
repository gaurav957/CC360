Vue.component('intro-content', {
    props:["JsonData"],
    template:`<div class="assessment-intro">  
               <div class="cst-container">  
                <div class="survey-intro">
                    <div class="introduction-title" v-html="JsonData.heading">
                    </div>
                    <div class="intro-panel" v-html="JsonData.content">                       
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