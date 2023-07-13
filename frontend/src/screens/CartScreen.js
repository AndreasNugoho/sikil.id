import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const CartScreen = () => {
    const match = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const productId = match.id;

    const qty = new URLSearchParams(location.search).get("qty");
    const size = new URLSearchParams(location.search).get("size");
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty,size));
        }
    }, [dispatch, productId, qty,size]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        navigate("/cart");
    };

    const checkoutHandler = () => {
        navigate("/login/?redirect=/shipping");
    };

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
        <>
            <CheckoutSteps step1 />
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                className="cart-product-img"
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md>
                                            <br></br>
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name }
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            <br></br>
                                            {convertToRupiah(item.price)}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                className="form-select"
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.product,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        item.countInStock
                                                    ).keys(),
                                                ].map((obj) => (
                                                    <option
                                                        key={obj + 1}
                                                        value={obj + 1}
                                                    >
                                                        {obj + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        
                                        <Col md={1}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + Number(item.qty),
                                        0
                                    )}
                                    ) items
                                </h2>   
                                {convertToRupiah(cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0
                                    )
                                    )}
                            </ListGroup.Item>
                            <ListGroup.Item className="d-grid gap-2">
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Chackout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CartScreen;
