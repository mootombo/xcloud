/**
 * Copyright (c) 2015, Bryan Clay <bryan@theclays.us>
 * This file is licensed under the Affero General Public License version 3 or later.
 */
(function($){
	
	//onload
	$(function(){
		//don't run if the FileActionsMenu is not loaded on this page
		if( !OCA || !OCA.Files || !OCA.Files.FileActionsMenu ) return;

		//hook FileActionMenu
		var oldClickAction = OCA.Files.FileActionsMenu.prototype._onClickAction;
		OCA.Files.FileActionsMenu.prototype._onClickAction = function(event) {
			//if they clicked delete, present the confirmation
			var $target = $(event.target),
				result,
				actionName;

			if (!$target.is('a')) {
				$target = $target.closest('a');
			}
			actionName = $target.attr('data-action');

			if( actionName == 'Delete' ) {
				result = showConfirm(event);
				if( result === false ) {
					OC.hideMenus();
					return false;
				}
			}
			
			//carry on
			oldClickAction.apply(this, arguments);
		};
		
		//apply confirm to mass delete button
		$('a.delete-selected').bindFirst('click', showConfirm);
	});
	
	//show the confirmation dialog.  Cancel the event if they click cancel.
	function showConfirm(myEvent) {
		if( !confirm('Are you sure you want to delete?')) {
			myEvent.preventDefault();
			myEvent.stopImmediatePropagation();
			return false;
		}
		return true;
	}
	
})(jQuery);
