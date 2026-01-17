export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-sky-50 font-sans dark:bg-zinc-100">
      <nav className="w-full bg-gradient-to-r from-pink-200 to-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
              website name
            </div>

            <ul className="flex gap-8 list-none">
              <li>
                <a href="#home" className="text-gray-700 hover:text-pink-500 transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex flex-row">
        <div className="flex flex-col text-sky-500 h-64">
          <p className="text-2xl">big text</p>
          <p className="text-xl">little text</p>
        </div>
        <div className="text-sky-500">image stuff</div>
      </div>
      <div className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200">button stuff</div>
      <section>footer</section>
    </div>
  );
}
