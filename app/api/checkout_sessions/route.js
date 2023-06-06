import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {

    try {

        const { cart } = await req.json()

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1MsOq7G8ubawlCYPlC1zzQgm' },
                { shipping_rate: 'shr_1MsOysG8ubawlCYPIxBLvyXj' },
            ],
            line_items: cart.map( item => ({

                price_data: { 
                    currency: 'sar',
                    product_data: { 
                        name: item.name,
                        description: `${item.dough?.name || ''} . ${item.size || ''}`,
                        images: [item.img],
                    },
                    unit_amount: item.totalPrice * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: item.quantity
            })),
            success_url: `http://localhost:3001/success`,
            cancel_url: `http://localhost:3001/canceled`,
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);

        return new Response(JSON.stringify(session), { status: 200 })

    } catch (err) {

        return new Response(JSON.stringify(err.message), { status: err.statusCode || 500 })
    }
}