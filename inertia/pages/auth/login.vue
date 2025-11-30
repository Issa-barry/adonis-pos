<script setup lang="ts">
import { Head, useForm, Link } from '@inertiajs/vue3'

const form = useForm({
  email: '',
  password: '',
})

function submit() {
  form.post('/login')
}
</script>

<template>
  <Head title="Connexion" />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">Connexion</h2>
      
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
          <div v-if="form.errors.email" class="text-red-500 text-sm mt-1">
            {{ form.errors.email }}
          </div>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium mb-2">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
          <div v-if="form.errors.password" class="text-red-500 text-sm mt-1">
            {{ form.errors.password }}
          </div>
        </div>

        <button
          type="submit"
          :disabled="form.processing"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Se connecter
        </button>
      </form>

      <p class="mt-4 text-center text-sm">
        Pas de compte ?
        <Link href="/register" class="text-blue-500 hover:underline">
          S'inscrire
        </Link>
      </p>
    </div>
  </div>
</template> 