import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: 'dajruwtez',
    api_key: '797792151527298',
    api_secret: 'DnBouqhA9Zh6ynjrNUanwAR-S_8'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageController = {
    uploadImage: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            const uploadToCloudinary = () => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: 'image',
                            folder: 'osint-images'
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    const bufferStream = new Readable();
                    bufferStream.push(req.file.buffer);
                    bufferStream.push(null);
                    bufferStream.pipe(uploadStream);
                });
            };

            const cloudinaryResult = await uploadToCloudinary();
            const imageUrl = cloudinaryResult.secure_url;
            
            const zenserpUrl = `https://app.zenserp.com/api/v2/search?apikey=780deeb0-bd52-11f0-891c-4b351ea2670a&image_url=${encodeURIComponent(imageUrl)}`;
            
            const response = await fetch(zenserpUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const body = await response.text();
            
            let jsonData;
            try {
                jsonData = JSON.parse(body);
            } catch (parseError) {
                return res.status(500).json({ error: 'Invalid response from Zenserp API.' });
            }
            
            let imageResults = [];
            let position = 1;
            
            if (jsonData.reverse_image_results) {
                const reverseResults = jsonData.reverse_image_results;
                
                if (reverseResults.organic && Array.isArray(reverseResults.organic)) {
                    reverseResults.organic.forEach((result) => {
                        imageResults.push({
                            position: position++,
                            title: result.title || '',
                            link: result.url || '',
                            displayed_link: result.destination || result.url || '',
                            thumbnail: '',
                            description: result.description || ''
                        });
                    });
                }
                
                if (reverseResults.similar_images && Array.isArray(reverseResults.similar_images)) {
                    reverseResults.similar_images.forEach((result) => {
                        imageResults.push({
                            position: position++,
                            title: 'Similar Image',
                            link: result.url || '',
                            displayed_link: result.url || '',
                            thumbnail: result.thumbnail || ''
                        });
                    });
                }
                
                if (reverseResults.pages_with_matching_images && Array.isArray(reverseResults.pages_with_matching_images)) {
                    reverseResults.pages_with_matching_images.forEach((result) => {
                        imageResults.push({
                            position: position++,
                            title: result.title || '',
                            link: result.url || '',
                            displayed_link: result.destination || result.url || '',
                            thumbnail: '',
                            description: result.description || ''
                        });
                    });
                }
            }
            
            res.status(200).send({ imageUrl: imageUrl, data: imageResults });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while uploading or searching the image.' });
        }
    }
};

export { upload, imageController };
