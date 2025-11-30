<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'

defineProps<{
  auth: {
    user: {
      id: number
      fullName: string | null
      email: string
    } | null
  }
}>()

function handleLogout() {
  router.post('/logout')
}
</script>

<template>
  <Head title="Dashboard" />
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">POS Dashboard</h1>
        <div class="flex items-center gap-4">
          <span>Bonjour, {{ auth.user?.fullName || auth.user?.email }}</span>
          <button
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
    
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-4">Bienvenue sur votre tableau de bord</h2>
      <p>Vous êtes maintenant connecté !</p>
    </div>
  </div>
</template>