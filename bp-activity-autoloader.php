<?php
/**
 * Plugin Name: BuddyPress Activity Autoloader
 * Plugin URI: https://buddydev.com/plugins/bp-activity-autoloader/
 * Author: Brajesh Singh(BuddyDev)
 * Author URI: https://buddydev.com/members/sbrajesh/
 * Version: 2.0.0
 * Description: Autoload next page of the BuddyPress Activity Stream when the end of the current page is reached
 */

// just trying to recreate the magic, should we?

/**
 * Load autoloader js
 */
function bp_activity_autoloader_inc_js() {

	// if it is a mobile browser and autoloader is disabled, do not load js.
	if ( wp_is_mobile() && apply_filters( 'bp_activity_autoloader_disabled', false ) ) {
		return;
	}

	wp_enqueue_script( 'activity-auto-loader', plugin_dir_url( __FILE__ ) . '_inc/activity-loader.js', array( 'jquery' ) );
}

add_action( 'bp_enqueue_scripts', 'bp_activity_autoloader_inc_js', 30 );
