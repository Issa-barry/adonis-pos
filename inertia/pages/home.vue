<script setup lang="ts">
  import { Head } from '@inertiajs/vue3'
  import Button from 'primevue/button'
  import TopbarWidget from '../layout/TopbarWidget.vue'
</script>
 

<template>
  
 <TopbarWidget />
   

  <div class="fixed xl:absolute left-8 right-8 top-0 bottom-0 xl:inset-0 max-w-screen-xl mx-auto before:content-[''] before:[background:repeating-linear-gradient(0deg,var(--sand-5)_0_4px,transparent_0_8px)] before:absolute before:top-0 before:left-0 before:h-full before:w-px after:content-[''] after:[background:repeating-linear-gradient(0deg,var(--sand-5)_0_4px,transparent_0_8px)] after:absolute after:top-0 after:right-0 after:h-full after:w-px"></div>

  <div class="pt-4 h-full flex flex-col">
    <!-- Header -->
    <div class="grow pb-4 bg-gradient-to-b from-sand-1 to-sand-2 flex justify-center items-center">
      <a href="https://adonisjs.com" target="_blank" class="isolate">
        <svg class="w-16 h-16 fill-primary" viewBox="0 0 33 33">
          <path
            fill-rule="evenodd"
            d="M0 16.333c0 13.173 3.16 16.333 16.333 16.333 13.173 0 16.333-3.16 16.333-16.333C32.666 3.16 29.506 0 16.333 0 3.16 0 0 3.16 0 16.333Zm6.586 3.393L11.71 8.083c.865-1.962 2.528-3.027 4.624-3.027 2.096 0 3.759 1.065 4.624 3.027l5.123 11.643c.233.566.432 1.297.432 1.93 0 2.893-2.029 4.923-4.923 4.923-.986 0-1.769-.252-2.561-.506-.812-.261-1.634-.526-2.695-.526-1.048 0-1.89.267-2.718.529-.801.253-1.59.503-2.538.503-2.894 0-4.923-2.03-4.923-4.924 0-.632.2-1.363.432-1.929Zm9.747-9.613-5.056 11.443c1.497-.699 3.227-1.032 5.056-1.032 1.763 0 3.56.333 4.99 1.032l-4.99-11.444Z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>

    <!-- Bento with documentation, Adocasts, packages and Discord -->
    <div class="isolate mt-10 max-w-screen-xl mx-auto px-16 xl:px-8 grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-3 gap-8">
                   <Button label="Submit" />
    </div>

    
  </div>
</template>