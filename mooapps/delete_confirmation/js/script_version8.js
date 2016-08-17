/**
 * Copyright (c) 2015, Bryan Clay <bryan@theclays.us>
 * This file is licensed under the Affero General Public License version 3 or later.
 */
(function($){
	
	/**
	 * We cannot use delgation in this scenario because delegated events
	 * seem to fire after events attached to the actual object.  We must
	 * hook the click before other click handlers so we can cancel it
	 * before it sends the delete ajax call.
	 */
	
	//list of urls to trigger checking for new delete buttons.
	var matchUrls = [
		OC.filePath('files', 'ajax', 'list.php'),
		OC.filePath('files', 'ajax', 'upload.php'),
		OC.filePath('files', 'ajax', 'newfile.php'),
		OC.filePath('files','ajax', 'newfolder.php')
	];
	
	//cache length
	var matchUrlsLen = matchUrls.length;
	
	//watch all ajax requests and check the url of each request
	//if the url matches a url of interest, add the listener
	$(function(){
		$(document).ajaxComplete(function(event, xhr, settings) {
			if( !settings || !settings.url ) return;
			
			if( matchesUrl(settings.url)) {
				//support for versions >= 8.2, this will not do anything for <= 8.1
				//The delete button doesn't exist until after the menu button is clicked
				$('a[data-action="menu"]:not(.confirmBound)').addClass('confirmBound').click(applyEvents);

				//still try to apply events here, support for versions <= 8.1
				//for versions >= 8.2, this effectively does nothing
				applyEvents();
			}
		});
		
		//apply confirm to mass delete button
		$('a.delete-selected').bindFirst('click', showConfirm);
	});

	//apply click events
	function applyEvents() {
		$('a[data-action="Delete"]:not(.confirmBound)').addClass('confirmBound').bindFirst('click', showConfirm);
	}
	
	//check if the url matches one in our list
	function matchesUrl(url) {
		var i;
		
		for(i = 0; i < matchUrlsLen; ++i) {
			if( url.substr(0, matchUrls[i].length) === matchUrls[i] ) return true;
		}
		
		return false;
	}
	
	//show the confirmation dialog.  Cancel the event if they click cancel.
	function showConfirm(myEvent) {
		if( !confirm('Are you sure you want to delete?')) {
			myEvent.preventDefault();
			myEvent.stopImmediatePropagation();
		}
	}
	
})(jQuery);
