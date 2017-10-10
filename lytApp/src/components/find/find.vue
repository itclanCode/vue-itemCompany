<template lang="html">
  <div class="all_box collection find_home_page">
    <div class="header_box">
      <header></header>
    </div>
    <div class="banner"></div>
    <div class="line"></div>
    <ul class="article">
      <li class="article_transverse">
        <router-link to="/find/findDetail">
          <div class="left_article">
            <p>中信乐益通官方微信正式上线了，随时了解您的积分情况。</p>

            <div class="article_bottom">
              <em>官方</em><em>推荐</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
            </div>
          </div>
          <img src="" alt="" class="right_article"/>
        </router-link>
      </li>
      <li class="article_transverse">
        <div class="left_article">
          <p>中信乐益通官方微信正式上线了，随时了解您的积分情况。</p>

          <div class="article_bottom">
            <em>官方</em><em>推荐</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
          </div>
        </div>
        <img src="" alt="" class="right_article"/>
      </li>
      <li class="article_portrait">
        <h6>积分当钱花，就到麦当劳。积分当钱花，就到麦当劳。</h6>

        <div class="article_portrait_images">
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
        </div>
        <div class="article_bottom">
          <em>麦当劳</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
        </div>
      </li>
      <li class="article_portrait">
        <h6>积分当钱花，就到麦当劳。积分当钱花，就到麦当劳。</h6>

        <div class="article_portrait_images">
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
        </div>
        <div class="article_bottom">
          <em>麦当劳</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
        </div>
      </li>
    </ul>
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
  .all_box{
    &.find_home_page{
       .article{
         margin-top:0;
       }
       .banner{
         margin-top:1.23rem;
         /*height:3rem;*/
       }
     }
  }
</style>
