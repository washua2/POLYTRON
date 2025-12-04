<template>
    <div class="w-full min-h-[100vh] ipad:min-h-[100svh] bg-[#F7F8FA] flex flex-col items-center px-4 bg-cover-center">
        <!-- logo -->
        <div class="mt-[10.8125rem]">
            <SvgIcon width="20.3125rem" height="2.5rem" icon="login-logo" />
        </div>

        <!-- card -->
        <div class="w-[25rem] bg-white rounded-[0.5rem] border border-[#EAECEF] shadow-sm px-[1.5rem] py-[3rem] mt-[6rem]">
            <!-- title -->
            <div class="text-center">
                <div class="text-[#09090B] text-[1.5rem] font-['medium']">
                    Reset Password
                </div>

                <!-- subtitle by step -->
                <div v-if="step === 1" class=" text-[#717784] text-[0.875rem] font-['light'] leading-[1.3rem] px-2">
                    We’ll email you instructions to reset your password. If you don’t have
                    access to your email anymore, you can try account recovery.
                </div>

                <div v-else-if="step === 2"
                    class=" text-[#717784] text-[0.875rem] font-['light'] leading-[1.3rem] px-2">
                    First, enter the code sent to your email address
                </div>

                <div v-else class=" text-[#717784] text-[0.875rem] font-['light'] leading-[1.3rem] px-2">
                    Enter a new password below to change your password
                </div>
            </div>

            <!-- tabs (same style) -->
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

            <!-- body: steps -->
            <form class="mt-[1.25rem] space-y-[0.875rem]" @submit.prevent="handlePrimary">
                <!-- ================= STEP 1: EMAIL ================= -->
                <template v-if="step === 1">
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
                </template>

                <!-- ================= STEP 2: CODE ================= -->
                <template v-else-if="step === 2">
                    <div class="flex items-center justify-center gap-[0.875rem] mb-[1.5rem]">
                        <input v-for="(v, i) in code" :key="i" ref="inputs" v-model="code[i]" inputmode="numeric"
                            maxlength="1" class="w-[2.875rem] h-[2.8125rem] rounded-[0.375rem] border text-center text-[1rem] font-['medium']
                     outline-none transition" :class="boxClass" @input="onInput(i, $event)"
                            @keydown.backspace.prevent="onBackspace(i)" @paste.prevent="onPaste($event)" />
                    </div>

                    <p v-if="errors.code" class="text-center text-[0.75rem] font-['light'] text-red-500">
                        {{ errors.code }}
                    </p>

                    <div class="text-center text-[#717784] text-[0.875rem] font-['light']">
                        Didn’t receive a code?
                        <button type="button" class="text-[#717784] hover:text-[#09090B] ml-1"
                            :disabled="resendLeft > 0" @click="handleResend">
                            Resend<span v-if="resendLeft > 0"> ({{ resendLeft }})</span>
                        </button>
                    </div>
                </template>

                <!-- ================= STEP 3: NEW PASSWORD ================= -->
                <template v-else>
                    <!-- New Password -->
                    <div>
                        <label class="block text-[0.875rem] font-['medium'] text-[#09090B] mb-[0.25rem]">
                            New Password
                        </label>
                        <div class="relative">
                            <input v-model.trim="form.newPassword" @input="validateField('newPassword')"
                                @blur="validateField('newPassword')" :type="showNewPwd ? 'text' : 'password'"
                                placeholder="" class="w-full h-[2.3125rem] rounded-[0.375rem] border px-4 pr-10 text-[0.875rem]
                       outline-none transition" :class="inputClass('newPassword')" />

                            <button type="button"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#717784] text-[0.75rem]"
                                @click="showNewPwd = !showNewPwd">
                                <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-close"
                                    v-show="!showNewPwd" />
                                <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-open"
                                    v-show="showNewPwd" />
                            </button>
                        </div>
                        <p v-if="errors.newPassword" class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                            {{ errors.newPassword }}
                        </p>
                    </div>

                    <!-- Confirm New Password -->
                    <div>
                        <label class="block text-[0.875rem] font-['medium'] text-[#09090B] mb-[0.25rem]">
                            Re-Enter New Password
                        </label>
                        <div class="relative">
                            <input v-model.trim="form.confirmPassword" @input="validateField('confirmPassword')"
                                @blur="validateField('confirmPassword')" :type="showConfirmPwd ? 'text' : 'password'"
                                placeholder="" class="w-full h-[2.3125rem] rounded-[0.375rem] border px-4 pr-10 text-[0.875rem]
                       outline-none transition" :class="inputClass('confirmPassword')" />

                            <button type="button"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#717784] text-[0.75rem]"
                                @click="showConfirmPwd = !showConfirmPwd">
                                <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-close"
                                    v-show="!showConfirmPwd" />
                                <SvgIcon width="1rem" height="1rem" color="#18181B" icon="eyes-open"
                                    v-show="showConfirmPwd" />
                            </button>
                        </div>
                        <p v-if="errors.confirmPassword"
                            class="mt-[0.25rem] text-[0.75rem] font-['light'] text-red-500">
                            {{ errors.confirmPassword }}
                        </p>
                    </div>
                </template>

                <!-- Return to login (all steps) -->
                <button type="button" class="w-full text-center text-[#1C64F2] text-[1rem] font-['light'] mt-[0.5rem]
                 hover:underline" @click="handleReturnLogin">
                    Return to login
                </button>

                <!-- Primary button text by step -->
                <button type="submit" class="w-full h-[2.5rem] rounded-[0.375rem] bg-[#1C64F2] hover:bg-[#2B74F3]
                 active:scale-[0.98] transition text-[#FAFAFA] text-[0.875rem] font-['medium']
                 flex items-center justify-center gap-2 mt-[1rem]" :disabled="loading">
                    <span v-if="loading"
                        class="inline-block w-[1rem] h-[1rem] rounded-full border-2 border-white border-t-transparent animate-spin"></span>

                    <template v-if="step === 1">Continue</template>
                    <template v-else-if="step === 2">Continue</template>
                    <template v-else>Reset password</template>
                </button>

                <!-- success -->
                <p v-if="successMsg" class="text-center text-[0.75rem] text-green-600 font-['light'] mt-2">
                    {{ successMsg }}
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const mode = ref("login");      // tabs only
const step = ref(1);            // 1=email, 2=code, 3=new pwd
const loading = ref(false);
const successMsg = ref("");

const showNewPwd = ref(false);
const showConfirmPwd = ref(false);

/** form */
const form = reactive({
    email: "",
    newPassword: "",
    confirmPassword: "",
});

/** 6-digit code */
const code = reactive(Array(6).fill(""));
const inputs = ref([]);

/** resend countdown */
const resendLeft = ref(28);
let timer = null;
onMounted(() => {
    if (step.value === 2) startTimer();
});
onBeforeUnmount(() => stopTimer());

function startTimer() {
    stopTimer();
    timer = setInterval(() => {
        if (resendLeft.value > 0) resendLeft.value--;
        else stopTimer();
    }, 1000);
}
function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
}

