<template>
  <div>
    <input v-model="publicKey" placeholder="Enter Public Key" />
    <button @click="checkBalance">Check Balance</button>
    <p>Balance: {{ balance }}</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      publicKey: '',
      balance: 0,
    };
  },
  methods: {
    async checkBalance() {
      this.balance = await someApiCallToCheckBalance(this.publicKey); //TO-DO
    },
  },
};
</script>
