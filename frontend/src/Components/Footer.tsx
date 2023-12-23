const Footer = () => {
    return (
      <footer className="bg-[#1A2027] text-white py-4">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold mb-4">ByteWave</div>
          <ul className="flex space-x-4">
            <li><a href="#" style={{ color: '#5BC0EB' }}>Home</a></li>
            <li><a href="#" style={{ color: '#5BC0EB' }}>About Us</a></li>
            <li><a href="#" style={{ color: '#5BC0EB' }}>Services</a></li>
            <li><a href="#" style={{ color: '#5BC0EB' }}>Contact</a></li>
            {/* <li><a href="#" style={{ color: '#5BC0EB' }}>Blog</a></li>
            <li><a href="#" style={{ color: '#5BC0EB' }}>Portfolio</a></li> */}
          </ul>
          <div className="mt-2">
            <p>&copy; {new Date().getFullYear()} ByteWave</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;