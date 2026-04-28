import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from './supabase'

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Email',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error || !data.user) {
        return null
      }

      if (!data.user.email) {
        return null
      }

      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name,
        image: data.user.user_metadata?.avatar_url,
      }
    },
  }),
]

if (googleClientId && googleClientSecret) {
  providers.unshift(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  )
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        if (!user.email) {
          return false
        }

        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', user.email)
          .single()

        if (!existingUser) {
          const { error } = await supabase.auth.signUp({
            email: user.email,
            password: Math.random().toString(36).slice(-8),
            options: {
              data: {
                full_name: user.name,
                avatar_url: user.image,
              },
            },
          })

          if (error) {
            console.error('Error creating user:', error)
            return false
          }
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
