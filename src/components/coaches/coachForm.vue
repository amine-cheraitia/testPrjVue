<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      />
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate</label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate must be greater then 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend developement</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Backend developement</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected</p>
    </div>
    <p v-if="!formValid">Please fix this above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  name: 'name',
  data() {
    return {
      firstName: {
        val: null,
        isValid: true,
      },
      lastName: {
        val: null,
        isValid: true,
      },
      description: {
        val: null,
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formValid: true,
    };
  },
  emits: ['submitData'],
  methods: {
    clearValidity(elem) {
      this[elem].isValid = true;
    },
    validateForm() {
      this.formValid = true;
      if (this.firstName.val === '' || !this.firstName.val) {
        this.firstName.isValid = false;
        this.formValid = false;
      }
      if (this.lastName.val === '' || !this.lastName.val) {
        this.lastName.isValid = false;
        this.formValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formValid = false;
      }
      if (this.description.val === '' || !this.description.val) {
        this.description.isValid = false;
        this.formValid = false;
      }
      if (this.areas.val.length === 0 || !this.areas.val) {
        this.areas.isValid = false;
        this.formValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formValid) {
        return;
      }
      const formData = {
        id: 'c9',
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('submitData', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
