<template>
    <div>
        <!-- Navbar -->
        <Navbar />
        <div class="bg-gray-800 text-white min-h-screen">
            <!-- En-tête -->
            <header class="flex justify-between items-center p-5">
                <h1 class="text-xl" v-if="cryptoDetails">Détails de {{ cryptoDetails.fullname }} - {{ cryptoDetails.rating }}</h1>
            </header>

            <!-- Corps -->
            <div class="p-5" v-if="!isLoading">
                <!-- Affichage du prix -->
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center">
                        <img :src="cryptoDetails.image" alt="Logo" class="h-12 mr-2">
                        <span class="text-3xl">{{ cryptoDetails.symbol }} {{ cryptoDetails.price }}€</span>
                    </div>
                    <span class="text-green-500">{{ cryptoDetails.maxsupply }}%</span>
                </div>

                <!-- Graphique -->
                <!-- Ici, vous pouvez intégrer un graphique si nécessaire -->

                <!-- Détails -->
                <div class="flex justify-between mt-5">
                    <div class="bg-gray-700 p-5 rounded-lg">Performance rank sur le marché: {{ cryptoDetails.marketperformance }}</div>
                    <div class="bg-gray-700 p-5 rounded-lg">Volume 24H: {{ cryptoDetails.volume24h }}€</div>
                    <div class="bg-gray-700 p-5 rounded-lg">Volume /h: {{ cryptoDetails.volumehour }}€</div>
                </div>
            </div>
            <div v-else-if="error">
                <p>Erreur : {{ error }}</p>
            </div>
            <div v-else>
                <p>Chargement...</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['symbol'],
    data() {
        return {
            cryptoDetails: null,
            isLoading: true,
            error: null
        };
    },
    async mounted() {
        try {
            const response = await axios.get('http://localhost:11003/api_back/cryptos/all-cryptocurrency');
            const cryptos = response.data;
            this.cryptoDetails = cryptos.find(crypto => crypto.symbol === this.symbol);

            if (!this.cryptoDetails) {
                throw new Error('Cryptomonnaie non trouvée');
            }
        } catch (err) {
            this.error = err.message;
        } finally {
            this.isLoading = false;
        }
    }
};
</script>

<script setup>
    import Navbar from "@/components/layouts/Header.vue";
</script>

<style scoped>
/* Ajoutez du CSS supplémentaire si nécessaire */
</style>
