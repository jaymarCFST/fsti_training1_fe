import React, { useEffect, useState } from 'react'
import * as articleService from './article-api-service';
import moment from 'moment/moment';
import CreateArticle from './create-article';
import UpdateArticle from './update-article';
// import CreateArticle from './create-Article';
// import UpdateArticle from './update-Article';
// import CreateUser from './user-crud/create-user';
// import UpdateUser from './user-crud/update-user';

const Articles = () => {

	const [Articles, setArticles] = useState([]);
	const [pagination, setPagination] = useState({});
	const [pageState, setPageState] = useState("Articles");
	const [selectedArticle, setSelectedArticle] = useState(null);

	async function getArticles()
	{
		await articleService.getArticles().catch(
			async(error) => {
				console.log(error);
			}
		).then(
			(response) => {
                console.log(response);
				setArticles(response.data);
				setPagination(response);
			}
		)
	}

	function onClickAddArticle()
	{
		setPageState("createArticle");
	}

	function onClickUpdateArticle(Article)
	{
		setSelectedArticle(Article);
		setPageState("updateArticle");
	}

	async function onClickDeleteArticle(id)
	{
		await articleService.deleteArticle(id).catch(
			async(error) => {
				console.log(error);
			}
		).then(
			async(response) => {
				console.log(response);
				getArticles();
			}
		)
	}

	useEffect(()=>{
		console.log(pageState);
		if(pageState === 'Articles')
		{
			getArticles();
		}
	}, [pageState])

  return (
    <div class="bg-white p-8 rounded-md w-full">
	<div class=" flex items-center justify-between pb-6">
		<div>
			<h2 class="text-gray-600 font-semibold">Articles</h2>
			<span class="text-xs">List of all Articles</span>
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
					<button onClick={onClickAddArticle} class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Add Article</button>
				</div>
			</div>
		</div>
		<div>
			{
				pageState === 'Articles' &&
				<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
						<table class="min-w-full leading-normal">
							<thead>
								<tr>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Title
									</th>
									<th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Category
									</th>
                                    <th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Slug
									</th>
                                    <th
										class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Created By
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
									Articles?.map((Article, index) => {
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
																	{Article.title}
																</p>
															</div>
														</div>
												</td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">{Article.article_category?.name}</p>
												</td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">{Article.slug}</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">{Article.created_by?.first_name} {Article.created_by?.last_name}</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{moment(Article.created_at).format('LL')}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
													<button onClick={()=>onClickUpdateArticle(Article)} className="px-2 py-1 text-white bg-blue-500 rounded-md">Update</button>
													<button onClick={()=>onClickDeleteArticle(Article.id)} className="px-2 py-1 text-white bg-red-500 rounded-md">Delete</button>
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
								Showing {pagination?.meta?.current_page} to {pagination?.meta?.last_page} of {pagination?.meta?.total} Entries
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
				pageState === 'createArticle' &&
				<CreateArticle setPageState={setPageState} />
			}
			{
				pageState === 'updateArticle' &&
				<UpdateArticle setPageState={setPageState} data={selectedArticle} />
			}
		</div>
	</div>
  )
}

export default Articles