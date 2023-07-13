import { Card } from "react-bootstrap";
import Rating from "./Rating";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTopProducts } from "../actions/productActions";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions.js";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";


const ProductRelated = ({ product }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const [randomProducts, setRandomProducts] = useState([]);

  // const [myArray, setMyArray] = useState([])
  // setMyArray(myArray.concat(5))
  // setMyArray(myArray => [...myArray, 5]);

  // products.map((item) => (
  //   console.log(item)
  // ))
  // setMyArray(myArray.concat(products))
  // console.log(myArray)
  // console.log(setMyArray)


  useEffect(() => { 
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 3)
    setRandomProducts(selectedProducts)
  },[products])
  console.log(setRandomProducts)
  console.log(randomProducts,'test')




  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }

  return (
          <Row>
      {randomProducts.map((item) => (
        <Col key={item._id} sm={12} md={6} xl={3}>
            <Card className="my-3 p-3 rounded" style={{height:'320px'}}>
            <Link to={`/product/${item._id}`}>
                <Card.Img
                src={item.image}
                variant="top"
                className="product-img"
                style={{height:'180px'}}
                />

            </Link>

            <Card.Body>
                <Link to={`/product/${item._id}`}>
                    <Card.Title as="div" style={{height:'72px'}}>
                        <strong>{item.name}</strong>
                    </Card.Title>
                </Link>


                <Card.Text as="h6"><strong>{convertToRupiah(item.price)}</strong></Card.Text>
            </Card.Body>
        </Card>
        </Col>
      ))}
          </Row>

  );
};

export default ProductRelated;
