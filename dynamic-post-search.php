<?php
/**
 * Plugin Name:       Dynamic Post Search
 * Description:       Example of block with dynamic search
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Kevin Chavez
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-post-search
 *
 * @package           local-test
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function dynamic_post_search_dynamic_post_search_block_init(): void {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'dynamic_post_search_dynamic_post_search_block_init' );
