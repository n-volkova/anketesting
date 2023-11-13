<template>
  <section :class="isMobile ? '' : 'shadow-box'">
    <p>Спасибо, анкета и тест отправлены!</p>

    <p>
      Мы все проверим и свяжемся с тобой в течение 2-3 рабочих дней.<br />
      Не переживай, если сразу не получил обратной связи, мы обязательно дадим тебе ответ по заявке ❤️
    </p>

    <p>Удачи!</p>
  </section>
</template>

<script>
export default {
  computed: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
    section {
        padding: 40px 20px;
    }
    .shadow-box {
        margin-top: 40px;
        padding: 40px 40px 20px;
    }
    p {
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 20px;
    }
</style>