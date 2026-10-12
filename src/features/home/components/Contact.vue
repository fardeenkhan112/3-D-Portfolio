
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import emailjs from "@emailjs/browser";
import { transitions } from "../../../animations";
import Social from "../../../components/Social.vue";

const contactElement = ref<HTMLElement | null>(null);
const contactForm = ref<HTMLFormElement | null>(null);

const isSending = ref(false);

type NotificationType = "success" | "error";

const notification = ref<{
  type: NotificationType;
  title: string;
  message: string;
} | null>(null);

let notificationTimer: ReturnType<typeof setTimeout> | undefined;

const showNotification = (
  type: NotificationType,
  title: string,
  message: string
) => {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }

  notification.value = {
    type,
    title,
    message,
  };

  notificationTimer = setTimeout(() => {
    notification.value = null;
    notificationTimer = undefined;
  }, 5000);
};

const closeNotification = () => {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
    notificationTimer = undefined;
  }

  notification.value = null;
};

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();

  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
});

const sendMessage = async () => {
  if (!contactForm.value || isSending.value) return;

  closeNotification();

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    showNotification(
      "error",
      "Contact form unavailable",
      "Something went wrong with the configuration. Please try again later."
    );
    return;
  }

  isSending.value = true;

  try {
    await emailjs.sendForm(
      serviceId,
      templateId,
      contactForm.value,
      { publicKey }
    );

    contactForm.value.reset();

    showNotification(
      "success",
      "Message sent successfully!",
      "Thank you for reaching out. I'll get back to you soon."
    );
  } catch (error: unknown) {
    console.error("EmailJS submission failed:", error);

    showNotification(
      "error",
      "Message couldn't be sent",
      "Something went wrong while sending your message. Please try again."
    );
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <div class="contact grid" ref="contactElement">
    <div class="contact-content">
      <form
        ref="contactForm"
        class="contact-form"
        @submit.prevent="sendMessage"
      >
        <div class="contact-field">
          <label for="contact-name">Name</label>

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            autocomplete="name"
            maxlength="100"
            required
          />
        </div>

        <div class="contact-field">
          <label for="contact-email">Email</label>

          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            maxlength="254"
            required
          />
        </div>

        <div class="contact-field">
          <label for="contact-message">Message</label>

          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me about your project..."
            rows="4"
            maxlength="5000"
            required
          ></textarea>
        </div>

        <button
          class="contact-submit"
          type="submit"
          :disabled="isSending"
          data-hoversound="hover"
        >
          {{ isSending ? "Sending..." : "Send Message" }}
          <span aria-hidden="true">↗</span>
        </button>
      </form>

      <Social variant="background" />
    </div>
  </div>

  <Teleport to="body">
    <Transition name="contact-toast">
      <div
        v-if="notification"
        class="contact-toast"
        :class="`contact-toast--${notification.type}`"
        :role="notification.type === 'error' ? 'alert' : 'status'"
        aria-live="polite"
      >
        <div class="contact-toast__icon" aria-hidden="true">
          <svg
            v-if="notification.type === 'success'"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12.5L9.5 17L19 7.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg v-else viewBox="0 0 24 24" fill="none">
            <path
              d="M12 7V13"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              stroke-width="1.8"
            />
          </svg>
        </div>

        <div class="contact-toast__content">
          <p class="contact-toast__title">
            {{ notification.title }}
          </p>

          <p class="contact-toast__message">
            {{ notification.message }}
          </p>
        </div>

        <button
          class="contact-toast__close"
          type="button"
          aria-label="Close notification"
          @click="closeNotification"
        >
          ×
        </button>

        <div
          class="contact-toast__progress"
          :key="notification.title"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);

  padding: var(--space-outer);
  padding-top: calc(var(--height-header) + var(--space-xl));
  padding-bottom: calc(var(--space-xl) + var(--safe-bottom, 0px));

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    align-self: start;
    justify-self: start;
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-lg);
    width: 100%;
    min-width: 0;

    @include mixins.mq("sm") {
      grid-column: 1 / 9;
    }

    @include mixins.mq("md") {
      grid-column: 1 / 7;
    }

    @include mixins.mq("lg") {
      grid-column: 1 / 6;
    }
  }

  &-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    width: 100%;
    max-width: 420px;
  }

  &-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    width: 100%;

    label {
      color: var(--color-text-400);
      font-size: var(--font-size-sm);
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    input,
    textarea {
      width: 100%;
      min-width: 0;
      padding: 12px 14px;

      color: var(--color-text-400);
      background: rgba(233, 222, 208, 0.42);
      border: 1px solid rgba(45, 42, 36, 0.24);
      border-radius: var(--radius-md);

      font: inherit;
      font-size: max(16px, var(--font-size-md));
      letter-spacing: 0.01em;

      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;

      &::placeholder {
        color: var(--color-text-300);
        opacity: 0.72;
      }

      &:hover {
        border-color: rgba(45, 42, 36, 0.5);
      }

      &:focus {
        outline: none;
        border-color: var(--color-orange-400);
        background: rgba(245, 239, 230, 0.85);
        box-shadow: 0 0 0 3px rgba(255, 132, 0, 0.12);
      }
    }

    textarea {
      min-height: 110px;
      resize: vertical;
      line-height: var(--line-height-copy);
    }
  }

  &-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    gap: var(--space-md);

    min-height: 48px;
    padding: 0 26px;

    color: var(--color-accent-text-400, var(--color-white-400));
    background: var(--color-accent-400, var(--color-orange-400));
    border: none;
    border-radius: 100px;

    font-family: inherit;
    font-size: var(--font-size-sm);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    cursor: pointer;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease,
      opacity 0.2s ease;

    span {
      font-size: 20px;
      line-height: 1;
    }

    &:hover:not(:disabled) {
      background: var(--color-hover, var(--color-black-400));
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--color-orange-400);
      outline-offset: 4px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: wait;
    }
  }
}

