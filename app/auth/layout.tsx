const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-purple-500">
      {children}
    </div>
  );
};

export default AuthLayout;
