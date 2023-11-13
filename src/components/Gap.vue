<template>
  <span class="gap-wrapper">

    <span
      class="gap"
      :class="{ 'empty': chosenFill == null, 'continuous': continuous }"
      @click="showFills"
    >{{ visibleFill !== null ? visibleFill : `&nbsp;` }}
    </span>

    <transition name="fade">
      <div
        v-if="tooltipActive"
        class="tooltip"
      >
        <div 
          v-for="(item, index) in fills" 
          :key="index"
          class="fill"
          :data-name="item"
          @click="(payload) => onGapChanged(payload)"
        >
          {{ item }}
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
import EventBus from '../eventBus';
export default {
  components: {
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    fills: {
      type: Array,
      default: () => []
    },
    correct: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tooltipOptions: {
        placement: 'top',
        modifiers: { offset: { offset: '0, 10px' } }
      },
      tooltipActive: false,
      chosenFill: null,
      visibleFill: null,
      continuous: false
    };
  },
  methods: {
    showFills() {
      this.tooltipActive = true;
    },
    onGapChanged(chosen) {
      let changedValue = chosen.target.textContent.trim();
      switch (changedValue) {
        case 'раздельно':
          this.visibleFill = ' ';
          this.continuous = false;
          break;
        case 'слитно':
          this.visibleFill = '';
          this.continuous = true;
          break;
        default: 
          this.visibleFill = changedValue;
          this.continuous = false;
      }

      this.chosenFill = changedValue;
      this.tooltipActive = false;

      EventBus.$emit('gapChanged', { 
        id: this.id, 
        chosen: this.chosenFill, 
        isCorrect: this.chosenFill === this.correct 
      });
    }
  }
};
</script>

<style lang="scss">
    .gap-wrapper {
        position: relative;
        min-width: 15px;
        cursor: pointer;
    }
    .gap {
        display: inline-block;
        min-width: 15px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        vertical-align: text-bottom;
        background-color: #75e3ff;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        user-select: none;
        &.empty {
            background-color: #f7c9c9;
        }
        &.continuous {
            position: absolute;
            top: 0;
            bottom: 0;
            background-color: transparent;
            &:after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #75e3ff;
                z-index: -1;
            }
        }
    }
    .tooltip {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #f7c9c9;
        z-index: 2;
        .fill {
            height: 30px;
            padding: 0 20px;
            line-height: 30px;
            text-align: center;
            border-bottom: 1px solid #ccc;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
    }
</style>
