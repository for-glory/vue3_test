const products = [
  {id: 1,title: 'LenovoThinkpad x280', price: 1000.00, qty: 1, image: './img/ThinkPad_x280.png'},  
  {id: 2,title: 'Apple Macbook Pro',price: 2500.00, qty: 1,image: './img/MacBook-Pro.png'},  
  {id: 3,title: 'Amazon Kindle Ebook',price: 150.00,qty: 1,image: './img/Amazon_Kindle.png'},  
  {id: 4,title: 'USB-C to HDMI cable',price: 10, qty: 1, image: './img/usbC_to_hdmi.jpg'},  
];

const formatCurrency = function (value) {
  if (!value || typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });
  return formatter.format(value);
}

const ShoppingCart = {
  props: ['items'],
  emits: ['removeitem'],
  computed: {
    Total() {
      let total = 0;
      for (const item of this.items) {
        total += item.price * item.qty;
      }
      return total;
    }
  },
  methods: {
    removeItem(index) {
      this.$emit('removeitem', index);
    },
    formatCurrency,
  },
  template: `
  <div>
    <table class="table table-cart">
        <tr v-for="(item, index) in items">
          <td>{{item.title}}</td>
          <td style="width:120px">QTY:
              <input v-model="item.qty" class="form-control input-qty" type="number">
          </td>
          <td class="text-right">{{ formatCurrency(item.price) }}</td>
          <td>
              <button @click="removeItem(index)"><span> Remove </span></button>
          </td>
        </tr>
        <tr v-show="items.length === 0">
          <td colspan="4" class="text-center">Cart is empty</td>
        </tr>
        <tr v-show="items.length > 0">
          <td></td>
          <td class="text-right">Cart Total</td>
          <td class="text-right">{{ formatCurrency(Total) }}</td>
          <td></td>
        </tr>
    </table>
  </div>
  `
}

// Your Code goes here
const app = Vue.createApp({
  data: () => {
    return {
      products,
      cartItems: [],
    }
  },
  components: {
    ShoppingCart,
  },
  methods: {
    formatCurrency,
    addToCart(item) {
      const existing = this.cartItems.find(it => it.id === item.id);
      if (existing) {
        existing.qty += item.qty;
      } else {
        this.cartItems.push({ ...item })
      }
      item.qty = 1;
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    }
  }
});

app.mount('#app');
