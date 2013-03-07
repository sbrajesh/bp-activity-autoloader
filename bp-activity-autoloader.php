<?php
/**
 * Plugin Name: BP Activity Autoloader
 * Plugin URI: http://buddydev.com/plugins/bp-activity-autoloader/
 * Author: Brajesh Singh(BuddyDev)
 * Author URI: http://buddydev.com/members/sbrajesh/
 * Version: 1.0
 * Description: Autoload next page of the BuddyPress Activity Stream when the end of the current page is reached
 */

//just trying to recreate the magic, should we?


function bp_activity_autoloader_inc_js(){
    
    wp_enqueue_script('activity-auto-loader',  plugin_dir_url(__FILE__).'_inc/activity-loader.js',array('jquery'));//should we make it dependent on 'dtheme-ajax-js'
}
add_action('bp_enqueue_scripts','bp_activity_autoloader_inc_js',30);
?>