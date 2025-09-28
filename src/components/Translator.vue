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

const sourceLanguage = ref<string>('en');
const targetLanguage = ref<string>('ja');

const input = ref<string>('');
const output = ref<string>('');

const translator = ref<any>(null);

const createTranslator = async (): Promise<void> => {
  if (!supported) return;

  output.value = 'Creating translator...';
  try {
    const translatorAvailability = await Translator.availability({
      sourceLanguage: sourceLanguage.value,
      targetLanguage: targetLanguage.value,
    });

    if (translatorAvailability === 'unavailable') {
      alert(`Translator is unavailable for ${sourceLanguage.value} → ${targetLanguage.value}.`);
      return;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Error: ${error.message}`);
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
    alert('Your browser does not support the Translator API.');
    return;
  }

  if (!translator.value) {
    alert('Please create a translator first.');
    return;
  }

  output.value = 'Translating...';
  output.value = await translator.value.translate(input.value);
};
</script>

<template>
  <div class="translator">
    <div v-if="!supported">
      Your browser does not support the Translator API.
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

input, textarea {
  font: inherit;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
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
