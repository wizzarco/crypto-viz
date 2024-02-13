<template>
    <div>
        <!-- Navbar -->
        <Navbar />

        <div v-if="cryptoDetailsOther && cryptoDetails" class="bg-gray-800 text-white min-h-screen">
            <!-- En-tête -->
            <header class="flex justify-between items-center p-5">
                <h1 class="text-xl">Détails de {{ cryptoDetailsOther.NAME }} - {{ cryptoDetailsOther.SYMBOL }}</h1>
            </header>

            <!-- Corps -->
            <div class="p-5" v-if="!isLoading">
                <!-- Affichage du prix et autres détails -->
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center">
                        <img :src="cryptoDetails.image" alt="Logo" class="h-12 mr-2">
                        <span class="text-3xl">{{ cryptoDetailsOther.SYMBOL }} {{ cryptoDetails.price }}€</span>
                    </div>
                    <span class="text-green-500">{{ cryptoDetailsOther.SUPPLY_CIRCULATING }} coins in circulation</span>
                </div>

                <!-- Autres informations détaillées sur la crypto -->
                <div class="mx-auto max-w-9xl px-6 lg:px-8 pb-8">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <p class="text-base font-semibold leading-7 text-sky-600">Market Cap: {{ cryptoDetailsOther.CIRCULATING_MKT_CAP_USD }}€</p>
                        <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">Learn more</h1>
                        <div class="mt-10 grid max-w-xl gap-8 text-base leading-7 text-gray-200 lg:max-w-none">
                            <div>
                                <p>{{ cryptoDetailsOther.ASSET_DESCRIPTION_SNIPPET }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- graphique -->
                <div class="min-w-screen bg-gray-900 flex items-center justify-center px-5 py-5">
                    <div class="bg-gray-800 text-gray-500 rounded shadow-xl py-5 px-5 w-full">
                        <div>
                            <canvas id="chart" class="w-full"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Plus de détails -->
                <div class="flex justify-between mt-5">
                    <div class="bg-gray-700 p-5 rounded-lg">Market performance rank: {{ cryptoDetails.marketperformance }}</div>
                    <div class="bg-gray-700 p-5 rounded-lg">Volume 24H: {{ cryptoDetails.volume24h }}€</div>
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

<script setup>
    import { ref, onMounted, nextTick, watch } from 'vue';
    import axios from 'axios';
    import Chart from 'chart.js/auto';
    import Navbar from "@/components/layouts/Header.vue";
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const symbol = ref(route.params.symbol);
    const cryptoDetails = ref(null);
    const cryptoDetailsOther = ref(null);
    const isLoading = ref(true);
    const error = ref(null);
    const chartData = ref([]);

    // Fonction pour charger les données
    const loadDataInfo = async () => {
        try {
            let page = 1;
            let found = false;

            while (!found) {
                const apiUrl = `http://localhost:11003/api_back/cryptos/all-cryptocurrency?page=${page}`;
                const response = await axios.get(apiUrl);
                const cryptoData = response.data.find(crypto => crypto.symbol === symbol.value);

                if (cryptoData) {
                    cryptoDetails.value = cryptoData;
                    found = true;
                } else if (response.data.length === 0) {
                    break;
                } else {
                    page++;
                }
            }

            if (!found) {
                throw new Error(`Cryptomonnaie ${symbol.value} non trouvée`);
            }

            await loadChartData();
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    // Fonction pour charger les données des infos 
    const loadDataOtherInfo = async () => {
        try {
            const apiUrl = `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol.value}`;
            const response = await axios.get(apiUrl);
            cryptoDetailsOther.value = response.data.Data;

            if (!cryptoDetailsOther.value) {
                throw new Error('Cryptomonnaie non trouvée');
            }

            await loadChartData();
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchChartData = async () => {
        try {
            const response = await axios.get(`http://localhost:11004/api_front/crypto_currency_all/all?symbol=${symbol.value}`);
            // Tri des données par date et heure en ordre croissant
            chartData.value = response.data
                .map(d => ({
                    dateTime: `${d.record_date} ${d.record_time}`,
                    price: d.price
                }))
                .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)); // Tri croissant
        } catch (err) {
            console.error("Erreur lors du chargement des données du graphique:", err);
        }
    };

    // Créer le graphique Chart.js
    const createChart = () => {
        if (chartData.value.length > 0) {
            const canvas = document.getElementById('chart');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartData.value.map(d => d.dateTime),
                        datasets: [{
                            label: `${symbol.value} Price`,
                            data: chartData.value.map(d => d.price),
                            backgroundColor: 'rgba(102, 126, 234, 0.25)',
                            borderColor: 'rgba(102, 126, 234, 1)',
                            fill: true,
                        }]
                    },
                    options: {
                        responsive: true, 
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: true,
                                },
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value;
                                    }
                                }
                            },
                            x: {
                                grid: {
                                    display: false,
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function(context) {
                                        return `${context.dataset.label}: $${context.parsed.y}`;
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                console.error("Le canvas n'est pas encore disponible");
            }
        }
    };

    onMounted(() => {
        loadDataOtherInfo();
        loadDataInfo();
        fetchChartData();

        setInterval(() => {
            loadDataInfo();
            loadDataOtherInfo();
            fetchChartData();
        }, 5000);
    });

    watch(chartData, (newData) => {
        if (newData && newData.length > 0) {
            nextTick(() => {
                createChart();
            });
        }
    }, { immediate: true });
</script>