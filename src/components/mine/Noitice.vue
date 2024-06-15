<template>
  <div class="container page">
    <div class="header">
      <div class="nav-bar van-nav-bar">
        <div class="van-nav-bar__content">
          <div @click="$router.go(-1)" class="van-nav-bar__left">
            <i
              class="van-icon van-icon-arrow-left"
              style="color: rgb(255, 255, 255)"
            ></i>
          </div>
          <div class="van-nav-bar__title van-ellipsis">Thông báo hệ thống</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="van-pull-refresh">
        <div class="van-pull-refresh__track" style="transition-duration: 0ms">
          <div class="van-pull-refresh__head"></div>
          <div class="listItem">
            <div class="listTitle">Hoạt động trên không</div>
            <div class="listContent html">
              <p>
                Chúng tôi là CANALIS CLUB - Một quán Bar lớn . Phục vụ tận nơi
                tại 63 tỉnh thành trên toàn quốc . Chúng tôi có những người mẫu
                cao cấp, tiếp viên hàng không, du học sinh.... Sẵn sàng phục vụ
                quý khách hàng !<br />
              </p>
            </div>
            <div class="listTime">
              <div class="listTimeText">2023-07-05 23:06:33</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container p {
  color: #000;
  padding-left: 0;
  padding-right: 0;
}
</style>
