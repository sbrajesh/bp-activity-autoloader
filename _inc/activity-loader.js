/**
 * With version 2.0+, we simply simulate the click and the themes do the loading for us :)
 */
jQuery( document ).ready( function ($) {
	// We'll use this variable to make sure we don't send the request again and again.
	var $window = $( window );

	// Check the window scroll event.
	$window.scroll( function () {
		// Find the visible "load more" button.
		// since BP does not remove the "load more" button, we need to find the last one that is visible.
		var $load_more_btn = $( '.load-more:visible' );
		// If there is no visible "load more" button, we've reached the last page of the activity stream.
		// If data attribute is set, we already triggered request for ths specific button.
		if ( ! $load_more_btn.get( 0 ) || $load_more_btn.data( 'bpaa-autoloaded' ) ) {
			return;
		}

		// Find the offset of the button.
		var pos = $load_more_btn.offset();
		var offset = pos.top - 50;// 50 px before we reach the button.

		// If the window height+scrollTop is greater than the top offset of the "load more" button,
		// we have scrolled to the button's position. Let us load more activity.
		if ($window.scrollTop() + $window.height() > offset) {
			$load_more_btn.data( 'bpaa-autoloaded', 1 );
			$load_more_btn.find( 'a' ).trigger( 'click' );
		}

	});
});// end of dom ready.

