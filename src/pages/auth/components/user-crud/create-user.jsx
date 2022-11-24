import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../../../components/spin-loader';
import * as APIServices from '../../api-services';

const CreateUser = (props) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [role, setRole] = useState(0);
    const [spinLoading, setSpinLoading] = useState(false);

    function handleRegisterUsernameInput(value)
    {
        setUsername(value);
    }

    function handleRegisterPasswordInput(value)
    {
        setPassword(value);
    }

    function handleRegisterFirstNameInput(value)
    {
        setFirstName(value);
    }

    function handleRegisterLastNameInput(value)
    {
        setLastName(value);
    }

    function handleRegisterRoleInput(value)
    {
        setRole(value);
    }

    async function register() 
    {
        setSpinLoading(true);

        let data = {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            role: role
        }
        const auth = await APIServices.createUser(data).catch(
            async (error) => {
                console.log(error);
            }
        ).then(
            (response) => {
                console.log(response);
                setSpinLoading(false);
                props.setPageState('users');
            }
        )
    }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Create a new user</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full px-10 sm:max-w-md">
        <div className="bg-blue-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username
                </label>
                <div className="mt-1">
                <input
                    value={username === null ? '' : username}
                    onChange={(e) => handleRegisterUsernameInput(e.target.value)} 
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <div className="mt-1">
                <input
                    value={password === null ? '' : password}
                    onChange={(e) => handleRegisterPasswordInput(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                First Name
                </label>
                <div className="mt-1">
                <input
                    value={first_name === null ? '' : first_name}
                    onChange={(e) => handleRegisterFirstNameInput(e.target.value)} 
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="first_name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Last Name
                </label>
                <div className="mt-1">
                <input
                    value={last_name === null ? '' : last_name}
                    onChange={(e) => handleRegisterLastNameInput(e.target.value)} 
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="last_name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Role
                </label>
                <div className="mt-1">
                    <select 
                        value={role === null ? '' : role}
                        onChange={(e) => handleRegisterRoleInput(e.target.value)} 
                        id="role"
                        name="role"
                        autoComplete="role"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>
                </div>
            </div>

            <div>
                <button
                onClick={() => {register()}}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none"
                >
                Register
                {
                    spinLoading && (
                        <SpinLoader />
                    )
                }
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default CreateUser