import React, { useEffect, useState } from 'react'
import * as APIServices from '../api-services';
import moment from 'moment/moment';
import CreateUser from './user-crud/create-user';
import UpdateUser from './user-crud/update-user';

const Users = () => {

	const [users, setUsers] = useState([]);
	const [pagination, setPagination] = useState({});
	const [pageState, setPageState] = useState("users");
	const [selectedUser, setSelectedUser] = useState(null);

	async function getUsers()
	{
		await APIServices.getUsers().catch(
			async(error) => {
				console.log(error);
			}
		).then(
			(response) => {
				setUsers(response.data);
				setPagination(response);
			}
		)
	}

	function onClickAddUser()
	{
		setPageState("createUser");
	}

	function onClickUpdateUser(user)
	{
		setSelectedUser(user);
		setPageState("updateUser");
	}

	async function onClickDeleteUser(id)
	{
		await APIServices.deleteUser(id).catch(
			async(error) => {
				console.log(error);
			}
		).then(
			async(response) => {
				console.log(response);
				getUsers();
			}
		)
	}

	useEffect(()=>{
		console.log(pageState);
		if(pageState === 'users')
		{
			getUsers();
		}
	}, [pageState])

  return (
    <div class="bg-white p-8 rounded-md w-full">
	<div class=" flex items-center justify-between pb-6">
		<div>
			<h2 class="text-gray-600 font-semibold">Users</h2>
			<span class="text-xs">List of all users</span>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input class="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
          </div>
				<div class="lg:ml-40 ml-10 space-x-8">
					<button onClick={onClickAddUser} class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Add User</button>
				</div>
			</div>
		</div>
		<div>
			{
				pageState === 'users' &&
				<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
						<table class="min-w-full leading-normal">
							<thead>
								<tr>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Name
									</th>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Username
									</th>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Role
									</th>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Created at
									</th>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{
									users.map((user, index) => {
										return (
											<tr>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<div class="flex items-center">
														<div class="flex-shrink-0 w-10 h-10">
															<img class="w-full h-full rounded-full"
																src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
																alt="" />
														</div>
															<div class="ml-3">
																<p class="text-gray-900 whitespace-no-wrap">
																	{user.first_name} {user.last_name}
																</p>
															</div>
														</div>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">{user.username}</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{user.role}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{moment(user.created_at).format('LL')}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
													<button onClick={()=>onClickUpdateUser(user)} className="px-2 py-1 text-white bg-blue-500 rounded-md">Update</button>
													<button onClick={()=>onClickDeleteUser(user.id)} className="px-2 py-1 text-white bg-red-500 rounded-md">Delete</button>
												</td>
											</tr>
										)
									})
								}
								
							</tbody>
						</table>
						<div
							class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
							<span class="text-xs xs:text-sm text-gray-900">
								Showing {pagination.current_page} to {pagination.last_page} of {pagination.total} Entries
							</span>
							<div class="inline-flex mt-2 xs:mt-0">
								<button
									class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
									Prev
								</button>
								&nbsp; &nbsp;
								<button
									class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			}
			{
				pageState === 'createUser' &&
				<CreateUser setPageState={setPageState} />
			}
			{
				pageState === 'updateUser' &&
				<UpdateUser setPageState={setPageState} data={selectedUser} />
			}
		</div>
	</div>
  )
}

export default Users