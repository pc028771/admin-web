import AdminAppBar from './AdminAppBar';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <AdminAppBar />
      {children}
    </>
  );
};

export default DefaultLayout;
