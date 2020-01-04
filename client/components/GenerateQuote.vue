<template>
  <div>
    <transition name="fade" appear>
      <div>
        <div class="mt-4">
          <h1 class="text-center">"{{selectedQuoteText}}"</h1>
        </div>
        <div class="mt-4" v-if="showAuthor">
          <h3 class="text-center">- {{selectedQuoteAuthor}}</h3>
        </div>
      </div>
    </transition>

    <div class="mt-4 text-center">
      <button
        class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded text-center"
        @click="generateQuote"
      >Find A Quote</button>
    </div>
  </div>
</template>

<script>
import { quoteData } from '../utils/dummyData.js'

export default {
  data() {
    return {
      showAuthor: false
    }
  },
  computed: {
    selectedQuoteText() {
      return this.$store.state.selectedQuoteText
    },
    selectedQuoteAuthor() {
      return this.$store.state.selectedQuoteAuthor
    }
  },
  methods: {
    generateQuote() {
      this.showAuthor = true
      const quotes = quoteData()
      const quote = quotes[Math.floor(Math.random() * 11)]
      this.$store.dispatch('updateSelectedQuoteTextAndAuthor', quote)
    }
  }
}
</script>

<style>
</style>