'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { useChat } from '@ai-sdk/react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, User, Trash2 } from 'lucide-react'

const STORAGE_KEY = 'ana-chat-history'

const welcomeMessage: UIMessage = {
  id: 'welcome',
  role: 'assistant',
  parts: [
    {
      type: 'text',
      text: "Hey Ana! 💛 I'm your personal prep partner. Whether you need to nail an interview answer, make your experience sound as impressive as it actually is, or just need someone to remind you how ready you are for this — I'm here. What's on your mind?",
    },
  ],
}

function loadSavedMessages(): UIMessage[] {
  if (typeof window === 'undefined') return [welcomeMessage]
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as UIMessage[]
      return parsed.length > 0 ? parsed : [welcomeMessage]
    }
  } catch {
    // Ignore parse errors
  }
  return [welcomeMessage]
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [savedMessages, setSavedMessages] = useState<UIMessage[]>([welcomeMessage])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load saved messages on mount
  useEffect(() => {
    setSavedMessages(loadSavedMessages())
  }, [])

  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
    messages: savedMessages,
  })

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
    setMessages([welcomeMessage])
    setSavedMessages([welcomeMessage])
  }

  const isLoading = status === 'submitted' || status === 'streaming'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const message = input
    setInput('')
    await sendMessage({ text: message })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const suggestedPrompts = [
    "Help me answer 'Why leave teaching?'",
    "Translate my chapel experience to ministry language",
    "What should I ask Legacy Church?",
    "I'm nervous - give me a pep talk",
  ]

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] max-h-[80vh] bg-stone-950/95 backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-100 text-sm">Career Coach</h3>
                  <p className="text-xs text-stone-500">Here to help you prep</p>
                </div>
              </div>
              <div className="flex gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={clearHistory}
                    className="p-2 text-stone-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Start fresh"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-200 hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-teal-500/20 border border-teal-500/20'
                        : 'bg-amber-500/20 border border-amber-500/20'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-teal-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-teal-500/10 border border-teal-500/20 text-stone-200'
                        : 'bg-white/[0.03] border border-white/[0.06] text-stone-300'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {message.parts
                        .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
                        .map((part) => part.text)
                        .join('')}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Prompts - show only if just the welcome message */}
              {messages.length === 1 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-stone-500 px-1">Try asking:</p>
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage({ text: prompt })}
                      className="w-full text-left p-2.5 text-xs text-stone-400 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] rounded-xl transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/[0.06]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
