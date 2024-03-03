import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import { useEffect, useState } from "react";
function UserRoles() {
  const cookie = nookies.get();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await fetch(`${baseUrl}/api/users`, {
      headers: {
        Authorization: cookie.token,
      },
    });
    const res2 = await res.json();
    console.log(res2);
    setUsers(res2);
  };
  const handleRole = async (id, role) => {
    const res = await fetch(`${baseUrl}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        _id: id,
        role: role,
      }),
    });
    const res2 = await res.json();
    // console.log(res2);
    const updatedUsers = users.map((user) => {
      if (user.role != res2.role && user.email == res2.email) {
        return res2;
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };
  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col p-10 items-center justify-center md:items-start">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            User's Data
          </h1>
          <div className="h-1 w-40 bg-indigo-500 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 -m-4">
          {users.map((item) => {
            return (
              <div className="p-4" key={item.email}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src="https://dummyimage.com/720x400"
                    alt="blog"
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {item.name}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {item.email}
                    </h1>
                    <p className="leading-relaxed mb-3">{item.role}</p>

                    <button
                      className="px-5 py-3 bg-blue-600  text-white hover:bg-white hover:text-blue-600 border active:scale-95 rounded-lg duration-200"
                      onClick={() => handleRole(item._id, item.role)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserRoles;
