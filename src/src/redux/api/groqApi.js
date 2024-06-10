// src/api/groqApi.js
import { baseApi } from "./baseApi"

const CHAT_COMPLETION_URL = '/chat-completion';

export const groqApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getChatCompletion: build.mutation({
            query: (data) => ({
                url: `${CHAT_COMPLETION_URL}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetChatCompletionMutation } = groqApi;
