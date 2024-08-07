import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import { routeManager } from './Manager'
import axios from 'axios';
import cart from "./img/cart.jpg";
import userProfile from "./img/userProfile.jpg"
import shop from "./img/shop.jpg"

const Cart = () => {

  let [deal, setDeals] = useState([]);

    let id = localStorage.getItem("user")
    let token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${routeManager}/${id}/item`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
                    .then((res)=> setDeals(res.data) ) 
                    .catch(e => console.log(e));
            }, []);

        
          
  if (deal == null) {
    return (
      <div >
            <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom sticky-top shadow-sm">
            <img src={shop }  style={{width:"60px", height:"30px"}} alt="SHOPINDEX" />
          <div className="d-flex w-50">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search products, brands and categories" 
            />
            <button className="btn btn-secondary ms-2">Search</button>
          </div>
          <div className="d-flex align-items-center gap-3">
          <a href='/user/cart'><img src={cart} style={{width:"30px", height:"30px"}} /></a>
          <a href='/profile'><img src={userProfile} style={{width:"30px", height:"30px"}} /></a>
          </div>
        </header>
        <div className="container mt-5">
        <div className="text-center">
          <div className="cart-icon" style={{ fontSize: '4rem', color: '#FFA500' }}>
          <a href='/user/cart'><img src={cart} style={{width:"30px", height:"30px"}} /></a>
          <a href='/profile'><img src={userProfile} style={{width:"30px", height:"30px"}} /></a>
        <a href='/login'><button className='btn btn-primary ms-2' onClick={()=> localStorage.clear()}>log Out</button></a>

          </div>
          <h3>Your cart is empty!</h3>
          <p>Browse our categories and discover our best deals!</p>
          <button className="btn btn-warning">START SHOPPING</button>
        </div>
  
        
        </div>
        <Footer/>
      </div>
  
    );
  }
  else{

    return(
      <div>
       <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom sticky-top shadow-sm">
       <img src={shop }  style={{width:"60px", height:"30px"}} alt="SHOPINDEX" />
          <div className="d-flex w-50">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search products, brands and categories" 
            />
            <button className="btn btn-primary ms-2">Search</button>
          </div>
          <div className="d-flex align-items-center gap-3">
          <a href='/user/cart'><img src={cart} style={{width:"30px", height:"30px"}} /></a>
          <a href='/profile'><img src={userProfile} style={{width:"30px", height:"30px"}} /></a>
          </div>
        </header>
            
            <div className='container custom'>
                <div className="row mt-3">
            {deal.map(deal => (
              <div key={deal.id} className="col-md-2 mb-2">
                <div className="card">
                 <a href={`/${id}/${deal.id}`}> <img src={deal.photoUrl} alt={deal.title} className="card-img-top" /> </a>
                  <div className="card-body text-center">
                    <span>{deal.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
            <Footer/>
          </div>
      )
  }
  
};

export default Cart;
