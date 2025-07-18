import vine from '@vinejs/vine'

export const createQuestionValidator = vine.compile(
  vine.object({
    question: vine.string().trim().minLength(1),
  })
)