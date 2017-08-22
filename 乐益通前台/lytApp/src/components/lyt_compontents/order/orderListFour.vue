<template lang="html">
  <div>
    <ul class="order_list">
      <li v-for="orderDetail in orderDetails">
        <img src="" :alt="orderDetail.img"/>
        <div class="detail_right">
          <h6>{{orderDetail.title}}</h6>
          <p>下单时间：{{orderDetail.time}}</p>
          <span>使用积分：</span>
          <b>{{orderDetail.num}}</b>
          <em>{{orderState[orderDetail.state]}}</em>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              orderDetails: [
                {
                  img: '图片4',
                  title: '呷哺呷哺100元代金券',
                  time: '2018.01.02 13:00:00',
                  num: '5432',
                  state: 0
                },
                {
                  img: '图片',
                  title: '呷哺呷哺100元代金券',
                  time: '2018.01.02 13:00:00',
                  num: '5432',
                  state: 1
                },
                {
                  img: '图片',
                  title: '呷哺呷哺100元代金券',
                  time: '2018.01.02 13:00:00',
                  num: '5432',
                  state: 2
                },
                {
                  img: '图片',
                  title: '呷哺呷哺100元代金券',
                  time: '2018.01.02 13:00:00',
                  num: '5432',
                  state: 2
                },
                {
                  img: '图片',
                  title: '呷哺呷哺100元代金券',
                  time: '2018.01.02 13:00:00',
                  num: '5432',
                  state: 2
                },
                {
                  img: '图片',
                  title: '呷哺呷哺100元代金券',
                  time: '2018.01.02 13:00:00',
                  num: '5432',
                  state: 2
                }
              ]
            };
        },
        props: [
          'orderState'
        ],
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
