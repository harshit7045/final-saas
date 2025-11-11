

const phoneController = {
    checkPhone: async (req, res) => {   
        const phone = req.query.phone;
    
        try {
            let response = await fetch(`http://apilayer.net/api/validate?access_key=2619ebfed4f20ef86373d4c1092ddb4e&number=${phone}&country_code=in`);
            let data = await response.json();
            return res.status(200).json(data);
        } catch (error) {    
            return res.status(500).json({ error: 'An error occurred while checking the phone number.' });
        }

    }
}
export default phoneController;