<template>
  <div class="main-container">
    <div class="info-container">
      <div class="profile-box">
        <div class="profile-img-box">
          <div class="profile-img"></div>
          <img
            class="delete-mbti-img"
            src="@/assets/trashcan.png"
            alt=""
            @click="deleteDetail"
          />
        </div>
        <input class="profile-name" v-model="name" />
      </div>

      <div class="form-control">
        <label class="form-label">MBTI</label>
        <div class="selected-mbti" @click="selectMBti">
          <div class="mbti-box">
            <p>{{ mbti }}</p>
            <img :src="require(`@/assets/Polygon.png`)" class="arrow" />
          </div>

          <ul class="mbti-option" v-bind:class="{ active: selectMbti }">
            <li
              class="mbti"
              v-for="(mbti, index) in mbtiList"
              :key="index"
              v-on:click="selectMbtiOption(mbti)"
            >
              {{ mbti }}
            </li>
          </ul>
        </div>
      </div>

      <div class="form-control">
        <label class="form-label">그룹</label>
        <button class="group">
          {{ groupName }}
        </button>
      </div>

      <div class="form-control">
        <label class="form-label">메모</label>
        <textarea class="memo-box" v-model="memo"></textarea>
      </div>

      <div class="form-control">
        <label class="form-label">이 MBTI는 어떨까?</label>
        <div class="doc-btn-container">
          <button class="doc-btn" @click="docMove(guest.mbti)">상대법</button>
          <button class="doc-btn" @click="docMove(guest.mbti)">
            주의할 점
          </button>
          <button class="doc-btn" @click="docMove(guest.mbti)">특징</button>
        </div>
      </div>

      <div class="btn-container">
        <button
          class="btn edit-btn"
          @click="editDetail"
          :disabled="changeDetail"
        >
          수정
        </button>
        <button class="btn cancel-btn" @click="closeDetail">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectMbti: false,
      name: this.$store.state.selectGuest.name,
      mbti: this.$store.state.selectGuest.mbti,
      groupID: this.$store.state.selectGuest.groupID,
      memo: this.$store.state.selectGuest.memo,
      changeDetail: true,
    };
  },
  computed: {
    guest() {
      return this.$store.state.selectGuest;
    },
    mbtiList() {
      return this.$store.state.mbtiList;
    },
    groups() {
      return this.$store.state.groups;
    },
    groupName() {
      return this.groups.filter((obj) => obj["id"] === this.groupID)[0].name;
    },
  },
  watch: {
    name: function () {
      if (this.guest.name !== this.name) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
    mbti: function () {
      if (this.guest.mbti !== this.mbti) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
    memo: function () {
      if (this.guest.memo !== this.memo) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
  },
  methods: {
    selectMBti() {
      if (this.selectMbti === true) {
        this.selectMbti = false;
      } else {
        this.selectMbti = true;
      }
    },
    selectMbtiOption(selectedMbti) {
      this.mbti = selectedMbti;
    },
    docMove(mbti) {
      this.$store.commit("SET_SELECTED_MBTI", mbti);
      this.$router.push({
        path: "/doc",
        query: {
          id: mbti,
        },
      });
    },
    async editDetail() {
      const formData = {
        name: this.name,
        mbti: this.mbti,
        memo: this.memo,
        groupID: this.groupID,
      };

      console.log(formData);

      await axios
        .put(`/guest/update/${this.guest.id}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "mbti" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteDetail() {
      await axios
        .delete(`/guest/remove/${this.guest.id}`, { withCredentials: true })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeDetail() {
      this.$router.push({ name: "mbti" });
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main-container {
    height: 100%;
  }

  .info-container {
    padding: 0 30px;
  }
}

@media (max-width: 540px) {
  .main-container {
    height: calc(100vh - 80px);
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-container {
  position: relative;
  padding: 50px 20px;
  width: 100%;
  background-color: #fff9c8;
}

.info-container {
  width: 100%;
}

.profile-box {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.profile-img-box {
  width: 100%;
  position: relative;
}

.profile-img {
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: #ffd338;
}

.delete-mbti-img {
  position: absolute;
  top: 0;
  right: 0;
}

.profile-name {
  padding: 5px;
  width: fit-content;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: 0;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.form-control {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.form-label {
  margin-bottom: 10px;
  padding-left: 10px;
  font-weight: 600;
  font-size: 18px;
}

.selected-mbti {
  position: relative;
  width: 100%;
}

.mbti-box {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.mbti-option {
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 120%;
  padding: 10px 0;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  list-style-type: none;
  border: 1px solid rgba(145, 145, 145, 0.3);
  border-radius: 15px;
  z-index: 10;
  gap: 10px;
}

.active {
  display: flex;
}

.mbti {
  width: 90%;
  padding: 10px 20px;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.group {
  padding: 10px 20px;
  background-color: #ffd338;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.memo-box {
  padding: 20px;
  width: 100%;
  height: 120px;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.doc-btn-container {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.doc-btn {
  width: 6rem;
  height: 2rem;
  font-size: 14px;
  background-color: #ffd338;
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.btn-container {
  display: flex;
  justify-content: space-evenly;
}

.btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
}

.edit-btn {
  border: none;
  background-color: #f59607;
}

.cancel-btn {
  border: solid 1px #f59607;
  background-color: #ffffff;
}
</style>
