import React, { Component } from 'react'
import './Products.css';
import formatCurrency from '../../util';
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";


export default class  extends Component {

    constructor(props){
        super(props);

        this.state = {
            product: null,
            isOpen: true
        }
    }

    openModal = (product) => {debugger;
        this.setState({product})
    }

    closeModal = () => {
        this.setState({product: null})
    }

    render() {

        const {product} = this.state;

        return (
            <div>
                <Fade bottom cascade={true}>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#", product._id} onClick={()=> this.openModal(product)}>
                                    <img src={product.image} alt="Product image"/>
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        { formatCurrency(product.price) }
                                    </div>
                                    <button onClick={() => this.props.addToCart(product)} className="button primary">Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
                {
                    product && (
                        <Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>
                                    x
                                </button>
                                <div className="product-details">
                                    <img src={product.img} alt={product.title}/>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Availabel Sizes
                                            {product.availableSizes.map(x=>(
                                                <span>
                                                    {" "} 
                                                    <button className="button">X</button>
                                                </span>

                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                                <button className="button primary" onClick={()=>{
                                                   this.addToCart(product)
                                                   this.closeModal()}}>
                                                       Add To Cart
                                                   </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}
