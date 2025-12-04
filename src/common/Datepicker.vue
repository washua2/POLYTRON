<template>
    <div class="relative flex items-center justify-between w-full h-full datepickerBox">
        <VueDatePicker v-model="startDate" :format="startformatDatePicker" />
        <VueDatePicker v-model="endDate" :format="endformatDatePicker" />
    </div>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, reactive, inject, computed, onMounted, nextTick, watch, defineExpose } from 'vue';
const { CctvBoxStore } = inject("store");

const startDate = ref("")
const endDate = ref("")

const options = reactive({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: ""
})
const startformatDatePicker = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    CctvBoxStore.methods.setplayBackStartDate(`${year}-${month}-${day} ${hour}:${min}:${second}`)
    CctvBoxStore.methods.setplayBackStartTime(`${hour}${min}${second}`)

    options.startTime = `${hour}${min}${second}`
    options.startDate = `${year}-${month}-${day} ${hour}:${min}:${second}`
    return `${day}/${month}/${year} ${hour}:${min}:${second}`;
};
const endformatDatePicker = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    CctvBoxStore.methods.setplayBackEndDate(`${year}-${month}-${day} ${hour}:${min}:${second}`)
    CctvBoxStore.methods.setplayBackEndTime(`${hour}${min}${second}`)

    options.endTime = `${hour}${min}${second}`
    options.endDate = `${year}-${month}-${day} ${hour}:${min}:${second}`
    return `${day}/${month}/${year} ${hour}:${min}:${second}`;
};

const initPlaceholder = () => {
    const ipt1 = document.getElementsByClassName("dp__input_readonly")[0]
    const ipt2 = document.getElementsByClassName("dp__input_readonly")[1]
    ipt1.placeholder = "Select Date"
    ipt2.placeholder = "Select Date"
}
onMounted(() => {
    initPlaceholder()
})
defineExpose(options)
</script>
<style>
@media screen and (max-width: 1920px) {}


.datepickerBox .dp__main {
    width: 40.63rem;
}


.datepickerBox .dp__input_readonly {
    background-color: #4B5563;
}

.datepickerBox .dp__pointer {
    font-size: 2rem;
    color: #fff !important;
}

.datepickerBox .dp__calendar_header {
    font-size: 1.5rem;
    color: #fff !important;
}

.datepickerBox .dp__input {
    color: #9CA3AF !important;
}

.datepickerBox .dp__btn {
    font-size: 2rem;
    color: #fff !important;
}

.datepickerBox .dp__action_button {
    font-size: 2rem;
}

.datepickerBox .dp__theme_light {
    background-color: #4B5563;
}

.datepickerBox .dp__date_hover:hover {
    background-color: rgba(75, 85, 99, .5) !important;
}

.datepickerBox .dp__calendar_item:hover {
    background-color: #9CA3AF;
}

.datepickerBox .dp__input_readonly::placeholder {
    color: #9CA3AF !important;
}

.datepickerBox .dp__action_cancel {
    color: #fff !important;
}

.datepickerBox .dp__button {
    background-color: #4B5563;
}

.datepickerBox .dp__inc_dec_button svg {
    width: 4rem !important;
    height: 4rem !important;
}

.datepickerBox .dp--time-overlay-btn {
    color: #fff;
    font-size: 3rem;
}

.datepickerBox .dp__time_col_reg_block {
    color: #fff;
    font-size: 3rem;
}

.datepickerBox .dp__btn:hover {
    background-color: #9CA3AF;
}

.datepickerBox .dp__button:hover {
    background-color: #9CA3AF;
}

.datepickerBox .dp__overlay_row {
    background-color: #4B5563;

}

.datepickerBox .dp__selection_preview {
    color: #fff;
    font-size: 1.5rem;
}

.datepickerBox svg {
    width: auto;
    height: 2rem;
}

@media screen and (min-width: 3840px) {


    .datepickerBox .dp__outer_menu_wrap {
        width: 50rem;
        left: -5rem !important;
        top: -43rem !important;

    }

    .datepickerBox .dp__calendar_item {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .datepickerBox .dp__cell_inner {
        padding: 2rem;
    }

    .datepickerBox .dp__action_button {
        padding: 2rem !important;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }

    .datepickerBox .dp--tp-wrap .dp__button {
        width: 50rem !important;
        height: 5rem !important;
        display: flex;
        justify-content: center;
    }

    .datepickerBox .dp__calendar_header_item {
        padding: 2rem;
        margin-bottom: 2rem;
        font-size: 2rem;
    }

    .datepickerBox .dp__month_year_select {
        margin-top: 2rem;
        font-size: 2.5rem !important;
    }

    .datepickerBox svg {
        width: auto;
        height: 3rem;
    }
    .datepickerBox .dp__inner_nav{
        width: 3rem !important;
        height: 3rem !important;
        margin-top: 2rem;
    }
    .datepickerBox .dp__icon{
        width: 3rem !important;
        height: 3rem !important;
    }
    .datepickerBox .dp__inc_dec_button{
        width: 3rem !important;
        height: 3rem !important;
    }
    .datepickerBox .dp__input_reg{
        padding: 1.5rem;
        padding-left: 5rem;
    }
}
</style>