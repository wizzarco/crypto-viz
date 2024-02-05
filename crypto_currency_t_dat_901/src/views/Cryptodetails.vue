<template>
    <div>
        <!-- Navbar -->
        <Navbar />
        <div class="bg-gray-800 text-white min-h-screen">
            <!-- En-tête -->
            <header class="flex justify-between items-center p-5">
                <h1 class="text-xl" v-if="cryptoDetails">Détails de {{ cryptoDetails.NAME }} - {{ cryptoDetails.SYMBOL }}</h1>
            </header>

            <!-- Corps -->
            <div class="p-5" v-if="!isLoading">
                <!-- Affichage du prix et autres détails -->
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center">
                        <img :src="cryptoDetails.LOGO_URL" alt="Logo" class="h-12 mr-2">
                        <span class="text-3xl">{{ cryptoDetails.SYMBOL }} {{ cryptoDetails.PRICE_USD }}€</span>
                    </div>
                    <span class="text-green-500">{{ cryptoDetails.SUPPLY_CIRCULATING }} coins in circulation</span>
                </div>

                <!-- Autres informations détaillées sur la crypto -->
                <div class="mx-auto max-w-9xl px-6 lg:px-8 pb-8">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <p class="text-base font-semibold leading-7 text-sky-600">Market Cap: {{ cryptoDetails.CIRCULATING_MKT_CAP_USD }}€</p>
                    <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">Learn more</h1>
                    <div class="mt-10 grid max-w-xl gap-8 text-base leading-7 text-gray-200 lg:max-w-none">
                        <div>
                            <p>{{ cryptoDetails.ASSET_DESCRIPTION_SNIPPET }}</p>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- Graphique -->
                <div id="myDiv" class="relative h-96"></div>

                <!-- Plus de détails -->
                <div class="flex justify-between mt-5">
                    <div class="bg-gray-700 p-5 rounded-lg">Market performance rank: {{ cryptoDetails.TOPLIST_BASE_RANK.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD }}%</div>
                    <div class="bg-gray-700 p-5 rounded-lg">Volume 24H: {{ cryptoDetails.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD }}€</div>
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
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import Plotly from 'plotly.js-dist';
    import Navbar from "@/components/layouts/Header.vue";
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const symbol = ref(route.params.symbol);
    const cryptoDetails = ref(null);
    const isLoading = ref(true);
    const error = ref(null);

    // Fonction pour charger les données
    const loadData = async () => {
        try {
            const apiUrl = `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol.value}`;
            const response = await axios.get(apiUrl);
            cryptoDetails.value = response.data.Data;

            if (!cryptoDetails.value) {
                throw new Error('Cryptomonnaie non trouvée');
            }

            await loadChartData();
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    // Fonction pour charger les données du graphique
    const loadChartData = async () => {
        try {
            const apiUrl = `https://min-api.cryptocompare.com/data/blockchain/latest?fsym=${symbol.value}`;
            const response = await axios.get(apiUrl);
            const rows = response.data.Data;

            setTimeout(() => {
                buildChart(rows);
            }, 0);
        } catch (error) {
            console.error("Erreur lors du chargement des données du graphique:", error);
        }
    }

    const buildChart = () => {
        var trace1 = {
            x: ['2017-01-17', '2017-01-18', '2017-01-19', '2017-01-20', '2017-01-23', '2017-01-24', '2017-01-25', '2017-01-26', '2017-01-27', '2017-01-30', '2017-01-31', '2017-02-01', '2017-02-02', '2017-02-03', '2017-02-06', '2017-02-07', '2017-02-08', '2017-02-09', '2017-02-10'],
            close: [120, 119.989998, 119.779999, 120, 120.080002, 119.970001, 121.879997, 121.940002, 121.949997, 121.629997, 121.349998, 128.75, 128.529999, 129.080002, 130.289993, 131.529999, 132.039993, 132.419998, 132.119995],
            decreasing: { line: { color: '#7F7F7F' } },
            high: [120.239998, 120.5, 120.089996, 120.449997, 120.809998, 120.099998, 122.099998, 122.440002, 122.349998, 121.629997, 121.389999, 130.490005, 129.389999, 129.190002, 130.5, 132.089996, 132.220001, 132.449997, 132.940002],
            increasing: { line: { color: '#17BECF' } },
            line: { color: 'rgba(31,119,180,1)' },
            low: [118.220001, 119.709999, 119.370003, 119.730003, 119.769997, 119.5, 120.279999, 121.599998, 121.599998, 120.660004, 120.620003, 127.010002, 127.779999, 128.160004, 128.899994, 130.449997, 131.220001, 131.119995, 132.050003],
            open: [118.339996, 120, 119.400002, 120.449997, 120, 119.550003, 120.419998, 121.669998, 122.139999, 120.93, 121.150002, 127.029999, 127.980003, 128.309998, 129.130005, 130.539993, 131.350006, 131.649994, 132.460007],
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
        };

        var data = [trace1];

        var layout = {
            dragmode: 'zoom',
            margin: {
                r: 10,
                t: 25,
                b: 40,
                l: 60
            },
            showlegend: false,
            xaxis: {
                autorange: true,
                rangeslider: { range: ['2017-01-17 12:00', '2017-02-10 12:00'] },
                title: 'Date',
                type: 'date'
            },
            yaxis: {
                autorange: true,
                type: 'linear'
            },
            annotations: [
                {
                    x: '2017-01-31',
                    y: 0.9,
                    xref: 'x',
                    yref: 'paper',
                    text: 'largest movement',
                    font: { color: 'magenta' },
                    showarrow: true,
                    xanchor: 'right',
                    ax: -20,
                    ay: 0
                }
            ],
            shapes: [
                {
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: '2017-01-31',
                    y0: 0,
                    x1: '2017-02-01',
                    y1: 1,
                    fillcolor: '#d3d3d3',
                    opacity: 0.2,
                    line: {
                        width: 0
                    }
                }
            ]
        };

        Plotly.newPlot('myDiv', data, layout);
    };

    // Chargez les données initiales lors de la montée du composant
    onMounted(() => {
        loadData();

        // Rafraîchissez les données toutes les 5 secondes (ajustez l'intervalle selon vos besoins)
        setInterval(() => {
            loadData();
        }, 5000);
    });
</script>

<style scoped>
/* Ajoutez du CSS supplémentaire si nécessaire */
</style>