/* Floating contact notification */
.contact-toast {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 99999;

  display: flex;
  align-items: flex-start;
  gap: 13px;

  width: min(420px, calc(100vw - 32px));
  padding: 18px;

  color: var(--color-text-400, #2d2a24);
  background: var(--color-beige-400, #f3eadb);
  border: 1px solid rgba(45, 42, 36, 0.16);
  border-radius: 18px;

  box-shadow:
    0 18px 50px rgba(25, 22, 18, 0.17),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;

  &__icon {
    display: grid;
    place-items: center;
    flex: 0 0 38px;

    width: 38px;
    height: 38px;

    color: var(--color-orange-400, #df793b);
    background: rgba(223, 121, 59, 0.12);
    border: 1px solid rgba(223, 121, 59, 0.25);
    border-radius: 50%;

    svg {
      width: 21px;
      height: 21px;
    }
  }

  &--success &__icon {
    color: #3f754c;
    background: rgba(63, 117, 76, 0.1);
    border-color: rgba(63, 117, 76, 0.25);
  }

  &--error &__icon {
    color: #a84435;
    background: rgba(168, 68, 53, 0.1);
    border-color: rgba(168, 68, 53, 0.25);
  }

  &__content {
    flex: 1;
    min-width: 0;
    padding-top: 1px;
  }

  &__title {
    margin: 0 0 5px;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.45;
    letter-spacing: -0.01em;
  }

  &__message {
    margin: 0;
    color: var(--color-text-300, #625b51);
    font-size: 13px;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }

  &__close {
    display: grid;
    place-items: center;
    flex: 0 0 26px;

    width: 26px;
    height: 26px;
    margin: -4px -5px 0 0;
    padding: 0;

    color: var(--color-text-300, #625b51);
    background: transparent;
    border: none;
    border-radius: 50%;

    font-family: inherit;
    font-size: 23px;
    line-height: 1;

    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: var(--color-text-400, #2d2a24);
      background: rgba(45, 42, 36, 0.08);
    }

    &:focus-visible {
      outline: 2px solid var(--color-orange-400, #df793b);
      outline-offset: 2px;
    }
  }

  &__progress {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    height: 3px;
    background: var(--color-orange-400, #df793b);
    transform-origin: left;
    animation: contact-toast-progress 5s linear forwards;
  }

  &--success &__progress {
    background: #54805a;
  }

  &--error &__progress {
    background: #b34f3e;
  }
}

.contact-toast-enter-active,
.contact-toast-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.contact-toast-enter-from,
.contact-toast-leave-to {
  opacity: 0;
  transform: translate3d(20px, -8px, 0);
}

@keyframes contact-toast-progress {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}

@media (max-width: 480px) {
  .contact-toast {
    top: 16px;
    right: 16px;
    width: calc(100vw - 32px);
    padding: 15px;
    gap: 10px;
    border-radius: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-submit {
    transition: none;
  }

  .contact-toast-enter-active,
  .contact-toast-leave-active {
    transition: none;
  }

  .contact-toast__progress {
    animation: none;
  }
}
</style>