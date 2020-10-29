Vue.component('intro-footer',{
    props:['JsonData'],
    template:`<div class="footer-intro">			
            <div class="copyright-block clearfix">
                <div class="footer-mck f-left"><img :src="JsonData.footerLogo" alt="Mckinsey" title="Mckinsey"></div>
                <div class="copy-rt r-right" v-html="JsonData.footerContent"></div>
            </div>
        </div>`
})