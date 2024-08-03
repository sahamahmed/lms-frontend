import z from 'zod'

export const usernameValidation = z
    .string()
    .min(3, {message: "username must be at least 3 characters long"})
    .max(20, {message: "username must be at most 20 characters long"})
    .regex(/^[a-zA-Z0-9_]*$/, {message: "username must contain only letters, numbers, and underscores"})

export const SignupSchema = z.object({
    name: usernameValidation,
    email: z.string().email({message: "please enter a valid email address"}),
    password: z.string().min(6, {message: "password must be at least 6 characters long"}),
})