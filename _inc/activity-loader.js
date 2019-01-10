/**
 * Please note, this plugin requires the jQuery cookie plugin, which comes bundled with the bp-default theme and many BuddyPress themes.
 * If you theme does not include it it, please copy it from bp-default/_inc/global.js and paste in your js file
 **/
jQuery( document ).ready( function() {
    var jq = jQuery;
    var is_activity_loading = false;//We'll use this variable to make sure we don't send the request again and again.

    //Check the window scroll event.
    jq( window ).scroll( function() {
       //Find the visible "load more" button.
       //since BP does not remove the "load more" button, we need to find the last one that is visible.
        var load_more_btn = jq( '.load-more:visible' );
        //If there is no visible "load more" button, we've reached the last page of the activity stream.
        if( ! load_more_btn.get(0))
            return;
        
        //Find the offset of the button.
         var pos = load_more_btn.offset();
       
       //If the window height+scrollTop is greater than the top offset of the "load more" button, we have scrolled to the button's position. Let us load more activity.
          
       if( jq( window ).scrollTop() + jq( window ).height() > pos.top ) {
           
            load_more_btn.trigger('click');
       }
    
    });

} );//end of dom ready

