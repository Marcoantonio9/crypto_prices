<template>
  <Line :chart-data="chartData" />
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    last30Days: Array,
    priceInDays: Array,
    cryptoSelected: String,
  },
  setup(props) {
    const chartData = ref({
      labels: props.last30Days,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
          }]
        }
      },
      datasets: [{
        label: 'Price in the last days',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }],
    })

    onMounted(() => {
      chartData.value.datasets[0].data = props.priceInDays
    })

    watch(() => props.priceInDays, () => {
      chartData.value.datasets[0].data = props.priceInDays
      chartData.value.labels = props.last30Days
    })

    return {
      chartData,
    }
  }
}
</script>