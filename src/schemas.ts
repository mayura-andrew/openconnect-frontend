import { z } from 'zod'

export const VerificationFormSchema = z.object({
    verificationCode: z
        .string()
        .nonempty('Verification Code is Required')
        .min(26, 'Verification Code must be at least 26 characters'),
})

export const ForgotPasswordFormSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Required'),
})

export const SignUpFormSchema = z.object({
    username: z.string().min(1, 'Required').max(100, 'Maximum 50 characters'),
    email: z.string().email('Invalid email').min(1, 'Required'),
    password: z
        .string()
        .min(8, 'Minimum 8 characters')
        .max(100, 'Maximum 100 characters'),
})

export const SignInFormSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),

    password: z
        .string()
        .min(8, 'Password reuirred at least 8 characters')
        .max(100, 'Password must be less than 100 characters'),
})

export const ChangePasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, 'Minimum 8 characters')
            .max(100, 'Maximum 100 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Minimum 8 characters')
            .max(100, 'Maximum 100 characters'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    })

export const profileSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().optional(),
    title: z.string().optional(),
    mobile: z.string().optional(),
    degree: z.string().optional(),
    uni: z.string().optional(),
    faculty: z.string().optional(),
    bio: z.string().optional(),
})
