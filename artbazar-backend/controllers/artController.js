const ErrorHandler = require('../utills/errorhandler')
const {artSchema} = require('../schemas/artSchema')
const Art = require('../Models/artSchema')
const User = require('../Models/userSchema')

exports.createArt = async (req, res, next) => {

    try {
        // const data = { ...req.body }
        // const { error } = artSchema.validate(data, { abortEarly: false });
        // if (error) {
        //     console.log(error)
        //     const errorMessages = error.details.map((detail) => detail.message);
        //     return next(new ErrorHandler(errorMessages, 400))
        // }

        const art = await Art.create(req.body)
        res.status(200).json({
            success:true,
            art
        })
        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error, 500))
    }
   
}


exports.getSingleArt = async (req,res,next)=>{
    console.log(req.params.id)

    try {
        const result = await Art.findOne({_id:req.params.id}).populate('user_id')
        console.log(result)
        if(result){
            res.status(200).json({
                success:true,
                result
            })
        }else{
            return next(new ErrorHandler('No art found with this id', 404))
        }
    } catch (error) {
        return next(new ErrorHandler(error,500))
    }
}


exports.deleteArt = async (req,res,next)=>{
    // console.log(req.params.id)

    try {
        const result = await Art.findOne({_id:req.params.id})
        // console.log(result)
        if(result){

            await Art.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success:true,
                message:"Art deleted successfully"
            })
        }else{
            return next(new ErrorHandler('No art found with this id', 404))
        }
    } catch (error) {
        return next(new ErrorHandler(error,500))
    }
}


exports.getSingleUserArts = async (req,res,next)=>{
    try {
   
        const arts = await Art.find({user_id:req.body.id}).populate('user_id')

        res.status(200).json({
            success:true,
            arts 
        })
    } catch (error) {
        return next(new ErrorHandler(error,500))
    }
}

exports.updateArtTitle = async(req,res,next)=>{

    try {
        const art = await Art.findOne({_id:req.params.id})

        art.title = req.body.title
        await art.save()

        res.status(200).json({
            success:true,
            art
        })

    } catch (error) {
        return next(new ErrorHandler(error,500))
    }
}



exports.getAllArts = async(req,res)=>{
    try {
        const arts = await Art.find().populate('user_id')
        res.status(200).json({
            success:true,
            arts
        })
    } catch (error) {
        console.log(error)
        // return next(new ErrorHandler(error,500))
    }
}



exports.createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, artId,userId } = req.body;
  
    const review = {
      user: userId,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const art = await Art.findById(artId);
  
    const isReviewed = product.art.find(
      (rev) => rev.user.toString() === userId.toString()
    );
  
    if (isReviewed) {
        art.reviews.forEach((rev) => {
        if (rev.user.toString() === userId.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
        art.reviews.push(review);
        art.numOfReviews = art.reviews.length;
    }
  
    let avg = 0;
  
    art.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    art.ratings = avg / art.reviews.length;
  
    await art.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
    }
    
  };
  
  // Get All Reviews of a product
  exports.getProductReviews = async (req, res, next) => {
    const art = await Art.findById(req.query.id);
  
    if (!art) {
      res.status(400).json({
        success:false,
        message:'Product Not found'
      })
    }else{
        res.status(200).json({
            success: true,
            reviews: art.reviews,
          });
    }
  
   
  };
  
  // Delete Review
  exports.deleteReview = async (req, res, next) => {
    const art = await Art.findById(req.query.artId);
  
    if (!art) {
        res.status(400).json({
            success:false,
            message:'Product Not found'
          })
    }
    else{
        const reviews = art.reviews.filter(
            (rev) => rev._id.toString() !== req.query.id.toString()
          );
        
          let avg = 0;
        
          reviews.forEach((rev) => {
            avg += rev.rating;
          });
        
          let ratings = 0;
        
          if (reviews.length === 0) {
            ratings = 0;
          } else {
            ratings = avg / reviews.length;
          }
        
          const numOfReviews = reviews.length;
        
          await Art.findByIdAndUpdate(
            req.query.artId,
            {
              reviews,
              ratings,
              numOfReviews,
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
        
          res.status(200).json({
            success: true,
          });
    }
  };
  