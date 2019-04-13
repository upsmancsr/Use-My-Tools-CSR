const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multipart = require("connect-multiparty")();

const toolsDb = require('../../db/helpers/tools');
const usersDb = require('../../db/helpers/users');
const imagesDb = require('../../db/helpers/images');


cloudinary.config({ 
    cloud_name:"use-my-tools-csr",
    api_key:"654865738498236",
    api_secret:"l6t5As3rK6IZBecdjCadgjYDizs"
  });

// router.post('/newtool', (req, res) => {
//     // from user input:

//         // brand
//         // name, not Null
//         // description, not Null
//         // price, not Null, defaults to 0

//     // from db:
//         // owner_uid, not Null
//         // home_street_address
//         // current_street_address
//         // home_lat
//         // home_lon
//         // current_lat
//         // current_lon
//         // available, defaults to false
//         // rating
//         // owner_rating

//     let { brand, name, description, price, image_file } = req.body;
//     let owner_uid = req.body.uid;
//     let available = true;
    
//     let newTool = {
//         brand: brand,
//         name: name,
//         description: description,
//         price: price,
//         owner_uid: owner_uid,
//         available: available
//     };

//     toolsDb.createTool(newTool)
//         .then(response => {
//             console.log('response from db insert newTool: ', response);
            
            
            
//             res.status(200).json(response);
//         })
//         .catch(error => {  // catch error from insert new rep request
//             console.log(error.message);
//             res.status(500).json({message: error.message});
//         })
// })

router.post('/newtool', multipart, (req, res) => {
    console.log('/newtool req.body: ', req.body);
    // console.log('/newtool req.files.image_file.path: ', req.files.image_file.path);

    let { brand, name, description, price } = req.body;
    let owner_uid = req.body.uid;
    let available = true;
    
    let newTool = {
        brand: brand,
        name: name,
        description: description,
        price: price,
        owner_uid: owner_uid,
        available: available
    };

    toolsDb.createTool(newTool)     // insert new tool into tools table
        .then(response => {
            console.log('response from db insert newTool: ', response);
            const tool_id = 1;     // response is the id (PK) of the new tool in tools table
            cloudinary.v2.uploader.upload(req.files.image_file.path, async function(error, result) {
                console.log('/newtool req.files.image_file: ', req.files.image_file);
                if (error) {
                    res.status(500).json({message: 'Image upload failed.'});
                }
                else {
                    try {
                        // await imagesDb.addImage({ url: result.url});
                        // const image = await db.select().from('images').where('url', result.url).first();
                
                        const imageId = await imagesDb.addImage({ url: result.url});  // insert the image url into the images table and get back the id of the new image in the images table

                        console.log('id of image added to images table: ', imageId);
                
                        await imagesDb.addToolImage({ image_id: imageId, tool_id });
                
                        res.status(200).json(response);
                    }
                    catch (error) {
                        console.log(error);
                        res.status(500).json({message: error.message});
                    }
                }
            });
            
            
            // res.status(200).json(response);
        })
        .catch(error => {  // catch error from insert new rep request
            console.log(error.message);
            res.status(500).json({message: error.message});
        })
})

// router.post('/newtoolimage', multipart, (req, res) => {
//     const tool_id = response.data;
//     cloudinary.v2.uploader.upload(req.files.image_file.path, async function(error, result) {
//         if (error) {
//             res.status(500).json({message: 'Image upload failed.'});
//         }
//         else {
//             try {
//                 // await imagesDb.addImage({ url: result.url});
//                 // const image = await db.select().from('images').where('url', result.url).first();
        
//                 const imageId = await imagesDb.addImage({ url: result.url});  // insert the image url into the images table and get back the id of the new image in the images table

//                 console.log('id of image added to images table: ', imageId);
        
//                 await imagesDb.addToolImage({ image_id: imageId, tool_id });
        
//                 res.status(200).json(response);
//             }
//             catch (error) {
//                 console.log(error);
//                 res.status(500).json({message: error.message});
//             }
//         }
//     });
// })

module.exports = router;
