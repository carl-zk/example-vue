<script>
export default {
  data() {
    return {
      message: "",
      multiLines: "",
      checked: true,
      checkedNames: [],
      picked: "",
      selected: "",
      selectObj: {
        selected: "a",
        options: [
          { text: "One", value: "a" },
          { text: "Two", value: "b" },
          { text: "Three", value: "c" },
        ],
      },
    };
  },
};
</script>

<template>
  <p>input is : {{ message }}</p>
  <input v-model="message" placeholder="edit me..." />
  <br />
  <span>多行信息:</span>
  <p style="white-space: pre-line">{{ multiLines }}</p>
  <textarea v-model="multiLines" placeholder="add multiple lines"></textarea>
  <br />
  <input type="checkbox" id="checkbox" v-model="checked" />
  <label for="checkbox">{{ checked }}</label>
  <br />
  <div>选择的名字有：{{ checkedNames }}</div>
  <input type="checkbox" id="jack" value="jack" v-model="checkedNames" />
  <label for="jack">jack</label>

  <input type="checkbox" id="john" value="john" v-model="checkedNames" />
  <label for="john">john</label>

  <input type="checkbox" id="mike" value="mike" v-model="checkedNames" />
  <label for="mike">mike</label>

  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>

  <div>select: {{ selected }}</div>
  <select v-model="selected" multiple>
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br />
  <select v-model="selectObj.selected">
    <option v-for="op in selectObj.options" :key="op.id" :value="op.value">
      {{ op.text }}
    </option>
  </select>
  <div>选择的是: {{ selectObj.selected }}</div>
</template>
