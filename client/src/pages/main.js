import img from '../assets/images/pngegg.png'
export default function Main(props) {
    return (
        <div className="login-form">

            <div style={{
                display : 'flex',
                width : '100%',
                gap : '30px',
            }}>
                <img src={img} alt="" style={{width :'30%'}}/>
                <h2 style={{color:"white", fontSize:'82px', textAlign:'center', letterSpacing:'24px'}}>
                    HOLLY PANDA
                </h2>
            </div>
        </div>
    );

};

