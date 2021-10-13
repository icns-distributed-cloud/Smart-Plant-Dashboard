<template>
  <link
    href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
    rel="stylesheet"
  />
  <div class="wrapper">
    <div class="table-header">
      센싱 장비 관리 | <Icon icon="bx:bx-home-alt" />
    </div>

    <div class="table-main">
      <div>
        <div class="table-main__header">
          센싱 장비 관리 설정
        </div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">
              센싱 장비를 관리하는 화면입니다.
            </div>

            <div>
              <button
                type="button"
                class="btn btn-primary"
                style="margin-bottom: 12px; float:right"
                @click.stop="openModal"
              >
                신규 등록
              </button>

              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>식별번호</th>
                    <th>센싱 장비 위치</th>
                    <th>센싱 장비 종류</th>
                    <th>기타 정보</th>
                    <th>담당자</th>

                    <th>담당자 내선</th>
                    <th>담당자 휴대번호</th>

                    <th style="width: 175px">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>tt</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>

                    <td
                      style="
                          padding-top: 2px;
                          padding-right: 0px;
                          padding-left: 0px;
                          padding-bottom: 2px;
                          text-align: center;
                        "
                    >
                      <a class="btn btn-outline-primary mod-btn"
                        ><i class="bx bx-edit"></i> 수정
                      </a>
                      <a class="btn btn-outline-danger tr_data_del"
                        ><i class="bx bx-trash"></i> 삭제</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>tt</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>

                    <td
                      style="
                          padding-top: 2px;
                          padding-right: 0px;
                          padding-left: 0px;
                          padding-bottom: 2px;
                          text-align: center;
                        "
                    >
                      <a class="btn btn-outline-primary mod-btn"
                        ><i class="bx bx-edit"></i> 수정</a
                      >
                      <a class="btn btn-outline-danger tr_data_del"
                        ><i class="bx bx-trash"></i> 삭제</a
                      >
                      <input
                        type="hidden"
                        id="SS_INNB_{{USER SS_ITLPC}}"
                        value="{{USER SS_INNB}}"
                      />
                      <input
                        type="hidden"
                        id="SS_TPYNN_{{USER SS_ITLPC}}"
                        value="{{USER SS_TPYNN}}"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>tt</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>

                    <td
                      style="
                          padding-top: 2px;
                          padding-right: 0px;
                          padding-left: 0px;
                          padding-bottom: 2px;
                          text-align: center;
                        "
                    >
                      <a class="btn btn-outline-primary mod-btn"
                        ><i class="bx bx-edit"></i> 수정</a
                      >
                      <a class="btn btn-outline-danger"
                        ><i class="bx bx-trash"></i> 삭제</a
                      >
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>식별번호</th>
                    <th>센싱 장비 위치</th>
                    <th>센싱 장비 종류</th>
                    <th>기타 정보</th>
                    <th>담당자</th>

                    <th>담당자 내선</th>
                    <th>담당자 휴대번호</th>

                    <th>ACTION</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <nav aria-label="Page navigation example" style=" float:right">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only"></span>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link cur-page" href="#">1</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="closeModal" />
</template>

<script>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Icon,
    Modal,
  },
  setup() {
    const showModal = ref(false);
    const openModal = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    return {
      showModal,
      openModal,
      closeModal,
    };
  },
};
</script>

<style>
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}
.table {
  color: #464d5c;
}
.table-main {
  margin: 20px;
  background-color: #272e48;
  color: #bdd1f8;
  border-radius: 9px;
  height: 600px;
}
.table-main__header {
  padding: 20px;
  font-size: 20px;
}

.table-main__content {
  margin: 0 20px;
  color: #8a99b5;
}
table-main__content-intro {
  color: #8a99b5;
}
table {
  text-align: center;
}
.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 1px solid #464d5c;
}
.table.table-bordered th {
  border: 2px solid #464d5c;
  color: #bdd1f8;
  font-size: 15px;
}
tbody td,
.table tbody th {
  border-color: #464d5c;
  color: #8a99b5;
  font-size: 24px;
}
thead > tr,
tfoot > tr {
  height: 60px;
  vertical-align: middle;
}
.mod-btn {
  margin-right: 5px;
}
.btn-outline-danger,
.mod-btn {
  color: white;
}
.bx {
  color: #7c8ba6;
}
.table-hover:hover tbody tr:hover td {
  color: white;
  background-color: #244a63;
}
nav {
  border: none;
}
.btn-primary {
  background-color: #5a8dee !important;
  font-weight: 600;
  border: #5a8dee 1px solid;
}
.page-link {
  border: #7c8ba6 2px solid;
  color: #7c8ba6;
  background-color: #1a233a;
}
.cur-page {
  background-color: #5a8ded;
  color: white;
}
</style>
