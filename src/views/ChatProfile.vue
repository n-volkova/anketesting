<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <component 
      :is="`${current}Step`" 
      @profileCompleted="onProfileCompleted"
      @grammarCompleted="onGrammarCompleted"
      @kotCompleted="onKotCompleted"
      @change="(step) => changeStep(step)"
    >
      <template #progress>
        <step-progress
          :steps="steps"
          :current-step="currentIndex"
          @change="(step) => changeStep(step)"
        />
      </template>
    </component>
  </transition>
</template>

<script>
import StepProgress from '../components/StepProgress.vue';
import ProfileStep from '../components/ProfileStep.vue';
import GrammarReadyStep from '../components/GrammarReadyStep.vue';
import GrammarStep from '../components/GrammarStep.vue';
// KOT - это краткий отборочный тест  Σ:з
import KotReadyStep from '../components/KotReadyStep.vue';
import KotStep from '../components/KotStep.vue';
import FinalStep from '../components/FinalStep.vue';

export default {
  name: 'App',
  components: {
    StepProgress,
    ProfileStep,
    GrammarReadyStep,
    GrammarStep,
    KotReadyStep,
    KotStep,
    FinalStep,
  },
  data () {
    return {
      current: 'Profile',
      steps: ['Profile', 'Grammar', 'Kot'],
      profileData: null,
    };
  },
  computed: {
    currentIndex() {
      return this.steps.indexOf(this.current);
    },
  },
  methods: {
    changeStep(step) {
      this.current = step;
    },
    onProfileCompleted(profile) {
      this.profileData = profile;
    },
    onGrammarCompleted(resultCount) {
      this.profileData.grammar = resultCount;
    },
    onKotCompleted(resultCount) {
      this.profileData.kot = resultCount;
      this.submit();
    },
    submit() {
      this.changeStep('Final');
    }
  }
};
</script>

<style lang="scss">
    .intro {
        width: 100%;
        padding: 0 20px;
        margin-top: 40px;
        hr {
            margin: 20px 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 18px;
        }
    }
    
    .shadow-box {
        width: 100%;
        padding: 20px 20px 40px;
        margin-bottom: 40px;
        background-color: #fff;
        box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, .1);
        border-radius: 10px;
        @media (max-width: 600px) {
            padding: 0 20px 20px;
            margin: 0;
            box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, .1);
            border-radius: 10px;
        }
    }
    .button {
        position: relative;
        display: inline-block;
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
        border: none;
        cursor: pointer;
        vertical-align: top;
        height: 60px;
        width: 580px;
        line-height: 60px;
        background-color: #0090ff;
        border-radius: 5px;
        box-shadow: #000 0px 0px 0px 0px inset;
        font-family: inherit;
        font-style: normal;
        font-weight: 500;
        color: #fff;
        font-size: 21px;
        text-align: center;
        transition: all .15s linear;
        &:hover {
            background-color: #837ddb;
        }
        @media (max-width: 600px) {
            width: 100%;
        }
    }
</style>
