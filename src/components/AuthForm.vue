<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Field, Form, type SubmissionContext } from 'vee-validate'
import * as yup from 'yup'

import LogoIcon from '@/components/icons/LogoIcon.vue'

const authStore = useAuthStore()
const { registerUser, loginUser } = authStore

const route = useRoute()

const isPassword = ref(true)
const passwordInputType = computed(() => (isPassword.value ? 'password' : 'text'))
const passwordIcon = computed(() => (isPassword.value ? 'o_visibility' : 'o_visibility_off'))

const isSignUp = computed(() => route.name === 'sign-up')
const formTitle = computed(() => (isSignUp.value ? 'Sign Up' : 'Login'))
const formBtnText = computed(() => (isSignUp.value ? 'Create an account' : 'Login to your account'))
const formLink = computed(() => (isSignUp.value ? 'Login' : 'Sign Up'))
const formRoute = computed(() => (isSignUp.value ? '/sign-in' : '/sign-up'))

const schema = computed(() => {
  const baseSchema = {
    email: yup
      .string()
      .required("Can't be empty")
      .email('Must be a valid email')
      .label('Email address'),
    password: yup.string().required("Can't be empty").label('Password')
  }

  if (isSignUp.value) {
    baseSchema.password = baseSchema.password.min(6, 'Must be at least 6 characters')

    return yup.object({
      ...baseSchema,
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required("Can't be empty")
        .label('Repeat password')
    })
  }

  return yup.object(baseSchema)
})

const passwordErrorsExist = (errorMessage: string | undefined, value: string | undefined) => {
  return typeof errorMessage === 'undefined' && (value?.length || 0) > 0
}

const onSubmit = (values: Record<string, string>, actions: SubmissionContext): void => {
  const formData = { user: { email: values.email, password: values.password } }

  isSignUp.value ? registerUser(formData) : loginUser(formData)

  actions.resetForm()
}
</script>

<template>
  <LogoIcon class="logo-icon" />

  <main>
    <div class="form-group">
      <h1 class="form-title">{{ formTitle }}</h1>
      <Form class="l-flex" :validation-schema="schema" @submit="onSubmit">
        <Field name="email" v-slot="{ errorMessage, value, field }">
          <QInput
            type="email"
            placeholder="Email address"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          />
        </Field>
        <Field ref="passwordField" name="password" v-slot="{ errorMessage, value, field }">
          <QInput
            :type="passwordInputType"
            placeholder="Password"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          >
            <template v-slot:append>
              <QIcon
                v-if="passwordErrorsExist(errorMessage, value)"
                :name="passwordIcon"
                @click="isPassword = !isPassword"
              />
            </template>
          </QInput>
        </Field>
        <Field
          ref="passwordConfirmField"
          name="passwordConfirm"
          v-slot="{ errorMessage, value, field }"
        >
          <QInput
            v-if="isSignUp"
            :type="passwordInputType"
            placeholder="Repeat password"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          >
            <template v-slot:append>
              <QIcon
                v-if="passwordErrorsExist(errorMessage, value)"
                :name="passwordIcon"
                @click="isPassword = !isPassword"
              />
            </template>
          </QInput>
        </Field>
        <input type="submit" :value="formBtnText" />
      </Form>
      <p class="form-link">
        Already have an account? <RouterLink :to="formRoute">{{ formLink }}</RouterLink>
      </p>
    </div>
  </main>
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

  .q-field--with-bottom {
    padding-bottom: 0 !important;
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

  .q-field__control {
    height: 3.3rem !important;
    color: var(--color-neutral-white) !important;
    padding-left: 1rem;
  }

  .q-field__control.text-negative {
    color: var(--color-primary-red) !important;
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
  }

  .q-field__append {
    padding-right: 0.75rem;

    .q-icon {
      color: var(--color-neutral-white);
      cursor: pointer;
    }

    .q-icon.text-negative {
      display: none !important;
    }
  }

  .q-field__bottom {
    font-size: 0.938rem !important;
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
    cursor: pointer;

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
