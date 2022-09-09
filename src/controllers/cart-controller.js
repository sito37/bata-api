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

            let condition, update;
    
            if(item){
                condition = {'user': req.user._id, 'cartItems.product': product}
                update = {
                    "$set": {
                        "cartItems.$": {...req.body.cartItems, quantity: item.quantity + req.body.cartItems.quantity}
                    }
                }
            }else{
                 // if cart exist, we update the cart items
                 condition = {user: req.user._id}
                 update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }
            }
            Cart.findOneAndUpdate(condition, update)
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