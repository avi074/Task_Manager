function Header() {
  return (
    <>
      <header className="p-4 shadow-lg rounded-b-xl border-2 ibm-plex-mono-semibold border-gray-300 bg-gray-50 flex">
        <h1 className="ml-4 uppercase text-3xl text-blue-800">Task Manager</h1>
        <input type="search" placeholder="Search tasks..." className="px-2 ml-auto mr-4 outline-none ring-2 ring-gray-600 block w-1/2 rounded-md"/>
      </header>
    </>
  );
}

export default Header;
