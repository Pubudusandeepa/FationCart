import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import {connect} from 'react-redux'
import {removeFromCart} from '../actions/cartActions'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import{ clearOrder, createOrder} from '../actions/orderActions'


class Cart extends Component {

   constructor() {
     super()
     this.state = {
       name: "",
       email: "",
       address: "",
       showCheckout: false
      
      }
   }
   handleInput = (e) => {
     this.setState({ [e.target.name]: e.target.value })
   }

   createOrder = (e) => {
     e.preventDefault()
     console.log(this.props.cartItems)
     const order = {
       name: this.state.name,
       email: this.state.email,
       address: this.state.address,
       cartItems: this.props?.cartItems,
       total: this.props?.cartItems.reduce((a, c) => a+ c.price * c.count, 0),
     }
     this.props.createOrder(order)
   }

   closeModal = () => {
     this.props.clearOrder()
   }
    render() {
        const {cartItems, order} = this.props;
      
        
        
        return (
            <div>
                {cartItems.length === 0? (<div className="cart cart-header">Cart Is empty</div>) : 
                 ( <div className="cart cart-header">
                     You have {cartItems.length} in the cart {" "}
                 
                 </div>
                 )}

                 {
                    order && (
                      <Modal
                        isOpen={true}
                        onRequestClose={this.closeModal}
                       >
                         <Zoom>
                           <button className="close-modal" onClick={this.closeModal}>x</button>

                           <div className="order-details">
                            <h3 className="success-message">Your order has been placed.</h3>
                            {
                              order.map((oneOrder)=> (
                                <div>
                                  <h2>Order {oneOrder._id}</h2>
                                  <ul>
                                  <li>
                                    <div>Name:</div>
                                    <div>{oneOrder.name}</div>
                                  </li>
                                  <li>
                                    <div>Email:</div>
                                    <div>{oneOrder.email}</div>
                                  </li>
                                  <li>
                                    <div>Address:</div>
                                    <div>{oneOrder.address}</div>
                                  </li>
                                  <li>
                                    <div>Total:</div>
                                    <div>${oneOrder.total}</div>
                                </li>
                                <li>
                                    <div>Name:</div>
                                    <div>{oneOrder.cartItems.map((x) => (
                                      <div>
                                      {" "}
                                      {x.count} {" x "} {x.title} {" "}
                                      </div>
                                ))}</div>
                                </li>
                                  </ul>
                                </div>
                              )

                              )

                            }
                            
                           
                           </div>
                         </Zoom>
                       </Modal>
                    ) 
                 }

                 <div className="cart">
                  <Fade left cascade>
                  <ul className="cart-items">
                  {
                   cartItems.map(item => (
                         <li key={item._id}>
                          <div>
                            <img src={item.image} alt={item.title}></img>
                          </div>
                          <div>
                            <div>{item.title}</div>
                            <div>{item.count}</div>
                            <div className="right">
                              {" "}
                              <button className="button" onClick={() =>this.props.removeFromCart(item)}>Remove</button>
                            </div>
                           
                          </div>
                         </li>
                     ))
                  }
                 </ul>
                </Fade>
               </div>
               {cartItems.length !== 0 && (
                <div className="cart">
                
                  <div className="total">
                    <div>
                      Total: {" "}
                 {
                     formatCurrency(
                         cartItems.reduce((a, c) => a+ c.price * c.count, 0)
                     )
                 }
                    </div>
                  <button 
                    onClick={() => {
                      this.setState({ showCheckout: true})
                    }}
                  className="button primary">
                  Proceed
                  </button>
                 </div>
               </div>
            
             )}

             { this.state.showCheckout && (
              <Fade right casecade>
              <div className="cart">
               
                 <form onSubmit={this.createOrder}>
                   <ul className="form-container">
                      <li>
                       <label>Email</label>
                          <input name="email" type="text" required onChange={this.handleInput} />
                      </li>
                      <li>
                       <label>Name</label>
                          <input name="name" type="text" required onChange={this.handleInput} />
                      </li>
                      <li>
                       <label>Address</label>
                          <input name="address" type="text" required onChange={this.handleInput} />
                      </li>
                      <li>
                          <button className="button primary" type="submit">Checkout</button>
                      </li>
                   </ul>
                 </form>
              </div>
            </Fade> 
             )}

              
            </div>
          
        )}
}

export default connect((state) => ({
  cartItems: state.cart.cartItems,
  order: state.order.order
}),
{
  removeFromCart,
  createOrder,
  clearOrder
})(Cart)


