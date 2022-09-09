const Cart = require('../models/cart-model')

exports.addItemToCart = (req, res) => {

    Cart.findOne({user: req.user._id})
    .exec((error, cart) =>{
        if(error) {
             res.status(400).json({error});
            return;
        }

       

        if(cart){

            // if item exist in cart, update the quantity
            const product = req.body.cartItems.product
            const item = cart.cartItems.find(c => c.product == product)
    
            if(item){
                Cart.findOneAndUpdate({'user': req.user._id, 'cartItems.product': product}, {
                    "$set": {
                        "cartItems": {...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity}
                    }
                })
                .exec((error, _cart) => {
                    if(error){
                        res.status(400).json({error})
                        return;
                    } 
                    if(_cart){
                        res.status(201).json({_cart})
                        return;
                    }
                })
            }else{
                 // if cart exist, we update the cart items
            Cart.findOneAndUpdate({user: req.user._id}, {
                "$push": {
                    "cartItems": req.body.cartItems
                }
            })
            .exec((error, _cart) => {
                if(error){
                    res.status(400).json({error})
                    return;
                } 
                if(_cart){
                    res.status(201).json({_cart})
                    return;
                }
            })
            }   
        }else{
            // if no cart exist, we create one 
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
        
            cart.save((error, cart)=> {
                if(error) {
                    res.status(400).json({error})
                    return;
                } 
                if(cart){
                    res.status(201).json({cart})
                    return;
                }
            })
        }
    })

}