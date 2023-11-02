<template>
  <div>
    <input v-model="minter" placeholder="Minter Public Key" />
    <input v-model="amount" placeholder="Amount" type="number" />
    <button @click="mint">Mint</button>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      minter: '',
      amount: 0,
      message: '',
    };
  },
  methods: {
    async mint() {
      const result = await someApiCallToMint(this.minter, this.amount); //TO-DO
      this.message = result.message;
    },
  },
};
</script>
