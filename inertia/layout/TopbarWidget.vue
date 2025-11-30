<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import { Link } from '@inertiajs/vue3'

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function smoothScroll(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <Link href="/" class="flex items-center space-x-2">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10">
              <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2" class="text-primary" />
              <path d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="currentColor" class="text-primary" />
              <circle cx="20" cy="20" r="4" fill="currentColor" class="text-primary" />
            </svg>
            <span class="text-surface-900 dark:text-surface-0 font-bold text-xl">SAKAI</span>
          </Link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <a @click="smoothScroll('home')" class="px-4 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary font-medium cursor-pointer transition-colors">
            Home
          </a>
          <a @click="smoothScroll('features')" class="px-4 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary font-medium cursor-pointer transition-colors">
            Features
          </a>
          <a @click="smoothScroll('highlights')" class="px-4 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary font-medium cursor-pointer transition-colors">
            Highlights
          </a>
          <a @click="smoothScroll('pricing')" class="px-4 py-2 text-surface-700 dark:text-surface-200 hover:text-primary dark:hover:text-primary font-medium cursor-pointer transition-colors">
            Pricing
          </a>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center space-x-3">
          <Link href="/login">
            <Button label="Login" text rounded severity="secondary" class="text-primary" />
          </Link>
          <Link href="/register">
            <Button label="Register" rounded severity="success" />
          </Link>
          <Button icon="pi pi-moon" text rounded severity="secondary" class="ml-2" />
          <Button icon="pi pi-globe" text rounded severity="secondary" />
        </div>

        <!-- Mobile Menu Button -->
        <Button 
          @click="toggleMobileMenu"
          icon="pi pi-bars" 
          text 
          rounded 
          severity="secondary" 
          class="lg:hidden"
        />
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden pb-4 space-y-2">
          <a @click="smoothScroll('home')" class="block px-4 py-2 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg cursor-pointer transition-colors font-medium">
            Home
          </a>
          <a @click="smoothScroll('features')" class="block px-4 py-2 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg cursor-pointer transition-colors font-medium">
            Features
          </a>
          <a @click="smoothScroll('highlights')" class="block px-4 py-2 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg cursor-pointer transition-colors font-medium">
            Highlights
          </a>
          <a @click="smoothScroll('pricing')" class="block px-4 py-2 text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg cursor-pointer transition-colors font-medium">
            Pricing
          </a>
          <div class="flex flex-col space-y-2 pt-2 border-t border-surface-200 dark:border-surface-700">
            <Link href="/login" class="w-full">
              <Button label="Login" text rounded severity="secondary" class="w-full" />
            </Link>
            <Link href="/register" class="w-full">
              <Button label="Register" rounded severity="success" class="w-full" />
            </Link>
            <div class="flex space-x-2 justify-center pt-2">
              <Button icon="pi pi-moon" text rounded severity="secondary" />
              <Button icon="pi pi-globe" text rounded severity="secondary" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
/* Animations supplémentaires si nécessaire */
</style>