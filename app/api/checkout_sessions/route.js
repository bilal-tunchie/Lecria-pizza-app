import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MsMgSG8ubawlCYPW0AGfGgAqakEN2ra2OBaxl5iIX5vR6zApVQ1zZm5qMqGBV81bAK9czK0pPTzjaOJC4ONHkHM00ApBUr9kQ');

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
            success_url: `https://leceriapizza.netlify.app/success`,
            cancel_url: `https://leceriapizza.netlify.app/canceled`,
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);

        return new Response(JSON.stringify(session), { status: 200 })

    } catch (err) {

        return new Response(JSON.stringify(err.message), { status: err.statusCode || 500 })
    }
}