import './index.less';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <div className="not-found" onClick={handleClick}>
            <h1>404</h1>
            <p>页面未找到，点击此处返回首页</p>
        </div>
    );
};

export default NotFound;
