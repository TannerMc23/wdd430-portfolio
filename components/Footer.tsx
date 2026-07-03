export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Tanner McMillan. All rights reserved.</p>
      </div>
    </footer>
  );
}