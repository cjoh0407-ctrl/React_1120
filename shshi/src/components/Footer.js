const Footer = () => {
    const style = {
        color: "#fff",
        backgroundColor: "#000",
        padding: "24px 16px",
        fontSize: "14px",
        lineHeight: "1.6",
    };

    const companyStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        alignItems: "center",
    };

    return (
        <footer style={style}>
            <div style={companyStyle}>
                <div>개인정보처리방침&nbsp;&nbsp;이메일무단수집거부</div>
                <div>주식회사 상무프랜차이즈&nbsp;&nbsp;&nbsp;150-81-02170&nbsp;&nbsp;&nbsp;광주광역시 서구 운천로 253, 402호 (치평동)</div>
                <div>Copyright 상무초밥 Allright Reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;