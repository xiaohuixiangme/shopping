<template>
    <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">排序:</span>
      <a href="javascript:void(0)" class="default cur">默认</a>
      <a @click="sortGoods" href="javascript:void(0)" class="price">
        价格
          <svg t="1561366892697" class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2540" width="200" height="200">
          <path d="M533.74591785 14.43962576l0 652.37753843L473.34059007 666.81716419 473.34059007 14.43962576l60.40532778 1e-8z" fill="" p-id="2541"></path>
          <path d="M714.5047106 673.81131166L508.1980747 1025.0901777l-211.88249064-351.27886604 418.18912654 0z" fill="" p-id="2542"></path></svg>
          </a>
      <a href="javascript:void(0)" class="filterby stopPop">筛选条件</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
        <dl class="filter-price">
          <dt>价格:</dt>
          <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">全部</a></dd>
          <dd v-for="(item,index) in PriceFilter">
            <a href="javascript:;" v-bind:class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList" >
      
              <div class="pic">
                <a href="#"><img v-bind:src="'/static/'+item.productImage" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice | currency('¥')}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
             <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
            <img v-show="loading" src="./../assets/loading-spinning-bubbles.svg">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<modal v-bind:mdShow="mdShow" v-on:close="closeModal">
  <p slot="message">请先登录，否则无法加入到购物车中！</p>
  <div slot="btnGroup">
        <a class="btn btn --m" href="javascript" @click="mdshow = false">关闭</a>
  </div>
</modal>
<modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
  <p slot="message">
           <svg t="1561387187880" class="icon-ok" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2706" width="200" height="200"><path d="M511.452 957.752c-246.502 0-447.037-200.535-447.037-447.027 0-246.497 200.535-447.037 447.037-447.037S958.49 264.228 958.49 510.725c0 246.492-200.535 447.027-447.038 447.027z m0-842.788c-218.224 0-395.766 177.542-395.766 395.766s177.542 395.75 395.766 395.75 395.766-177.525 395.766-395.75-177.541-395.766-395.766-395.766z" fill="#bfbfbf" p-id="2707"></path>
           <path d="M438.477 684.841a25.605 25.605 0 0 1-18.125-7.516l-148.46-148.47a25.626 25.626 0 0 1 0-36.25 25.626 25.626 0 0 1 36.25 0l130.335 130.33 272.44-272.42a25.626 25.626 0 0 1 36.25 0 25.626 25.626 0 0 1 0 36.25L456.602 677.32a25.641 25.641 0 0 1-18.125 7.521z" fill="#bfbfbf" p-id="2708"></path></svg>
            <span>加入购物车成功！</span>
  </p>
  <div slot="btnGroup">
        <a class="btn btn --m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn --m" href="javascript:;" to="/cart">查看购物车</router-link>

  </div>
</modal>
<nav-footer></nav-footer>
    </div>
</template>
<style>
.load-more{
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.sort-up{
  transform: rotate(180deg);
  transition: all .3s ease-out;
}
.icon-arrow-short{
   transition: all .3s ease-out;
  width: 12px;
  height: 12px;
}
.btn:hover{
  background-color: #ffe5e6;
  transition: all .3s ease-out;
  }
  .icon-ok{
    position: relative;
    top: 5px;
     width: 24px;
  height: 24px;
  }
</style>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import Modal from './../components/Modal'
  import axios from 'axios'
    export default{
        data(){
            return {
              goodsList:[],
              sortFlag:true,
              page:1,
              pageSize:8,
              busy:true,
              loading:false,
              mdShow:false,
              mdShowCart:false,
              PriceFilter:[
                {
                  startPrice:'0.00',
                  endPrice:'100.00'
                },
                   {
                  startPrice:'100.00',
                  endPrice:'500.00'
                },
                   {
                  startPrice:'500.00',
                  endPrice:'1000.00'
                },
                   {
                  startPrice:'1000.00',
                  endPrice:'5000.00'
                },
              ],
              priceChecked:'all',
              filterBy: false,
            }
        },
        components:{
          NavHeader,
          NavFooter,
          NavBread,
          Modal
        },
        mounted(){
      this.getGoodsList();
        },
        methods:{
          getGoodsList(flag){
            var param={
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1,
              priceLevel:this.priceChecked
            }
            this.loading=true;
             axios.get("/goods/list",{params:param}).then((response)=>{
          let res = response.data;
          this.loading=false;
          if(res.status="0"){
            if(flag){
             this.goodsList =this.goodsList.concat(res.result.list);
             if(res.result.count==0){
               this.busy = true;
             }else{
               this.busy =false;
             }
            }else{
              this.goodsList =res.result.list;
              this.busy=false;
            }
          }else{
            this.goodsList = [];
          }
        })
          },
          sortGoods(){
            this.sortFlag= !this.sortFlag;
            this.page=1;
            this.getGoodsList();
          },
          setPriceFilter(index){
           this.priceChecked = index;
           this.page=1;
          this.getGoodsList();
          },
          loadMore(){   
             this.busy = true;
         setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
           }, 500)
          },
         addCart(productId){
           axios.post("/goods/addCart",{
             productId:productId
           }).then((res)=>{
             var res = res.data;
                if(res.status==0){
             this.mdShowCart =true;
              this.$store.commit("updateCartCount",1);
           }else{
            this.mdShow =true;
            }
           })
         },
         closeModal(){
           this.mdShow =false;
          this.mdShowCart =false;
         }
        }
    }
</script>
