<template>
  <div class="main-container">
    <h1 class="title">MBTI 정보</h1>
    <section class="main-section">
      <h3 class="sub-title">
        MBTI를 선택해서<br />해당 MBTI에 대한 정보를 확인해요!
      </h3>
      <div class="mbti-container">
        <div
          class="mbti-box"
          v-for="(mbti, idx) in mbtiList"
          v-bind:key="idx"
          v-on:click="docMove(mbti)"
        >
          <p class="mbti-text">
            {{ mbti }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mbtiList: this.$store.state.mbtiList,
    };
  },
  methods: {
    docMove(selectMBTI) {
      this.$store.dispatch("selectMbti", selectMBTI);
      this.$router.push({
        path: "/doc",
        query: {
          mbti: selectMBTI,
        },
      });
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main-container {
    padding: 0 30px;
  }

  .main-section {
    margin: 30px;
    /* width: 100%; */
    height: 80%;
    border-radius: 20px;
  }

  .mbti-container {
    padding: 5vh 10vh;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
  }

  .mbti-box {
    width: 100px;
    height: 100px;
  }

  .mbti-text {
    font-size: 28px;
  }
}

@media (max-width: 540px) {
  .main-section {
    border-radius: 20px 20px 0 0;
  }

  .mbti-container {
    padding: 10vh 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .mbti-box {
    width: 70px;
    height: 70px;
  }

  .mbti-text {
    font-size: 24px;
  }
}

* {
  box-sizing: border-box;
}

.main-container {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff9c8;
}

.title {
  margin: 0;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.sub-title {
  margin: 0;
  padding: 30px 20px;
  font-size: 20px;
  font-weight: bold;
  color: #f59607;
  text-align: center;
}

.main-section {
  height: 100%;
  background-color: #fff;
}

.mbti-box {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffd338;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.mbti-text {
  margin: 0;
  font-weight: bold;
  color: #000000b4;
}
</style>
