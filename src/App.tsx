import React, { useState, useEffect } from "react";
import axios from "axios";

//  user type
interface User {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e")
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Handle form change for update
  const handleChangeUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, type, checked } = e.target;
    const updatedUsers = [...users];

    if (type === "radio" && (name === "is_employed" || name === "is_founder")) {
      updatedUsers[index] = {
        ...updatedUsers[index],
        [name]: value === "true", // Convert string "true" to boolean true
      };
    } else {
      updatedUsers[index] = {
        ...updatedUsers[index],
        [name]: type === "checkbox" ? checked : value,
      };
    }
    setUsers(updatedUsers);
  };

  const handleSave = (index: number) => {
    console.log(index);

    setEditIndex(null); // Exit edit mode
  };

  // Function to add a new user
  const [formData, setFormData] = useState<User>({
    first_name: "",
    last_name: "",
    username: "",
    age: 0,
    marital_status: "",
    is_employed: false,
    is_founder: false,
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "radio" && (name === "is_employed" || name === "is_founder")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "true", // Convert to true/false based on the value
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUsers((prevUsers) => [...prevUsers, formData]);

    setFormData({
      first_name: "",
      last_name: "",
      username: "",
      age: 0,
      marital_status: "",
      is_employed: false,
      is_founder: false,
    });
  };

  return (
    <div className="flex flex-wrap p-8 bg-slate-700">
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <>
          {/* User Cards */}
          {users.map((user, index) => (
            <div
              key={index}
              className=" m-4 p-4 rounded-lg shadow-lg space-y-2 bg-indigo-300"
            >
              {editIndex === index ? (
                <div>
                  <div>
                    <label className="block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={user.first_name}
                      onChange={(e) => handleChangeUpdate(e, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={user.last_name}
                      onChange={(e) => handleChangeUpdate(e, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={(e) => handleChangeUpdate(e, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={user.age}
                      onChange={(e) => handleChangeUpdate(e, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Marital Status
                    </label>
                    <input
                      type="radio"
                      name="marital_status"
                      value="married"
                      checked={user.marital_status === "married"}
                      onChange={(e) => handleChangeUpdate(e, index)}
                    />{" "}
                    Married
                    <input
                      type="radio"
                      name="marital_status"
                      value="unmarried"
                      checked={user.marital_status === "unmarried"}
                      onChange={(e) => handleChangeUpdate(e, index)}
                    />{" "}
                    Unmarried
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Employed
                    </label>
                    <input
                      type="radio"
                      name="is_employed"
                      value="true"
                      checked={user.is_employed === true}
                      onChange={(e) => handleChangeUpdate(e, index)}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="is_employed"
                      value="false"
                      checked={user.is_employed === false}
                      onChange={(e) => handleChangeUpdate(e, index)}
                    />{" "}
                    No
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Founder</label>
                    <input
                      type="radio"
                      name="is_founder"
                      value="true"
                      checked={user.is_founder === true}
                      onChange={(e) => handleChangeUpdate(e, index)}
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name="is_founder"
                      value="false"
                      checked={user.is_founder === false}
                      onChange={(e) => handleChangeUpdate(e, index)}
                    />{" "}
                    No
                  </div>

                  {/* Save button */}
                  <button
                    onClick={() => handleSave(index)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>First Name:</strong> {user.first_name}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {user.last_name}
                  </p>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Age:</strong> {user.age}
                  </p>
                  <p>
                    <strong>Marital Status:</strong> {user.marital_status}
                  </p>
                  <p>
                    <strong>Employed:</strong> {user.is_employed ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Founder:</strong> {user.is_founder ? "Yes" : "No"}
                  </p>

                  {/* Update & Delete Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setEditIndex(index)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add New User Card */}
          <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <div className="mt-1 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="marital_status"
                      value="unmarried"
                      checked={formData.marital_status === "unmarried"}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">Unmarried</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="marital_status"
                      value="married"
                      checked={formData.marital_status === "married"}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">Married</span>
                  </label>
                </div>
              </div>

              {/* Employed */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employed
                </label>
                <div className="mt-1 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="is_employed"
                      value="true"
                      checked={formData.is_employed === true}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="is_employed"
                      value="false"
                      checked={formData.is_employed === false}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {/* Founder */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Founder
                </label>
                <div className="mt-1 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="is_founder"
                      value="true"
                      checked={formData.is_founder === true}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="is_founder"
                      value="false"
                      checked={formData.is_founder === false}
                      onChange={handleChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
              {/* Add Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
