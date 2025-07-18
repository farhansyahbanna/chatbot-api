import type { HttpContext } from '@adonisjs/core/http'
import { createQuestionValidator } from '#validators/question'
import Conversation from '#models/conversation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default class ChatsController {
  /**
   * Create a new conversation and get a response from the bot
   */
  async store({ request, response }: HttpContext) {
    const { question } = await request.validateUsing(createQuestionValidator)
    const sessionId = uuidv4()

    const conversation = await Conversation.create({
      sessionId: sessionId,
      lastMessage: question,
    })

    await conversation.related('messages').create({
      senderType: 'user',
      message: question,
    })

    const externalApiUrl = 'https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message'

    try {
      const externalResponse = await axios.post(externalApiUrl, {
        session_id: sessionId,
        message: question,
      })

      const botMessage = externalResponse.data.data.message

      await conversation.related('messages').create({
        senderType: 'bot',
        message: botMessage,
      })
      
      conversation.lastMessage = botMessage
      await conversation.save()
      
      return response.ok({ answer: botMessage })
    } catch (error) {
      console.error('External API Error:', error)
      return response.internalServerError({ message: 'Failed to communicate with the chatbot service.' })
    }
  }

  /**
   * Get all conversations
   */
  async index({ response }: HttpContext) {
    const conversations = await Conversation.query().preload('messages')
    return response.ok(conversations)
  }

  /**
   * Get a single conversation by ID
   */
  async show({ params, response }: HttpContext) {
    const conversation = await Conversation.query().where('id', params.id).preload('messages').first()

    if (!conversation) {
      return response.notFound({ message: 'Conversation not found' })
    }

    return response.ok(conversation)
  }

  /**
   * Delete a conversation by ID
   */
  async destroy({ params, response }: HttpContext) {
    const conversation = await Conversation.findOrFail(params.id)
    await conversation.delete()
    return response.noContent()
  }
}