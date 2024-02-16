import dotenv from "dotenv";
import Stripe from "stripe"
dotenv.config();
console.log(".....",process.env.STRIPE_SECRETE_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY, {
    apiVersion: process.env.STRIPE_API_VERSION,
})

const fetchProducts = async () => {
    try {
        /**
         * fetch active plans with price from stripe
         */
        const products = await stripe.products.list({ active: true })
        const productList = []

        for (const product of products.data) {
            /**
             * fetch price details using stripe
             */
            const activePrices = await stripe.prices.list({
                product: product.id,
                active: true,
            })

            for (const price of activePrices.data) {
                productList.push({
                    priceId: price.id,
                    productId: product.id,
                    price: price.unit_amount_decimal / 100,
                    name: product.name,
                    description: product.description,
                    features: product.features,
                    metadata: product.metadata,
                    interval: price.recurring.interval,
                    nickName: price.nickname,
                })
            }
        }

        return productList
    } catch (error) {
       console.log("errrr",error)
    }
}
/**
 * Function for get plans
 * This will be fetch plans with price details
 * @returns plans array
 */
const subscriptionPlans = async () => {
    console.log("calling")
    try {
        const plans = await fetchProducts()
        return {
            data: plans,
        }
    } catch (error) {
        console.log("error",error)
    }
}

const createSubscription = async (req) => {
    console.log("data",req.body)
    return 0
    try {
        const {
            email,
            body: { price },
            // id: userId,
        } = data
        console.log("price",price,email)
        
        /**
         * create a stripe customer
         */
        await stripe.customers.create({
            email,
        })
        /**
         * create checkout session with subscription mode
         */
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price,
                    quantity: 1,
                },
            ],
            // metadata: {

            // },
            allow_promotion_codes: true,
            mode: 'subscription',
            customer_email: data.email,
            success_url: `${FRONT_APP_URL}${FRONT_END_SUCCESS_URL}`,
            cancel_url: CANCEL_URL,
        })
        return {
            data: session.url,
            status: true,
        }
    } catch (error) {
        console.log("error", error)
    }
}

export default {
    createSubscription,
    subscriptionPlans
}
