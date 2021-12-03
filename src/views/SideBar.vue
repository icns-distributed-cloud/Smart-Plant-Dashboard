<template>
<div class="side-bar">
<div class="accordion" id="accordionExample">
    
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        Some placeholder content for the second accordion panel. This panel is hidden by default.
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.
      </div>
    </div>
  </div>

</div>
</div>

</template>

<script>

</script>

<style>
.user-info-wrapper {
  width: 90%;
  height: 30px;
  background-color: rgb(48 59 90 / 45%);
  line-height: 30px;
  padding: 0px 10px;
  border-radius: 20px;
  position: absolute;
  right: 5%;
  bottom: 12px;
}
.user-info {
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
}

.bi-box-arrow-right:hover {
  cursor: pointer;
}

.side-bar {
  order: 1;
  float: left;
  width: 240px;
  height: 100%;
  background-color: #1a233a;
  color: #c8d9f8;
  text-align: left;
  padding: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 8px 13px 20px 5px rgb(9 21 42 / 66%);
}

.home {
  color: #517bcd;
  padding: 1.2rem 1.5rem;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}
p {
  transition: all 0.5s;
  font-size: 0.85rem;
}

p:hover {
  color: #517bcd;
  padding-left: 0.1rem;
}
</style>