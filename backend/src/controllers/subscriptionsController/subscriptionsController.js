const { supabase } = require('../../../supabase.config');


const getSubscriptions = async (app) => {
    app.get('/get_all_subscriptions', async (req, res) => {

        const { data: plans, error } = await supabase
            .from('subscription_plans')
            .select("*") // Add other fields you want to return

        if (error || !plans) {
            return res.json({ message: 'Failed to retrieve plans/subscriptions', status: 401 });
        }

        return res.status(200).json({
            message: 'Retrieved subscriptions successfully',
            statusText: "OK",
            plans,
        });
    });
};

module.exports = { getSubscriptions };
