<?php
OCP\Util::addScript('delete_confirmation', 'bind_first');

list($major,,) = OCP\Util::getVersion();
if( $major < 9 ) OCP\Util::addScript('delete_confirmation', 'script_version8');
else OCP\Util::addScript('delete_confirmation', 'script_version9');
