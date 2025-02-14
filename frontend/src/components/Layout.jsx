import Header from './partials/Header';

const Layout = ({ children }) => {
   const isAdmin = localStorage.getItem('userRole')
   const isLogin =  localStorage.getItem("isAuthenticated")
    const navLinks = [
      { path: '/mediForm', name: 'MediForm' },
      { path: '/dashboard', name: 'Dashboard' },
      isAdmin === 'admin'?
      { path: '/signup', name: 'Create User' } : '',
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
