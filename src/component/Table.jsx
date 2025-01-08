import React, { useState, useEffect, useRef } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermRef = useRef("");
  const [perPgae, setPerPgae] = useState(10);
  const perPageRef = useRef(null);
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.razzakfashion.com?page=${page}&paginate=${perPgae}&search=${searchTerm}`
      );
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, searchTerm, perPgae]);
  // search handler
  const searchHandleChange = () => {
    const inputValue = searchTermRef.current.value;
    setSearchTerm(inputValue);
  };
  // selete parpage
  const perPageUser = () => {
    const inputValue = perPageRef.current.value;
    setPerPgae(inputValue);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className=" p-4 border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search name"
          ref={searchTermRef}
          onChange={searchHandleChange}
          className=" px-2 border border-gray-300 rounded-md w-28 outline-0"
        />
      </div>

      {loading ? (
        <p className="text-center absolute h-screen w-full text-5xl">
          Loading...
        </p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">{user.id}</td>
                  <td className="p-2 border border-gray-300">{user.name}</td>
                  <td className="p-2 border border-gray-300">{user.email}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-end space-x-3 mt-4">
            <div className="flex items-center gap-2">
              <p>per page</p>
              <input
                type="number"
                ref={perPageRef}
                value={perPgae}
                onChange={perPageUser}
                className="border-[1px] border-gray-700 text-black w-10 text-center rounded-sm outline-0"
              />
            </div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex gap-0"
            >
              <MdOutlineNavigateNext
                className={`rotate-180 ${
                  currentPage === 1 ? "opacity-40" : ""
                }`}
              ></MdOutlineNavigateNext>
              <MdOutlineNavigateNext
                className={`rotate-180 ${
                  currentPage === 1 ? "opacity-40" : ""
                }`}
              ></MdOutlineNavigateNext>
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {lastPage}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="flex gap-0"
            >
              <MdOutlineNavigateNext></MdOutlineNavigateNext>
              <MdOutlineNavigateNext></MdOutlineNavigateNext>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
