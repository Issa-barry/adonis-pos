<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router, useForm } from '@inertiajs/vue3'

defineProps<{
  auth?: {
    user: {
      id: number
      fullName: string | null
      email: string
    } | null
  }
}>()

const tauxConversion = 13500 // 1 EUR = 13500 GNF
const currentStep = ref(1)

const form = useForm({
  montant_eur: '',
  mode_reception: '',
  beneficiaire_id: '',
  numero_destinataire: ''
})

const montantGNF = computed(() => {
  const montant = parseFloat(form.montant_eur) || 0
  return (montant * tauxConversion).toLocaleString('fr-FR')
})

const modesReception = [
  { value: 'orange-money', label: 'Orange Money', icon: '🟠' },
  { value: 'ks-pay', label: 'KS-PAY', icon: '💳' },
  { value: 'mtn-momo', label: 'MTN Mobile Money', icon: '🟡' },
  { value: 'koulou', label: 'KOULOU', icon: '💰' },
  { value: 'soutrat-money', label: 'SOUTRAT-MONEY', icon: '📱' }
]

const beneficiaires = [
  { id: '1', nom: 'Mamadou Diallo', telephone: '+224 620 00 00 00' },
  { id: '2', nom: 'Aissatou Bah', telephone: '+224 621 00 00 00' },
  { id: '3', nom: 'Ibrahima Sow', telephone: '+224 622 00 00 00' }
]

const steps = [
  { number: 1, title: 'Montant', icon: '💶' },
  { number: 2, title: 'Mode de réception', icon: '📱' },
  { number: 3, title: 'Bénéficiaire', icon: '👤' },
  { number: 4, title: 'Récapitulatif', icon: '✓' }
]

