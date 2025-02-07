<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

// Define validation schema
const { values, errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            text: yup.string().required('Usuario requerido'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('contraseña requerida'),
        }),
    ),
});
const [text] = defineField('text');
const [password] = defineField('password');
const onSubmit = () => {
    console.log(values)
}
</script>

<template>
    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Login now!</h1>
                <p class="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form class="card-body" @submit.prevent="onSubmit">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Usuario</span>
                        </label>
                        <input id="email" type="text" v-model="text" placeholder="Usuario"
                            class="input input-bordered " :class="[ errors.text?'input-error':'']" required/>
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.text }}</span></p>

                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Contraseña</span>
                        </label>
                        <input id="password" type="password" v-model="password" placeholder="Contraseña"
                            class="input input-bordered" :class="[ errors.password?'input-error':'']" required />
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ errors.password }}</span></p>
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>