import paymentService from "../services/paymentService.js"


const subscriptionPlans = async (req, res) => {
    console.log("call",req)
    try {
        const { data } = await paymentService.subscriptionPlans()
        res.status(200).json({ data })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const createSubscription = async (req, res) => {
    try {
        console.log("req-------",req.body)
        return 0
      const data = await paymentService.createSubscription(req)
        res.status(200).json(data)
    } catch (error) {
        console.log("error in catch",error)
    }
}

export default {
    createSubscription,
    subscriptionPlans
}