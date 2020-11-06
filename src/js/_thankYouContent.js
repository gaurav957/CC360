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
                </div>
            </div>    
    `
}) 