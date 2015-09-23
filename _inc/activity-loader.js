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
           
            load_more_activity();
       }
    
    });
    
    
    /**
     * This routine loads more activity.
     * We call it whenever we reach the bottom of the activity listing.
     * 
     */
    function load_more_activity() {
        //Check if activity is loading, which means another request is already doing this.
        //If yes, just return and let the other request handle it.
            if( is_activity_loading ) {
                    return false;	
			}
           //So, it is a new request, let us set the var to true.        
            is_activity_loading = true;
			
			var $parent = jq('#content');
			if( ! $parent.get(0) ) {
				$parent = jq( '#buddypress' );
			}
			
			if( ! $parent ) {
				return ;
			}
            //Add loading class to "load more" button.
            //Theme authors may need to change the selector if their theme uses a different id for the content container.
            //This is designed to work with the structure of bp-default/derivative themes.
            //Change #content to whatever you have named the content container in your theme.
            $parent.find( 'li.load-more' ).addClass( 'loading' );

            if ( null == jq.cookie( 'bp-activity-oldestpage' ) ) {
                    jq.cookie( 'bp-activity-oldestpage', 1, {
                            path: '/'
                    } );
			}

            var oldest_page = ( jq.cookie( 'bp-activity-oldestpage' ) * 1 ) + 1;
			
					
            //Send the ajax request.
            jq.post( ajaxurl, {
                    action: 'activity_get_older_updates',
                    cookie: encodeURIComponent(document.cookie),
                    page: oldest_page
            },
            function( response )
            {
                    $parent.find( '.load-more' ).hide();//Hide any "load more" button.
                    $parent.find( 'li.load-more' ).removeClass( 'loading' );//Theme authors, you may need to change #content to the id of your container here, too.
                    
                    //Update cookie...

                    
                    //and append the response.
                    $parent.find( 'ul.activity-list' ).append( response.contents );
					jq.cookie( 'bp-activity-oldestpage', oldest_page, {
                            path: '/'
                    } );
                    //Since the request is complete, let us reset is_activity_loading to false, so we'll be ready to run the routine again.
                    
                    is_activity_loading = false;
            }, 'json' );

            return false;
    }
 

} );//end of dom ready

