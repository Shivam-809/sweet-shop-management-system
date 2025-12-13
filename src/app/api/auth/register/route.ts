import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, fullName } = await request.json()
  const origin = new URL(request.url).origin

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (data.user && data.user.identities?.length === 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      role: 'user'
    })

    return NextResponse.json({ 
      user: data.user, 
      message: 'Please check your email to verify your account' 
    })
  }

  return NextResponse.json({ user: data.user })
}