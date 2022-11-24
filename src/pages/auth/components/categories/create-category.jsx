import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../../../components/spin-loader';
import * as APIServices from './categories-api-services';

const CreateCategory = (props) => {

    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [creator, setCreator] = useState(null);
    const [spinLoading, setSpinLoading] = useState(false);

    function handleRegisterNameInput(value)
    {
        setName(value);
    }

    function handleRegisterCreatorInput(value)
    {
        setCreator(value);
    }

    async function create() 
    {
        setSpinLoading(true);

        let data = {
            name: name,
            updated_user_id: creator,
        }
        await APIServices.createCategory(data).catch(
            async (error) => {
                console.log(error);
            }
        ).then(
            (response) => {
                console.log(response);
                setSpinLoading(false);
                props.setPageState('categories');
            }
        )
    }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Create a new category</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full px-10 sm:max-w-md">
        <div className="bg-blue-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Name
                </label>
                <div className="mt-1">
                <input
                    value={name === null ? '' : name}
                    onChange={(e) => handleRegisterNameInput(e.target.value)} 
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>

            {/* <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Creator
                </label>
                <div className="mt-1">
                <input
                    value={creator === null ? '' : creator}
                    onChange={(e) => handleRegisterCreatorInput(e.target.value)}
                    id="creator"
                    name="creator"
                    type="text"
                    autoComplete="current-creator"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div> */}

            <div>
                <button
                onClick={() => {create()}}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none"
                >
                Save
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

export default CreateCategory