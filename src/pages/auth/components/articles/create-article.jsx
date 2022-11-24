import React, { Component, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './ckeditor-styling.css';
import * as categoryServices from '../categories/categories-api-services';
import * as articleServices from './article-api-service';

const CreateArticle = (props) => {

    const [content, setContent] = useState('<p>Write your article here</p>');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');

    async function getCategories()
    {
        categoryServices.getCategories().catch(
            async (error) => {
                console.log(error);
            }
        ).then(
            async (response) => {
                console.log(response.data);
                setCategories(response.data);
            }
        )
    }

    function handleTitleInput(value)
    {
        setTitle(value);
    }

    function handleSlugInput(value)
    {
        setSlug(value);
    }

    function onSelectCategory(index)
    {
        setSelectedCategory(categories[index]);
    }

    async function createArticle()
    {
        let data = {
            title: title,
            slug: slug,
            article_category_id: selectedCategory.id,
            updated_user_id: JSON.parse(localStorage.getItem('user')).id,
            content: content
        }

        articleServices.createArticle(data).catch(
            async(error) => {
                console.log(error)
            }
        ).then(
            async(response) => {
                console.log(response);
                props.setPageState('Articles');
            }
        )
    }

    useEffect(()=>{
        getCategories();
    }, [])
  return (
    <div className="App space-y-2">
        <h2 className='text-2xl font-semibold'>Create New Article</h2>
        <div className="flex flex-col justfiy-between my-2 space-y-2">
            <div className="flex justify-start items-center w-[50%]">
                <span className="text-lg font-medium px-3 py-2">Title:</span>
                <input
                    value={title === null ? '' : title}
                    onChange={(e) => handleTitleInput(e.target.value)} 
                    id="title"
                    name="title"
                    autoComplete="title"
                    type={'text'} className="px-3 py-2 border w-full" 
                />
            </div>
            <div className="flex justify-start items-center w-[50%]">
                <span className="text-lg font-medium px-3 py-2">Slug:</span>
                <input
                    value={slug === null ? '' : slug}
                    onChange={(e) => handleSlugInput(e.target.value)} 
                    id="slug"
                    name="slug"
                    autoComplete="slug"
                    type={'text'} className="px-3 py-2 border w-full" 
                />
            </div>
            <div className="flex justify-start items-center w-[50%]">
                <span className="text-lg font-medium px-3 py-2">Category:</span>
                <select onChange={(e)=>onSelectCategory(e.target.value)} className="px-3 py-2 border w-full" >
                    {
                        categories?.map((category, index) => {
                            return (
                                <option value={index}>{category.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
        <CKEditor
            onReady={ editor => {
                console.log( 'Editor is ready to use!', editor );

                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );

                this.editor = editor;
            } }
            onError={ ( error, { willEditorRestart } ) => {
                // If the editor is restarted, the toolbar element will be created once again.
                // The `onReady` callback will be called again and the new toolbar will be added.
                // This is why you need to remove the older toolbar.
                if ( willEditorRestart ) {
                    this.editor.ui.view.toolbar.element.remove();
                }
            } }
            onChange={ ( event, editor ) => {
                setContent(editor.getData());
            }}
            editor={ DecoupledEditor }
            data={content}
            // config={ /* the editor configuration */ }
        />
        <div className="flex justify-start">
            <button onClick={createArticle} className="px-3 py-2 text-white bg-indigo-500 rounded-md">Save Article</button>
        </div>
    </div>
  )
}

export default CreateArticle