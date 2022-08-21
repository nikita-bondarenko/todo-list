<template>
  <h1 class="subtitle has-text-centered">Bucket List:</h1>
  <hr />
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        type="text"
        v-model="description"
        class="input"
        placeholder="Go to mars ..."
      />
    </div>
    <div class="control">
      <button
        class="button is-info"
        @click="addItem"
        :class="{ disabled: !description }"
      >
        Add
      </button>
    </div>
  </div>
  <div class="notification" v-for="(item, i) in items" :key="item._id">
    <div class="columns">
      <input
        type="text"
        v-if="isSelected(item)"
        v-model="editedDescription"
        class="column input"
      />
      <p v-else calss="column">
        <span class="tag is-primary">{{ i + 1 }}</span>
        {{ item.description }}
      </p>
      <div class="column is-narrow">
        <button
          style="border: none"
          class="icon has-text-primary"
          @click="isSelected(item) ? unselect() : select(item)"
        >
          <i class="material-icons">
            <svg
              v-if="isSelected(item)"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
              />
            </svg>

            <svg v-else style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
              />
            </svg>
          </i>
        </button>
        <button
          style="border: none"
          class="icon has-text-info"
          @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)"
        >
          <i class="material-icons">
            <svg
              v-if="isSelected(item)"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
              />
            </svg>
            <svg v-else style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 4H21V7H20L17.5 21H6.5L4 7H3V4Z" />
            </svg>
          </i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      items: [],
      description: '',
      editedDescription: '',
      selected: {}
    }
  },
  async mounted() {
    const response = await axios.get('api/bucketListItems/')
    this.items = response.data
  },
  methods: {
    async addItem() {
      if (!this.description) return
      const response = await axios.post('api/bucketListItems/', {
        description: this.description
      })
      this.items.push(response.data)
      this.description = ''
    },
    async removeItem(item, i) {
      await axios.delete('api/bucketListItems/' + item._id)
      this.items.splice(i, 1)
    },
    select(item) {
      this.selected = item
      this.editedDescription = item.description
    },
    isSelected(item) {
      return item._id === this.selected._id
    },
    unselect() {
      this.selected = {}
      this.editeddDescription = ''
    },
    async updateItem(item, i) {
      const response = await axios.put('api/bucketListItems/' + item._id, {
        description: this.editedDescription
      })
      this.items[i] = response.data
      this.unselect()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}

.icon {
  transition: background 0.2s ease-in-out;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}
.columns {
  justify-content: space-between;
}

p {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  span {
    margin-right: 10px;
  }
}

button {
  cursor: pointer;

  border: none;
}

.disabled {
  cursor: not-allowed;

  background-color: rgba($color: #3e8ed0, $alpha: 0.5) !important;
}
</style>
