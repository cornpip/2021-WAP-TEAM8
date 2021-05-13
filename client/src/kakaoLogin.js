const dotenv = require('dotenv')
dotenv.config();

module.exports = () => {
    window.Kakao.init(process.env.KAKAO_ID);
        function kakaoLogin() {
          window.Kakao.Auth.login({
            scope: "profile, account_email",
            success: function (authObj) {
              console.log(authObj);
              window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                  const kakao_account = res.kakao_account;
                  console.log(kakao_account);
                },
              });
            },
          });
        }
}