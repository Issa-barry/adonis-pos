<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head title="About" />
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6">À propos</h1>
    <div class="prose max-w-none">
      <p class="text-lg mb-4">
        Bienvenue sur notre application de point de vente (POS).
      </p>
      <p class="mb-4">
        Cette application a été développée avec AdonisJS et Inertia
        pour offrir une solution moderne et performante de gestion
        de ventes.
      </p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Fonctionnalités</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Gestion des produits</li>
        <li>Suivi des ventes</li>
        <li>Gestion des clients</li>
        <li>Rapports et statistiques</li>
      </ul>
    </div>
  </div>
</template>