import axios from 'axios';

const emailController = {
    checkEmail: async (req, res) => {   
        const email = req.query.email;

        try {
            const response = await axios.get('https://mailcheck.p.rapidapi.com/', {
                params: { domain: email },
                headers: {
                    'X-Rapidapi-Key': 'da9f7eefe4mshb03d7d2e86b88dbp1c2559jsn78e61fdfd2ba',
                    'X-Rapidapi-Host': 'mailcheck.p.rapidapi.com'
                }
            });
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while checking the email.' });
        }
    }
};

export default emailController;