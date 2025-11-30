<script setup lang="ts">
import { ref } from 'vue'
import { Head, router, Link } from '@inertiajs/vue3'
 
import Send from './send.vue'


defineProps<{
  auth: {
    user: {
      id: number
      fullName: string | null
      email: string
    } | null
  }
}>()

const sidebarOpen = ref(true)

function handleLogout() {
  router.post('/logout')
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
 
const mainMenuItems = [
   { label: 'Transfert', icon: '💸', path: '/transfert' },
  { label: 'Bénéficiaires', icon: '👥', path: '/beneficiaires' },
  { label: 'Historique', icon: '📋', path: '/historique' }
]
</script>

<template>
  <Head title="Dashboard" />
  
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar Minimal -->
    <header class="bg-white fixed top-0 left-0 right-0 z-40 border-b border-gray-200">
      <div class="flex items-center justify-between px-6 py-3">
        <div class="flex items-center gap-3">
          <button 
            @click="toggleSidebar"
            class="p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <svg class="w-10 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-teal-500 rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" class="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <span class="text-lg font-bold text-gray-800">SAKAI</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button class="p-2 rounded hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <button class="p-2 rounded hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button class="p-2 rounded hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <button class="p-2 rounded hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Sidebar Détaché Style Sakai -->
    <aside 
      v-show="sidebarOpen"
      class="fixed left-5 top-20 bottom-5 w-64 bg-white rounded-2xl shadow-xl z-30 overflow-hidden"
    >
      <div class="h-full overflow-y-auto p-4">
        <!-- Menu Simple -->
        <div class="space-y-1 mb-6">
          <Link
            v-for="item in mainMenuItems"
            :key="item.path"
            :href="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 transition-all"
            :class="{
              'bg-teal-50 text-teal-600 font-medium shadow-sm': $page.url === item.path
            }"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span class="text-sm">{{ item.label }}</span>
          </Link>
        </div>

        <div class="border-t border-gray-200 my-4"></div>

        <!-- Menu Complet Style Sakai -->
        <div v-for="section in menuSections" :key="section.label" class="mb-6">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
            {{ section.label }}
          </h3>
          <div class="space-y-1">
            <Link
              v-for="item in section.items"
              :key="item.path"
              :href="item.path"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all text-sm"
              :class="{
                'bg-teal-50 text-teal-600 font-medium': item.active || $page.url === item.path
              }"
            >
              <span class="text-base">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </Link>
          </div>
        </div>
         
      </div>
    </aside>

    <!-- Main Content -->
    <main 
      :class="[
        'transition-all duration-300 pt-20 pb-8',
        sidebarOpen ? 'pl-80 pr-8' : 'px-8'
      ]"
    >
      <slot>
        <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Send/>
        </div>
      </slot>
     
    </main>

    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
    ></div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Mobile responsive */
@media (max-width: 1024px) {
  aside {
    left: 1rem;
    top: 5rem;
    bottom: 1rem;
  }
  
  main {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
}
</style>