/** errors */
const errors = reactive({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
});

/** validation rules */
const rules = {
    email: (v) => {
        if (!v) return "Please enter your email";
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        return ok ? "" : "Invalid email format";
    },
    code: () => {
        const joined = code.join("");
        if (joined.length !== 6 || code.some(c => !c)) {
            return "Please enter the 6-digit code";
        }
        return "";
    },
    newPassword: (v) => {
        if (step.value !== 3) return "";
        if (!v) return "Please enter a new password";
        if (v.length < 6) return "Password must be at least 6 characters";
        return "";
    },
    confirmPassword: (v) => {
        if (step.value !== 3) return "";
        if (!v) return "Please re-enter your new password";
        if (v !== form.newPassword) return "Passwords do not match";
        return "";
    },
};

function validateField(field) {
    errors[field] = rules[field]?.(form[field]) ?? "";
}

function validateAllForStep() {
    let ok = true;
    if (step.value === 1) {
        validateField("email");
        ok = !errors.email;
    }
    if (step.value === 2) {
        errors.code = rules.code();
        ok = !errors.code;
    }
    if (step.value === 3) {
        validateField("newPassword");
        validateField("confirmPassword");
        ok = !errors.newPassword && !errors.confirmPassword;
    }
    return ok;
}

function inputClass(field) {
    return errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-400";
}

const boxClass = computed(() =>
    errors.code
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
);

/** tabs (normally route push) */
function switchMode(m) {
    mode.value = m;
    console.log("switch to:", m);
}

/** step1 -> step2 -> step3 */
async function handlePrimary() {
    successMsg.value = "";
    if (!validateAllForStep()) return;

    loading.value = true;
    try {
        if (step.value === 1) {
            // TODO: send email code
            console.log("send reset code to:", form.email);
            await new Promise(r => setTimeout(r, 600));

            step.value = 2;
            resendLeft.value = 28;
            startTimer();
            nextTick(() => inputs.value[0]?.focus());
            return;
        }

        if (step.value === 2) {
            // TODO: verify code
            console.log("verify code:", code.join(""));
            await new Promise(r => setTimeout(r, 600));

            step.value = 3;
            stopTimer();
            return;
        }

        if (step.value === 3) {
            // TODO: reset password
            const payload = {
                email: form.email,
                code: code.join(""),
                newPassword: form.newPassword,
            };
            console.log("reset password payload:", payload);
            await new Promise(r => setTimeout(r, 600));

            successMsg.value = "Password reset ✅";
            // 可根据业务跳转登录页
            return;
        }
    } finally {
        loading.value = false;
    }
}

/** step2: input */
function onInput(i, e) {
    const val = e.target.value.replace(/\D/g, "");
    code[i] = val.slice(-1);
    if (code[i] && i < 5) {
        nextTick(() => inputs.value[i + 1]?.focus());
    }
    if (errors.code) errors.code = rules.code();
}
function onBackspace(i) {
    if (code[i]) {
        code[i] = "";
        return;
    }
    if (i > 0) {
        code[i - 1] = "";
        nextTick(() => inputs.value[i - 1]?.focus());
    }
}
function onPaste(e) {
    const text = (e.clipboardData?.getData("text") || "")
        .replace(/\D/g, "")
        .slice(0, 6);
    if (!text) return;
    text.split("").forEach((ch, idx) => (code[idx] = ch));
    nextTick(() => inputs.value[Math.min(text.length, 5)]?.focus());
    errors.code = rules.code();
}

/** resend only in step2 */
function handleResend() {
    if (step.value !== 2 || resendLeft.value > 0) return;
    console.log("resend code...");
    resendLeft.value = 28;
    startTimer();
}

/** return login */
function handleReturnLogin() {
    router.push('/login')
}
</script>

<style scoped lang="scss">
.ipt[type="checkbox"] {
    outline: none;
    box-shadow: none;
}
</style>
