<script setup lang="ts">
import { ref } from 'vue'

import BaseButton from './BaseButton.vue';

// Type definitions for the Web Translation API
interface TranslationApi {
  availability(options: { sourceLanguage: string; targetLanguage: string }): Promise<string>;
  create(options: { 
    sourceLanguage: string; 
    targetLanguage: string; 
    monitor?: (monitor: any) => void;
  }): Promise<any>;
}

declare global {
  const Translator: TranslationApi;
}

const supported = 'Translator' in self;
const errorMessage = ref<string | null>(null);

const sourceLanguage = ref<string>('en');
const targetLanguage = ref<string>('ja');

const input = ref<string>('');
const output = ref<string>('');

const translator = ref<any>(null);

const createTranslator = async (): Promise<void> => {
  if (!supported) {
    errorMessage.value = 'Your browser does not support the Translator API.';
    return;
  }

  if (translator.value) {
    translator.value.destroy();
  }

  output.value = 'Creating translator...';
  try {
    const translatorAvailability = await Translator.availability({
      sourceLanguage: sourceLanguage.value,
      targetLanguage: targetLanguage.value,
    });

    if (translatorAvailability === 'unavailable') {
      errorMessage.value = `Translator is unavailable for ${sourceLanguage.value} → ${targetLanguage.value}.`;
      return;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = `Error: ${error.message}`;
    }
    return;
  }

  translator.value = await Translator.create({
    sourceLanguage: sourceLanguage.value,
    targetLanguage: targetLanguage.value,
    monitor(m: any) {
      m.addEventListener('downloadprogress', (e: any) => {
        console.log(`Download progress: ${e.loaded * 100}%`);
      });
    },
  });

  output.value = '';
  alert('Translator created successfully.');
};

const translate = async (): Promise<void> => {
  if (!supported) {
    errorMessage.value = 'Your browser does not support the Translator API.';
    return;
  }

  if (!translator.value) {
    errorMessage.value = 'Please create a translator first.';
    return;
  }

  try {
    errorMessage.value = null;
    output.value = 'Translating...';
    output.value = await translator.value.translate(input.value);
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = `Error: ${error.message}`;
    }
  }
};
</script>

<template>
  <div class="translator">
    <div v-if="errorMessage" class="alert" role="alert">
      <span>{{ errorMessage }}</span>
      <button
        class="alert-dismiss"
        type="button"
        aria-label="Dismiss error"
        @click="errorMessage = null"
      >
        ×
      </button>
    </div>

    <textarea
      class="translator-input"
      v-model="input"
      placeholder="Enter text to translate"
    />

    <div class="language-select">
      <input v-model="sourceLanguage" placeholder="Source Language" />
      <span>→</span>
      <input v-model="targetLanguage" placeholder="Target Language" />
    </div>

    <BaseButton @click="createTranslator">
      Create Translator
    </BaseButton>

    <BaseButton @click="translate">
      Translate
    </BaseButton>

    <textarea
      class="translator-output"
      :value="output"
      placeholder="Translation will appear here"
      readonly
    />
  </div>
</template>

<style scoped>
.translator {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.alert {
  padding: 1em;
  background-color: #ffdddd;
  border-radius: 0.5em;
  color: #a70000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.alert-dismiss {
  background: none;
  border: none;
  color: #a70000;
  font-family: inherit;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 0.5em;
  border-radius: 0.5em;
}

.alert-dismiss:focus {
  outline: 2px solid #6366F1;
  background: #ffeaea;
}

input, textarea {
  font: inherit;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  min-width: 0;
}

.translator-input, .translator-output {
  min-height: 150px;
  resize: vertical;
}

.language-select {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1em;
}
</style>
