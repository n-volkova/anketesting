<template>
  <section class="ready-step">
    <p>{{ message }}</p>
    <p>Если готов — жми кнопку.</p>

    <div
      class="button start-test"
      @click="toGrammar()"
    >
      Начать
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    message() {
      return 'Перейдем к тесту на грамотность. Это важный этап, поскольку работа в чате подразумевает грамотное составление ответов клиентам. Мы не общаемся шаблонами!';
    },
  },
  methods: {
    toGrammar() {
      this.$emit('change', 'Grammar');
    }
  }
};
</script>

<style lang="scss">

    .ready-step {
        padding: 40px;
        margin-top: 40px;
        @media (max-width: 600px) {
            margin-top: 0;

        }
        p {
            margin-bottom: 20px;
            font-size: 17px;
            line-height: 26px;
        }
    }
    
</style>