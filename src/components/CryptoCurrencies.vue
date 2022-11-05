<template>
  <div class="container mx-auto mt-5">
    <div class="flex flex-col gap-8 py-10 px-5 shadow-lg">
      <div class="flex-1 flex justify-center">
        <span class="text-3xl text-gray-800">
          Crypto Prices
        </span>
      </div>

      <div class="flex gap-10">
        <div class="flex-1">
          <select class="h-10 w-full px-3" v-model="cryptoSelected" @change="handleSelectedCrypto($event)">
            <option v-for="(option, index) in cryptocurrencies" :key="index" :value="option.value" >
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="flex-1">
          <Datepicker class="h-50" data-testid="datepicker" v-model="date" locale="br" :format="format"
            :clearable="false" :maxDate="new Date()
            ">
            <template #action-preview="{}">
              {{ format(date) }}
            </template>
          </Datepicker>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row lg:flex-row gap-4 px-5 md:px-0 lg:px-0">
      <div
        class="flex-1 flex flex-col w-12/12 md:w-6/12 lg:w-6/12 h-full rounded px-5 py-5 bg-slate-500 text-white mt-8 mb-8 animateInLeft">
        <span class="text-4xl capitalize">{{ nameCryptoSelected }}</span>
        <div class="flex flex-col">
          <span class="text-lg mt-8" v-if="!statusDate">Price Now:</span>
          <span class="text-lg mt-8" v-else>Price on the day: {{ date.toLocaleDateString('pt-br') }}</span>
          <span class="text-4xl" v-if="!loading && !errorMessage">{{ formatPriceBrl }}</span>
        </div>
        <Loading v-if="loading" />
        <div class="mx-auto mt-10" v-if="errorMessage">
          <MainErrorMessage />
        </div>
      </div>

      <div class="flex-1 px-5 py-5 animateInRight">
        <Chart :last30Days="last30Days" :priceInDays="priceInDays" :cryptoSelected="cryptoSelected" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue'
import { cryptocurrencies, format } from '../utils'
import { simplePrice, marketChartRange, marketChartHistory } from '../services/api'
import Chart from './Chart.vue'
import Loading from './Loading.vue'
import MainErrorMessage from './ErrorMessage.vue'

export default {
  components: { Chart, Loading, MainErrorMessage },
  setup() {
    const cryptoSelected = ref('bitcoin')
    const nameCryptoSelected = ref('Bitcoin')
    const priceCryptoSelected = ref(0)
    const date = ref(new Date());
    const last30Items = ref([])
    const last30Days = ref([])
    const priceInDays = ref([])
    const myInterval = ref()
    const loading = ref(false)
    const errorMessage = ref(false)
    const statusDate = ref(false)

    const getCurrentPrice = async () => {
      try{
        priceCryptoSelected.value = await simplePrice(cryptoSelected.value)
        loading.value = true

      } catch (error) {
        errorMessage.value = true

      } finally {
        setTimeout(() => {
          loading.value = false
        }, 1000)

      }

    }

    const getRange = async () => {
      const from = new Date(date.value)
      from.setMinutes(from.getMinutes() - 5);
      const convertFromToTimestamp = Math.floor(new Date(from).getTime() / 1000)

      const to = new Date(date.value)
      to.setDate(to.getDate() + 1)
      const convertToValueToTimestamp = Math.floor(new Date(to).getTime() / 1000)

      try {
        priceCryptoSelected.value = await marketChartRange(cryptoSelected.value, convertFromToTimestamp, convertToValueToTimestamp)
        errorMessage.value = false

      } catch(error) {
        errorMessage.value = true

      }

    }

    const getHistory = async () => {
      if (last30Days.value.length > 0 || priceInDays.value.length) {
        last30Days.value = []
        priceInDays.value = []
      }
      
      try {
        last30Items.value = await marketChartHistory(cryptoSelected.value)
        last30Items.value.prices.map((item) => {
          const timestampToDate = new Date(item[0]).toLocaleDateString('pt-br')
          const formatPrice = item[1]

          last30Days.value.push(timestampToDate)
          priceInDays.value.push(formatPrice)
        })

      } catch(error) {
        errorMessage.value = true

      }
    }

    const formatPriceBrl = computed(() => {
      return priceCryptoSelected.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', maximumFractionDigits: 3 })
    })

    const handleSelectedCrypto = (e) => {
      nameCryptoSelected.value = e.target.options[e.target.options.selectedIndex].text;
      getHistory()
      if(checkDateSelectedAndCurrentDate.value){
        getCurrentPrice()
        return
      }
      getRange()
    }

    const checkDateSelectedAndCurrentDate = computed(() => {
      const dateSelected = date.value.toLocaleDateString('pt-br')
      const currentDateSelected = new Date().toLocaleDateString('pt-br')

      return dateSelected === currentDateSelected ? true : false
    })

    onMounted(() => {
      getCurrentPrice()
      getHistory()

      myInterval.value = setInterval(() => {
        getCurrentPrice()
      }, 10000)

    })

    watch(date, (newValue, oldValue) => {
      if (format(newValue) === format(oldValue) && checkDateSelectedAndCurrentDate.value) {
        statusDate.value = false
        getCurrentPrice()
        return
      }
      statusDate.value = true
      getRange()
      clearInterval(myInterval.value)
    })

    return {
      cryptoSelected,
      nameCryptoSelected,
      cryptocurrencies,
      formatPriceBrl,
      date,
      checkDateSelectedAndCurrentDate,
      last30Days,
      priceInDays,
      loading,
      errorMessage,
      statusDate,
      handleSelectedCrypto,
      format,
      getHistory,
    }
  }

}
</script>