function nextStep() {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function canProceedStep1() {
  return form.montant_eur && parseFloat(form.montant_eur) >= 1
}

function canProceedStep2() {
  return form.mode_reception && form.numero_destinataire
}

function canProceedStep3() {
  return form.beneficiaire_id
}

function getBeneficiaireNom() {
  const benef = beneficiaires.find(b => b.id === form.beneficiaire_id)
  return benef ? benef.nom : ''
}

function getModeReceptionLabel() {
  const mode = modesReception.find(m => m.value === form.mode_reception)
  return mode ? mode.label : ''
}

function confirmTransfert() {
  form.post('/paiement', {
    onSuccess: () => {
      // Redirection vers page de paiement
    }
  })
}
</script>

<template>
  <Head title="Nouveau transfert" />

  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">💸 Nouveau transfert vers la Guinée</h1>
      <p class="text-gray-600">Envoyez de l'argent en GNF rapidement et en toute sécurité</p>
      <div class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-lg">
        <span class="text-sm font-medium text-teal-700">Taux du jour: 1 EUR = {{ tauxConversion.toLocaleString('fr-FR') }} GNF</span>
      </div>
    </div>

    <!-- Stepper Progress -->
    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between relative">
        <!-- Progress Line -->
        <div class="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
          <div 
            class="h-full bg-teal-600 transition-all duration-300"
            :style="{ width: `${((currentStep - 1) / 3) * 100}%` }"
          ></div>
        </div>

        <!-- Steps -->
        <div 
          v-for="step in steps" 
          :key="step.number"
          class="flex flex-col items-center flex-1"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-2 transition-all"
            :class="currentStep >= step.number 
              ? 'bg-teal-600 text-white' 
              : 'bg-gray-200 text-gray-500'"
          >
            {{ step.icon }}
          </div>
          <span 
            class="text-xs md:text-sm font-medium text-center"
            :class="currentStep >= step.number ? 'text-teal-600' : 'text-gray-500'"
          >
            {{ step.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- Steps Content -->
    <div class="bg-white rounded-2xl shadow-sm p-8">
      
      <!-- Étape 1: Montant -->
      <div v-show="currentStep === 1" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">💶 Montant à envoyer</h2>
          <p class="text-gray-600 mb-6">Saisissez le montant que vous souhaitez envoyer</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="montant" class="block text-sm font-medium text-gray-700 mb-2">
              Montant en EUR *
            </label>
            <div class="relative">
              <input
                id="montant"
                v-model="form.montant_eur"
                type="number"
                step="0.01"
                min="1"
                placeholder="0.00"
                class="w-full px-4 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-2xl font-semibold"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">€</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Le bénéficiaire reçoit
            </label>
            <div class="relative">
              <input
                type="text"
                :value="montantGNF"
                readonly
                class="w-full px-4 py-4 pr-16 border-2 border-teal-200 rounded-xl bg-teal-50 text-2xl font-bold text-teal-600"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold text-xl">GNF</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p class="text-sm text-blue-800">
            💡 <strong>Bon à savoir :</strong> Les transferts sont gratuits et le taux de change est mis à jour en temps réel.
          </p>
        </div>
      </div>

      <!-- Étape 2: Mode de réception -->
      <div v-show="currentStep === 2" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">📱 Mode de réception</h2>
          <p class="text-gray-600 mb-6">Choisissez comment le bénéficiaire recevra l'argent</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <label 
            v-for="mode in modesReception" 
            :key="mode.value"
            class="relative flex flex-col p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-teal-500 hover:shadow-lg"
            :class="form.mode_reception === mode.value ? 'border-teal-500 bg-teal-50 shadow-lg' : 'border-gray-300'"
          >
            <input type="radio" v-model="form.mode_reception" :value="mode.value" class="sr-only" />
            <div class="flex items-center justify-between mb-3">
              <span class="text-4xl">{{ mode.icon }}</span>
              <span v-if="form.mode_reception === mode.value" class="text-teal-600 text-2xl font-bold">✓</span>
            </div>
            <span class="font-bold text-gray-900 text-lg">{{ mode.label }}</span>
          </label>
        </div>

        <div v-if="form.mode_reception" class="mt-6">
          <label for="numero" class="block text-sm font-medium text-gray-700 mb-2">
            Numéro du destinataire *
          </label>
          <input
            id="numero"
            v-model="form.numero_destinataire"
            type="tel"
            placeholder="+224 XXX XX XX XX"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-lg"
          />
          <p class="mt-2 text-sm text-gray-500">Format: +224 XXX XX XX XX</p>
        </div>
      </div>

      <!-- Étape 3: Bénéficiaire -->
      <div v-show="currentStep === 3" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">👤 Sélectionner le bénéficiaire</h2>
          <p class="text-gray-600 mb-6">Qui va recevoir cet argent ?</p>
        </div>

        <div class="space-y-3">
          <label 
            v-for="benef in beneficiaires" 
            :key="benef.id"
            class="flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-teal-500"
            :class="form.beneficiaire_id === benef.id ? 'border-teal-500 bg-teal-50' : 'border-gray-300'"
          >
            <input type="radio" v-model="form.beneficiaire_id" :value="benef.id" class="sr-only" />
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                {{ benef.nom[0] }}
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ benef.nom }}</p>
                <p class="text-sm text-gray-600">{{ benef.telephone }}</p>
              </div>
            </div>
            <span v-if="form.beneficiaire_id === benef.id" class="text-teal-600 text-2xl font-bold">✓</span>
          </label>
        </div>

        <button type="button" class="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-teal-600 hover:bg-teal-50 transition-all font-medium flex items-center justify-center gap-2">
          <span class="text-xl">+</span>
          <span>Ajouter un nouveau bénéficiaire</span>
        </button>
      </div>

      <!-- Étape 4: Récapitulatif -->
      <div v-show="currentStep === 4" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">✓ Récapitulatif du transfert</h2>
          <p class="text-gray-600 mb-6">Vérifiez les informations avant de procéder au paiement</p>
        </div>

        <div class="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 space-y-5">
          <div class="flex justify-between items-start py-3 border-b border-teal-200">
            <span class="text-gray-700 font-medium">💶 Montant envoyé</span>
            <span class="text-xl font-bold text-gray-900">{{ form.montant_eur }} EUR</span>
          </div>

          <div class="flex justify-between items-start py-3 border-b border-teal-200">
            <span class="text-gray-700 font-medium">📱 Mode de réception</span>
            <span class="text-right font-semibold text-gray-900">
              {{ getModeReceptionLabel() }}<br>
              <span class="text-sm text-gray-600">{{ form.numero_destinataire }}</span>
            </span>
          </div>

          <div class="flex justify-between items-start py-3 border-b border-teal-200">
            <span class="text-gray-700 font-medium">👤 Bénéficiaire</span>
            <span class="font-semibold text-gray-900">{{ getBeneficiaireNom() }}</span>
          </div>

          <div class="flex justify-between items-start py-3 border-b border-teal-200">
            <span class="text-gray-700 font-medium">💱 Taux de conversion</span>
            <span class="font-medium text-gray-900">1 EUR = {{ tauxConversion.toLocaleString('fr-FR') }} GNF</span>
          </div>

          <div class="flex justify-between items-start py-3 border-b border-teal-200">
            <span class="text-gray-700 font-medium">💳 Frais</span>
            <span class="font-bold text-green-600">Gratuit</span>
          </div>

          <div class="flex justify-between items-center pt-4">
            <span class="text-lg font-bold text-gray-800">Le bénéficiaire reçoit</span>
            <span class="text-3xl font-bold text-teal-600">{{ montantGNF }} GNF</span>
          </div>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p class="text-sm text-yellow-800">
            ⚠️ <strong>Attention :</strong> Veuillez vérifier toutes les informations. Une fois le paiement effectué, la transaction ne pourra pas être annulée.
          </p>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
        >
          ← Retour
        </button>

        <button
          v-if="currentStep < 4"
          @click="nextStep"
          :disabled="
            (currentStep === 1 && !canProceedStep1()) ||
            (currentStep === 2 && !canProceedStep2()) ||
            (currentStep === 3 && !canProceedStep3())
          "
          class="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Continuer →
        </button>

        <button
          v-if="currentStep === 4"
          @click="confirmTransfert"
          :disabled="form.processing"
          class="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold disabled:opacity-50 shadow-lg"
        >
          {{ form.processing ? 'Traitement...' : 'Procéder au paiement 💳' }}
        </button>
      </div>
    </div>
  </div>
</template>