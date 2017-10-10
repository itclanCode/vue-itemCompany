<template lang="html">
  <div class="all_box find_detail">
    <div id="header">头部</div>
    <div id="wrapper">
      <div id="scroller">
        <div class="find_detail_top">
          <h6>中信乐益通官方微信正式上线，随时了解您的积分情况。</h6>
          <p class="find_detail_time">
            <b>中信乐益通</b><em>2017-01-02 13：00：00</em><img src="./eye@2x.png" alt=""/><span>1233</span>
          </p>
          <img src="" alt="" class="find_detail_img"/>
          <p class="find_detail_content">中信乐益通官方微信正式上线了，随时了解您的积分情况中信乐益通官方微信正式上线了，随时了解您的积分情况中信乐益通官方微信正式上线了，随时了解您的积分情况中信乐益通官方微信正式上线了，随时了解您的积分情况中信乐益通官方微信正式上线了。</p>
          <p class="find_detail_content">中信乐益通官方微信正式上线了，随时了解您的积分情况中信乐益通官方微信正式上线了，随时了解您的积分情况中信乐益通官方微信正式上线了。</p>
        </div>
        <h5>最新评价</h5>
        <ul class="find_detail_evaluate">
          <li>
            <img src="" alt="" class="find_detail_user"/>
            <div class="find_detail_right">
              <div>
                <b>火箭人</b><span>1203</span><img src="./eye@2x.png" alt=""/>
              </div>
              <span class="find_detail_right_time">12分钟前</span>
              <p>二师兄说得对,二师兄说得对,二师兄说得对,二师兄说得对,二师兄说得对.</p>
            </div>
          </li>
          <li>
            <img src="" alt="" class="find_detail_user"/>
            <div class="find_detail_right">
              <div>
                <b>火箭人</b><span>1203</span><img src="./eye@2x.png" alt=""/>
              </div>
              <span class="find_detail_right_time">12分钟前</span>
              <p>二师兄说得对,二师兄说得对,二师兄说得对,二师兄说得对,二师兄说得对.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="footer">
      <input type="text" placeholder="我想说..."/>
      <img src="./message.png" alt=""/>
      <img src="./star.png" alt=""/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {};
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss'; /*引入外部scss文件*/
  .all_box{
    &.find_detail{
     #wrapper{
       top:1.23rem;
     }
      .find_detail_top{
        font-family: "PingFang-SC-Medium";
        padding:0 0.3rem;
        h6{
          margin:0.5rem 0.02rem 0.24rem;
          line-height:0.46rem;
          font-size:0.34rem;
        }
        .find_detail_time{
          margin-bottom:0.32rem;
          b,em{
            margin-right:0.2rem;
            font-size:0.24rem;
            color:#8b8b8b;
          }
          img{
            margin-left:1.44rem;
            position:relative;
            top:0.18rem;
            width:0.52rem;
            height:0.52rem;
          }
          span{
            font-size:0.24rem;
            color:#8b8b8b;
            font-family: "HelveticaNeueLTPro-Roman";
          }
        }
        .find_detail_img{
          margin-bottom:0.32rem;
          width:6.86rem;
          height:2.86rem;
          background:deepskyblue;
        }
        .find_detail_content{
          line-height:0.46rem;
          font-size:0.28rem;
          color:#787878;
        }
      }
      h5{
        padding:0.5rem 0 0.2rem 0.32rem;
        font-size:0.34rem;
        color:#242424;
        /*@include border-1px-b(#dcdcdc);*/
        border-bottom:0.01rem solid #dcdcdc;
      }
      .find_detail_evaluate{
        margin-left:0.32rem;
        li{
          overflow:hidden;
          @include border-1px-b(#dcdcdc);
          .find_detail_user{
            margin-top:0.32rem;
            float:left;
            width:0.8rem;
            height:0.8rem;
            background:deepskyblue;
          }
          .find_detail_right{
            float:left;
            margin-left:0.16rem;
            width:6.1rem;
            div{
              overflow:hidden;
              b{
                float:left;
                display: inline-block;
                margin:0.4rem 0 0.16rem;
                font-size:0.28rem;
                color:#666;
              }
              img{
                float:right;
                position:relative;
                top:0.26rem;
                width:0.52rem;
                height:0.52rem;
              }
              span{
                float:right;
                margin:0.4rem 0.2rem 0 0;
                font-size:0.24rem;
                color:#8b8b8b;
                font-family: "HelveticaNeueLTPro-Roman";
              }
            }
            .find_detail_right_time{
              font-size:0.22rem;
              color:#b4b4b4;
            }
            p{
              margin:0.24rem 0 0.32rem;
              width:5.6rem;
              line-height:0.36rem;
              font-size:0.28rem;
              color:#666;
            }
          }
        }
      }
      #footer{
        overflow:hidden;
        input{
          float:left;
          padding-left:0.22rem;
          margin:0.16rem 0 0 0.32rem;;
          width:5.26rem;
          height:0.62rem;
          border:0.01rem solid #dcdcdc;
          border-radius:0.1rem;
          &::-webkit-input-placeholder {
             font-size:0.24rem;
             color: #8b8b8b;
           }
          &:-moz-placeholder {/* Firefox 18- */
             font-size:0.24rem;
             color: #8b8b8b;
           }

          &::-moz-placeholder{/* Firefox 19+ */
             font-size:0.24rem;
             color: #8b8b8b;
           }

          &:-ms-input-placeholder {
             font-size:0.24rem;
             color: #8b8b8b;
           }
        }
        img{
          float:left;
          width:0.4rem;
          height:0.4rem;
          margin:0.28rem 0 0 0.32rem;
          &:last-child{
            position:relative;
            top:-0.02rem;
           }
        }
      }
     }
  }
</style>
