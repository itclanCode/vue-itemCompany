<template lang="html">
  <div class="all_box explain">
    <p v-for="(explain,$index) in explains">{{$index+1}}.{{explain}}</p>
    <span>（移动：10086  联通：10010  电信：10000）</span>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              explains: [
                '如遇运营商系统繁忙，到账时间会有延迟。',
                '本充值不参加当地运营商活动。',
                '支持全国各省（不包含港澳台地区）。',
                '充值业务目前不提供发票。',
                '话费到账情况请拨打运营商客服电话查询。'
              ]
            };
        },
        components: {}
    };
</script>
