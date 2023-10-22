import React from 'react';
import useRouterElement from './routes/useRouterElement'; // Đảm bảo bạn đã import useRouterElement

function App() {
  const isLoggedIn = true; // Thay thế bằng trạng thái xác thực thực tế
  const routes = useRouterElement({ isLoggedIn }); // Truyền isLoggedIn vào useRouterElement

  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
