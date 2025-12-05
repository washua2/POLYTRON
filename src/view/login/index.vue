<template>
    <div class="w-full min-h-[100vh] ipad:min-h-[100svh] bg-[#F7F8FA] flex flex-col items-center  px-4  bg-cover-center">
        <div class="mt-[10.8125rem]">
            <SvgIcon width="20.3125rem" height="2.5rem" icon="login-logo" />
        </div>
        <div class="w-[25rem] bg-white rounded-[0.5rem] border border-[#EAECEF] shadow-sm px-[1.5rem] py-[3rem] mt-[6rem]">
            <!-- title -->
            <div class="text-center">
                <div class="text-[#09090B] text-[1.5rem] font-['medium']">Log in</div>
                <div class="mt-1 text-[#717784] text-[0.875rem] font-['light']">
                    Please sign in to continue
                </div>
            </div>

            <!-- tabs -->
            <div class="mt-[1.25rem] bg-[#F3F4F6] rounded-[0.375rem] p-[0.25rem] flex items-center">
                <button type="button"
                    class="flex-1 h-[2.25rem] rounded-[0.375rem] text-[0.875rem] font-['medium'] transition" :class="mode === 'login'
                        ? 'bg-white text-[#18181B] shadow-sm'
                        : 'text-[#717784] hover:text-[#18181B]'" @click="switchMode('login')">
                    Log in
                </button>
                <button type="button"
                    class="flex-1 h-[2.25rem] rounded-[0.375rem] text-[0.875rem] font-['medium'] transition" :class="mode === 'signup'
                        ? 'bg-white text-[#18181B] shadow-sm'
                        : 'text-[#717784] hover:text-[#18181B]'" @click="switchMode('signup')">
                    Sign Up
                </button>
            </div>

            <!-- form -->
            <form class="mt-[1.25rem] space-y-[0.875rem]" @submit.prevent="handleSubmit">
                <!-- Email -->
                <div>
                    <label class="block text-[0.875rem] font-['medium'] text-[#18181B] mb-[0.25rem]">
                        Email
                    </label>
                    <input v-model.trim="form.email" @input="validateField('email')" @blur="validateField('email')"
                        type="email" placeholder="Enter your email" class="w-full h-[2.3125rem] rounded-[0.375rem] border px-4 text-[0.875rem]
                   outline-none transition" :class="inputClass('email')" />
                    <p v-if="errors.email" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Password -->
                <div>
                    <div class="flex items-center justify-between mb-[0.25rem]">
                        <label class="block text-[0.875rem] font-['medium'] text-[#18181B]">
                            Password
                        </label>
                        <button type="button"
                            class="text-[#717784] text-[0.875rem] font-['light'] underline hover:text-[#18181B]"
                            @click="handleForgot">
                            Forgot password?
                        </button>
                    </div>
                    <div class="relative">
                        <input v-model.trim="form.password" @input="validateField('password')"
                            @blur="validateField('password')" :type="showPwd ? 'text' : 'password'"
                            placeholder="Password" class="w-full h-[2.3125rem] rounded-[0.375rem] border px-4 pr-10 text-[0.875rem]
                     outline-none transition" :class="inputClass('password')" />
                        <button type="button"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#717784] text-[0.75rem]"
                            @click="showPwd = !showPwd">
                            <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-close" v-show="!showPwd" />
                            <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-open" v-show="showPwd" />
                        </button>
                    </div>
                    <p v-if="errors.password" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                        {{ errors.password }}
                    </p>
                </div>

                <!-- extra fields for signup -->
                <div v-if="mode === 'signup'">
                    <label class="block text-[0.875rem] font-['medium'] text-[#18181B] mb-[0.25rem]">
                        Re-Enter New Password
                    </label>
                    <div class="relative">
                        <input v-model.trim="form.confirmPassword" @input="validateField('confirmPassword')"
                            @blur="validateField('confirmPassword')" :type="showNewPwd ? 'text' : 'password'" placeholder="Re-Enter New Password"
                            class="w-full h-[2.3125rem] rounded-[0.5rem] border px-4 text-[0.875rem]
                   outline-none transition" :class="inputClass('confirmPassword')" />
                        <button type="button"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#717784] text-[0.75rem]"
                            @click="showNewPwd = !showNewPwd">
                            <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-close"
                                v-show="!showNewPwd" />
                            <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-open" v-show="showNewPwd" />
                        </button>
                    </div>
                    <p v-if="errors.confirmPassword" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                        {{ errors.confirmPassword }}
                    </p>
                </div>

                <!-- remember -->
                <label class="w-[7.5rem] flex items-center gap-2 cursor-pointer select-none pt-[0.25rem]">
                    <input type="checkbox" v-model="form.remember" class="w-[1rem] h-[1rem] rounded-[0.25rem] border border-[#E1E4EA]
                   ipt outline-none cursor-pointer accent-[#1C64F2]" />
                    <span class="text-[#18181B] text-[0.875rem] font-['medium'] mt-[0.125rem]">Remember me</span>
                </label>

                <!-- submit -->
                <button type="submit" class="w-full h-[2.5rem] rounded-[0.375rem] bg-[#1C64F2] hover:bg-[#2B74F3]
                 active:scale-[0.98] transition text-[#FAFAFA] text-[0.875rem] font-['medium']
                 flex items-center justify-center gap-2" :disabled="loading">
                    <span v-if="loading"
                        class="inline-block w-[1rem] h-[1rem] rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    {{ mode === "login" ? "Log in" : "Sign up" }}
                </button>

                
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const mode = ref("login"); // "login" | "signup"
const loading = ref(false);
const showPwd = ref(false);
const showNewPwd = ref(false);
const successMsg = ref("");

const form = reactive({
    email: "",
    password: "",
    confirmPassword: "",
    remember: true,
});

const errors = reactive({
    email: "",
    password: "",
    confirmPassword: "",
});

const rules = {
    email: (v) => {
        if (!v) return "Please enter your email";
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        return ok ? "" : "Invalid email format";
    },
    password: (v) => {
        if (!v) return "Please enter your password";
        if (v.length < 6) return "Password must be at least 6 characters";
        return "";
    },
    confirmPassword: (v) => {
        if (mode.value !== "signup") return "";
        if (!v) return "Please confirm your password";
        if (v !== form.password) return "Passwords do not match";
        return "";
    },
};

function validateField(field) {
    errors[field] = rules[field]?.(form[field]) ?? "";
}

function validateAll() {
    let ok = true;
    Object.keys(errors).forEach((k) => {
        validateField(k);
        if (errors[k]) ok = false;
    });
    return ok;
}

function inputClass(field) {
    return errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-400";
}

function switchMode(m) {
    if (mode.value === m) return;
    mode.value = m;
    successMsg.value = "";
    // 切换后清除确认密码与错误
    form.confirmPassword = "";
    Object.keys(errors).forEach((k) => (errors[k] = ""));
}

function handleForgot() {
    router.push("/resetPassword");
}

async function handleSubmit() {
    successMsg.value = "";
    if (!validateAll()) return;

    loading.value = true;
    try {
        const payload = {
            email: form.email,
            password: form.password,
            remember: form.remember,
        };
        if (mode.value === "signup") {
            payload.confirmPassword = form.confirmPassword;
        }

        console.log(mode.value, "payload:", payload);

        // TODO: 调你的 API
        await new Promise((r) => setTimeout(r, 600));

        successMsg.value =
            mode.value === "login" ? "Login success ✅" : "Sign up success ✅";
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped lang="scss">
.ipt[type="checkbox"] {
    outline: none;
    box-shadow: none;
}
</style>
