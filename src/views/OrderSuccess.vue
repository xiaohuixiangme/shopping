<template>
    <div>
         <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">OrderSuccess</span>
    </nav-bread>
  <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
      <li class="cur"><span>确认地址</span> </li>
          <li class="cur"><span>查看订单</span></li>
          <li class="cur"><span>创建支付</span></li>
          <li class="cur"><span>订单完成</span></li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="/static/ok.png" alt=""></div>
      <div class="order-create-main">
        <h3>祝贺你! <br>您的订单正在处理中!</h3>
        <p>
          <span>订单 ID：{{orderId}}</span>
          <span>订单总价：{{orderTotal | currency('¥')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link class="btn btn--m" to="/cart">返回购物车</router-link>
          </div>
          <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">返回商品页面</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nav-footer></nav-footer>
</div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import axios from 'axios'
export default {
    data(){
        return{
          orderId:'',
          orderTotal:0
        }
    },
      components:{
          NavHeader,
          NavFooter,
          NavBread,
        },
        mounted(){
            var orderId=this.$route.query.orderId;
            if(!orderId){
                return;
            }
            axios.get('/users/orderDetail',{
                params:{
                    orderId:orderId
                }
            }).then((response)=>{
                let res =response.data;
                 if(res.status=='0'){
                     this.orderId=orderId;
                  this.orderTotal=res.result.orderTotal;

                 }
            })
        }
    
}
</script>
