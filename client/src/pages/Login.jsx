import React, { useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();   // <-- khởi tạo navigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            alert('Login successful!');
            navigate('/');   // Chuyển hướng về trang chính sau khi đăng nhập thành công
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} noValidate>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
