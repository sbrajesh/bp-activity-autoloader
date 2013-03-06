/**
 * Please note, this code has dependency on jquery cookie plugin, which comes bundled with bp-default theme and most of the buddypress theme
 * If you theme does not have it, please copy it from bp-default/_inc/global.js and paste in your js file
 **/

jQuery(document).ready( function() {
    var jq=jQuery;
    var is_activity_loading=false;//we use it to make sure that we don not try to send the request again and again



    //let us check on window scroll event
    jq(window).scroll(function() {
       //find the visible load more button
       //since bp does not move load more, we need to find the last one which is visible
        var load_more_btn=jq(".load-more:visible");
        //if there is no visible button, there are no mor activities, let us retrn
        if(!load_more_btn.get(0))
            return;
        
        //find the offset of the button
         var pos=load_more_btn.offset();
       
       //if the window height+scrollTop is greater than the offset top, we have reached the button, let us load more activity
     
     
       if(jq(window).scrollTop() + jq(window).height() > pos.top ) {
           
            load_more_activity();
       }
    
    });
    
    
    /**
     * The routine loads more activity
     * We call it whenever we reach at the bottom of the activity listing
     * 
     */
    function load_more_activity(){
        //check if activity is loading, means is there already a request doing this
        //if yes, just return and let the other request handle it
            if(is_activity_loading)
                    return false;				

           //so, it is a new request, let us set the var to true         
            is_activity_loading=true;
            //add loading class to load more
            //theme authors may need to change the selector if there theme has a different id
            //I am doing it for bp-default/derivative themes
            //change #content to whatever you have named it in your theme
            jq("#content li.load-more").addClass('loading');

            
            if ( null == jq.cookie('bp-activity-oldestpage') )
                    jq.cookie('bp-activity-oldestpage', 1, {
                            path: '/'
                    } );

            var oldest_page = ( jq.cookie('bp-activity-oldestpage') * 1 ) + 1;

            //send the ajax request
            jq.post( ajaxurl, {
                    action: 'activity_get_older_updates',
                    'cookie': encodeURIComponent(document.cookie),
                    'page': oldest_page
            },
            function(response)
            {
                    jq(".load-more").hide();//hide any load more button
                    jq("#content li.load-more").removeClass('loading');//theme authors, you may need to change it
                    
                    //update cookie
                    jq.cookie( 'bp-activity-oldestpage', oldest_page, {
                            path: '/'
                    } );
                    
                    //and append the response
                    jq("#content ul.activity-list").append(response.contents);

                    //since we are done, let us set the state that activity has loaded
                    
                    is_activity_loading=false;
            }, 'json' );

            return false;
    }
 



});//end of dom ready

