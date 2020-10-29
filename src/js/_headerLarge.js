Vue.component('header-large', {
    props:['JsonData'],
    template:`
    <div class="intro-nav">
        <div class="cst-container">
            <div class="brand-inner clearfix">
                <div class="mck-brand"><img width="150" height="48" 
                :src="JsonData.logo"
                alt="Mckinsey" title="Mckinsey"></div>          

            </div> 
            <div class="intro-title-container">
                <div class="title-banner"><img :src="JsonData.banner"></div>
                <div class="intro-title" v-html="JsonData.title">
                    
                </div>
               </div>          

        </div>
    </div>    
    `
})