<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import LogoIcon from '@/components/icons/LogoIcon.vue'

const route = useRoute()
const input = ref('')

const isSignUp = computed(() => route.name === 'sign-up')
const formTitle = computed(() => (isSignUp.value ? 'Sign Up' : 'Login'))
const formSubmitButtonText = computed(() =>
  isSignUp.value ? 'Create an account' : 'Login to your account'
)
const formLink = computed(() => (isSignUp.value ? 'Login' : 'Sign Up'))
const formRoute = computed(() => (isSignUp.value ? '/sign-in' : '/sign-up'))
</script>

<template>
  <LogoIcon class="logo-icon" />
  <div class="form-group">
    <h1 class="form-title">{{ formTitle }}</h1>

    <form class="l-flex">
      <QInput type="email" v-model="input" placeholder="Email address" />
      <QInput type="password" v-model="input" placeholder="Password" />
      <QInput v-if="isSignUp" type="password" v-model="input" placeholder="Repeat password" />

      <input type="submit" :value="formSubmitButtonText" />
    </form>

    <p class="form-link">
      Already have an account? <RouterLink :to="formRoute">{{ formLink }}</RouterLink>
    </p>
  </div>
</template>

<style lang="scss">
.logo-icon {
  align-self: center;
}

.form-group {
  background-color: var(--color-primary-semi-dark-blue);
  border-radius: var(--border-radius-s);
  padding: 1.5rem;
  width: 20.438rem;
}

.form-title {
  font-size: var(--font-size-xxxl);
  line-height: normal !important;
  margin-bottom: 1.5rem;
}

form {
  flex-direction: column;
  gap: 0.5rem;

  .q-field__control {
    height: 3.3rem !important;
    color: var(--color-neutral-white) !important;
    padding-left: 1rem;
  }

  .q-field--standard .q-field__control::before {
    border-bottom: 1px solid var(--color-neutral-greyish-blue);
  }

  .q-field--standard .q-field__control::after {
    height: 1px !important;
  }

  .q-field--standard .q-field__control:hover::before {
    border-bottom: 1px solid var(--color-neutral-greyish-blue);
  }

  .q-field__native {
    padding: 0 !important;
    font-size: 0.938rem;
    font-weight: var(--font-weight-light) !important;
    color: var(--color-neutral-white) !important;
    caret-color: var(--color-primary-red);
  }

  .q-placeholder::placeholder {
    color: var(--color-neutral-white) !important;
    opacity: 0.5 !important;
    padding-left: 1rem !important;
  }

  .q-field__append {
    display: none !important;
  }

  .q-field__bottom {
    font-size: var(--font-size-m) !important;
    align-items: center !important;
    min-height: 100% !important;
    left: unset !important;
    transform: unset !important;
    padding: 0 !important;
  }

  .q-transition--field-message-leave-active {
    display: none;
  }

  input[type='submit'] {
    background-color: var(--color-primary-red);
    font-size: 0.938rem;
    color: var(--color-neutral-white);
    margin: 2rem 0 1.5rem 0;
    border: none;
    border-radius: var(--border-radius-xxs);
    height: 3rem;

    &:hover {
      background-color: var(--color-neutral-white);
      color: var(--color-primary-semi-dark-blue);
    }
  }
}

.form-link {
  text-align: center;
  margin: unset;

  a {
    color: var(--color-primary-red);
    margin-left: 0.3rem;
  }
}
</style>
