const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator') //데이터 판별을 도와주는 라이브러리
// const User = require('./userModel')

const tourSchema = new mongoose.Schema({
    name:{
      type:String,
      required: [true, 'A tour must have a name'],
      unique: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },

    slug: String,

    duration:{
      type:Number,
      required: [true, 'A tour must have a duration']
    },

    maxGroupSize:{
      type:Number,
      required: [true, 'A tour must have a group size']
    },

    difficulty:{
      type:String,
      required: [true, 'A tour must have a difficulty'],
      enum:{
        values: ['difficult', 'easy', 'medium'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },

    ratingsAverage: {
      type:Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5 .0'],
      set: val => Math.round(val *10) / 10
    },

    ratingsQuantity:{
      type:Number,
      default: 0
    },

    price: {
      type:Number,
      required: [true, 'A tour must have a price']
    },

    priceDiscount: {
      
      type:Number,
      validate:{
        validator: function(val) {
          return val < this.price
        },
        message:'Discount price ({VALUE}) should be below regular pice', // ({VALUE}) 는 mongoose 
      } 
    },

    summary: {
        type: String,
        trim:true,
        required: [true, 'A tour must have a description']
    },
    
    description:{
        type:String,
        trim:true
    },
    imageCover :{
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
      type:Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }]
  }, { 
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  })

  tourSchema.index({price: 1})
  tourSchema.index({slug: 1})
  tourSchema.index({startLocation: '2dsphere'})

  tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7 
  })

  tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: "_id"
  })

  tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true}); //lower:true는 모든 문자를 소문자로 변환
    next()
  })

  // tourSchema.pre('save', async function(next) {
  //   const guidesPromises = this.guides.map(async id => await User.findById(id))
  //   this.guides = await Promise.all(guidesPromises)
    
  //   next()
  // })


  // tourSchema.pre('save', function(next) {
  //   console.log('save....')
  //   next()
  // })
  
  // tourSchema.post('save', function(doc, next) {
  //   console.log(doc)
  //   next()
  // })

  // tourSchema.pre('find', function(next){

  tourSchema.pre(/^find/, function(next){
    this.populate({
      path:'guides',
      select: '-__v -passwordChangedAt' // 조회시 해당 키들이 안보이는것 같다.
    }) //레퍼런스되어있는 아이디를 개별투어정보에서 상세정보로 볼수있음(populate()메소드로)

    next();
  })

  tourSchema.pre(/^find/, function(next){
  this.find({secretTour: {$ne: true}})
  this.start = Date.now()
    next()
  })

  tourSchema.post(/^find/, function(docs,next){
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
    next()
  })

  // tourSchema.pre('aggregate', function(next){
  //   this.pipeline().unshift({ $match: { secretTour: {$ne: true}}})
  //   console.log(this.pipeline())
  //   next()
  // })

  const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;