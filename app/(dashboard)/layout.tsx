export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div> 
        <div className="p-4 bg-black text-white mb-20 ">
        <button className="flex justify-end items-end ">SignOut</button>
        </div>
 {children}
      </div>
         
       
    );
  }
  