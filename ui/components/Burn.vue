<template>
    <div>
      <input v-model="burner" placeholder="Burner Public Key" />
      <input v-model="amount" placeholder="Amount to Burn" type="number" />
      <button @click="burn">Burn</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        burner: '',
        amount: 0,
        message: '',
      };
    },
    methods: {
      async burn() {
        const result = await someApiCallToBurn(this.burner, this.amount); //TO-DO
        this.message = result.message;
      },
    },
  };
  </script>
  