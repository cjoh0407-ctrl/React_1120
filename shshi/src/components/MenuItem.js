import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { addItem } from '../store.js';

const MenuItem = ({ id, name, price, image }) => { 
    const detailPath = `/detail/${id}`; 
    const dispatch = useDispatch();

    return (
        <div className="col-md-4 mb-4">
            <Link to={detailPath} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card className="h-100 shadow-sm border-0">
                    <Card.Img variant="top" src={image} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold">{name}</Card.Title>
                        
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                            <span className="fs-5 fw-bold text-dark">{price.toLocaleString()}원</span>
                            
                            <Button variant="outline-dark" size="sm" className="custom-order-btn" onClick={(e) => { 
                                e.preventDefault(); 
                                const imgFile = image.replace(process.env.PUBLIC_URL + '/img/', '');
                                dispatch(addItem({
                                    id: id,
                                    imgurl: imgFile,
                                    name: name,
                                    count: 1,
                                    price: price
                                }));
                            }}>주문하기</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
};

export default MenuItem;