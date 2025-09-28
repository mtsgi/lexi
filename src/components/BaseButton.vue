<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  border-radius: 0.5em;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #f9f9f9;
  background: linear-gradient(135deg, #6366F1, #3B82F6, #06B6D4);
  cursor: pointer;
  transition: border-color 0.25s;
}

.base-button:focus,
.base-button:focus-visible {
  outline: 4px auto #6366F1;
  outline-offset: 2px;
}
</style>
