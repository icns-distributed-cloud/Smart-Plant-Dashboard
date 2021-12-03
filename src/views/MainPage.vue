<template>
<div style="width: 100%; height: 100%;">
    <div class="main-image-wrapper">
        <div class="rotate-box">
        </div>
    </div>
    <div class="main-shadow">
        <div class="main-title">SMART PLANT</div>
        <div class="sub-title">남부 발전소</div>
        <div class="pos-btn-wrapper">
            <div class="pos-btn">버킷 엘리베이터 1구역</div>
            <div class="pos-btn">버킷 엘리베이터 3구역</div>
        </div>
    </div>
</div>
</template>

<script>

</script>

<style>
.main-image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rotate-box {
    width: 3000px;
    height: 3000px;
    display: flex;
    animation: rotate-image 800s linear infinite;
    background-image: url("https://www.google.com/earth/studio/assets/static/images/hero-background.jpg");
    background-repeat: none;
    background-position: center;
    background-size: cover;
    padding: 100px;

}

.main-image {
    /* animation: rotate-image 800s linear infinite; */
    transform-origin: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
}

.main-shadow {
    width: 100%;
    height: 100%;
    background-color: #11111167;
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main-title {
    font-size: 5rem;
    font-weight: bold;
    text-shadow: 3px 3px 20px black;
    color: white;
}

.sub-title {
    font-size: 2rem;
    font-weight: bold;
    color: gray;
}

.pos-btn-wrapper {
    width: 600px;
    height: 200px;
    display: flex;
    justify-content: space-around;
}

.pos-btn {
    width: 230px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    margin: 45px 0px;
    border: 2px solid #7aaecc;
    border-radius: 50px;
    color: #7aaecc;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s linear;
}

.pos-btn:hover {
    background-color: #7aaecc30;
}


@keyframes rotate-image {
	100% {
        transform: rotate(360deg);
    }
}

</style>