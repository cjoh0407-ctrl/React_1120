import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import store, {changeName, increase} from './store.js'
import { addCount, decreaseCount, deleteItem, sortName, sortPrice } from "../store.js";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function Cart() {

// Redux에서 전체 state를 구조분해할당으로 가져옴
const { user: { name }, cart} = useSelector((state) => state);

// dispatch는  store.js 로 요청보내주는 함수
let dispatch = useDispatch();

const smallProdcuctStyle = {
    border: "1px solid #ddd",
    width: "100px",
    height: "80px",
    cursor: "pointer",
};

let textverticalAlign = {
    verticalAlign: "middle",
    textAlign: "center",
};

return (
    <>
    <div class="container">
        <div class="row">
        <div class="col-sm-12 pb-5" style={{ textAlign: "center" }}>
        <div class="col-sm-12" style={{ textAlign: "center" }}>
            {/* 사용자 이름과 나이 보여주기 */}
            <h4 style={{ padding: "50px" }}>
            {/* {name} {age}의 장바구니/ */}
            {name}의 장바구니
            </h4>
    
            {/* 이름순으로 정렬하는 버튼 */}
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <Button
                variant="outline-dark border-1.5"
                onClick={() => {
                    dispatch(sortName());
                }}
                style={{ fontWeight: 'bold' }}
                >
                이름순정렬
                </Button>{" "}
            </div>

            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <Button
                variant="outline-dark border-1.5"
                onClick={() => {
                    dispatch(sortPrice());
                }}
                >
                가격순정렬
                </Button>{" "}
            </div>

            <Table>
            <thead>
                <tr>
                <th>상품번호</th>
                <th>상품이미지</th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {/* 장바구니에 있는 상품 목록 출력 */}
                {cart.map(({ id, imgurl, name, count, price }, i) => (
                <tr key={i}>
                    <td style={textverticalAlign}>{id}</td>
                    {/* 이미지 클릭 시 해당 상품 상세 페이지로 이동 */}
                    <td>
                    <Link to={`/detail/${id}`}>
                        <img src={process.env.PUBLIC_URL + `/img/${imgurl}`} alt="" style={smallProdcuctStyle} />
                    </Link>
                    </td>
                    {/* 상품명, 수량 보여주기 */}
                    <td style={textverticalAlign}>{name}</td>
                    <td style={textverticalAlign}>{count}</td>
                    <td style={textverticalAlign}>{(price * count).toLocaleString()}원</td>

                    <td style={textverticalAlign}>
                    {/* 상품수량  + 버튼 */}
                    <Button
                        onClick={() => {
                        dispatch(addCount(id));
                        }}
                        variant="outline-dark"
                        style={{ marginRight: "10px", fontWeight: 'bold' }}
                    >
                        +
                    </Button>

                    {/* 상품수량  - 버튼 */}
                    <Button
                        onClick={() => {
                        dispatch(decreaseCount(id));
                        }}
                        variant="outline-dark"
                        style={{ marginRight: "10px", fontWeight: 'bold' }}
                    >
                        -
                    </Button>

                    {/* 상품 삭제 버튼 */}
                    <Button
                        onClick={() => {
                        dispatch(deleteItem(id));
                        }}
                        variant="danger"
                        style={{ fontWeight: 'bold' }}
                    >
                        상품삭제
                    </Button>

                    </td>
                </tr>
                ))}
            </tbody>
            </Table>

            {/* 총 가격 계산 및 표시 */}
            <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                총 가격: {cart.reduce((total, item) => total + (item.price * item.count), 0).toLocaleString()}원
            </div>

        </div>
        </div>
        </div>
    </div>
    </>
);
}

export default Cart;