import {useSelect} from '@wordpress/data'
import {__} from '@wordpress/i18n'
import {useBlockProps} from '@wordpress/block-editor'
import {SearchControl, Popover} from '@wordpress/components'
import {useState} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';


import './editor.scss'

export default function Edit({ attributes, setAttributes}) {
    const { posts } = attributes

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const postTypes = useSelect(select => {
        const { getPostTypes } = select('core');
        const excludedPostTypes = [ 'attachment', 'media', 'page' ];
        const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
            ({ viewable, slug }) => viewable && ! excludedPostTypes.includes(slug)
        );
        return (filteredPostTypes || []).map(({rest_base}) => rest_base);
    }, [] );

    const fetchPosts = useSelect(select => {
        Promise.all(postTypes.map(postType => apiFetch({
            path: `/wp/v2/${postType}?search=${searchValue}`,
        }))).then((results) => {
            setSearchResults(results.reduce((result, final) => [...final, ...result], []))
        })
    }, [searchValue] );

    const onSearchStringChange = (value) => {
        setSearchValue(value)
        setIsPopoverVisible(true)
    };

    const onClickPostResult = (post) => {
        let addedPosts = [...posts, post]
        setIsPopoverVisible(false)
        setSearchValue('')

        setAttributes({posts: addedPosts})
    }

    const onClickRemovePost = (postToRemove) => {
        const filteredPosts = posts.filter((post) => postToRemove.id !== post.id);
        setAttributes({posts: filteredPosts})
    }

	return (
        <div { ...useBlockProps() }>
            <div>
                <SearchControl
                    label="Search post"
                    value={ searchValue }
                    onChange={ onSearchStringChange }
                    onClose={() => {
                        setSearchValue('')
                        setIsPopoverVisible(false)
                    }}
                />
            </div>
            {
                isPopoverVisible &&
                <div>
                    <Popover.Slot />
                    <Popover className="popover-search-results">
                        {
                            searchResults && searchResults.map(post =>{
                                return (
                                    <div key={post.id} className="popover-search-result" onClick={() => { onClickPostResult(post) }}>
                                        <div className="popover-search-result-post">
                                            <div className="result-posts-details">
                                                <div className="result-icon">
                                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="block-editor-link-control__search-item-icon" aria-hidden="true" focusable="false"><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v12zM7 11h2V9H7v2zm0 4h2v-2H7v2zm3-4h7V9h-7v2zm0 4h7v-2h-7v2z"></path></svg>
                                                </div>
                                                <div className="result-details">
                                                    <div className="title">
                                                        { post.title.rendered !== '' ?
                                                            post.title.rendered :
                                                            '(no title)'
                                                        }
                                                    </div>
                                                    <div className="link">
                                                        /{ post.slug }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="result-type">
                                                { post.type }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Popover>
                </div>
            }
            <ul className="posts-list">
                { posts && posts.map((post) => {
                    return (
                        <li className="posts-list-item" key={ post.id }>
                            <div className="posts-list-link">
                                <a href={ post.link } target="_blank">
                                    {
                                        post.title.rendered ?
                                            post.title.rendered :
                                            __( 'Default title', 'author-plugin' )
                                    }
                                </a>
                                <span>
                                    /{ post.slug }
                                </span>
                            </div>
                            <button onClick={()=>onClickRemovePost(post)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
	)
}
