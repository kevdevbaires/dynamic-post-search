import {useSelect} from '@wordpress/data'
import {__} from '@wordpress/i18n'
import {useBlockProps} from '@wordpress/block-editor'
import {SearchControl, Popover} from '@wordpress/components'
import {useState, useCallback} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { debounce } from 'lodash';


import './editor.scss'

export default function Edit({ attributes, setAttributes}) {

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [posts, setPosts] = useState([]);

    const postTypes = useSelect(select => {
        const { getPostTypes } = select('core');
        const excludedPostTypes = [ 'attachment', 'media', 'page' ];
        const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
            ( { viewable, slug } ) => viewable && ! excludedPostTypes.includes( slug )
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
        setPosts(addedPosts)
        setIsPopoverVisible(false)
        setSearchValue('')

        setAttributes({posts: addedPosts})

        console.log('attributes', attributes)
    }

    const onClickRemovePost = (postToRemove) => {
        const filteredPosts = posts.filter((post) => postToRemove.id !== post.id);
        setPosts(filteredPosts);
        setAttributes({posts: filteredPosts})

        console.log('attributes', attributes)
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
                    <Popover className="popover-search-results">
                        {
                            searchResults && searchResults.map(post =>{
                                return (
                                    <div key={post.id} className="popover-search-result" onClick={() => { onClickPostResult(post) }}>
                                        <div className="popover-search-result-post">
                                            <span className="title">
                                                { post.title.rendered !== '' ?
                                                    post.title.rendered :
                                                    '(no title)'
                                                }
                                            </span>
                                            <span className="link">
                                                { post.link }
                                            </span>
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
                                <a href={ post.link }>
                                    {
                                        post.title.rendered ?
                                            post.title.rendered :
                                            __( 'Default title', 'author-plugin' )
                                    }
                                </a>
                                <span>
                                    { post.link }
                                </span>
                            </div>
                            <button onClick={()=>onClickRemovePost(post)}>
                                Clear
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
	)
}