<template>
    <section data-aos="fade-up" class="max-w-screen-2xl mx-2 sm:mx-auto py-6 sm:py-6 rounded-[2.25rem] sm:rounded-xl bg-gray-700 shadow-lg sm:shadow-md transform lg:-translate-y-12">
      <div class="flex flex-col lg:flex-row">

        <!-- Top trending -->
        <div data-aos="fade-up" data-aos-delay="300" class="relative flex flex-col min-w-0 break-words bg-gray-700 w-full rounded xl:border-r border-gray-200">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-100">🔥 Top Trending</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <a v-if="this.$route.name != 'cryptocurrency'" href="/cryptocurrency"><button class="bg-sky-500 text-white active:bg-sky-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button></a>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <!-- Loading des informations non trouvé -->
            <div v-if="loading" role="status" class="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
              <div class="flex items-center justify-between">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>

            <!-- Affichage des informations -->
            <table v-else class="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Market Performance</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cryptostat, index) in topTrending.slice(0, 5)" :key="cryptostat.symbol" class="text-sm">
                    <th class="border-b-0 hover:text-gray-300  px-6 align-middle border-t border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                        <img :src="cryptostat.image" class="mr-2 h-5"/><a :href="`/cryptocurrency/${cryptostat.symbol}`">{{ cryptostat.name }}</a>
                    </th>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">{{ cryptostat.marketperformance }}</td>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">
                        {{ cryptostat.price }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top gainerss -->
        <div data-aos="fade-up" data-aos-delay="400" class="relative flex flex-col min-w-0 mt-20 sm:mt-0 break-words bg-gray-700 w-full rounded xl:border-r border-gray-200">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-100">🚀 Top Gainers</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <a v-if="this.$route.name != 'cryptocurrency'" href="/cryptocurrency"><button class="bg-sky-500 text-white active:bg-sky-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button></a>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <!-- Loading des informations non trouvé -->
            <div v-if="loading" role="status" class="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
              <div class="flex items-center justify-between">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>
            
            <!-- information good -->
            <table v-else class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cryptostat, index) in topGainers.slice(0, 5)" :key="cryptostat.symbol" class="text-sm">
                    <th class="border-b-0 hover:text-gray-300 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                        <img :src="cryptostat.image" class="mr-2 h-5"/><a :href="`/cryptocurrency/${cryptostat.symbol}`">{{ cryptostat.name }}</a>
                    </th>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">{{ cryptostat.price }}</td>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">
                        {{ cryptostat.market_cap }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recently Added -->
        <div data-aos="fade-up" data-aos-delay="500" class="relative flex flex-col min-w-0 mt-20 sm:mt-0 break-words bg-gray-700 w-full rounded ">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-100">💎 Total mining</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <a v-if="this.$route.name != 'cryptocurrency'" href="/cryptocurrency"><button class="bg-sky-500 text-white active:bg-sky-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button></a>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <!-- Loading des informations non trouvé -->
            <div v-if="loading" role="status" class="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
              <div class="flex items-center justify-between">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>

            <!-- information good -->
            <table v-else class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Block Reward</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Total mining</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cryptostat, index) in totalMining.slice(0, 5)" :key="cryptostat.symbol" class="text-sm">
                    <th class="border-b-0 hover:text-gray-300 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                        <img :src="cryptostat.image" class="mr-2 h-5"/><a :href="`/cryptocurrency/${cryptostat.symbol}`">{{ cryptostat.name }}</a>
                    </th>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">{{ cryptostat.blockreward }}</td>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">
                        {{ cryptostat.totalmining }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const topTrending = ref([]);
    const topGainers = ref([]);
    const totalMining = ref([]);
    const loading = ref(true); 

    const fetchData = async (url, dataRef) => {
      try {
        const response = await axios.get(url);
        dataRef.value = response.data;
        loading.value = false; 
      } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis ${url}:`, error);
        loading.value = false;
      }
    };

    onMounted(async () => {
      try {
        const endpoints = [
          { url: 'http://localhost:11004/api_front/cryptos/top_trending', ref: topTrending },
          { url: 'http://localhost:11004/api_front/cryptos/top_gainers', ref: topGainers },
          { url: 'http://localhost:11004/api_front/cryptos/total_mining', ref: totalMining },
        ];

        for (const { url, ref } of endpoints) {
          await fetchData(url, ref);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        loading.value = false;
      }
    });

    return {
      topTrending,
      topGainers,
      totalMining,
      loading,
    };
  },
};
</script>
