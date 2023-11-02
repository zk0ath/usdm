<template>
  <div>
    <input v-model="sender" placeholder="Sender Public Key" />
    <input v-model="receiver" placeholder="Receiver Public Key" />
    <input v-model="amount" placeholder="Amount" type="number" />
    <button @click="transfer">Transfer</button>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      sender: '',
      receiver: '',
      amount: 0,
      message: '',
    };
  },
  methods: {
    async transfer() {
      const result = await someApiCallToTransfer(this.sender, this.receiver, this.amount); //To-Do
      this.message = result.message;
    },
  },
};
</script>
