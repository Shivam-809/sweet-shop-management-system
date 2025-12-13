import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'admin'
      }
    }
  })

  if (signUpError) {
    return NextResponse.json(
      { error: signUpError.message },
      { status: 400 }
    )
  }

  if (!signUpData.user) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 400 }
    )
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', signUpData.user.id)

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 400 }
    )
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (signInError) {
    return NextResponse.json(
      { error: 'Account created but failed to sign in: ' + signInError.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ 
    success: true,
    message: 'Admin account created and logged in successfully'
  })
}