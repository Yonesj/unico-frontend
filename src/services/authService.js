export const getSession = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  export const logout = () => {
    localStorage.removeItem('user');
  };