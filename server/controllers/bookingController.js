const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync")
const factory = require("./handlerFactory")
const Booking =require('./../models/bookingModel')


exports.getCheckOutSession = catchAsync( async (req,res,next) => {
    const tour = await Tour.findById(req.params.tourId)

    //Create checkout session

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/payment-success`,
        cancel_url: `${req.protocol}://${req.get('host')}/payment-cancel`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: tour.price * 100,
                    product_data: {
                        name: `${tour.name} Tour`,
                        description: tour.summary,
                        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                    },
                  },
                  quantity: 1,
              },
        ],
        mode: 'payment',

    })
    res.status(200).json({
        status:'success',
        session
    })
})

exports.createBookingCheckout = catchAsync( async (req, res , next) => {
    const {tour,user, price} =req.query;

    if(!tour && !user && !price) return next();

    await Booking.create({tour, user, price})

    res.redirect(req.originalUrl.split('?')[0])
});