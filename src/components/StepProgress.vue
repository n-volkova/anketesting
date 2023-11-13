<template>
  <div class="progress-wrapper">
    <div 
      v-for="(step, index) in steps" 
      :key="step" 
      class="step"
      :class="index <= currentStep && 'passed'"
    >
      <div
        v-if="index > 0"
        class="step-line"
      />
      <div
        class="step-circle"
        @click="$emit('change', step)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepProgress',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    currentStep: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="scss">

.progress-wrapper {
    display: flex;
    flex-direction: row;
    padding: 20px 60px;
    margin-bottom: 20px;

    .step {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        align-items: center;
        &:nth-of-type(1) {
            flex-grow: 0;
        }
        .step-circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #dad3d3;
            cursor: pointer;
        }
        .step-line {
            flex-grow: 1;
            height: 3px;
            background-color: #dad3d3;
        }
        &.passed {
            .step-circle {
                background-color: #75ec75;
            }
            .step-line {
                background-color: #75ec75;
            }
        }
    }
}
</style>
