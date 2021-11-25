<template>
<div>
    <div class="content-body">
        <form class="login-wrapper">
            <div class="login-text">LOGIN</div>
            <div class="input-wrapper">
                <label class="login-label" for="id">사용자 이메일(id)</label>
                <input type="text" class="form-control" placeholder="id" aria-label="id" aria-describedby="basic-addon1"
                style="width: 100%;"
                v-model="currUser.email"
                >
            </div>
            <div class="input-wrapper">
                <label class="login-label" for="id">사용자 비밀번호(pw)</label>
                <input type="text" class="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1"
                style="width: 100%;"
                v-model="currUser.password"
                >
            </div>
            <div class="input-wrapper">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="true"
                    id="flexCheckChecked"
                    name="keepLoginCheck"
                    checked
                    >
                    <label class="form-check-label" for="flexCheckChecked">로그인 유지</label>
                </div>
            </div>
            <button class="btn btn-primary" style="width: 70%"
            @click="logIn()"
            >로그인</button>
            <div class="sign-up-wrapper">
                <div style="font-size: 0.6rem; color: #8a99b5;">아직 회원이 아니신가요?</div>
                <div class="sign-up"
                @click="showSignUpModal=true"
                >회원가입 하기</div>
            </div>
        </form>
        <div class="image-wrapper">
        </div>
    </div>

    <SignUp v-if="showSignUpModal"
    @close="showSignUpModal=false"
    @sign-up="addUserInfo"
    ></SignUp>
    <AlertSuccess
    v-if="alertSuccess"
    @close="alertSuccess=false"
    :action="action"
    ></AlertSuccess>
    <AlertFail
    v-if="alertFail"
    @close="alertFail=false"
    :action="action"
    ></AlertFail>
</div>
</template>

<script>
import axios from "axios";
import VueCookies from 'vue-cookies';
import AlertSuccess from "./alert-success.vue";
import AlertFail from "./alert-fail.vue";
import SignUp from "./SignUp.vue";

export default {
    name: "Login",
    components: {
        SignUp,
        AlertSuccess,
        AlertFail,
    },
    data() {
        return {
            showSignUpModal: false,
            alertSuccess: false,
            alertFail: false,
            action: "",
            currUser: { email: "", password: "" },
        }
    },
    methods: {
        async addUserInfo(userInfo) {
            this.action = "회원가입";
            console.log(userInfo);
            try {
                const res = await axios.post(
                    "http://163.180.117.38:8281/api/auth/signup",
                    {
                        email: userInfo.email,
                        name: userInfo.name,
                        password: userInfo.password,
                        phone: userInfo.phone
                    }
                );
                this.alertSuccess = true;
                console.log(res);
            } catch (err) {
                this.alertFail = true;
                console.log(err);
            }
        },
        async logIn() {
            this.action = "로그인";
            try {
                const res = await axios.post(
                    "http://163.180.117.38:8281/api/auth/login",
                    {
                        email: this.currUser.email,
                        password: this.currUser.password,
                    }
                );
                this.token = res.data.data.token;
                console.log(this.token, this.currUser);
                VueCookies.set("token", this.token, "1h");
                VueCookies.set("email", this.currUser.email);
                this.getAuth();
            } catch (err) {
                this.alertFail = true;
                console.log(err);
            }
        },
        async getAuth() {
            try {
                const res = await axios.get(
                    "http://163.180.117.38:8281/api/auth",
                    {
                        headers: {
                            Authorization: 'Bearer ' + this.token
                        }
                    }
                );
                console.log(res);
            } catch(err) {
                console.log(err);
            }
        }
    },
    props: {
        token: String,
    }
}
</script>

<style>

.content-body {
    width: calc(100%-200px);
    height: 500px;
    margin: 100px;
    background-color: #272e48;
    box-shadow: -8px 12px 20px 0 rgb(11 26 51 / 63%);
    border-radius: 20px;
    display: flex;
}

.login-wrapper {
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-wrapper {
    width: 90%;
    margin: 10px 0px;
}

.login-label {
    color: #8a99b5;
    margin-left: 30px;
}

.login-text {
    font-size: 2rem;
    font-weight: bold;
    color: #bdd1f8;
    margin: 40px 0px;
    text-shadow: 1px 1px 4px black;
}

.image-wrapper {
    width: 45%;
    height: 100%;
}

.sign-up-wrapper {
    display: flex;
    align-items: flex-end;
    margin: 10px 0px;
}

.sign-up {
    font-size: 0.8rem;
    font-weight: 400;
    text-decoration: underline;
    color: white;
    cursor: pointer;
    margin-left: 10px;
}

</style>