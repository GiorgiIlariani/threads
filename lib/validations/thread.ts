import * as z from 'zod'

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3),
    accountId: z.string(),
})

export const CommentValidaton = z.object({
    thread: z.string().nonempty().min(3),
})