<template lang="html">
  <div class="all_box explain agreement">
    <!--<div id="header">头部</div>-->
    <div id="wrapper">
      <div id="scroller">
        <p v-for="(explain,$index) in explains">{{explain}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        explains: [
          '一、协议内容及签署',
          '1.本协议对于您的权益有或可能具有重大关系的条款，及对本公司具有或可能具有免责或限制责任的条款，请您注意。您确认，在您注册成为乐益通会员接受本服务之前，您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即表示您同意遵循本协议之所有约定。',
          '2.您同意，本公司有权随时依据法律、行政法规或者本公司经营状况等因素对本协议内容进行单方面的修改，并以在本网站公告的方式予以公布，无需另行单独通知您；若您在本协议内容公告修改后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应停止使用本服务。',
          '3.您声明，您在中信乐益通网站（www.ecashback.com.cn）上发生的所有积分汇兑、充值、消费、转账等操作，本公司有权从积分操作中获取您的相关信息（包括但不限于交易物流信息、行为信息、账户相关信息等），本公司将按照您的交易操作，进行相应系统服务，对因此给您造成的任何损失均不承担责任。但您确认，您接受本服务时，您应完全遵守本《中信乐益通服务协议》及本公司制定的各项规则及页面提示等。',
          '二、乐益通服务概要',
          '1.积分汇兑：会员名下的各类积分可统一兑换为乐益通积分，实现各类积分的归集，并利用乐益通消费渠道的优势，让积分价值最大化；通过乐益通与各合作机构的积分汇兑通道，会员可实现名下各类积分的转换，获取自己想要的积分及里程等。',
          '2.积分券：是由乐益通发行，能在一定期限内用于积分账户充值和积分消费的凭证。',
          '3.联名卡：乐益通与中信银行合作发行的联名借记卡（IC芯片卡）；一卡双账户，卡下具备借记账户和乐益通积分账户两个账户；线下消费支付时，自动优先使用积分账户。',
          '4.E中信：中信集团互联网金融的电子商务门户网站（www.ecitic.com），是国内首家开展集银行、证券、保险、基金、信托、港股交易于一体的综合金融服务门户。',
          '5.积分消费：是指使用乐益通积分购买相应的产品及服务。',
          '6.登录密码：是指使用乐益通账户时的网站登录密码，只用于乐益通网站登录的安全验证。',
          '7.积分账户交易密码：是您进行积分转账、中信商城积分支付、积分换里程等线上积分支付操作的交易密码，该密码设定为6位数字。',
          '三、会员注册及应尽义务',
          '1.注册相关:在接受本服务前，您必须先行注册，取得本公司提供给您的乐益通账户（以下亦简称该账户），并同意：按照乐益通要求准确提供并在取得该账户后及时更新您正确、最新及完整的身份信息及相关资料。若本公司有合理理由怀疑您提供的身份信息及相关资料错误、不实、过期或不完整，本公司有权暂停或终止向您提供部分或全部服务。本公司对此不承担任何责任，您将承担因此产生的任何直接或间接的不利后果。若因国家法律法规、部门规章或监管机构的要求，本公司需要您补充提供任何相关资料时，如您不能及时配合提供，本公司有权暂停或终止向您提供部分或全部服务。您应对您的积分账户负责，只有您本人可以使用您的积分账户，该账户不可变更、不可转让、不可赠与。您同意，若您丧失全部或部分民事权利能力或民事行为能力，本公司有权根据有效法律文书（包括但不限于生效的法院判决、生效的遗嘱等）依法处置与您的乐益通账户相关的款项。',
          '2.会员义务:(a)遵守乐益通会员服务条款的约定。(b)在注册及享受乐益通服务过程中会员有义务按照乐益通要求填写真实有效的个人信息，同时当会员联系信息发生变化时，为保证乐益通积分服务的连续性，会员应及时将变化通过乐益通网站或客服热线通知乐益通；因会员提供信息不实、通讯方式变化未及时通知等而导致乐益通与会员间通信遗失、延误或过期，相应责任由会员自行承担。(c)不得损害其它会员的任何权利。(d)不得在网站上发布任何违反国家有关法律法规的信息。(e)不得以特殊方式恶意获得个人利益。(f)不得损害乐益通和其它第三方合作公司的利益。(g)不得滥用乐益通积分，包括但不限于擅自出售或交易积分，呈报不实之资料（如消费记录）、明显作弊的、洗钱、恐怖融资、贩卖枪支、毒品、禁药、盗版软件、黄色淫秽物品、赌博及其他本公司认为不得使用本服务进行的行为，乐益通将视情节不同，有权采取如下措施：要求赔偿损失、终止会员服务资格、取消已积累积分、按实际售价缴付已兑换奖品费用及相应的运费。 若触及法律，乐益通保留追究法律责任的权利，会员须承担相关的律师费、诉讼费等。',
          '四、责任免除及限制',
          '1.请会员妥善保管用户名和密码，若账户被盗，则由此引起的任何积分或经济等损失由会员个人负责。',
          '2.会员订单提交成功只代表订单信息已被收到，只有当会员订购的商品已被发送至指定地址时，才构成对会员订单的接受。在会员兑换订单提交后、商品收到前，乐益通有权对订单进行审核或取消。',
          '3. 乐益通将尽力确保合作伙伴能提供有关产品和服务，但对因合作伙伴未能提供有关产品和服务而引起的损失概不负责。当会员使用合作伙伴的产品和服务时，须受合作伙伴的条款及细则约束，乐益通不会负责任何损失。',
          '4. 乐益通在符合下列条件之一时，可对会员个人资料进行必要的使用，并被免于任何责任：(a)已取得会员同意的。(b)为免除会员在生命、身体或财产方面之急迫危险的。(c)为防止他人权益之重大危害的。(d)为增进公共利益，且无害于会员重大利益的。(e)由于乐益通不拥有或不控制的公司以及乐益通不雇佣或不管理的人员所造成的个人信息的泄露及由此而导致的任何法律争议和后果。(f)由于与乐益通会员网站链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果。(g) 如您的手机号码变更或遗失，请及时更新注册手机号码，如因未及时更新而造成的损失乐益通不承担责任。',
          '五、系统中断或故障',
          '系统因下列状况无法正常运作，使您无法使用各项服务时，本公司不承担损害赔偿责任，该状况包括但不限于：(a)本公司在本网站公告之系统停机维护期间。(b)电信设备出现故障不能进行数据传输的。(c)因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成本公司系统障碍不能执行业务的。(d)由于黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟。',
          '六、隐私权保护',
          '一旦您同意本协议或接受本服务，您即同意本公司对您个人信息有知情权。',
          '1.账户名和密码:在您注册为乐益通用户时，我们会要求您设置账户名和密码来识别您的身份。您仅可通过您设置的密码来使用该账户，如果您泄漏了密码，您可能会丢失您的个人识别信息，并可能导致对您不利的法律后果。该账户和密码因任何原因受到潜在或现实危险时，您应该立即和本公司取得联系，在本公司采取行动前，本公司对此不负任何责任。',
          '2.注册信息:您注册该账户时应向本公司提供您的真实姓名、地址、国籍、电话号码和电子邮件地址等国家法律法规要求的信息，您还可以选择来填写相关附加信息（包括但不限于您公司所在的省份和城市、时区和邮政编码、传真号码、个人主页和您的职务）。为有针对性地向您提供新的服务和机会，您了解并同意本公司将通过您的电子邮件地址或该手机向您发送相关通知。',
          '3.银行账户信息:对于持有乐益通银行联名卡的会员，本公司所提供的服务，如需要您提供您的银行账户信息，在您提供相应信息后，本公司将严格履行相关保密约定。',
          '4.交易行为:为了保障您使用本服务的安全以及不断改进服务质量，本公司将记录并保存您登录和使用本服务的相关信息，但本公司承诺不将此类信息提供给任何第三方（除双方另有约定或法律法规另有规定及本公司关联公司外）。',
          '5.为更为有效地向您提供服务，除本协议另有规定外，本公司不对外公开或向第三方提供您的信息，但以下情况除外：(a)事先获得您的明确授权；(b)只有披露您的个人资料，才能提供您需要的产品和（或）服务；(c)按照本协议的要求进行的披露；(d)根据法律法规的规定；(e)按照政府主管部门的要求；(f)为维护本公司及其关联公司的合法权益；(g)您使用乐益通账户成功登录过的其他网站；(h)对您或您所代表公司的身份真实性进行验证。',
          '6.未成年人隐私权的保护(a)乐益通保护未成年人个人资料的保密性及安全性，但任何未成年人参加乐益通计划活动应事先得到其监护人的同意； 监护人应承担未成年人在乐益通隐私权；(b)未经未成年人监护人同意，乐益通将不会使用未成年人之个人资料，亦不会向任何第三方披露或传送可识别该未成年人的个人资料；(c)若经未成年人监护人同意，乐益通可对未成年人个人资料进行收集，但乐益通将会向监护人披露此未成年人个人信息资料；监护人的同意包括但不限于口头的、书面的或者其他形式的；',
          '7.外部链接本网站含有到其他网站的链接，但本公司对其他网站的隐私保护措施不负任何责任。本公司可能在任何需要的时候增加商业伙伴或共用品牌的网站。',
          '8.安全:本公司仅按现有技术提供相应的安全措施来使本公司掌握的信息不丢失，不被滥用和变造。这些安全措施包括向其它服务器备份数据和对用户密码加密。尽管有这些安全措施，但本公司不保证这些信息的绝对安全。',
          '七、网络服务内容所有权',
          '1.乐益通网站定义的网络服务内容包括：文字、软件、声音、图片、录像、图表、广告中的全部内容；电子邮件的全部内容；乐益通网站为用户提供的其他信息。',
          '2.所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在乐益通网站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。乐益通网站所有的文章版权归原文作者和乐益通网站共同所有，任何人需要转载乐益通网站的文章，必须征得原文作者或乐益通网站授权。',
          '八、法律适用、管辖与其他',
          '本协议由本协议条款与乐益通网站公示的各项规则组成，相关名词可互相引用参照，如有不同理解，以本协议条款为准。您对本协议理解和认同，您即对本协议所有组成部分的内容理解并认同，一旦您接受本服务，您和本公司即受本协议所有组成部分的约束。本协议部分内容被有管辖权的法院认定为违法的，不因此影响其他内容。'
        ]
      };
    },
    mounted:function(){
      setTimeout(function () {
        var myscroll = new IScroll('#wrapper', {
          // 启用tap事件
          tap: true,
          // 取消屏蔽默认事件
          preventDefault: false
        });
        // 防止同屏内滑动事件产生影响，禁止滚动条的滚动事件，当滑动的时候不进行冒泡
        document.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, false);
      }, 0.3 * 1000);
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
  &.agreement{
  #wrapper{
    /*top:1.23rem;*/
    background:#fff;
  p{
    margin-top:0;
  &:first-child{
     margin-top:0.32rem;
   }
  }
  }
  }
  }
</style>





























