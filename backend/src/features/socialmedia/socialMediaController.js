const socialMediaController = {
	checkSocialMedia: async (req, res) => {
	  let responseData = {};
	  const id = req.query.id;
  
	  const url = "https://instagram-profile1.p.rapidapi.com/getprofile/" + id;
	  const options = {
		method: "GET",
		headers: {
		  "x-rapidapi-key": "92fd89fb3cmsh027f8f88474ad18p133c72jsndea7e2ddc2ae",
		  "x-rapidapi-host": "instagram-profile1.p.rapidapi.com",
		},
	  };
  
	  try {
		const instagramResponse = await fetch(url, options);
		const instagramResult = await instagramResponse.json();
		responseData.insta = instagramResult;
	  } catch (error) {
	  }

	  const url1 = `https://twitter241.p.rapidapi.com/user?username=${id}`;
	  const options1 = {
		method: "GET",
		headers: {
		  "X-RapidAPI-Key": "6502eac889msh466f24713abf4cap1d7458jsn3a68f25ccc3f",
		  "X-RapidAPI-Host": "twitter241.p.rapidapi.com",
		},
	  };

	  try {
		const twitterResponse = await fetch(url1, options1);
		const twitterResult = await twitterResponse.json();
		responseData.twitter = twitterResult.result.data.user;
	  } catch (error) {
	  }

	  res.status(200).send(responseData);
	},
  };
  
  export default socialMediaController;
  