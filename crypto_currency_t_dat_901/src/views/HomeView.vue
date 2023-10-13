<template>
  <div>
    <Navbar />

    <!-- Home du site -->
    <main>
      <div class="relative px-6 lg:px-8 bg-gray-800">
        <div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div>
            <div>
              <div class="hidden sm:block col-span-12 lg:col-span-6">
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-1.png" class="hidden sm:block absolute ml-8 mb-8 bottom-40 xl:bottom-16 left-4 xl:left-0 w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-2.png" class="hidden sm:block absolute top-4 sm:top-10 right-64 sm:right-96 xl:right-[32rem] w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-3.png" class="hidden sm:block absolute bottom-56 right-24 w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/star.png" class="hidden sm:block absolute top-20 sm:top-28 right-16 lg:right-0 lg:left-[30rem] w-8"/>
              </div>
              <h1 data-aos="zoom-in" class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl text-gray-100">The World's <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Top Cryptocurrencies</span> Web App</h1>
              <p data-aos="fade-up" data-aos-once="true" data-aos-delay="700" class="mt-6 text-lg leading-8 text-gray-200 sm:text-center">Consult CryptoCoin and follow live the price of the main cryptocurrencies. Evolution over 24 hours, volumes, capitalization, evolution of euro/dollar prices in real time.</p>
            </div>
          </div>
        </div>
      </div>
    </main>   
    
    <!-- Crypto statistic -->
    <StatisticCrypto></StatisticCrypto>

    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Symbole</th>
          <th>Prix EUR</th>
          <th>Capitalisation boursière</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto in displayedCryptos" :key="crypto.symbol">
          <td>
            <!-- Affichez le logo en utilisant l'URL de la réponse de l'API CoinAPI -->
            <img :src="crypto.image" alt="Crypto Logo" style="max-width: 30px; max-height: 30px;" />
          </td>
          <td>{{ crypto.name }}</td>
          <td>{{ crypto.symbol }}</td>
          <td>{{ crypto.price }}</td>
          <td>{{ crypto.market_cap }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="previousPage" :disabled="currentPage === 1">Page précédente</button>
      <span>Page {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
  </div>
</template>

<script setup>
  import Navbar from "@/components/layouts/Header.vue";
  import StatisticCrypto from "../components/StatisticCrypto.vue";
  import { ref, onMounted, onUpdated } from 'vue';
  import axios from 'axios';

  const itemsPerPage = 20;
  const cryptocurrencies = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cryptos');

      cryptocurrencies.value = response.data;
      updatePagination();
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const updatePagination = () => {
    totalPages.value = Math.ceil(cryptocurrencies.value.length / itemsPerPage);
  };

  const displayedCryptos = ref([]);

  const updateDisplayedCryptos = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    displayedCryptos.value = cryptocurrencies.value.slice(startIndex, endIndex);
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
      updateDisplayedCryptos();
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
      updateDisplayedCryptos();
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>
