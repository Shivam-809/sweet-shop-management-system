import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const { quantity = 1 } = body
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Please login to purchase' }, { status: 401 })
  }

  const { data: sweet } = await supabase
    .from('sweets')
    .select('*')
    .eq('id', id)
    .single()

  if (!sweet) {
    return NextResponse.json({ error: 'Sweet not found' }, { status: 404 })
  }

  if (sweet.stock < quantity) {
    return NextResponse.json({ error: 'Not enough stock' }, { status: 400 })
  }

  const totalPrice = sweet.price * quantity

  const { error: purchaseError } = await supabase.from('purchases').insert({
    user_id: user.id,
    sweet_id: id,
    quantity,
    total_price: totalPrice
  })

  if (purchaseError) {
    return NextResponse.json({ error: purchaseError.message }, { status: 500 })
  }

  await supabase
    .from('sweets')
    .update({ stock: sweet.stock - quantity })
    .eq('id', id)

  return NextResponse.json({ success: true, totalPrice })
}