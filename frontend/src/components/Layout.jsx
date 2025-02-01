import Header from './partials/Header';

const Layout = ({ children }) => {

   const isLogin =  localStorage.getItem("isAuthenticated")
    const navLinks = [
      { path: '/mediForm', name: 'MediForm' },
      isLogin? 
      { path: '/logout', name: 'Logout' } : 
      { path: '/login', name: 'Login' }
    ];

    return (
      <div className="layout">
        <Header links={navLinks} />
        {children}
      </div>
    );
  };

  export default Layout
