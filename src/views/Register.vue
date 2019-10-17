<template>
  <div class="register">
    <header class="register-header">
      <div class="header-content">
        <img src="../assets/images/register.png" alt srcset />
        <router-link tag="span" to="/login">登录</router-link>
      </div>
    </header>
    <section class="register-section">
      <div class="section-content">
        <form action method="post">
          <div class="register-phone">
            <label for>手机号</label>
            <input type="text"  v-bind="phone">
            <span>
              <i class="iconfont"></i>请输入正确的11为手机号码
            </span>
          </div>

          <div class="register-email">
            <label for>邮箱</label>
            <input type="text" />
            <span>
              <i class="iconfont"></i>请输入正确邮箱
            </span>
          </div>

          <div class="register-password">
            <label for>创建密码</label>
            <input type="password" />
            <span>
              <i class="iconfont"></i>密码强度
            </span>
          </div>

          <div class="register-repassword">
            <label for>输入密码</label>
            <input type="password" v-bind="password" />
            <span>
              <i class="iconfont"></i>两次输入的密码不一致，请重新输入
            </span>
          </div>

          <div class="register-submit">
            <button type="submit">同意以下协议并注册</button>
          </div>
        </form>

        <div>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </div>
      </div>
    </section>
    <footer class="register-footer"></footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.register {
  background: #fff;
  height: 100vh;
  width: 100%;
  .register-header {
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.6rem 0.7rem;
      border-bottom: 2px solid #ccc;
      img {
        width: 30%;
        height: auto;
      }
      span {
        background: #ffbd00;
        padding: 0.3rem 0.5rem;
        font-size: 0.8rem;
        border-radius: 0.3rem;
      }
    }
  }
  .register-section {
    .section-content {
      margin: 2rem 1.5rem;
      div {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5rem;
      }

      input {
        border: 1px solid #ffbd00;
        margin: 0.3rem 0;
        height: 2rem;
      }
      label {
        font-size: 0.9rem;
      }
      span {
        font-size: 0.7rem;
      }

      .register-submit {
        button {
          width: 60%;
          font-size: 0.9rem;
          background-color: #ffbd00;
          border: 0;
          border-radius: 0.2rem;
          padding: 0.4rem 0;
        }
      }
    }
    .f1 {
      color: #fe8c00;
      font-size: .8rem
    }
  }
  .register-footer {
  }
}
</style>