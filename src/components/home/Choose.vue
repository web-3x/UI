<script setup>
import { ref } from "vue";
import { listAddress } from './address.js'

const activeTab = ref(0);
</script>
<template>
  <div class="convention-hall page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div class="van-nav-bar__title van-ellipsis">CHỌN TỈNH</div>
      </div>
    </div>

    <div class="convention-itemm">
      <van-tabs v-model:active="activeTab" sticky swipeable>
        <van-tab title="Thành phố">
          <div class="card">
            Dịch vụ cung cấp gái đẹp miễn phí trên toàn quốc , Có thể sắp xếp
            bất cứ nơi nào tại Việt Nam và bất cứ lúc nào , Bạn chỉ cần liên hệ
            lễ tân sẽ lập tức sắp xếp.
          </div>
          <div class="address">
            <van-cell-group v-for="add in listAddress">
              <van-cell :title="add.name" :to="`/list/${add.id}`" />
            </van-cell-group>
          </div>
        </van-tab>
        <van-tab title="Giới Thiệu Nền Tảng">
          <div class="card">
            Dịch vụ cung cấp gái đẹp miễn phí trên toàn quốc , Có thể sắp xếp
            bất cứ nơi nào tại Việt Nam và bất cứ lúc nào , Bạn chỉ cần liên hệ
            lễ tân sẽ lập tức sắp xếp.
          </div>
          <div class="rig-box">
            <p class="rig-title" style="margin: 18px 0">
              Có những mẫu em gái nào?
            </p>
            <p class="rig-content" style="margin: 9.6px 0">
              Người nổi tiếng trên mạng, người mẫu, tiếp viên hàng không, người
              mẫu trẻ, sinh viên đại học, chỉ có điều bạn không nghĩ ra được và
              bạn không thể làm được nếu không có nền tảng này
            </p>
            <p class="rig-title" style="margin: 18px 0">Khu vực phục vụ?</p>
            <p class="rig-content" style="margin: 9.6px 0">
              Các cuộc hẹn miễn phí trong cùng một thành phố, trên không ở bất
              kỳ đâu trong cả nước, các thành phố cấp một và cấp hai tại địa
              phương ở Việt Nam và các thành phố cấp ba cũng có thể được sắp xếp
              bằng cách liên hệ với nhân viên tiếp tân。
            </p>
            <p class="rig-content" style="margin: 9.6px 0">
              Dịch vụ cung cấp gái đẹp miễn phí trên toàn quốc , Có thể sắp xếp
              bất cứ nơi nào tại Việt Nam và bất cứ lúc nào , Bạn chỉ cần liên
              hệ lễ tân sẽ lập tức sắp xếp.
            </p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<style scoped></style>
