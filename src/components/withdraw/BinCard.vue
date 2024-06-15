<template>
  <div class="container page">
    <div class="nav-bar van-nav-bar van-hairline--bottom">
      <div class="van-nav-bar__content">
        <div @click="$router.go(-1)" class="van-nav-bar__left">
          <i
            class="van-icon van-icon-arrow-left"
            style="color: rgb(255, 255, 255)"
          ></i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">MẬT KHẨU RÚT TIỀN</div>
      </div>
    </div>
    <div class="wrapper">
      <div
        class="van-cell-group van-cell-group--inset van-hairline--top-bottom"
      >
        <div class="van-cell van-field van-field--label-top">
          <div class="van-cell__title van-field__label van-field__label--top">
            <span>Mật khẩu rút tiền hiện tại</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                placeholder="Tạo Mật Khẩu Rút Tiền"
                class="van-field__control"
                style="color: #323233"
              />
            </div>
          </div>
        </div>
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>Mật khẩu rút tiền mới</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                placeholder="Vui lòng nhập lại mật khẩu rút tiền mới"
                class="van-field__control"
                style="color: #323233"
              />
            </div>
          </div>
        </div>
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>Nhập lại mật rút tiền mới</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                placeholder="Nhập Lại Mật Khẩu Rút Tiền Đã Tạo"
                class="van-field__control"
                style="color: #323233"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="sub-btn van-button van-button--default van-button--normal">
        <div class="van-button__content">
          <span class="van-button__text">Xác nhận</span>
        </div>
      </button>
    </div>
  </div>
</template>
